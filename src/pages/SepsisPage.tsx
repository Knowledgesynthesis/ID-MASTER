import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const adultSsc = 'https://doi.org/10.1097/CCM.0000000000007075'
const pediatricSsc = 'https://doi.org/10.1097/PCC.0000000000003927'
const citationClass = 'text-primary underline underline-offset-2'

const timingOptions = [
  'Start immediately, ideally within 1 hour',
  'Rapidly evaluate; if concern persists or is substantiated, start promptly, ideally within 3 hours',
  'Defer antibiotics and monitor closely',
]

const cases = {
  adult: [
    {
      label: 'Pneumonia, no shock',
      stem: 'A 55-year-old with focal consolidation, purulent sputum, a new oxygen requirement and acute kidney injury has warm extremities and no hypotension or other signs of shock. The team considers bacterial sepsis probable.',
      answer: 0,
      explanation: 'Probable adult sepsis without shock is on the immediate-treatment branch. Normal blood pressure does not exclude sepsis.',
    },
    {
      label: 'Uncertain source, no shock',
      stem: 'A 62-year-old has new kidney injury with fever. Infection is possible but not yet probable; a noninfectious cause also fits. Blood pressure and bedside perfusion are preserved.',
      answer: 1,
      explanation: 'For possible adult sepsis without shock, rapidly assess infectious and noninfectious causes. If concern persists, treat within 3 hours of first suspicion, not 3 hours after completing the workup.',
    },
    {
      label: 'Likely noninfectious',
      stem: 'A 46-year-old has fever and tachycardia from early pancreatitis. The initial assessment finds a low likelihood of infection and no shock.',
      answer: 2,
      explanation: 'When infection is unlikely and shock is absent, SSC suggests deferring antibiotics while closely monitoring and revisiting that decision if the patient changes.',
    },
    {
      label: 'Urinary source, shock',
      stem: 'A 67-year-old with fever and flank pain has BP 78/47, altered mentation and mottling. Septic shock is suspected. An obstructed collecting system is possible.',
      answer: 0,
      explanation: 'Treat shock immediately while resuscitating and assessing for urgent source control. Do not wait for a lactate result or definitive shock classification.',
    },
  ],
  pediatric: [
    {
      label: 'Pneumonia, no shock',
      stem: 'An 8-year-old with fever and a focal infiltrate has a new oxygen requirement but warm extremities, brisk capillary refill and age-appropriate blood pressure. The team suspects probable sepsis without shock.',
      answer: 1,
      explanation: 'In probable pediatric sepsis without shock, rapidly evaluate and, if the concern is substantiated, start treatment as soon as possible after evaluation. Three hours is an ideal upper timing goal, not a reason to wait.',
    },
    {
      label: 'Poor perfusion, shock',
      stem: 'A 6-year-old with suspected bacterial infection is lethargic, with weak pulses, cool extremities and prolonged capillary refill despite blood pressure in the age-appropriate range.',
      answer: 0,
      explanation: 'These perfusion findings can signal shock before hypotension in a child. Treat suspected shock immediately and reassess frequently.',
    },
  ],
}

export function SepsisPage() {
  const [params, setParams] = useSearchParams()
  const audience = params.get('audience')
  const population = audience === 'pediatric' ? 'pediatric' : 'adult'
  return (
    <SepsisContent key={population} population={population} onPopulationChange={(next) => {
      if (next === audience) return
      const nextParams = new URLSearchParams(params)
      nextParams.set('audience', next)
      setParams(nextParams, { replace: next === population })
    }} />
  )
}

