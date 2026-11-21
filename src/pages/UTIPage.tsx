import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const adultCuti = 'https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/'
const adultAsb = 'https://www.idsociety.org/practice-guideline/asymptomatic-bacteriuria/'
const adultCystitis = 'https://www.cdc.gov/antibiotic-use/hcp/clinical-care/adult-outpatient.html'
const aapUti = 'https://doi.org/10.1542/peds.2026-078565'
const aapAlgorithms = 'https://www.aap.org/en/patient-care/urinary-tract-infection-clinical-practice-guideline/algorithms-for-the-diagnosis-and-treatment-of-urinary-tract-infection-in-children-eight-days-to-five-years-of-age/'
const febrileInfant = 'https://doi.org/10.1542/peds.2021-052228'
const citationClass = 'text-primary underline underline-offset-2'

const exercises = {
  adult: [
    {
      label: 'Lower urinary symptoms',
      stem: 'A healthy nonpregnant 25-year-old woman has new dysuria, frequency, positive nitrites and pyuria. She has no fever, flank tenderness or systemic symptoms.',
      options: ['Acute uncomplicated cystitis is likely', 'Pyelonephritis is likely', 'This is asymptomatic bacteriuria'],
      correct: 0,
      explanation: 'The symptoms localize to the bladder, and the urinalysis supports the clinical impression. Pyuria or nitrites alone would not diagnose symptomatic UTI without this context.',
      source: adultCystitis,
      sourceLabel: 'CDC adult outpatient guidance',
    },
    {
      label: 'Fever and flank pain',
      stem: 'A 49-year-old with dysuria has fever, chills and flank tenderness. They are hemodynamically stable. What does the presentation suggest?',
      options: ['Bladder-confined cystitis', 'Possible pyelonephritis: evaluate and send a urine culture', 'Asymptomatic bacteriuria'],
      correct: 1,
      explanation: 'Fever and flank tenderness suggest infection beyond the bladder. Obtain a culture, assess severity and obstruction risk, and choose an agent that penetrates the involved tissue; nitrofurantoin is not a pyelonephritis agent.',
      source: adultCuti,
      sourceLabel: 'IDSA complicated UTI guideline (2025)',
    },
    {
      label: 'Positive culture without symptoms',
      stem: 'An afebrile 71-year-old nonpregnant adult has no urinary symptoms or systemic signs of infection. An incidental urine culture grows E. coli. There is no planned urologic procedure.',
      options: ['Do not treat the culture in this scenario', 'Treat with an oral antibiotic', 'Treat as pyelonephritis'],
      correct: 0,
      explanation: 'Bacteriuria alone, with or without pyuria, does not diagnose symptomatic UTI. Pregnancy and endoscopic urologic procedures with mucosal trauma are key exceptions.',
      source: adultAsb,
      sourceLabel: 'IDSA asymptomatic bacteriuria guideline (2019)',
    },
    {
      label: 'Prenatal culture',
      stem: 'At a prenatal visit, a pregnant adult with no urinary symptoms has a properly collected screening culture that grows 100,000 CFU/mL of E. coli.',
      options: ['Manage as pyelonephritis', 'Review and treat confirmed asymptomatic bacteriuria using pregnancy-specific guidance', 'Ignore because there is no dysuria'],
      correct: 1,
      explanation: 'Pregnancy is a key exception to the usual rule against treating asymptomatic bacteriuria. Use culture-directed treatment appropriate for pregnancy.',
      source: adultAsb,
      sourceLabel: 'IDSA asymptomatic bacteriuria guideline (2019)',
    },
  ],
  pediatric: [
    {
      label: 'Positive bag screen',
      stem: 'An otherwise well 10-month-old with fever to 39.3°C and no obvious source has a bag urine screen with 1+ leukocyte esterase. What is the next specimen step?',
      options: ['Culture the bag urine', 'Obtain catheter urine for urinalysis and culture', 'Do not obtain a culture unless leukocyte esterase reaches 2+'],
      correct: 1,
      explanation: 'In the AAP 2–24 month pathway, 1+ leukocyte esterase meets the screening threshold for a catheter specimen. A bag sample may screen but cannot confirm UTI. The threshold for presumptive antibiotics in this stable age group is higher than the screening threshold for culture.',
      source: aapAlgorithms,
      sourceLabel: 'AAP UTI algorithm, figure 2 (2026)',
    },
    {
      label: 'Lower catheter colony count',
      stem: 'A 15-month-old has a first febrile UTI presentation. A pre-antibiotic catheter sample has 18 white blood cells per high-power field and grows 20,000 CFU/mL of E. coli alone.',
      options: ['The UA and catheter culture meet the AAP diagnostic thresholds', 'The culture is too low: every catheter sample needs 50,000 CFU/mL', 'The findings can only be interpreted with a positive bag culture'],
      correct: 0,
      explanation: 'With qualifying urinalysis inflammation, ≥10,000 CFU/mL of one uropathogen in catheter urine supports the diagnosis in this context. Clean-catch thresholds differ. Use the culture to narrow therapy and plan renal and bladder ultrasound for a first febrile UTI in a child younger than 5.',
      source: aapUti,
      sourceLabel: 'AAP UTI guideline, table 1 and key action statement 4 (2026)',
    },
    {
      label: 'Febrile infant',
      stem: 'A well-appearing term infant at 19 days of age has a rectal temperature of 38.2°C and a catheter urinalysis with pyuria. Does the urinalysis complete the fever evaluation?',
      options: ['Yes: a urinary source rules out invasive infection', 'No: continue the age-specific febrile infant evaluation', 'Yes: use the outpatient pathway for otherwise well toddlers'],
      correct: 1,
      explanation: 'The febrile infant pathway still applies. For an eligible 19-day-old, this includes blood and CSF evaluation, parenteral antibiotics and inpatient monitoring; a positive UA does not remove those steps.',
      source: febrileInfant,
      sourceLabel: 'AAP well-appearing febrile infant guideline, 8–21 day pathway (2021)',
    },
  ],
}

