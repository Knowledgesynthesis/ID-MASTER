import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const cdc = 'https://www.cdc.gov/std/treatment-guidelines/'
const source = {
  syphilis: cdc + 'syphilis.htm',
  neuro: cdc + 'neurosyphilis.htm',
  tertiary: cdc + 'tertiary-syphilis.htm',
  hpv: 'https://www.cdc.gov/hpv/hcp/vaccination-considerations/',
  pregnancy: cdc + 'syphilis-pregnancy.htm',
  congenital: cdc + 'congenital-syphilis.htm',
  gc: cdc + 'gonorrhea-adults.htm',
  neonatalGc: cdc + 'gonorrhea-neonates.htm',
  ct: cdc + 'chlamydia.htm',
  pid: cdc + 'pid.htm',
  safeguarding: cdc + 'sexual-assault-children.htm',
  hsv: cdc + 'herpes.htm',
  trich: cdc + 'trichomoniasis.htm',
  lgv: cdc + 'lgv.htm',
  screening: cdc + 'screening-recommendations.htm',
  adolescent: cdc + 'adolescents.htm',
}

type Case = {
  prompt: string
  choices: readonly string[]
  correct: number
  explanation: string
  href: string
}

const adultCases: Case[] = [
  {
    prompt: 'An adult has a new painless genital ulcer. A single initial RPR is nonreactive. What is the best interpretation?',
    choices: ['Syphilis is excluded', 'Early syphilis remains possible; evaluate with both test types and the clinical context', 'A negative RPR proves genital herpes'],
    correct: 1,
    explanation: 'One serologic test alone can miss primary syphilis. Use treponemal and nontreponemal testing together, consider lesion testing where available, and use exposure risk and exam to guide presumptive treatment or repeat testing.',
    href: source.syphilis,
  },
  {
    prompt: 'A sexually active 20-year-old with pelvic pain has cervical motion tenderness and no more likely diagnosis on initial evaluation. Cervical GC/CT NAAT is negative. Does this rule out PID?',
    choices: ['Yes, PID requires positive GC or CT', 'Yes, if the patient has no fever', 'No, treat presumptively if criteria are met while assessing alternative diagnoses'],
    correct: 2,
    explanation: 'PID is a clinical diagnosis. Cervical motion, uterine, or adnexal tenderness can meet the minimum exam criterion in an at-risk patient. A negative lower-tract NAAT does not exclude upper-tract infection. Evaluate for ectopic pregnancy and other urgent causes as indicated.',
    href: source.pid,
  },
  {
    prompt: 'A patient received the recommended treatment for uncomplicated pharyngeal gonorrhea. Which follow-up is site-specific?',
    choices: ['Test of cure at 7–14 days', 'No test of cure at any site', 'Only retest if symptoms recur'],
    correct: 0,
    explanation: 'Obtain a test of cure for pharyngeal infection at 7–14 days; a NAAT at 7 days has a higher false-positive risk. Routine test of cure is not needed after recommended therapy for uncomplicated urogenital or rectal gonorrhea. Retest for reinfection at about 3 months regardless of site.',
    href: source.gc,
  },
]

const pediatricCases: Case[] = [
  {
    prompt: 'A well-appearing newborn has an RPR equal to the birthing parent’s titer. The parent had confirmed syphilis and no documented treatment before delivery. What matters most?',
    choices: ['An equal titer excludes congenital infection', 'Run the congenital syphilis pathway; a normal exam or equal titer is not enough to clear the infant', 'Order an infant treponemal antibody alone'],
    correct: 1,
    explanation: 'Interpret the infant’s exam and quantitative serum nontreponemal result using the same test type as the maternal delivery titer. Untreated maternal infection changes the scenario even when the neonatal titer is not fourfold higher. Cord blood and infant treponemal testing are not substitutes.',
    href: source.congenital,
  },
  {
    prompt: 'A prepubertal child has a positive gonorrhea test. What is the safest next step?',
    choices: ['Use standard adult partner-management instructions', 'Repeat a detailed interview before notifying anyone', 'Involve experienced child-protection clinicians promptly and arrange appropriate confirmation and safeguarding'],
    correct: 2,
    explanation: 'Postnatally acquired gonorrhea is strongly indicative of abuse. Take a trauma-informed approach, coordinate specimen confirmation and care with an experienced team, and follow applicable reporting requirements. Do not delay required reporting while awaiting confirmation.',
    href: source.safeguarding,
  },
  {
    prompt: 'A 3-day-old has rapidly progressive purulent conjunctivitis. Which pathway should you consider urgently?',
    choices: ['Neonatal gonococcal ophthalmia: urgent evaluation and systemic treatment if suspected', 'Routine adult conjunctivitis care with drops alone', 'Observe until the next scheduled newborn visit'],
    correct: 0,
    explanation: 'Gonococcal ophthalmia can present in the first days of life and threaten vision. Obtain appropriate microbiology, evaluate for disseminated infection, and follow the neonatal systemic therapy pathway; topical therapy alone is insufficient.',
    href: source.neonatalGc,
  },
]

