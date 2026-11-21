import { Link, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowRight, BookOpen, FlaskConical, Search, X } from 'lucide-react'
import { audiences, findModules, moduleLocation, trackLabel } from '@/lib/moduleDirectory'
import type { Audience } from '@/lib/moduleDirectory'

export function HomePage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const rawAudience = params.get('track')
  const audience = audiences.find((item) => item === rawAudience) ?? 'All'
  const modules = findModules(audience, query)

  function updateFilter(nextAudience: Audience, nextQuery: string) {
    const next = new URLSearchParams()
    if (nextAudience !== 'All') next.set('track', nextAudience)
    if (nextQuery) next.set('q', nextQuery)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="id-hero" aria-labelledby="home-title">
        <div className="id-hero-content">
          <p className="id-eyebrow">Infectious disease learning</p>
          <h1 id="home-title">Find the clue.<br />Choose the next step.</h1>
          <p className="id-hero-copy">
            Practice the decisions that change care. Compare pediatric and adult approaches, then apply what you learned to a new case.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/learn" className="id-cta"><FlaskConical size={18} aria-hidden="true" /> Open Learning Lab <ArrowRight size={17} aria-hidden="true" /></Link>
            <a href="#module-library" className="id-cta id-cta-outline">Find a module <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="id-hero-aside" aria-label="Three ways to practice">
          <div><span>01</span><strong>Recognize</strong><small>Find the decisive clue.</small></div>
          <div><span>02</span><strong>Decide</strong><small>Commit before feedback.</small></div>
          <div><span>03</span><strong>Compare</strong><small>Recheck when the patient changes.</small></div>
        </div>
      </section>

      <section id="module-library" className="space-y-5 scroll-mt-28" aria-labelledby="library-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="id-section-label"><BookOpen size={15} aria-hidden="true" /> Core library</p>
            <h2 id="library-title" className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Find your next topic</h2>
          </div>
          <div className="id-search w-full sm:w-80">
            <Search size={18} aria-hidden="true" />
            <label htmlFor="module-search" className="sr-only">Search modules</label>
            <input autoComplete="off" id="module-search" type="search" placeholder="Try “urine culture” or “shock”" value={query} onChange={(event) => updateFilter(audience, event.target.value)} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="id-segments" role="group" aria-label="Filter by audience">
            {audiences.map((track) => (
              <button type="button" key={track} aria-pressed={track === audience} onClick={() => updateFilter(track, query)}>{track}</button>
            ))}
          </div>
          <p className="text-sm tabular-nums text-muted-foreground" role="status">
            {modules.length} {modules.length === 1 ? 'module' : 'modules'}
            {audience === 'Pediatric' && modules.length > 0 ? ' · Pediatric-only first' : ''}
          </p>
        </div>
        {!modules.length ? (
          <div className="id-empty">
            <h3 className="font-semibold">No matching modules</h3>
            <p className="text-sm text-muted-foreground">Try a different audience or a shorter search.</p>
            <button type="button" className="id-reset" onClick={() => updateFilter('All', '')}><X size={16} aria-hidden="true" /> Clear filters</button>
          </div>
        ) : (
          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ title, path, icon: Icon, description, tracks }) => (
              <li className="min-w-0" key={path}>
                <Link to={moduleLocation(path, tracks, audience)} className="id-module-card">
                  <div className="flex items-center justify-between">
                    <span className="id-module-icon"><Icon size={21} aria-hidden="true" /></span>
                    <ArrowRight className="id-card-arrow" size={19} aria-hidden="true" />
                  </div>
                  <h3 className="mt-3.5 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tracks.map((track) => <span className="id-pill" data-track={track} key={track}>{trackLabel(track, path)}</span>)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