export function UTIPage() {
  const [params, setParams] = useSearchParams()
  const audience = params.get('audience')
  const population = audience === 'pediatric' ? 'pediatric' : 'adult'
  return (
    <UTIContent key={population} population={population} onPopulationChange={(next) => {
      if (next === audience) return
      const nextParams = new URLSearchParams(params)
      nextParams.set('audience', next)
      setParams(nextParams, { replace: next === population })
    }} />
  )
}

function UTIContent({ population, onPopulationChange }: {
  population: 'adult' | 'pediatric'
  onPopulationChange: (population: 'adult' | 'pediatric') => void
}) {
  const [caseIndex, setCaseIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const adult = population === 'adult'
  const currentCase = exercises[population][caseIndex]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">UTI &amp; Pyelonephritis</h1>
        <p className="text-muted-foreground mt-2">
          Compare bladder infection, pyelonephritis and bacteriuria.
        </p>
      </header>

      <div role="group" aria-label="UTI population" className="flex flex-wrap gap-2">
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
          <CardTitle>{adult ? 'Adults: site and severity matter' : 'Children: age and specimen matter'}</CardTitle>
          <CardDescription>
            {adult ? (
              <a className={citationClass} href={adultCuti}>IDSA complicated UTI guideline (2025)</a>
            ) : (
              <><a className={citationClass} href={aapUti}>AAP UTI guideline (2026)</a> · <a className={citationClass} href={aapAlgorithms}>Age-specific algorithms</a></>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {adult ? (
            <>
              <p><strong>Bladder-confined symptoms.</strong> Dysuria, frequency or urgency without fever, flank pain or systemic illness can suggest cystitis. For acute uncomplicated cystitis in otherwise healthy nonpregnant premenopausal women, <a className={citationClass} href={adultCystitis}>CDC outpatient guidance</a> lists nitrofurantoin, trimethoprim-sulfamethoxazole if local resistance is below 20%, and fosfomycin as first-line options. This list is not a pyelonephritis regimen.</p>
              <p><strong>Possible infection beyond the bladder.</strong> Fever, chills, flank pain or systemic illness prompt assessment for pyelonephritis, sepsis and obstruction. The IDSA 2025 classification emphasizes clinical evidence of extension beyond the bladder, not sex alone. Obtain a urine culture and tailor empiric therapy to severity, prior cultures and resistance risk, patient factors, and a relevant local antibiogram when septic.</p>
              <p><strong>Narrow and reassess.</strong> Narrow to culture-directed effective therapy and consider an oral switch when improving and an effective oral agent is available. For many clinically improving patients with complicated UTI, IDSA conditionally suggests 5–7 days with a fluoroquinolone or 7 days with a non-fluoroquinolone, counted from the first day of effective therapy. Individualize when evidence is limited, such as severe sepsis, abscess, obstruction or suspected prostatitis.</p>
              <p><strong>Read the urinalysis in context.</strong> Pyuria and leukocyte esterase indicate inflammation, not necessarily infection. Nitrite positivity supports bacteriuria; a negative nitrite does not rule out UTI. A positive culture can also reflect colonization or contamination.</p>
              <p><strong>Bacteriuria is not enough.</strong> Do not treat asymptomatic bacteriuria routinely. Key exceptions are pregnancy and endoscopic urologic procedures with mucosal trauma. See the <a className={citationClass} href={adultAsb}>IDSA asymptomatic bacteriuria guideline</a> for special populations.</p>
            </>
          ) : (
            <>
              <p><strong>Scope.</strong> The 2026 AAP guideline covers children from 8 days to 5 years and its routine diagnostic scenarios focus on medically noncomplex children. It does not use race as a risk factor. Expedite evaluation for ill appearance, concern for pyelonephritis or known urinary tract abnormalities; do not apply a stable outpatient pathway to these presentations.</p>
              <p><strong>8–60 days with fever.</strong> Use the <a className={citationClass} href={febrileInfant}>AAP febrile infant guideline</a> if eligible; suspected UTI does not replace evaluation for invasive bacterial infection. In the AAP infant UTI pathway, ≥5 white blood cells per high-power field (WBC/hpf) or trace or greater leukocyte esterase (LE) meets the inflammatory threshold. Confirm with catheter or suprapubic urine culture as directed by the age-specific pathway.</p>
              <p><strong>2–24 months and older preschoolers.</strong> Evaluate for UTI in young children with fever without a source and in older children reporting urinary symptoms. In the specified well-appearing 2-month-to-5-year scenarios, ≥5 WBC/hpf or ≥1+ LE prompts culture; ≥10 WBC/hpf or ≥2+ LE supports presumptive antibiotics. Use catheter urine for culture in the 2–24 month algorithm; clean catch or catheter urine is appropriate in the older symptomatic group. Never culture a bag specimen to confirm UTI.</p>
              <p><strong>Interpret culture in context.</strong> With qualifying inflammation and a single uropathogen, the catheter threshold is ≥10,000 colony-forming units per mL and the clean-catch threshold is ≥100,000. Review pending cultures promptly and narrow or stop empiric treatment as indicated; a culture collected after antibiotics needs particular caution.</p>
              <p><strong>Treatment and follow-up.</strong> The guideline conditionally favors 3–5 days for low-risk afebrile cystitis at age 2 years or older and 5–7 days for selected low-risk febrile UTIs. Young infants and children with bacteremia, urinary anomalies or poor response may need longer. The AAP suggests starting parenteral therapy in infants aged 8–28 days, with early transition when appropriate; use the full febrile infant pathway for disposition. In children younger than 5 with a first febrile UTI, obtain renal and bladder ultrasound; do not routinely obtain a voiding cystourethrogram after a normal ultrasound unless risk factors or recurrence warrant it.</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice: choose the next step</CardTitle>
          <CardDescription>Identify the right action for each synthetic scenario.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div role="group" aria-label="UTI practice case" className="flex flex-wrap gap-2">
            {exercises[population].map(({ label }, index) => (
              <Button key={label} type="button" aria-pressed={caseIndex === index}
                variant={caseIndex === index ? 'default' : 'outline'}
                onClick={() => { setCaseIndex(index); setAnswer(null) }}>
                {label}
              </Button>
            ))}
          </div>
          <p>{currentCase.stem}</p>
          <div role="group" aria-label="Next step" className="grid gap-2">
            {currentCase.options.map((label, index) => (
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
                  {answer === currentCase.correct ? 'Correct' : 'Best answer'}: {currentCase.options[currentCase.correct]}
                </p>
                <p className="text-sm">{currentCase.explanation}</p>
                <a className={`text-sm ${citationClass}`} href={currentCase.source}>{currentCase.sourceLabel}</a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