function Source({ href, children }: { href: string; children: string }) {
  return <a className="text-primary underline underline-offset-4" href={href}>{children}</a>
}

function CaseSet({ cases }: { cases: Case[] }) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const active = cases[index]
  return <div className="space-y-4">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select a case">
      {cases.map((item, i) => <Button size="sm" key={item.prompt} variant={i === index ? 'default' : 'outline'} aria-pressed={i === index} onClick={() => { setIndex(i); setAnswer(null) }}>Case {i + 1}</Button>)}
    </div>
    <p className="font-medium">{active.prompt}</p>
    <div className="grid gap-2" role="group" aria-label="Select an answer">
      {active.choices.map((choice, i) => <Button key={choice} variant={answer === i ? 'default' : 'outline'} className="h-auto min-h-10 justify-start text-left whitespace-normal" aria-pressed={answer === i} onClick={() => setAnswer(i)}>{choice}</Button>)}
    </div>
    {answer !== null && <div className="rounded-md border p-3 space-y-1 text-sm" role="status">
      <p className="font-semibold">{answer === active.correct ? 'Correct' : 'Best answer'}: {active.choices[active.correct]}</p>
      <p>{active.explanation}</p>
      <Source href={active.href}>CDC guidance behind the answer</Source>
    </div>}
  </div>
}

