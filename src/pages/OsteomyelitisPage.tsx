import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const bone = 'https://www.idsociety.org/practice-guideline/bone-and-joint-infections---osteomyelitis/'
const arthritis = 'https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/'
const sanjo = 'https://jbji.copernicus.org/articles/8/29/2023/'
const spine = 'https://www.idsociety.org/practice-guideline/vertebral-osteomyelitis/'
const foot = 'https://www.idsociety.org/practice-guideline/diabetic-foot-infections/'

const cases = [
  {
    audience: 'Pediatric',
    stem: 'A stable 2-year-old has fever, refusal to bear weight, severe pain with passive hip movement, and a hip effusion on ultrasound. What is the next diagnostic step?',
    choices: [
      ['Repeat ultrasound in a week', 'Ultrasound detects fluid, not its cause. The presentation needs urgent joint assessment.'],
      ['Draw blood cultures and arrange urgent aspiration', 'Correct. In a stable child, obtain blood cultures and promptly sample the joint before antibiotics when feasible. If the child becomes ill or disease progresses quickly, do not wait for aspiration to start therapy.'],
      ['Treat as transient synovitis based on age', 'Age does not separate transient synovitis from bacterial arthritis. Fever and refusal to bear weight are concerning.'],
    ],
    answer: 1,
    source: arthritis,
  },
  {
    audience: 'Adult',
    stem: 'An adult has new focal back pain two weeks after S. aureus bloodstream infection. Plain spinal films are unrevealing. Which study best evaluates possible vertebral osteomyelitis?',
    choices: [
      ['Spine MRI', 'Correct. Recent S. aureus bacteremia and focal back pain raise suspicion even with normal plain films. New neurologic deficits warrant emergency evaluation for compression.'],
      ['Repeat plain films alone', 'Early plain films may miss vertebral infection. Do not rely on them when suspicion remains high.'],
      ['No further workup without fever', 'Vertebral osteomyelitis can present without fever. Recent bacteremia changes the pretest probability.'],
    ],
    answer: 0,
    source: spine,
  },
] as const

function Source({ href, children }: { href: string; children: string }) {
  return <a href={href} className="text-primary underline underline-offset-2">{children}</a>
}

export function OsteomyelitisPage() {
  const [params] = useSearchParams()
  return <OsteomyelitisLesson key={params.get('audience')} initialCase={params.get('audience') === 'adult' ? 1 : 0} />
}

