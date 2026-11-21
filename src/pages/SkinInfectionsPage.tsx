import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const ssti = 'https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/'
const trial = 'https://pubmed.ncbi.nlm.nih.gov/28657870/'
const chop = 'https://www.chop.edu/clinical-pathway/cellulitis-abscess-clinical-pathway'
const impetigo = 'https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/impetigo.html'
const nec = 'https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/necrotizing-fasciitis.html'
const foot = 'https://www.idsociety.org/practice-guideline/diabetic-foot-infections/'

const scenarios = [
  {
    label: 'Nonpurulent · Shared',
    stem: 'A well-appearing patient has expanding, warm, tender shin redness. There is no wound drainage, fluctuance, rapid progression, or disproportionate pain. Which initial management fits best?',
    choices: [
      ['Incise the red area', 'No collection is suggested on this exam. Incision is for a drainable focus, not diffuse cellulitis.'],
      ['Treat typical nonpurulent cellulitis with streptococcal coverage', 'Correct. Routine MRSA coverage is not needed for typical mild nonpurulent cellulitis without specific risks. Reassess if the course is atypical.'],
      ['Treat for MRSA only', 'A typical nonpurulent presentation calls for reliable streptococcal coverage.'],
    ],
    source: ssti,
  },
  {
    label: 'Purulent · Pediatric',
    stem: 'A well-appearing school-age child has a tender, fluctuant lesion on the trunk. Ultrasound shows a defined superficial collection. Which next step addresses the source?',
    choices: [
      ['Use topical antibiotic alone', 'Topical therapy does not drain a defined collection.'],
      ['Wait for blood culture results', 'A localized collection needs assessment for drainage; blood culture results do not provide source control.'],
      ['Arrange drainage with age-appropriate pain control', 'Correct. If obtaining pus, send it for culture when feasible. Consider adjunct systemic therapy based on severity, host factors, local susceptibility, and the benefit shown in trials.'],
    ],
    source: chop,
  },
  {
    label: 'Necrotizing · Shared',
    stem: 'Following a minor wound, redness expands over hours. Pain is much greater than the visible changes and the patient becomes hypotensive. There is no visible gas or bullae. What takes priority?',
    choices: [
      ['Urgent surgical evaluation while resuscitating and starting broad empiric IV therapy', 'Correct. The early skin findings can be deceptively mild. Do not delay surgical exploration for a lab score or imaging when suspicion is high.'],
      ['Wait for CT confirmation first', 'Imaging may help in uncertain cases, but waiting is unsafe with this degree of suspicion and instability.'],
      ['Reassure because there is no crepitus', 'Gas, bullae and skin necrosis can be absent early. Their absence does not rule out a necrotizing infection.'],
    ],
    source: nec,
  },
  {
    label: 'Diabetes-related foot · Adult',
    stem: 'An adult with neuropathy has a chronic plantar ulcer, surrounding inflammation and bone reachable by sterile probe. What is the better diagnostic pathway?',
    choices: [
      ['Treat as uncomplicated cellulitis and stop the workup there', 'A deep ulcer with a positive probe-to-bone test raises concern for bone involvement; also assess for ischemia and deep infection.'],
      ['Assess depth and perfusion, get plain films and inflammatory markers, and use MRI if still uncertain', 'Correct. The initial tests are interpreted together. A superficial swab does not establish the pathogen in bone.'],
      ['Assume a positive superficial swab proves osteomyelitis', 'Superficial growth may reflect colonization; in suspected bone infection, bone culture is preferred when obtaining a specimen.'],
    ],
    source: foot,
  },
] as const

function Source({ href, children }: { href: string; children: string }) {
  return <a href={href} className="text-primary underline underline-offset-2">{children}</a>
}

export function SkinInfectionsPage() {
  const [params] = useSearchParams()
  const audience = params.get('audience')
  return <SkinInfectionsLesson key={audience} initialCase={audience === 'pediatric' ? 1 : audience === 'adult' ? 3 : 0} />
}

