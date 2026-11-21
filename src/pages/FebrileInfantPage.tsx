import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const aapGuide = 'https://doi.org/10.1542/peds.2021-052228'
const aapCorrection = 'https://doi.org/10.1542/peds.2021-054063'
const aapHub = 'https://www.aap.org/en/patient-care/infant-fever/'
const citationClass = 'text-primary underline underline-offset-2'

const ageBands = [
  {
    label: '8–21 days',
    workup: 'Obtain catheterized or suprapubic urine for urinalysis (UA) and culture if positive, a blood culture, and cerebrospinal fluid (CSF) for analysis and bacterial culture. Inflammatory markers are optional in this age band and do not replace CSF evaluation.',
    action: 'Start parenteral antibiotics and actively observe in the hospital while cultures are pending.',
    source: 'AAP key action statements 1–7',
  },
  {
    label: '22–28 days',
    workup: 'Obtain UA, blood culture and inflammatory markers. A positive UA requires a catheterized or suprapubic culture. Obtain CSF if any inflammatory marker is abnormal. With normal markers, lumbar puncture can still be considered; if CSF is not obtained or not interpretable, the AAP recommends hospital observation.',
    action: 'A positive UA or CSF suggesting bacterial meningitis calls for parenteral antibiotics in hospital. Home management is an option only on the qualifying low-risk branch with reassuring CSF, strict follow-up and return criteria, and age-appropriate parenteral therapy per the pathway.',
    source: 'AAP key action statements 8–14',
  },
  {
    label: '29–60 days',
    workup: 'Obtain UA, blood culture and inflammatory markers; culture a catheterized or suprapubic sample if UA is positive. CSF testing is not routinely needed with normal inflammatory markers and may be considered if any marker is abnormal.',
    action: 'With normal markers and a negative UA, eligible infants can often be observed at home without empiric antibiotics. With normal markers and a positive UA, oral antibiotics are recommended when CSF is normal if obtained; disposition still depends on clinical and follow-up criteria.',
    source: 'AAP key action statements 15–21',
  },
]

const options = [...ageBands.map(({ label }) => label), 'Outside the pathway']
const cases = [
  {
    label: 'Early age',
    stem: 'A well-appearing term infant aged 21 days is now afebrile in the ED, but had a documented rectal temperature of 38.0°C at home 6 hours ago.',
    correct: 0,
    explanation: 'The home temperature qualifies even though the infant is now afebrile. This age group still calls for blood, urine and CSF evaluation, parenteral antibiotics and hospital observation.',
  },
  {
    label: 'Middle age band',
    stem: 'A well-appearing term infant aged 28 days has a rectal temperature of 38.4°C, negative UA and one abnormal inflammatory marker.',
    correct: 1,
    explanation: 'Day 28 is still in the 22–28-day band. An abnormal inflammatory marker calls for CSF evaluation even with a negative UA.',
  },
  {
    label: 'Older, reassuring results',
    stem: 'A well-appearing term infant aged 29 days has a rectal temperature of 38.1°C, a negative UA and normal inflammatory markers. Blood culture is pending, and family can return promptly and has confirmed 24-hour follow-up.',
    correct: 2,
    explanation: 'Day 29 begins the 29–60-day band. In this branch a lumbar puncture and empiric antibiotics are not routinely needed, and home observation can be appropriate with follow-up and return precautions.',
  },
  {
    label: 'Prematurity',
    stem: 'An infant aged 36 days, born at 35 weeks, is now well appearing with a documented rectal temperature of 38.2°C.',
    correct: 3,
    explanation: 'The AAP pathway excludes infants born preterm. Do not substitute corrected age to force pathway eligibility; use individualized evaluation and local guidance.',
  },
  {
    label: 'Recent immunization',
    stem: 'A well-appearing term infant aged 60 days has a rectal temperature of 38.2°C the day after immunizations.',
    correct: 3,
    explanation: 'Age 60 days is in range, but immunization within the past 48 hours excludes this infant from the algorithm. Exclusion does not mean no evaluation is needed.',
  },
]