function OsteomyelitisLesson({ initialCase }: { initialCase: number }) {
  const [active, setActive] = useState(initialCase)
  const [selected, setSelected] = useState<number | null>(null)
  const current = cases[active]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Osteomyelitis &amp; septic arthritis</h1>
        <p className="mt-2 text-muted-foreground">Localize bone versus joint, get the right specimens, and match duration to the syndrome.</p>
      </header>
      <Card>
        <CardHeader><CardTitle>Localize first · All ages</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Bone:</strong> focal bony pain or tenderness, refusal to bear weight in children, or back pain after bacteremia in adults. Ask whether infection spread hematogenously, through a wound, or after surgery or trauma. Adjacent bone and joint infection can coexist.</p>
          <p><strong>Joint:</strong> an acutely painful joint with marked pain on passive motion raises concern for bacterial arthritis. Do not use a single synovial white-count threshold to make or exclude the diagnosis. Crystals can coexist with infection.</p>
          <p><strong>Urgency:</strong> involve orthopedics early for a suspected infected joint. Obtain cultures first if feasible, but do not wait for sampling or imaging to start treatment when the patient is ill-appearing, septic, or deteriorating.</p>
          <p><Source href={arthritis}>PIDS/IDSA pediatric arthritis guideline (2023)</Source> · <Source href={sanjo}>SANJO native-joint guideline (2023)</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Pediatric · Acute hematogenous bone and native joint infection</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <section className="space-y-2">
            <h3 className="font-semibold">Suspected acute hematogenous osteomyelitis</h3>
            <p>Get blood cultures and a baseline CRP; follow the clinical response and CRP trend. Plain radiographs can help find alternatives but can be normal early. Use MRI when further imaging is needed to define disease or complications. <em>S. aureus</em> is the main empiric target; consider MRSA based on local susceptibility and patient factors.</p>
            <p>For uncomplicated, responding <em>S. aureus</em> disease, the guideline suggests <strong>3–4 weeks total</strong>; complications and some organisms need longer. Transition to active, tolerated oral therapy when clinically appropriate rather than defaulting to prolonged IV access.</p>
            <p><Source href={bone}>PIDS/IDSA pediatric acute hematogenous osteomyelitis guideline (2021)</Source></p>
          </section>
          <section className="space-y-2 border-t pt-4">
            <h3 className="font-semibold">Suspected acute bacterial arthritis</h3>
            <p>Ultrasound can detect a deep effusion, especially at the hip or shoulder. In a stable child, obtain blood and prompt synovial cultures before antibiotics when feasible. Use MRI when adjacent osteomyelitis or deep infection is a concern. In children <strong>6–48 months</strong>, consider empiric <em>Kingella kingae</em> activity in addition to staphylococcal coverage.</p>
            <p>In primary bacterial arthritis <strong>without adjacent osteomyelitis</strong>, a rapid clinical response and falling CRP by the end of week one may support <strong>10–14 days total</strong> for common pathogens. Slow response, inadequate source control, certain pathogens, or adjacent bone infection change the plan.</p>
            <p>Neonates need a separate age-specific approach; do not extrapolate these courses or empiric choices to them.</p>
            <p><Source href={arthritis}>PIDS/IDSA pediatric guideline: imaging, aspiration, age and duration (2023)</Source></p>
          </section>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Adult · Spine, native joint and diabetes-related foot infection</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Native vertebral osteomyelitis:</strong> new focal back pain and recent bacteremia merit spine MRI and blood cultures. A compatible MRI and recent <em>S. aureus</em> bacteremia often establish the cause without biopsy. New neurologic deficits or hemodynamic instability require urgent action. Most bacterial cases receive six weeks of antimicrobial therapy. <Source href={spine}>IDSA native vertebral osteomyelitis guideline (2015)</Source></p>
          <p><strong>Native septic arthritis:</strong> promptly aspirate and send fluid for culture, cell count/differential and crystals as appropriate. A count &gt;50,000 cells/µL supports the diagnosis but does not confirm it; &lt;25,000 cells/µL does not exclude it. A prosthetic joint has a separate diagnostic pathway. <Source href={sanjo}>SANJO native-joint guideline (2023)</Source></p>
          <p><strong>Diabetes-related foot osteomyelitis:</strong> start with the clinical exam, probe-to-bone, plain radiographs and inflammatory markers as appropriate. Get MRI if uncertainty remains; when obtaining culture for suspected bone infection, bone sampling is preferred to a superficial swab. <Source href={foot}>IWGDF/IDSA foot infection guideline (2023)</Source></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Choose the next diagnostic move</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex flex-wrap gap-2">
            {cases.map((item, index) => <Button key={item.audience} variant={active === index ? 'default' : 'outline'} aria-pressed={active === index} onClick={() => { setActive(index); setSelected(null) }}>{item.audience} case</Button>)}
          </div>
          <p className="font-medium">{current.stem}</p>
          <div className="grid gap-2">
            {current.choices.map(([choice], index) => <Button key={choice} variant="outline" className="h-auto min-h-10 justify-start whitespace-normal py-2 text-left" aria-pressed={selected === index} onClick={() => setSelected(index)}>{choice}</Button>)}
          </div>
          <div aria-live="polite">
            {selected !== null && <div className="space-y-2 rounded-lg border bg-muted p-3">
              <p>{current.choices[selected][1]}</p>
              {selected === current.answer && <p><Source href={current.source}>Read the source recommendation</Source></p>}
            </div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
