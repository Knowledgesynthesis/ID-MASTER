import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DecisionCard, type Audience, type Decision } from './AssessmentPage'

interface ClinicalCase {
  id: string
  title: string
  audience: Exclude<Audience, 'Shared'>
  topic: string
  initial: string
  takeHome: string
  steps: readonly Decision[]
}

const adultSepsis = ['Surviving Sepsis Campaign: Adults (2026)', 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'] as const
const pediatricSepsis = ['Surviving Sepsis Campaign: Children (2026)', 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-the-management-of-sepsis-and-septic-shock-in'] as const
const cryptococcus = ['NIH: Adult/adolescent cryptococcosis', 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/cryptococcosis'] as const
const toxoplasma = ['NIH: Adult/adolescent toxoplasma encephalitis', 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/toxoplasmosis'] as const
const ssti = ['IDSA: Skin and soft-tissue infections', 'https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/'] as const
const uti = ['AAP 2026 pediatric UTI guideline', 'https://publications.aap.org/pediatrics/article/158/4/e2026078565/209460/Clinical-Practice-Guideline-for-the-Diagnosis-and'] as const
const utiDiagnosis = ['AAP 2026 companion diagnostic report', 'https://publications.aap.org/pediatrics/article/158/4/e2026078566/209462/Urinary-Tract-Infection-Diagnosis-A-Companion-to'] as const

const cases: readonly ClinicalCase[] = [
  {
    id: 'peds-shock', title: 'Shock before hypotension', audience: 'Pediatric', topic: 'Sepsis',
    initial: 'An 8-year-old with fever and suspected bacterial infection is increasingly drowsy. Capillary refill is 5 seconds, pulses are weak, and blood pressure is still within the expected range for age.',
    takeHome: 'Recognize poor perfusion before hypotension appears. Reassess after every fluid aliquot, not only at a preset total.',
    steps: [
      {
        question: 'Which finding should drive the urgency of the response?',
        options: [
          ['Poor perfusion and altered mental status despite a preserved blood pressure', 'Children can maintain blood pressure while perfusion is impaired. Activate a pediatric sepsis response for suspected shock.'],
          ['Only a low blood pressure would trigger a shock response', 'Waiting for hypotension can delay recognition.'],
          ['Fever alone defines pediatric septic shock', 'The concerning findings are evidence of impaired perfusion and organ dysfunction in the context of suspected infection.'],
        ],
        correct: 0, clue: 'Weak pulses, prolonged refill and a change in mental status.',
        objective: 'Recognize suspected pediatric shock without first requiring hypotension.', sources: [pediatricSepsis],
      },
      {
        question: 'In a setting with pediatric intensive care, perfusion and mental status normalize after the initial fluid aliquot. What should happen next?',
        options: [
          ['Continue boluses automatically to reach 60 mL/kg', 'A guideline upper amount is not a target; stop boluses once shock resolves or signs of overload appear.'],
          ['Reassess and stop further boluses while continuing urgent treatment and monitoring', 'After each aliquot, use the response and signs of overload to guide further fluid. Give antimicrobials for suspected shock as soon as possible, ideally within an hour.'],
          ['Stop the whole sepsis evaluation because the fluid response excludes infection', 'A response to fluid does not exclude infection or remove the need for monitoring and source evaluation.'],
        ],
        correct: 1, clue: 'Shock signs have resolved after the first aliquot.',
        objective: 'Adapt fluid resuscitation to physiologic response and setting.', sources: [pediatricSepsis],
      },
    ],
  },
  {
    id: 'adult-shock', title: 'Shock with an unclear source', audience: 'Adult', topic: 'Sepsis',
    initial: 'A 65-year-old arrives in the ED with fever, new confusion, HR 125, BP 82/50 mm Hg and suspected infection. There is no obvious source on initial examination.',
    takeHome: 'Resuscitation, empiric antimicrobials and source evaluation proceed together. Do not wait for a fixed fluid total to reassess an unstable patient.',
    steps: [
      {
        question: 'How should blood cultures fit into the first-hour plan?',
        options: [
          ['Get blood cultures promptly, ideally before antibiotics, without delaying urgent treatment', 'Obtain cultures as soon as possible, in parallel with resuscitation. For suspected shock give antimicrobials immediately, ideally within one hour of recognition.'],
          ['Wait for cultures to grow before choosing an antibiotic', 'Delayed confirmation is not a reason to withhold urgent empiric therapy in suspected shock.'],
          ['Complete source imaging before starting any treatment', 'Source evaluation matters, but must not postpone initial treatment of shock.'],
        ],
        correct: 0, clue: 'The source is uncertain, but shock is already suspected.',
        objective: 'Sequence cultures and antibiotics without delaying resuscitation.', sources: [adultSepsis],
      },
      {
        question: 'Lactate is 4.2 mmol/L and there are signs of hypoperfusion. What is the best approach to initial hemodynamic support?',
        options: [
          ['Wait for a second lactate before treating the blood pressure', 'Lactate supports risk assessment; the current hypotension and perfusion findings already warrant action.'],
          ['Start IV crystalloid while reassessing perfusion and the need for early vasopressor support', 'Crystalloid is initial fluid; titrate to response and avoid postponing vasopressors in unstable shock while fluids are continued as appropriate.'],
          ['Treat acute kidney injury with immediate dialysis based on creatinine alone', 'The immediate issue is shock; a rise in creatinine alone does not establish an urgent dialysis indication.'],
        ],
        correct: 1, clue: 'Hypotension and organ dysfunction are present now.',
        objective: 'Treat hypoperfusion immediately and reassess rather than using a rigid sequential checklist.', sources: [adultSepsis],
      },
      {
        question: 'After initial fluid, MAP remains about 60 mm Hg with poor perfusion. Which vasopressor is first line for adult septic shock?',
        options: [
          ['Dopamine', 'Norepinephrine is preferred to dopamine as the initial agent.'],
          ['Norepinephrine', 'Persistent hypotension warrants vasopressor support; norepinephrine is the first-line adult agent.'],
          ['No vasopressor until the source is identified', 'Hypoperfusion needs treatment regardless of whether the source is known.'],
        ],
        correct: 1, clue: 'Persistent low MAP and poor perfusion after initial fluid.',
        objective: 'Identify the first-line adult vasopressor for septic shock.', sources: [adultSepsis],
      },
    ],
  },
  {
    id: 'peds-uti', title: 'The urine culture is not the dipstick', audience: 'Pediatric', topic: 'UTI',
    initial: 'A previously healthy 3-year-old has fever and dysuria, appears well and can drink. A properly collected urine specimen can be obtained before treatment.',
    takeHome: 'Collect a reliable culture before treatment when possible. Document who will review it and update the family.',
    steps: [
      {
        question: 'An initial urinalysis is suggestive. What establishes the diagnosis and allows therapy to be narrowed or stopped?',
        options: [
          ['A repeat dipstick only', 'The dipstick helps estimate probability; it does not identify the organism or establish culture confirmation.'],
          ['A properly collected urine culture, interpreted with symptoms and urinalysis', 'Culture should be obtained before antibiotics if possible. Interpret growth in the context of specimen quality, symptoms and inflammatory findings.'],
          ['A renal ultrasound', 'Imaging may address selected anatomic questions; it does not confirm a UTI.'],
        ],
        correct: 1, clue: 'You can obtain an adequate pre-treatment specimen.',
        objective: 'Distinguish UA screening from confirmation and culture-directed follow-up.', sources: [uti, utiDiagnosis],
      },
      {
        question: 'After empiric treatment is prescribed, the adequate pre-antibiotic culture finalizes negative. The child is well and has no other antibiotic indication. What closes the loop?',
        options: [
          ['Continue the original plan without calling the family', 'Continuing a course automatically can prolong unnecessary antibiotic exposure.'],
          ['Treat for a more resistant organism', 'A negative culture from a reliable pre-treatment sample is not evidence of resistance.'],
          ['Reassess, stop the empiric UTI antibiotic and update the family', 'The AAP guideline advises stopping empiric antibiotics when the culture is negative unless the sample was obtained after exposure. Persistent illness warrants reassessment.'],
        ],
        correct: 2, clue: 'A reliable specimen was collected before the first antibiotic dose.',
        objective: 'Act on a final culture rather than treating an abnormal UA as the diagnosis.', sources: [uti],
      },
    ],
  },
  {
    id: 'adult-hiv-cns', title: 'CNS symptoms in advanced HIV', audience: 'Adult', topic: 'HIV',
    initial: 'A 32-year-old adult with newly diagnosed HIV (CD4 45 cells/mm³) has 2 weeks of headache, fever and worsening confusion. ART has not yet started.',
    takeHome: 'The neurological syndrome narrows the differential. Measure and address opening pressure in cryptococcal meningitis.',
    steps: [
      {
        question: 'Which diagnoses are high-priority considerations?',
        options: [
          ['Pneumocystis pneumonia and esophageal candidiasis', 'Those are important with advanced HIV, but do not explain this primarily CNS presentation.'],
          ['Cryptococcal meningitis and toxoplasma encephalitis', 'Both are important considerations with advanced HIV and subacute CNS symptoms. Keep other serious causes of CNS disease in the differential.'],
          ['Disseminated MAC as the only plausible diagnosis', 'Low CD4 alone does not establish an organism; the neurological syndrome matters.'],
        ],
        correct: 1, clue: 'Severe immunosuppression with a new subacute neurological syndrome.',
        objective: 'Use clinical localization as well as immune status to prioritize opportunistic infections.', sources: [cryptococcus, toxoplasma],
      },
      {
        question: 'A new focal deficit raises concern for a mass lesion. Which diagnostic plan is most appropriate?',
        options: [
          ['Urgent brain imaging; obtain CSF with opening pressure and targeted studies when safe', 'Imaging evaluates mass effect. When lumbar puncture is safe, CSF studies and opening pressure help establish the diagnosis and identify pressure-related complications.'],
          ['Perform an immediate LP without considering the focal deficit', 'A focal deficit raises concern for a lesion with mass effect, which changes the safety assessment.'],
          ['Use serum cryptococcal antigen as a complete substitute for CSF', 'Serum testing can inform the differential but does not assess CSF pressure or fully evaluate symptomatic CNS disease.'],
        ],
        correct: 0, clue: 'A focal deficit specifically raises concern for a lesion with mass effect.',
        objective: 'Plan neuroimaging and a safe, targeted CSF evaluation.', sources: [cryptococcus, toxoplasma],
      },
      {
        question: 'Imaging shows no mass effect and LP is safe. Opening pressure is 35 cm H₂O; CSF cryptococcal antigen is positive. What fits best?',
        options: [
          ['Toxoplasma encephalitis alone', 'Toxoplasma is in the differential but does not account for a positive CSF cryptococcal antigen.'],
          ['Viral meningitis alone', 'Positive CSF cryptococcal antigen in this presentation identifies a different cause.'],
          ['Cryptococcal meningitis with raised intracranial pressure', 'Provide urgent antifungal and pressure management with specialist input; elevated pressure may require therapeutic CSF drainage.'],
        ],
        correct: 2, clue: 'Positive CSF cryptococcal antigen with substantially raised opening pressure.',
        objective: 'Recognize the diagnosis and the separate urgency of intracranial pressure management.', sources: [cryptococcus],
      },
    ],
  },
  {
    id: 'adult-nsti', title: 'Rapidly progressive limb pain', audience: 'Adult', topic: 'Skin infections',
    initial: 'An adult with diabetes has rapidly worsening leg pain and swelling, fever, dusky skin, hemorrhagic bullae and severe pain with light palpation.',
    takeHome: 'A concerning tempo and disproportionate pain can justify immediate surgical involvement before imaging confirmation.',
    steps: [
      {
        question: 'Which diagnosis must be prioritized?',
        options: [
          ['Simple cellulitis', 'The pace, bullae and disproportionate pain suggest deep involvement beyond uncomplicated cellulitis.'],
          ['Necrotizing soft-tissue infection', 'Rapid progression, systemic illness, severe pain and dusky or bullous skin warrant urgent evaluation for necrotizing infection.'],
          ['Simple abscess', 'A localized purulent collection does not account for this rapidly progressive pattern.'],
        ],
        correct: 1, clue: 'Rapid progression plus disproportionate pain and hemorrhagic bullae.',
        objective: 'Differentiate necrotizing infection red flags from routine cellulitis findings.', sources: [ssti],
      },
      {
        question: 'What should happen before waiting for MRI confirmation?',
        options: [
          ['Obtain immediate surgical consultation and begin resuscitation and broad IV treatment', 'This is a surgical emergency. Begin parallel treatment while arranging prompt surgical assessment and likely source control.'],
          ['Observe on IV antibiotics alone', 'Antibiotics alone are not adequate source control for necrotizing infection.'],
          ['Use a low severity score to rule it out', 'A score cannot override a high-risk clinical presentation or safely defer surgical assessment.'],
        ],
        correct: 0, clue: 'Management urgency is driven by clinical suspicion, not an imaging prerequisite.',
        objective: 'Start parallel surgical and medical management without a diagnostic delay.', sources: [ssti],
      },
      {
        question: 'Which coverage best fits initial empiric treatment pending operative findings and cultures?',
        options: [
          ['Narrow streptococcal coverage alone', 'Initial therapy must cover polymicrobial and monomicrobial possibilities.'],
          ['No antibiotics until definitive cultures', 'Get informative cultures when possible, but do not delay urgent therapy.'],
          ['Broad coverage including MRSA, streptococci, gram-negatives and anaerobes', 'Start broad in suspected necrotizing infection, then tailor therapy to operative findings and microbiology.'],
        ],
        correct: 2, clue: 'At the first decision, the cause may be mixed or monomicrobial.',
        objective: 'Understand why empiric therapy starts broad and narrows after source control and microbiology.', sources: [ssti],
      },
    ],
  },
]

const HISTORY_KEY = 'id-master.cases-2026-11-v1'

function loadHistory(): Record<string, number> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '{}')
    if (typeof parsed !== 'object' || !parsed || Array.isArray(parsed)) return {}
    const byCase = parsed as Record<string, unknown>
    return Object.fromEntries(cases.flatMap(({ id, steps }) => {
      const value = byCase[id]
      return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= steps.length ? [[id, value]] : []
    }))
  } catch {
    return {}
  }
}

export function CasesPage() {
  const [audience, setAudience] = useState<'All' | 'Pediatric' | 'Adult'>('All')
  const [selected, setSelected] = useState<ClinicalCase | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [history, setHistory] = useState(loadHistory)
  const heading = useRef<HTMLHeadingElement>(null)
  const shouldFocus = useRef(false)

  useEffect(() => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)) } catch { /* optional device storage */ }
  }, [history])

  useEffect(() => {
    if (shouldFocus.current) {
      heading.current?.focus()
      shouldFocus.current = false
    }
  }, [selected, step, finished, reviewing])

  const start = (item: ClinicalCase) => {
    shouldFocus.current = true
    setSelected(item); setStep(0); setAnswers([]); setFinished(false); setReviewing(false)
  }
  const backToList = () => {
    shouldFocus.current = true
    setSelected(null)
  }

  if (!selected) return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold tracking-tight md:text-4xl">Clinical Cases</h1>
        <p className="mt-2 text-muted-foreground">Work through each decision as new information arrives.</p>
      </header>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Case audience">
        {(['All', 'Pediatric', 'Adult'] as const).map((scope) => (
          <Button key={scope} type="button" variant={scope === audience ? 'default' : 'outline'}
            aria-pressed={scope === audience} onClick={() => setAudience(scope)}>{scope}</Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.filter((item) => audience === 'All' || item.audience === audience).map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader className="grow">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">{item.audience} · {item.topic}</span>
              <CardTitle className="text-xl leading-tight">{item.title}</CardTitle>
              <CardDescription>
                {item.steps.length} decisions{history[item.id] === undefined ? '' : ` · Best: ${history[item.id]}/${item.steps.length}`}
              </CardDescription>
            </CardHeader>
            <CardContent><Button type="button" aria-label={`Start case: ${item.title}`} onClick={() => start(item)}>Start case</Button></CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const score = selected.steps.filter((decision, i) => answers[i] === decision.correct).length
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Button type="button" variant="outline" onClick={backToList}>All cases</Button>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{selected.audience} · {selected.topic}</p>
        <h1 ref={heading} tabIndex={-1} className="mt-2 text-3xl font-bold tracking-tight">{selected.title}</h1>
        <p className="mt-2 text-muted-foreground">{selected.initial}</p>
      </header>
      {finished ? (
        <Card>
          <CardHeader><CardTitle>Case complete: {score}/{selected.steps.length} correct</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Take-home:</strong> {selected.takeHome}</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => {
                shouldFocus.current = true
                setReviewing(true); setStep(0); setFinished(false)
              }}>Review decisions</Button>
              <Button type="button" variant="outline" onClick={() => start(selected)}>Try again</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-3" aria-label="Current decision">
          <h2 className="text-sm font-semibold">{reviewing ? 'Review' : 'Decision'} {step + 1} of {selected.steps.length}</h2>
          <DecisionCard key={`${selected.id}-${step}-${reviewing}`} decision={selected.steps[step]}
            committed={answers[step]} onCommit={(answer) => setAnswers((previous) => previous.length === step ? [...previous, answer] : previous)}
            nextAction={(
              <Button type="button" onClick={() => {
                shouldFocus.current = true
                if (step === selected.steps.length - 1) {
                  if (!reviewing) setHistory((previous) => ({ ...previous, [selected.id]: Math.max(previous[selected.id] ?? 0, score) }))
                  setFinished(true)
                } else setStep((value) => value + 1)
              }}>
                {step === selected.steps.length - 1 ? 'See case summary' : 'Next decision'}
              </Button>
            )} />
        </section>
      )}
    </div>
  )
}