function SepsisContent({ population, onPopulationChange }: {
  population: 'adult' | 'pediatric'
  onPopulationChange: (population: 'adult' | 'pediatric') => void
}) {
  const [caseIndex, setCaseIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const adult = population === 'adult'
  const currentCase = cases[population][caseIndex]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sepsis &amp; Septic Shock</h1>
        <p className="text-muted-foreground mt-2">
          Compare age-specific recognition and initial management. Synthetic examples for learning, not a bedside calculator.
        </p>
      </header>

      <div role="group" aria-label="Sepsis population" className="flex flex-wrap gap-2">
        {(['adult', 'pediatric'] as const).map((group) => (
          <Button key={group} type="button" aria-pressed={population === group}
            variant={population === group ? 'default' : 'outline'}
            onClick={() => onPopulationChange(group)}>
            {group === 'adult' ? 'Adults' : 'Children'}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{adult ? 'Adults' : 'Children'}: Recognition and first actions</CardTitle>
          <CardDescription>
            <a className={citationClass} href={adult ? adultSsc : pediatricSsc}>
              Surviving Sepsis Campaign {adult ? 'adult' : 'pediatric'} guideline (2026)
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {adult ? (
            <>
              <p><strong>Recognize organ dysfunction.</strong> Fever, tachycardia or elevated lactate alone do not establish sepsis. Under <a className={citationClass} href="https://doi.org/10.1001/jama.2016.0287">Sepsis-3</a>, shock is sepsis with vasopressors needed to maintain mean arterial pressure (MAP) ≥65 mm Hg and lactate &gt;2 mmol/L after adequate fluid resuscitation. Do not wait for this definition to be met before treating suspected shock.</p>
              <p><strong>Time antibiotics by likelihood and shock.</strong> Give immediately, ideally within 1 hour of recognition, for possible/probable/definite septic shock or probable/definite sepsis without shock. In possible sepsis without shock, rapidly investigate and treat within 3 hours of first suspicion if concern persists. With low likelihood of infection and no shock, consider deferring while monitoring closely.</p>
              <p><strong>Restore perfusion and reassess.</strong> In sepsis-induced hypoperfusion or septic shock, SSC conditionally suggests at least 30 mL/kg IV crystalloid in the first 3 hours, individualized with frequent reassessment. Norepinephrine is the usual first-line vasopressor; initial MAP target is generally 65 mm Hg. Do not delay indicated vasopressors solely for central access.</p>
            </>
          ) : (
            <>
              <p><strong>Look for age-specific signs of poor perfusion.</strong> Assess mental status, pulse quality, capillary refill, extremity temperature and urine output, not just blood pressure. The <a className={citationClass} href="https://doi.org/10.1001/jama.2024.0179">Phoenix criteria</a> classify established organ dysfunction; they are not an early screening tool and should not delay treatment. Young neonates need a neonatal-specific pathway.</p>
              <p><strong>Time antibiotics by shock status.</strong> For suspected septic shock, start as soon as possible, ideally within 1 hour of recognition. In probable sepsis without shock, investigate rapidly and, if substantiated, give antibiotics promptly after evaluation, ideally within 3 hours. In probable bacterial sepsis, consider earlier treatment if timely evaluation is not feasible.</p>
              <p><strong>Titrate fluids to response and setting.</strong> With intensive care available, SSC conditionally suggests 10–20 mL/kg crystalloid boluses for septic shock, up to 40–60 mL/kg in the first hour. Reassess after every bolus and stop if shock resolves or overload develops. Without intensive care availability, do not give boluses for sepsis without hypotension; hypotensive shock has a separate conditional approach.</p>
              <p><strong>Escalate if shock persists.</strong> The guideline does not prefer epinephrine or norepinephrine over the other as first-line therapy; indicated vasoactive support need not wait for central access.</p>
            </>
          )}
          <p><strong>For both:</strong> Obtain blood cultures promptly and before antibiotics when feasible without a significant delay. Measure lactate as part of the initial assessment when indicated, but interpret it with the perfusion exam. Address a source that needs drainage, debridement, relief of obstruction or removal of an infected device; reassess clinical response and narrow or stop antimicrobials when the evidence supports it.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice: when should antibiotics start?</CardTitle>
          <CardDescription>Choose a synthetic case, then select its timing branch.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div role="group" aria-label="Sepsis practice case" className="flex flex-wrap gap-2">
            {cases[population].map(({ label }, index) => (
              <Button type="button" key={label} aria-pressed={caseIndex === index}
                variant={caseIndex === index ? 'default' : 'outline'}
                onClick={() => { setCaseIndex(index); setAnswer(null) }}>
                {label}
              </Button>
            ))}
          </div>
          <p>{currentCase.stem}</p>
          <div role="group" aria-label="Antibiotic timing" className="grid gap-2">
            {timingOptions.map((label, index) => (
              <Button key={label} type="button" aria-pressed={answer === index}
                className="h-auto min-h-10 whitespace-normal text-left justify-start"
                variant={answer === index ? 'default' : 'outline'} onClick={() => setAnswer(index)}>
                {label}
              </Button>
            ))}
          </div>
          <div aria-live="polite">
            {answer !== null && (
              <div className="rounded-lg border bg-muted/50 p-4 space-y-1">
                <p className="font-semibold">
                  {answer === currentCase.answer ? 'Correct' : 'Best answer'}: {timingOptions[currentCase.answer]}
                </p>
                <p className="text-sm">{currentCase.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Common sources</CardTitle></CardHeader>
        <CardContent className="text-sm grid sm:grid-cols-2 gap-3">
          <p><strong>Pulmonary:</strong> pneumonia, empyema</p>
          <p><strong>Urinary:</strong> pyelonephritis, infected obstruction</p>
          <p><strong>Abdominal:</strong> appendicitis, biliary infection, peritonitis</p>
          <p><strong>Skin and soft tissue:</strong> cellulitis, abscess, necrotizing infection</p>
          <p><strong>Central nervous system:</strong> meningitis, brain abscess</p>
          <p><strong>Intravascular device:</strong> line-associated bloodstream infection</p>
        </CardContent>
      </Card>
    </div>
  )
}