export function STIPage() {
  const [params, setParams] = useSearchParams()
  const pediatric = params.get('audience') === 'pediatric'
  function setAudience(audience: 'adult' | 'pediatric') {
    setParams(previous => { const next = new URLSearchParams(previous); next.set('audience', audience); return next })
  }

  return <div className="space-y-6 max-w-4xl mx-auto">
    <header>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sexually Transmitted Infections</h1>
      <p className="text-muted-foreground mt-2">Choose the right test and follow-up for the exposure, anatomic site, and age.</p>
    </header>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Population">
      <Button variant={!pediatric ? 'default' : 'outline'} aria-pressed={!pediatric} onClick={() => setAudience('adult')}>Adult / adolescent</Button>
      <Button variant={pediatric ? 'default' : 'outline'} aria-pressed={pediatric} onClick={() => setAudience('pediatric')}>Pediatric / neonatal</Button>
    </div>
    <Card>
      <CardHeader><CardTitle>{pediatric ? 'Congenital, neonatal and prepubertal cases' : 'Adult and adolescent decision cases'}</CardTitle><CardDescription>Pick an action before reading the reasoning.</CardDescription></CardHeader>
      <CardContent><CaseSet key={pediatric ? 'pediatric' : 'adult'} cases={pediatric ? pediatricCases : adultCases} /></CardContent>
    </Card>
    {pediatric ? <>
      <Card>
        <CardHeader><CardTitle>Congenital and neonatal clues</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Syphilis:</strong> document the maternal stage, treatment regimen, timing and reinfection risk. Penicillin G is the only proven therapy to treat fetal infection and prevent congenital syphilis during pregnancy. Use the neonatal scenario table for evaluation, treatment and follow-up. <Source href={source.pregnancy}>Pregnancy</Source> · <Source href={source.congenital}>Neonatal management</Source></p>
          <p><strong>Chlamydia:</strong> consider perinatal infection in conjunctivitis within 30 days of birth or afebrile subacute pneumonia at 1–3 months. Eye prophylaxis against gonorrhea does not prevent chlamydial ophthalmia; a symptomatic infant needs evaluation and age-specific systemic therapy when indicated. <Source href={source.ct}>CDC chlamydia in infants</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Prepubertal testing is not adult screening</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Use an experienced, trauma-informed team for examination, specimen selection and interpretation. Some infections can be perinatal or have other explanations; interpretation and reporting depend on the pathogen and circumstances. <Source href={source.safeguarding}>CDC child safeguarding guidance</Source></p>
          <p>For sexually active adolescents, switch to the adult/adolescent track for screening. Do not apply that guidance to prepubertal children.</p>
        </CardContent>
      </Card>
    </> : <>
      <Card>
        <CardHeader><CardTitle>Syphilis: syndrome, serology, stage</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Primary:</strong> classically a painless chancre, but lesions can be multiple, atypical or painful. <strong>Secondary:</strong> systemic illness with findings such as diffuse rash (sometimes palms and soles), mucocutaneous lesions, or lymphadenopathy. <strong>Latent:</strong> reactive serology without manifestations; titer alone does not establish early latent disease. <Source href={source.syphilis}>CDC testing and stages</Source></p>
          <p><strong>Tertiary disease:</strong> gummatous or cardiovascular involvement requires a separate workup. <Source href={source.tertiary}>CDC tertiary syphilis guidance</Source></p>
          <p><strong>Look for eyes, ears and neurologic features at any stage.</strong> Visual or auditory symptoms change the evaluation and management. <Source href={source.neuro}>CDC neurosyphilis, ocular and otic guidance</Source></p>
          <p>Follow quantitative RPR or VDRL with the same test type, preferably in the same laboratory. A fourfold titer change is two dilutions (for example, 1:32 to 1:8). Treponemal tests often remain reactive after treatment and do not measure treatment response. <Source href={source.syphilis}>CDC serology</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>GC/CT: test exposed sites, then close the loop</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Both infections can be asymptomatic or present with urethritis or cervicitis. Discharge appearance does not reliably distinguish them.</p>
          <p>Use site-appropriate NAATs based on exposure and recommendations. If treating gonorrhea and chlamydia has not been excluded, add age- and pregnancy-appropriate chlamydia treatment; do not add it automatically after exclusion. Suspected gonorrhea treatment failure warrants culture and susceptibility testing. <Source href={source.gc}>Gonorrhea</Source> · <Source href={source.ct}>Chlamydia</Source></p>
          <p><strong>Partners:</strong> for gonorrhea and chlamydia, evaluate partners from the 60 days before symptom onset or diagnosis; include the most recent partner even if exposure was earlier. Expedited partner therapy depends on law and clinical context. Retest about 3 months after treatment. <Source href={source.gc}>CDC partner and follow-up guidance</Source></p>
          <p><strong>Adolescent overlap:</strong> screen sexually active women younger than 25 annually for chlamydia and gonorrhea; screen those 25 or older when at increased risk. Other populations have anatomy-, exposure- and risk-based guidance. Provide developmentally appropriate confidential care within local rules. <Source href={source.screening}>Screening table</Source> · <Source href={source.adolescent}>Adolescent guidance</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>PID: reassess after initial treatment</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Reassess if there is no improvement within 72 hours of outpatient treatment. Pregnancy, suspected tubo-ovarian abscess, severe illness, or inability to exclude a surgical emergency are reasons to consider inpatient care. Use the same admission criteria for adolescents and adults. <Source href={source.pid}>CDC PID criteria and follow-up</Source></p>
          <p>Delayed treatment increases the risk of sequelae such as infertility and ectopic pregnancy. Do not wait for definitive microbiology to treat when clinical criteria are met. <Source href={source.pid}>CDC diagnostic threshold</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Other STI testing and prevention pearls</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Genital HSV:</strong> when lesions are present, use a lesion NAAT (or culture if NAAT is unavailable), not routine serologic screening. <Source href={source.hsv}>HSV testing</Source></p>
          <p><strong>Trichomoniasis:</strong> classic discharge or cervical findings are not required. A negative wet mount does not reliably rule it out. <Source href={source.trich}>Testing options</Source></p>
          <p><strong>HPV:</strong> vaccination prevents new infections, not existing lesions. Review routine pediatric and adolescent vaccination, catch-up through age 26, and shared decision-making for selected adults aged 27–45. <Source href={source.hpv}>CDC HPV vaccination</Source></p>
          <p><strong>LGV:</strong> proctocolitis can dominate the presentation; a recalled transient ulcer is not required. <Source href={source.lgv}>CDC LGV guidance</Source></p>
        </CardContent>
      </Card>
    </>}
  </div>
}