export function FebrileInfantPage() {
  const [ageIndex, setAgeIndex] = useState(0)
  const [caseIndex, setCaseIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const ageBand = ageBands[ageIndex]
  const currentCase = cases[caseIndex]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Febrile Infant</h1>
        <p className="text-muted-foreground mt-2">
          Learn how eligibility and age change the initial evaluation. Synthetic cases; not a bedside decision tool.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Check eligibility first</CardTitle>
          <CardDescription>2021 AAP framework, with the October 2021 corrected version</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>All must apply:</strong> well appearing, 8–60 days old, born at 37 to less than 42 weeks, now at home after newborn discharge or born at home, and rectal temperature ≥38.0°C documented at home in the prior 24 hours or in a clinical setting.</p>
          <p><strong>Do not use this pathway</strong> if appearance is ill or uncertain, the infant is outside the age or gestational range, or there is concern for herpes simplex virus, a focal bacterial infection (e.g. omphalitis), clinical bronchiolitis, immune compromise, neonatal surgery or infection, congenital or chromosomal abnormality, medical fragility, immunization within 48 hours, or age under 2 weeks with relevant maternal perinatal fever, infection or antimicrobial use.</p>
          <p>Mild upper respiratory symptoms or a positive viral test alone are not automatic exclusions. Excluded infants need a separate clinical assessment, not reassurance from this pathway.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compare the three age bands</CardTitle>
          <CardDescription>Age is in days since birth. Start with the eligibility check above.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div role="group" aria-label="Febrile infant age band" className="flex flex-wrap gap-2">
            {ageBands.map(({ label }, index) => (
              <Button key={label} type="button" aria-pressed={ageIndex === index}
                variant={ageIndex === index ? 'default' : 'outline'} onClick={() => setAgeIndex(index)}>
                {label}
              </Button>
            ))}
          </div>
          <div aria-live="polite" className="space-y-2 text-sm rounded-lg bg-muted/50 border p-4">
            <p><strong>Initial evaluation:</strong> {ageBand.workup}</p>
            <p><strong>Treatment and disposition:</strong> {ageBand.action}</p>
            <a className={citationClass} href={aapGuide}>{ageBand.source}</a>
          </div>
          <p className="text-sm text-muted-foreground">
            Outpatient monitoring requires a reliable caregiver, communication and access to emergency care, return instructions and a confirmed 24-hour reassessment plan. A pending culture needs a follow-up owner.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice: choose the pathway</CardTitle>
          <CardDescription>For each case, check eligibility before picking an age band.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div role="group" aria-label="Febrile infant practice case" className="flex flex-wrap gap-2">
            {cases.map(({ label }, index) => (
              <Button key={label} type="button" aria-pressed={caseIndex === index}
                variant={caseIndex === index ? 'default' : 'outline'}
                onClick={() => { setCaseIndex(index); setAnswer(null) }}>
                {label}
              </Button>
            ))}
          </div>
          <p>{currentCase.stem}</p>
          <div role="group" aria-label="Choose a febrile infant pathway" className="flex flex-wrap gap-2">
            {options.map((label, index) => (
              <Button key={label} type="button" aria-pressed={answer === index}
                variant={answer === index ? 'default' : 'outline'} onClick={() => setAnswer(index)}>
                {label}
              </Button>
            ))}
          </div>
          <div aria-live="polite">
            {answer !== null && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-1">
                <p className="font-semibold">{answer === currentCase.correct ? 'Correct' : 'Best answer'}: {options[currentCase.correct]}</p>
                <p className="text-sm">{currentCase.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Evidence and status</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <a className={citationClass} href={aapGuide}>AAP 2021 guideline</a> ·{' '}
            <a className={citationClass} href={aapCorrection}>November 2021 correction</a> ·{' '}
            <a className={citationClass} href={aapHub}>AAP Infant Fever resource</a>
          </p>
          <p className="text-muted-foreground">
            The AAP resource continues to link the 2021 framework. Formal reaffirmation after its five-year review cycle was not verified as of November 2026. Confirm the current local protocol before clinical use.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
