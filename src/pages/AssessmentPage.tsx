import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export type Audience = 'Adult' | 'Pediatric' | 'Shared'

export interface Decision {
  question: string
  options: ReadonlyArray<readonly [answer: string, rationale: string]>
  correct: number
  clue: string
  objective: string
  sources: ReadonlyArray<readonly [label: string, url: string]>
}

interface Question extends Decision {
  id: string
  audience: Audience
  topic: string
}

const strep = ['CDC: Group A strep pharyngitis', 'https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html'] as const
const pediatricUti = ['AAP 2026 pediatric UTI guideline', 'https://doi.org/10.1542/peds.2026-078565'] as const
const adultSepsis = ['Surviving Sepsis Campaign: Adults (2026)', 'https://doi.org/10.1097/CCM.0000000000007075'] as const
const pediatricSepsis = ['Surviving Sepsis Campaign: Children (2026)', 'https://doi.org/10.1097/PCC.0000000000003927'] as const
const bone = ['PIDS/IDSA pediatric osteomyelitis guideline', 'https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/'] as const

const questions: readonly Question[] = [
  {
    id: 'strep-child', audience: 'Pediatric', topic: 'Pharyngitis',
    question: 'An 8-year-old with fever and tonsillar exudate has no cough, rhinorrhea or oral ulcers. The group A strep rapid antigen test is negative. What next?',
    options: [
      ['No backup testing', 'A negative antigen test can miss GAS in children; this is not the routine adult branch.'],
      ['Back up the antigen result with a throat culture', 'In symptomatic school-age children, culture can identify GAS missed by an antigen test. Arrange follow-up if it is positive.'],
      ['Start empiric antibiotics without culture', 'In this uncomplicated presentation, obtain confirmation rather than treating a negative test.'],
    ],
    correct: 1, clue: 'School-age child + negative antigen test (not a molecular assay).',
    objective: 'Apply the pediatric backup-culture branch and plan a reliable result callback.', sources: [strep],
  },
  {
    id: 'strep-adult', audience: 'Adult', topic: 'Pharyngitis',
    question: 'A 28-year-old with the same compatible exam and no complicating features has a negative group A strep rapid antigen test. What next?',
    options: [
      ['Do not routinely get a backup throat culture', 'After a negative antigen test, routine backup culture is not indicated in adults.'],
      ['Order a backup throat culture in every case', 'That is the routine branch for symptomatic children, not adults.'],
      ['Give antibiotics for presumed GAS', 'Antibiotics are not recommended for an uncomplicated adult presentation with a negative RADT.'],
    ],
    correct: 0, clue: 'Only the age changed. This is an adult with a negative antigen test.',
    objective: 'Distinguish adult from pediatric follow-up after a negative GAS antigen test.', sources: [strep],
  },
  {
    id: 'sepsis-definition', audience: 'Adult', topic: 'Sepsis',
    question: 'An adult with sepsis remains hypotensive after adequate volume resuscitation. Which additional findings fulfill the adult Sepsis-3 clinical criteria for septic shock?',
    options: [
      ['A brief low blood pressure with rapid recovery and no vasopressor need', 'Transient hypotension alone does not fulfill the criteria.'],
      ['Elevated lactate without a vasopressor requirement', 'Elevated lactate alone is insufficient and can have other causes.'],
      ['Vasopressors needed to maintain MAP ≥65 mm Hg and lactate >2 mmol/L', 'Both findings, after adequate volume resuscitation, identify the Sepsis-3 shock construct.'],
    ],
    correct: 2, clue: 'Persistent vasopressor requirement and lactate greater than, not equal to, 2.',
    objective: 'Recognize adult Sepsis-3 criteria without making them a prerequisite for treatment.',
    sources: [['Sepsis-3 consensus definitions', 'https://pubmed.ncbi.nlm.nih.gov/26903338/']],
  },
  {
    id: 'hiv-pcp', audience: 'Adult', topic: 'HIV',
    question: 'An adult with newly diagnosed HIV and a CD4 count of 165 cells/mm³ is starting antiretroviral therapy (ART). Is primary Pneumocystis pneumonia prophylaxis indicated?',
    options: [
      ['Yes', 'NIH recommends primary prophylaxis at CD4 <200 for adults/adolescents not on ART or starting ART.'],
      ['No, wait until CD4 <100', 'That threshold is one of the rules for people already on ART; it is not the only threshold and does not apply here.'],
      ['No, ART alone immediately eliminates the risk', 'Starting ART does not immediately restore immune function.'],
    ],
    correct: 0, clue: 'The patient is starting ART, not already on it with suppressed HIV RNA.',
    objective: 'Check ART status as well as CD4 count when applying adult/adolescent prophylaxis guidance.',
    sources: [['NIH: Pneumocystis pneumonia', 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis']],
  },
  {
    id: 'hbv-panel', audience: 'Adult', topic: 'Hepatitis B',
    question: 'An adult has negative HBsAg, positive total anti-HBc, and positive anti-HBs. What does this pattern indicate?',
    options: [
      ['Acute hepatitis B', 'The usual acute pattern includes detectable HBsAg and IgM anti-HBc.'],
      ['Resolved natural infection', 'Total anti-HBc reflects previous exposure; anti-HBs with negative HBsAg fits resolved infection. Reactivation remains possible with immunosuppression.'],
      ['Immunity from vaccination alone', 'Vaccination does not induce anti-HBc, so this is not the vaccine-only pattern.'],
    ],
    correct: 1, clue: 'Anti-HBc is the marker vaccination alone does not produce.',
    objective: 'Distinguish naturally resolved HBV from vaccine-only immunity on the triple panel.',
    sources: [['CDC: HBV testing and interpretation', 'https://www.cdc.gov/hepatitis-b/hcp/diagnosis-testing/']],
  },
  {
    id: 'duke-criteria', audience: 'Shared', topic: 'Endocarditis',
    question: 'Using the published 2023 Duke-ISCVID clinical criteria, which combination meets the “definite infective endocarditis” classification?',
    options: [
      ['Three minor criteria', 'This can meet the possible, not definite, clinical classification.'],
      ['One major plus two minor criteria', 'This does not satisfy the original 2023 definite clinical threshold.'],
      ['Two major criteria', 'Definite clinical classification: two major, one major with three minor, or five minor. Separate pathological routes also exist.'],
    ],
    correct: 2, clue: 'Count independent criteria, not repeated findings within a criterion.',
    objective: 'Use the original 2023 classification without treating it as a stand-alone rule-out.',
    sources: [['2023 Duke-ISCVID criteria', 'https://doi.org/10.1093/cid/ciad271']],
  },
  {
    id: 'bone-mri', audience: 'Pediatric', topic: 'Bone & joint',
    question: 'A child has focal bone pain and fever. Initial radiographs are unrevealing and additional imaging is needed to evaluate suspected acute hematogenous osteomyelitis. Which modality is preferred?',
    options: [
      ['MRI', 'MRI is preferred when advanced imaging is needed, including when evaluating extent and possible collections.'],
      ['Repeat plain radiographs alone to exclude it', 'Radiographs are useful first but can be normal early.'],
      ['Ultrasound alone', 'Ultrasound can assess effusions or superficial collections but does not replace MRI for marrow evaluation.'],
    ],
    correct: 0, clue: 'The question asks for additional imaging, not the initial study.',
    objective: 'Separate the initial radiograph from the preferred advanced study when indicated.',
    sources: [bone],
  },
  {
    id: 'nec-fasciitis-sign', audience: 'Shared', topic: 'Skin infections',
    question: 'A rapidly progressing soft-tissue infection has modest surface changes. Which finding most raises concern for a necrotizing infection?',
    options: [
      ['Warmth and mild tenderness alone', 'These are common in superficial infection and do not by themselves suggest fascial involvement.'],
      ['Severe pain out of proportion to surface findings', 'Disproportionate pain is a red flag, especially with rapid progression. It is not a stand-alone test and its absence does not exclude disease.'],
      ['Mild uniform erythema alone', 'Simple erythema is nonspecific; clinical trajectory and toxicity matter.'],
    ],
    correct: 1, clue: 'The pace and depth of pain do not match the visible findings.',
    objective: 'Escalate suspected necrotizing infection without waiting for a single definitive sign.',
    sources: [['IDSA: Skin and soft-tissue infections', 'https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/']],
  },
  {
    id: 'syphilis-stage', audience: 'Adult', topic: 'STIs',
    question: 'An adult has a new painless, indurated genital ulcer, no generalized rash, and reactive treponemal and nontreponemal tests. What stage best fits the presentation?',
    options: [
      ['Primary syphilis', 'A chancre at the inoculation site is characteristic. Serology supports the diagnosis; clinical findings help stage it.'],
      ['Secondary syphilis', 'A generalized rash, mucocutaneous lesions or lymphadenopathy would be more typical.'],
      ['Latent syphilis', 'Latent disease lacks clinical manifestations; this patient has an active lesion.'],
    ],
    correct: 0, clue: 'A new localized chancre, not the titer, is the staging clue.',
    objective: 'Stage syphilis using the clinical picture together with appropriate testing.',
    sources: [['CDC: STI treatment guidelines, syphilis', 'https://www.cdc.gov/std/treatment-guidelines/syphilis.htm']],
  },
  {
    id: 'adult-upper-uti', audience: 'Adult', topic: 'UTI',
    question: 'An adult with dysuria and pyuria also has fever, rigors and new flank pain. What best distinguishes this from localized cystitis?',
    options: [
      ['Pyuria alone', 'Pyuria can accompany either lower or upper urinary infection.'],
      ['Dysuria alone', 'Dysuria does not localize infection to the kidneys.'],
      ['Systemic symptoms and flank pain', 'This pattern raises concern for infection beyond the bladder, including pyelonephritis.'],
    ],
    correct: 2, clue: 'Fever and flank pain matter more for localization than a single urinalysis sign.',
    objective: 'Recognize an adult UTI pattern that warrants evaluation for upper tract or systemic involvement.',
    sources: [['IDSA 2025 complicated UTI guideline', 'https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/']],
  },
  {
    id: 'peds-uti-stop', audience: 'Pediatric', topic: 'UTI',
    question: 'A well 3-year-old on empiric antibiotics for suspected UTI has a final negative urine culture from an adequate specimen collected before antibiotics. There is no other reason for antibiotics. What is appropriate after reassessment?',
    options: [
      ['Finish the course because the dipstick was abnormal', 'An abnormal screen alone does not establish UTI when an adequate pre-treatment culture is negative.'],
      ['Stop empiric UTI antibiotics', 'AAP advises stopping after a negative culture unless the specimen followed antibiotic exposure.'],
      ['Broaden empiric treatment for a resistant organism', 'A negative pre-treatment culture is not evidence of resistance.'],
    ],
    correct: 1, clue: 'The specimen was adequate and collected before antibiotic exposure.',
    objective: 'Close the loop on a pending culture instead of automatically completing empiric therapy.',
    sources: [pediatricUti],
  },
  {
    id: 'hiv-viral-load', audience: 'Adult', topic: 'HIV',
    question: 'In an adult receiving effective ART, what defines optimal HIV RNA suppression?',
    options: [
      ['A confirmed value below the assay detection limit', 'Optimal suppression is confirmed HIV RNA below the test’s detection limit.'],
      ['Any value below 1,000 copies/mL', 'A value below 1,000 is too high as a treatment goal.'],
      ['A detectable value below 200 copies/mL is always optimal', 'The threshold used for virologic failure differs from the goal of optimal suppression.'],
    ],
    correct: 0, clue: 'Optimal suppression is distinct from the threshold used to define virologic failure.',
    objective: 'Read an HIV RNA report against the assay and the relevant clinical threshold.',
    sources: [['NIH: HIV RNA and CD4 monitoring', 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/plasma-hiv-1-rna-cd4-monitoring']],
  },
  {
    id: 'peds-sepsis-without-shock', audience: 'Pediatric', topic: 'Sepsis',
    question: 'A 9-year-old has probable sepsis without signs of shock. After a rapid evaluation, concern for sepsis remains. What is the pediatric antibiotic approach?',
    options: [
      ['Begin promptly after the rapid evaluation, ideally within three hours of recognizing sepsis', 'The pediatric guideline suggests a time-limited evaluation when shock is absent; if sepsis is substantiated, start antibiotics as soon as possible.'],
      ['Observe until the child becomes hypotensive', 'Sepsis without shock still warrants timely treatment once substantiated.'],
      ['Wait until the three-hour mark even if sepsis is already substantiated', 'Three hours is not a waiting period or reason to postpone therapy after evaluation.'],
    ],
    correct: 0, clue: 'Probable sepsis, but no shock; concern persists after a rapid evaluation.',
    objective: 'Apply the pediatric non-shock timing recommendation without misreading it as permission to delay.', sources: [pediatricSepsis],
  },
  {
    id: 'adult-sepsis-without-shock', audience: 'Adult', topic: 'Sepsis',
    question: 'A 55-year-old has probable bacterial sepsis with new organ dysfunction, but no shock. What timing does the adult guideline recommend?',
    options: [
      ['Wait for microbiologic confirmation', 'Probable sepsis warrants action without waiting for cultures to grow.'],
      ['Start immediately, ideally within one hour of recognition', 'The adult guideline applies this timing to probable or definite sepsis even without shock.'],
      ['Use the time-limited three-hour investigation pathway for all non-shock patients', 'The adult three-hour pathway is for possible sepsis without shock, not probable or definite sepsis.'],
    ],
    correct: 1, clue: 'In the adult guideline, probable sepsis is not the same as possible sepsis.',
    objective: 'Match adult antibiotic timing to both shock status and likelihood of infection.', sources: [adultSepsis],
  },
  {
    id: 'hbv-exposure-newborn', audience: 'Pediatric', topic: 'Hepatitis B',
    question: 'A newborn weighs 3.2 kg and the birthing parent is HBsAg-positive. Which approach protects against perinatal hepatitis B?',
    options: [
      ['Hepatitis B vaccine and HBIG within 12 hours, at separate injection sites', 'An exposed newborn needs active and passive prophylaxis promptly. Complete the vaccine series and arrange recommended post-vaccination testing.'],
      ['HBIG alone', 'Passive immunity does not replace vaccination.'],
      ['Wait until the first well-child visit to decide', 'Known exposure requires prompt prophylaxis, not routine outpatient timing.'],
    ],
    correct: 0, clue: 'Maternal HBsAg is positive; this is known perinatal exposure.',
    objective: 'Distinguish urgent perinatal prophylaxis from routine newborn vaccination timing.',
    sources: [['CDC: Perinatal hepatitis B vaccine administration', 'https://www.cdc.gov/hepatitis-b/hcp/perinatal-provider-overview/vaccine-administration.html']],
  },
  {
    id: 'shock-antibiotics', audience: 'Shared', topic: 'Sepsis',
    question: 'A child or adult has suspected septic shock. What is the initial antimicrobial priority in the 2026 Surviving Sepsis Campaign guidance?',
    options: [
      ['Wait for a positive blood culture first', 'Confirmation can take hours or days; shock requires urgent empiric treatment.'],
      ['Begin as soon as possible, ideally within one hour of recognition', 'Both guidelines prioritize prompt empiric therapy for suspected shock; obtain cultures first only if this will not materially delay treatment.'],
      ['Use a three-hour window to observe suspected shock', 'The time-limited evaluation pathway applies in selected non-shock presentations, not suspected shock.'],
    ],
    correct: 1, clue: 'Shock, not an uncertain low-likelihood presentation without shock.',
    objective: 'Identify the shared urgency while avoiding a culture or testing delay.',
    sources: [adultSepsis, pediatricSepsis],
  },
]

/** The same commit-then-explain interaction is used in assessment and unfolding cases. */
export function DecisionCard({ decision, committed, onCommit, nextAction }: {
  decision: Decision
  committed?: number
  onCommit: (answer: number) => void
  nextAction?: ReactNode
}) {
  const group = useId()
  const [candidate, setCandidate] = useState<number | null>(null)
  const feedback = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (committed !== undefined && candidate !== null) feedback.current?.focus()
  }, [committed, candidate])

  return (
    <Card data-decision-state={committed === undefined ? 'open' : 'committed'}>
      <CardContent className="space-y-5 pt-6">
        <form className="space-y-4" onSubmit={(event) => {
          event.preventDefault()
          if (committed === undefined && candidate !== null) onCommit(candidate)
        }}>
          <fieldset className="space-y-3" disabled={committed !== undefined}>
            <legend className="mb-3 text-lg font-semibold leading-snug">{decision.question}</legend>
            {decision.options.map(([answer], index) => (
              <label key={answer} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-input p-3 hover:bg-muted focus-within:ring-2 focus-within:ring-ring">
                <input className="mt-1 h-4 w-4 shrink-0" type="radio" name={group} value={index}
                  checked={(committed ?? candidate) === index} onChange={() => setCandidate(index)} />
                <span>{answer}</span>
              </label>
            ))}
          </fieldset>
          {committed === undefined && <Button type="submit" disabled={candidate === null}>Check answer</Button>}
        </form>
        {committed !== undefined && (
          <div tabIndex={-1} ref={feedback} className="space-y-4 rounded-lg border bg-muted/40 p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <h3 className="text-lg font-semibold">{committed === decision.correct ? 'Correct' : 'Not quite'}</h3>
            <p><strong>Decisive clue:</strong> {decision.clue}</p>
            <ul className="space-y-2">
              {decision.options.map(([answer, rationale], index) => (
                <li key={answer} className="text-sm leading-relaxed">
                  <strong>{index === decision.correct ? 'Best answer' : index === committed ? 'Your answer' : 'Alternative'}: {answer}.</strong> {rationale}
                </li>
              ))}
            </ul>
            <p className="text-sm"><strong>Objective:</strong> {decision.objective}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Evidence">
              {decision.sources.map(([label, url]) => <li key={url}><a className="font-medium text-primary underline underline-offset-4" href={url}>{label}</a></li>)}
            </ul>
          </div>
        )}
        {committed !== undefined && nextAction}
      </CardContent>
    </Card>
  )
}

const STORAGE_KEY = 'id-master.assessment-2026-11-v1'
type Answers = Record<string, number>

function loadAnswers(): Answers {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (typeof parsed !== 'object' || !parsed || Array.isArray(parsed)) return {}
    const source = parsed as Record<string, unknown>
    return Object.fromEntries(questions.flatMap(({ id, options }) => {
      const answer = source[id]
      return typeof answer === 'number' && Number.isInteger(answer) && answer >= 0 && answer < options.length ? [[id, answer]] : []
    }))
  } catch {
    return {}
  }
}

export function AssessmentPage() {
  const [audience, setAudience] = useState<Audience | 'All'>('All')
  const [topic, setTopic] = useState('All')
  const [index, setIndex] = useState(0)
  const [revision, setRevision] = useState(0)
  const [answers, setAnswers] = useState<Answers>(loadAnswers)
  const heading = useRef<HTMLHeadingElement>(null)
  const navigationChanged = useRef(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)) } catch { /* optional device storage */ }
  }, [answers])

  useEffect(() => {
    if (navigationChanged.current) {
      heading.current?.focus()
      navigationChanged.current = false
    }
  }, [audience, topic, index, revision])

  const population = questions.filter((q) => audience === 'All' || q.audience === audience)
  const topics = ['All', ...new Set(population.map((q) => q.topic))]
  const shown = population.filter((q) => topic === 'All' || q.topic === topic)
  const current = shown[index]
  const attempted = shown.filter((q) => answers[q.id] !== undefined).length
  const correctCount = shown.filter((q) => answers[q.id] === q.correct).length
  const missed = shown.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct)
  const goTo = (position: number) => {
    if (position < 0 || position >= shown.length || position === index) return
    navigationChanged.current = true
    setIndex(position)
  }

  const retryMissed = () => {
    if (!missed.length) return
    const next = { ...answers }
    missed.forEach(({ id }) => delete next[id])
    navigationChanged.current = true
    setAnswers(next)
    setIndex(shown.findIndex(({ id }) => id === missed[0].id))
    setRevision((n) => n + 1)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Assessment</h1>
        <p className="mt-2 text-muted-foreground">Choose an answer before reading the reasoning. Retry the decisions you missed.</p>
      </header>
      <Card>
        <CardHeader><CardDescription>Filter by audience or topic. Attempts are kept on this device when storage is available.</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <label className="flex min-w-36 flex-col gap-1 text-sm font-medium">
            Audience
            <select value={audience} onChange={(e) => {
              setAudience(e.target.value as Audience | 'All'); setTopic('All'); setIndex(0)
            }} className="h-10 rounded-md border border-input bg-background px-2">
              {(['All', 'Pediatric', 'Adult', 'Shared'] as const).map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="flex min-w-36 flex-col gap-1 text-sm font-medium">
            Topic
            <select value={topic} onChange={(e) => { setTopic(e.target.value); setIndex(0) }}
              className="h-10 rounded-md border border-input bg-background px-2">
              {topics.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <p role="status" className="self-center text-sm text-muted-foreground">{attempted}/{shown.length} answered · {correctCount} correct</p>
          {missed.length > 0 && <Button type="button" variant="outline" onClick={retryMissed}>Retry missed ({missed.length})</Button>}
        </CardContent>
      </Card>

      {current ? (
        <section className="space-y-3" aria-label="Current question">
          <h2 ref={heading} tabIndex={-1} className="rounded-sm text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring">
            Question {index + 1} of {shown.length} · {current.audience} · {current.topic}
          </h2>
          <DecisionCard key={`${current.id}-${revision}`} decision={current} committed={answers[current.id]}
            onCommit={(answer) => setAnswers((previous) => previous[current.id] === undefined ? { ...previous, [current.id]: answer } : previous)} />
          <nav aria-label="Question navigation" className="flex flex-wrap justify-between gap-3">
            <Button type="button" variant="outline" disabled={index === 0} onClick={() => goTo(index - 1)}>Previous question</Button>
            <Button type="button" disabled={index >= shown.length - 1} onClick={() => goTo(index + 1)}>Next question</Button>
          </nav>
        </section>
      ) : <p>No questions match these filters.</p>}
    </div>
  )
}
