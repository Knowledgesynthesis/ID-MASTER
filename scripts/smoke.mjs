import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')

const port = 4181
const base = process.env.SMOKE_BASE_URL || `http://127.0.0.1:${port}`
const server = process.env.SMOKE_BASE_URL
  ? null : spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'inherit' })
let browser
try {
  let online = false
  for (let i = 0; i < 50; i++) {
    online = await fetch(base).then(r => r.ok).catch(() => false)
    if (online) break
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  assert(online, 'Site did not become reachable')
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH && { executablePath: process.env.CHROMIUM_PATH }) })
  const routes = ['/', '/learn', '/sepsis', '/hiv', '/hepatitis', '/endocarditis', '/osteomyelitis', '/skin', '/sti', '/uti', '/cases', '/assessment', '/settings', '/febrile-infant', '/pediatric-pneumonia']
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const context = await browser.newContext({ viewport, serviceWorkers: 'block' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(String(error)))
    page.on('response', res => {
      if (res.url().startsWith(base + '/') && res.status() >= 400) errors.push(`${res.status()} ${res.url()}`)
    })
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' })
      assert(response?.ok(), `Direct navigation failed: ${route}`)
      await page.locator('main h1').first().waitFor()
      assert.equal(await page.locator('main h1').count(), 1, `Expected one page heading: ${route}`)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Horizontal overflow: ${route} at ${viewport.width}`)
      const unsafeLinks = await page.locator('main a[href^="http:"]').count()
      assert.equal(unsafeLinks, 0, `Non-HTTPS evidence link on ${route}`)
    }
    assert.deepEqual(errors, [], 'Browser errors')
    await context.close()
    console.log(`Passed ${routes.length} direct routes at ${viewport.width}px`)
  }

  const page = await browser.newPage({ viewport: { width: 1100, height: 800 } })
  await page.goto(base + '/')
  await page.locator('main h1').waitFor()
  await page.keyboard.press('Tab')
  assert((await page.locator(':focus').textContent())?.match(/skip/i), 'Skip link should be the first keyboard stop')
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => document.activeElement?.tagName), 'MAIN')
  await page.goto(base + '/settings')
  const toggle = page.getByRole('button', { name: /light|dark|theme/i }).first()
  await toggle.waitFor()
  const prior = await page.locator('html').getAttribute('class')
  await toggle.click()
  const changed = await page.locator('html').getAttribute('class')
  assert.notEqual(changed, prior)
  await page.reload()
  await page.waitForFunction(expected => document.documentElement.className === expected, changed)
  await page.goto(base + '/')
  await page.getByRole('button', { name: 'Pediatric', exact: true }).click()
  const search = page.getByRole('searchbox', { name: 'Search modules' })
  await search.fill('not-a-matching-module')
  await page.getByRole('button', { name: 'Clear filters' }).waitFor()
  await search.fill('pyelonephritis')
  const uti = page.getByRole('link', { name: /UTI & pyelonephritis/i }).first()
  await uti.click()
  assert.equal(new URL(page.url()).searchParams.get('audience'), 'pediatric')
  const children = page.getByRole('button', { name: 'Children', exact: true })
  await children.waitFor()
  assert.equal(await children.getAttribute('aria-pressed'), 'true')
  await page.getByRole('button', { name: 'Adults', exact: true }).click()
  assert.equal(await children.getAttribute('aria-pressed'), 'false')
  await page.goBack()
  await page.waitForFunction(() => new URLSearchParams(location.search).get('audience') === 'pediatric')
  assert.equal(await children.getAttribute('aria-pressed'), 'true')

  await page.goto(base + '/pediatric-pneumonia')
  await page.getByRole('button', { name: 'Early recovery on therapy' }).click()
  await page.getByRole('button', { name: 'Consider completing the course at 5 days' }).click()
  await page.getByText('Correct: Consider completing the course at 5 days', { exact: true }).waitFor()
  assert.equal(await page.getByRole('link', { name: /SCOUT-CAP/i }).count(), 2)
  assert(await page.getByRole('button', { name: 'Automatically continue to 10 days' }).isDisabled())
  await page.getByRole('button', { name: 'New respiratory distress' }).click()
  assert.equal(await page.getByText('Decisive clue:', { exact: true }).count(), 0)
  await page.getByRole('button', { name: /characterize with ultrasound/i }).click()
  await page.getByText(/^Correct: Characterize/).waitFor()

  await page.goto(base + '/assessment')
  const child = page.getByRole('radio', { name: 'Back up the antigen result with a throat culture' })
  await child.check()
  await page.getByRole('button', { name: 'Check answer' }).click()
  await page.getByText('Decisive clue:', { exact: true }).waitFor()
  assert(await child.isDisabled(), 'A committed question must not allow answer flipping')
  assert(await page.locator('main a[href*="cdc.gov/group-a-strep"]').count() > 0)
  await page.getByRole('button', { name: 'Next question' }).click()
  await page.getByRole('radio', { name: 'Do not routinely get a backup throat culture' }).check()
  await page.getByRole('button', { name: 'Check answer' }).click()
  await page.getByText('Decisive clue:', { exact: true }).waitFor()

  const restricted = await browser.newPage()
  await restricted.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage disabled', 'SecurityError') }
    Storage.prototype.setItem = () => { throw new DOMException('Storage disabled', 'SecurityError') }
  })
  await restricted.goto(base + '/settings')
  await restricted.getByRole('button', { name: 'Switch to light mode' }).click()
  await restricted.waitForFunction(() => document.documentElement.classList.contains('light'))
  await restricted.close()

  const icon = await page.request.get(base + '/id-master.svg')
  assert(icon.ok() && icon.headers()['content-type']?.includes('svg'))
  console.log('Passed keyboard navigation, theme persistence, audience routing and Back, pneumonia answer lock/reset, and favicon')
} finally {
  await browser?.close()
  server?.kill()
}
