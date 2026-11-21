import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const hbv = 'https://www.cdc.gov/hepatitis-b/hcp/diagnosis-testing/index.html'
const hbvPerinatal = 'https://www.cdc.gov/hepatitis-b/hcp/perinatal-provider-overview/'
const hcv = 'https://www.cdc.gov/hepatitis-c/hcp/diagnosis-testing/'
const hcvPerinatal = 'https://www.cdc.gov/mmwr/volumes/72/rr/rr7204a1.htm'
const hcvAdults = 'https://www.hcvguidelines.org/guidance/simplified-hcv-treatment-for-treatment-naive-adults-without-cirrhosis/'
const hcvChildren = 'https://www.hcvguidelines.org/guidance/hcv-in-children/'

type Drill = {
  prompt: string
  choices: readonly string[]
  correct: number
  why: string
  source: string
  markers?: readonly string[]
}

const names = ['HBsAg', 'Total anti-HBc', 'Anti-HBs', 'IgM anti-HBc']
const interpretations = ['Vaccine immunity', 'Resolved infection', 'Acute infection', 'Chronic infection', 'Not enough information to determine phase', 'Isolated core antibody', 'Susceptibility likely']
const hbvDrills: Drill[] = [
  { prompt: 'Routine testing after a documented complete vaccine series.', markers: ['Negative', 'Negative', 'Positive', 'Not tested'], choices: interpretations, correct: 0, why: 'Vaccination produces surface antibody, not core antibody. A negative anti-HBs years after vaccination does not by itself establish loss of protection.', source: hbv },
  { prompt: 'History of remote hepatitis B with no current symptoms.', markers: ['Negative', 'Positive', 'Positive', 'Not tested'], choices: interpretations, correct: 1, why: 'Core antibody indicates prior infection. Surface antibody plus a negative surface antigen fits resolved infection. Assess reactivation risk before immunosuppression.', source: hbv },
  { prompt: 'Jaundice shortly after a new exposure, no history of HBV.', markers: ['Positive', 'Positive', 'Negative', 'Positive'], choices: interpretations, correct: 2, why: 'IgM core antibody and the history favor acute infection. IgM can also be positive during a severe flare or reactivation of chronic HBV, so use prior results and the clinical history.', source: hbv },
  { prompt: 'Surface antigen was also positive eight months ago.', markers: ['Positive', 'Positive', 'Negative', 'Negative'], choices: interpretations, correct: 3, why: 'Surface antigen persisting at least six months supports chronic infection. The standard triple panel alone does not reliably date infection.', source: hbv },
  { prompt: 'First available blood tests; symptom history is unclear.', markers: ['Positive', 'Positive', 'Negative', 'Not tested'], choices: interpretations, correct: 4, why: 'The panel indicates current infection in this context but cannot distinguish acute from chronic. Seek prior results and obtain IgM anti-HBc when acute disease is suspected.', source: hbv },
  { prompt: 'Asymptomatic patient starting an immunosuppressive regimen.', markers: ['Negative', 'Positive', 'Negative', 'Not tested'], choices: interpretations, correct: 5, why: 'Possibilities include remote infection with waned surface antibody, occult infection or a false positive. Context and additional testing matter before immunosuppression.', source: hbv },
  { prompt: 'No vaccine documentation or known prior infection.', markers: ['Negative', 'Negative', 'Negative', 'Not tested'], choices: interpretations, correct: 6, why: 'With no evidence of past infection or vaccination, this pattern suggests susceptibility. Offer vaccination per current guidance.', source: hbv },
]

const pediatricDrills: Drill[] = [
  {
    prompt: 'A well newborn is delivered to a parent with a positive HBsAg result. What should the birth team do?',
    choices: ['Give HepB vaccine and HBIG within 12 hours', 'Give vaccine alone at the first clinic visit', 'Wait for infant anti-HBs before deciding'],
    correct: 0,
    why: 'Use single-antigen HepB vaccine and hepatitis B immune globulin (HBIG), in separate limbs, within 12 hours of birth. Complete the series using the birth-weight-specific schedule and plan postvaccination testing.',
    source: hbvPerinatal,
  },
  {
    prompt: 'A 3-month-old was born to a parent with detectable HCV RNA during pregnancy. What is the recommended test now?',
    choices: ['Anti-HCV alone', 'HCV RNA nucleic acid test', 'No testing until age 18 months'],
    correct: 1,
    why: 'Use HCV RNA at age 2–6 months. Passively transferred antibody makes early antibody testing unreliable. Detectable RNA warrants pediatric HCV expertise; undetectable RNA at ≥2 months generally needs no more follow-up unless clinically warranted.',
    source: hcvPerinatal,
  },
  {
    prompt: 'A newborn exposed to HBV completed the vaccine series on time. Which tests check infection and protection at the 9–12-month visit?',
    choices: ['Total anti-HBc and IgM anti-HBc', 'Anti-HBs only', 'HBsAg and anti-HBs'],
    correct: 2,
    why: 'Order HBsAg and anti-HBs, not anti-HBc. If the series was delayed, test 1–2 months after the final dose, but not before 9 months of age.',
    source: hbvPerinatal,
  },
]

function Source({ href, children }: { href: string; children: string }) {
  return <a className="text-primary underline underline-offset-4" href={href}>{children}</a>
}

