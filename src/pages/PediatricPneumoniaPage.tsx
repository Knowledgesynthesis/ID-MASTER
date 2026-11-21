import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const sources = {
  outpatient: { name: 'CHOP clinical pathway · revised June 2026', href: 'https://www.chop.edu/clinical-pathway/pneumonia-community-acquired-clinical-pathway' },
  duration: { name: 'SCOUT-CAP randomized trial · 2022', href: 'https://pubmed.ncbi.nlm.nih.gov/35040920/' },
  effusion: { name: 'IDSA/PIDS effusion and empyema guidance · 2026', href: 'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-in-infants-and-children/' },
}

const decisions = [
  {
    title: 'Mild outpatient illness',
    scenario: 'A previously healthy 3-year-old has rhinorrhea, cough, and diffuse wheeze. SpO₂ is 97% on room air, hydration is adequate, and there is no focal finding or other evidence of bacterial pneumonia.',
    options: ['Manage supportively and give clear return precautions', 'Order a routine chest X-ray to distinguish viral from bacterial disease', 'Start antibiotics because of preschool age'],
    correct: 0,
    clue: 'Stable oxygenation and diffuse viral features without focal findings.',
    why: ['Supportive care is appropriate when bacterial pneumonia is not suspected.', 'Routine chest radiography is not needed in mild outpatient disease and cannot reliably determine etiology.', 'Preschool age does not make bacterial pneumonia more likely.'],
    source: sources.outpatient,
  },
  {
    title: 'Early recovery on therapy',
    scenario: 'A previously healthy 4-year-old was treated with oral amoxicillin for nonsevere outpatient CAP. Fever resolved promptly, breathing is comfortable, and symptoms have improved by day 5. There is no evidence of a complication.',
    options: ['Automatically continue to 10 days', 'Consider completing the course at 5 days', 'Switch to broader coverage to prevent recurrence'],
    correct: 1,
    clue: 'This child matches the trial’s age, outpatient severity and early-response criteria.',
    why: ['Longer courses are not automatic in early responders with nonsevere illness.', 'SCOUT-CAP compared a 5-day strategy with 10 days in otherwise healthy children 6–71 months who improved early.', 'Broader therapy is not indicated solely because the child is recovering.'],
    source: sources.duration,
  },
  {
    title: 'New respiratory distress',
    scenario: 'A 7-year-old hospitalized with pneumonia has increasing oxygen needs. Chest radiography shows a moderate pleural effusion, and the child is in respiratory distress.',
    options: ['Assume this is an uncomplicated course', 'Use routine chest CT first despite readily available ultrasound', 'Characterize with ultrasound and promptly involve the team that can drain the effusion'],
    correct: 2,
    clue: 'Moderate effusion with respiratory distress is different from a small, uncomplicated effusion.',
    why: ['Escalating oxygen support and an effusion warrant evaluation for complicated pneumonia.', 'The guideline conditionally prefers ultrasound over CT or MRI for a moderate-to-large effusion visible on radiography.', 'The guidance recommends drainage for moderate effusion with respiratory distress, a large effusion or frank purulence.'],
    source: sources.effusion,
  },
]

export function PediatricPneumoniaPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const item = decisions[current]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="text-sm font-semibold text-primary">Pediatric</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Community-acquired pneumonia</h1>
        <p className="mt-2 text-muted-foreground">Separate a stable outpatient presentation from a child who needs respiratory support or evaluation for a complication.</p>
      </header>
      <Card>
        <CardHeader><CardTitle>Three decisions that change care</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p><strong>Setting first.</strong> Assess oxygenation, work of breathing, oral intake and the ability to follow up. Sustained hypoxemia, significant distress, or inability to maintain hydration changes the disposition. Do not apply this outpatient approach to young febrile infants, or generalize it to immunocompromised children. <a className="text-primary underline" href={sources.outpatient.href}>{sources.outpatient.name}</a></p>
          <p><strong>Use clinical response to guide duration.</strong> A short course is supported for otherwise healthy young outpatients with early improvement. Persistent fever, worsening work of breathing or a new oxygen requirement means reassess rather than automatically extending the same drug. The short-course trial did not establish duration for severe disease, empyema or late responders. <a className="text-primary underline" href={sources.duration.href}>{sources.duration.name}</a></p>
          <p><strong>Effusion size and breathing matter.</strong> Small uncomplicated effusions can usually be observed without drainage. When drainage is indicated for empyema, chest tube plus fibrinolytic therapy is a conditional first-line choice in most cases; local specialists guide escalation. This 2026 update is scoped to effusion and empyema in children older than 3 months, not all pneumonia. <a className="text-primary underline" href={sources.effusion.href}>{sources.effusion.name}</a></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Practice the distinction</CardTitle><CardDescription>Choose a case and commit before checking the rationale.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div role="group" aria-label="Pneumonia cases" className="flex flex-wrap gap-2">
            {decisions.map(({ title }, index) => (
              <Button key={title} type="button" aria-pressed={current === index} variant={current === index ? 'default' : 'outline'} onClick={() => {
                if (current !== index) { setCurrent(index); setSelected(null) }
              }}>{title}</Button>
            ))}
          </div>
          <p>{item.scenario}</p>
          <div role="group" aria-label="Choose the next step" className="grid gap-2">
            {item.options.map((option, index) => (
              <Button key={option} type="button" aria-pressed={selected === index} disabled={selected !== null}
                variant={selected === index ? 'default' : 'outline'}
                className="h-auto min-h-11 justify-start whitespace-normal text-left"
                onClick={() => setSelected(index)}>{option}</Button>
            ))}
          </div>
          <div aria-live="polite">
            {selected !== null && (
              <div className="space-y-2 rounded-lg border bg-muted/40 p-4 text-sm">
                <p className="font-semibold">{selected === item.correct ? 'Correct' : 'Best answer'}: {item.options[item.correct]}</p>
                <p><strong>Decisive clue:</strong> {item.clue}</p>
                <ul className="list-disc space-y-1 pl-5">{item.why.map((why) => <li key={why}>{why}</li>)}</ul>
                <a className="inline-block text-primary underline" href={item.source.href}>{item.source.name}</a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