function SkinInfectionsLesson({ initialCase }: { initialCase: number }) {
  const [active, setActive] = useState(initialCase)
  const [selected, setSelected] = useState<number | null>(null)
  const current = scenarios[active]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Skin &amp; soft tissue infections</h1>
        <p className="mt-2 text-muted-foreground">Three first questions: Is there pus? Is there a deep or rapidly progressing process? What makes this patient different?</p>
      </header>
      <Card>
        <CardHeader><CardTitle>Match the pattern to the next move · All ages</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p><strong>Nonpurulent spreading warmth and erythema:</strong> typical mild cellulitis calls for streptococcal coverage. Penetrating trauma, known MRSA, purulence or systemic toxicity changes the assessment. Reconsider the diagnosis if atypical; contact dermatitis and venous stasis can mimic infection. <Source href={ssti}>IDSA SSTI guideline (2014)</Source></p>
          <p><strong>Focal fluctuance or drainage:</strong> look for a drainable collection. Bedside ultrasound can help when exam is equivocal. Drainage is the core intervention for a drainable abscess; adjunct antibiotics can improve cure after drainage in selected uncomplicated abscesses and are especially important to consider with systemic illness, impaired defenses or surrounding disease. <Source href={trial}>Randomized adult/pediatric abscess trial (2017)</Source> · <Source href={chop}>CHOP pediatric pathway</Source></p>
          <p><strong>Rapid progression, disproportionate pain or shock:</strong> suspect necrotizing infection. Get urgent surgical evaluation, resuscitate and start broad empiric IV treatment. Do not wait for a score, imaging, crepitus or skin necrosis before escalation. <Source href={nec}>CDC clinical guidance on GAS necrotizing fasciitis</Source></p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Pediatric · Impetigo and practical drainage</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Honey-colored crusts suggest nonbullous impetigo. Few lesions can be treated topically; numerous lesions usually warrant oral therapy that covers both group A streptococci and <em>S. aureus</em>. Consider an alternative diagnosis if the morphology or response does not fit.</p>
            <p>For a child with an abscess, plan analgesia and, when needed, procedural support. A sick child or special site such as around the eye is not an uncomplicated cellulitis/abscess pathway case.</p>
            <p><Source href={impetigo}>CDC impetigo guidance</Source> · <Source href={chop}>CHOP pediatric cellulitis and abscess pathway</Source></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Adult · Diabetes-related foot infection</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Assess depth, perfusion, systemic illness and need for source control. Neuropathy may blunt pain. A clinically uninfected ulcer does not require antibiotics to promote healing.</p>
            <p>For suspected osteomyelitis, combine probe-to-bone, plain films and inflammatory markers initially; use MRI if the diagnosis remains uncertain. Deep abscess, gangrene or severe ischemia calls for urgent specialist input.</p>
            <p><Source href={foot}>IWGDF/IDSA foot infection guideline (2023)</Source></p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Practice triage: choose the next move</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex flex-wrap gap-2">
            {scenarios.map((item, index) => <Button key={item.label} variant={active === index ? 'default' : 'outline'} aria-pressed={active === index} onClick={() => { setActive(index); setSelected(null) }}>{item.label}</Button>)}
          </div>
          <p className="font-medium">{current.stem}</p>
          <div className="grid gap-2">
            {current.choices.map(([choice], index) => <Button key={choice} variant="outline" className="h-auto min-h-10 justify-start whitespace-normal py-2 text-left" aria-pressed={selected === index} onClick={() => setSelected(index)}>{choice}</Button>)}
          </div>
          <div aria-live="polite">
            {selected !== null && <div className="space-y-2 rounded-lg border bg-muted p-3">
              <p>{current.choices[selected][1]}</p>
              <p><Source href={current.source}>Read the supporting guidance</Source></p>
            </div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