function HepatitisDrill({ drills }: { drills: Drill[] }) {
  const [scenario, setScenario] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const active = drills[scenario]

  return <div className="space-y-4">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select a case">
      {drills.map((item, index) => <Button key={item.prompt} size="sm" variant={scenario === index ? 'default' : 'outline'} aria-pressed={scenario === index} onClick={() => { setScenario(index); setAnswer(null) }}>Case {index + 1}</Button>)}
    </div>
    <p className="font-medium">{active.prompt}</p>
    {active.markers && <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
      {active.markers.map((value, index) => <div key={names[index]} className="rounded-md border p-3"><dt className="text-muted-foreground">{names[index]}</dt><dd className="font-semibold">{value}</dd></div>)}
    </dl>}
    <div className="grid sm:grid-cols-2 gap-2" role="group" aria-label="Select an answer">
      {active.choices.map((choice, index) => <Button key={choice} variant={answer === index ? 'default' : 'outline'} className="h-auto min-h-10 whitespace-normal justify-start text-left" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{choice}</Button>)}
    </div>
    {answer !== null && <div role="status" className="space-y-1 rounded-md border p-3 text-sm">
      <p className="font-semibold">{answer === active.correct ? 'Correct' : 'Best answer'}: {active.choices[active.correct]}</p>
      <p>{active.why}</p>
      <Source href={active.source}>CDC guidance behind the answer</Source>
    </div>}
  </div>
}

export function HepatitisPage() {
  const [params, setParams] = useSearchParams()
  const population = params.get('audience') === 'pediatric' ? 'perinatal' : 'general'
  function setPopulation(value: 'general' | 'perinatal') {
    setParams(previous => { const next = new URLSearchParams(previous); next.set('audience', value === 'perinatal' ? 'pediatric' : 'adult'); return next })
  }
  return <div className="space-y-6 max-w-4xl mx-auto">
    <header>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Viral Hepatitis</h1>
      <p className="text-muted-foreground mt-2">Interpret HBV serologies, confirm current HCV infection, and recognize when perinatal exposure changes testing.</p>
    </header>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Population">
      <Button variant={population === 'general' ? 'default' : 'outline'} aria-pressed={population === 'general'} onClick={() => setPopulation('general')}>Adult / general</Button>
      <Button variant={population === 'perinatal' ? 'default' : 'outline'} aria-pressed={population === 'perinatal'} onClick={() => setPopulation('perinatal')}>Pediatric / perinatal</Button>
    </div>
    {population === 'general' ? <>
      <Card>
        <CardHeader><CardTitle>HBV serology challenge</CardTitle><CardDescription>Read the panel, then choose an interpretation. Identical triple panels can need different conclusions once you know the timing or IgM result.</CardDescription></CardHeader>
        <CardContent><HepatitisDrill key="adult" drills={hbvDrills} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>What each marker can tell you</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>HBsAg:</strong> usually current infection; transient positivity can follow recent vaccination.</p>
          <p><strong>Total anti-HBc:</strong> past or current infection, not vaccine response. <strong>IgM anti-HBc:</strong> supports recent infection but may appear in a flare.</p>
          <p><strong>Anti-HBs:</strong> surface antibody from vaccination or recovery; interpret with the other markers and vaccine history.</p>
          <p><strong>After a chronic HBV result:</strong> link to care for disease staging, treatment eligibility, monitoring and liver cancer surveillance when indicated. Antivirals can suppress HBV but are not considered curative. <Source href="https://www.cdc.gov/hepatitis-b/hcp/clinical-care/index.html">CDC chronic HBV care</Source></p>
          <p>CDC adult screening uses the triple panel: HBsAg, total anti-HBc and anti-HBs. For pregnancy, screen for HBsAg during each pregnancy; the prenatal result affects newborn management. <Source href={hbv}>CDC HBV testing and interpretation</Source></p>
        </CardContent>
      </Card>
    </> : <>
      <Card>
        <CardHeader><CardTitle>Perinatal exposure challenge</CardTitle><CardDescription>Work through birth protection, early HCV testing and HBV follow-up.</CardDescription></CardHeader>
        <CardContent><HepatitisDrill key="pediatric" drills={pediatricDrills} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>When an infant misses the testing window</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Perinatal HCV, not previously tested:</strong> use HCV RNA at 7–17 months; from 18 months use anti-HCV with reflex RNA if reactive. <Source href={hcvPerinatal}>CDC perinatal algorithm</Source></p>
          <p><strong>Confirmed HCV:</strong> pediatric expertise helps confirm persistence before treatment. Direct-acting antiviral therapy is recommended for children with HCV from age 3 years, when an approved regimen is available. <Source href={hcvChildren}>AASLD–IDSA pediatric guidance</Source></p>
        </CardContent>
      </Card>
    </>}
    <Card>
      <CardHeader><CardTitle>HCV: antibody shows exposure, RNA shows current infection</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><strong>Adult / general testing:</strong> order anti-HCV with reflex RNA when reactive. A reactive antibody with no detectable RNA usually means no current infection; consider recent exposure, specimen issues or clinical suspicion before closing the case. Use RNA when recent exposure is suspected even if antibody is negative. <Source href={hcv}>CDC HCV diagnostic sequence</Source></p>
        <p><strong>Adult treatment:</strong> eligible treatment-naive adults without cirrhosis may qualify for simplified pangenotypic therapy. Check fibrosis stage, HBV status, pregnancy and drug interactions first. Undetectable HCV RNA at least 12 weeks after finishing therapy confirms cure; reinfection remains possible. <Source href={hcvAdults}>AASLD–IDSA simplified adult pathway</Source></p>
      </CardContent>
    </Card>
  </div>
}
