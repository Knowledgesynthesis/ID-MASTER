import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const duke = 'https://www.iscvid.org/wp-content/uploads/2023/07/2023-The-2023-Duke-ISCVID-Criteria-for-Infective-Endocarditis-Fowler-CID-May-4-2023-Final.pdf'
const pediatric = 'https://pubmed.ncbi.nlm.nih.gov/41466172/'
const aha = 'https://professional.heart.org/en/science-news/infective-endocarditis-diagnosis-antibiotic-therapy-and-management'
const sab = 'https://www.idsociety.org/practice-guideline/staphylococcus-aureus-bacteremia'
const esc = 'https://academic.oup.com/eurheartj/article/44/39/3948/7243107'
const cultureNegative = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12132861/'

const criteria = [
  { id: 'micro', type: 'major', name: 'Qualifying microbiology', detail: 'Usually ≥2 positive sets for a typical organism or ≥3 for an organism that rarely causes IE. Specific molecular and serologic results also qualify. Typical organisms depend on whether intracardiac prosthetic material is present.' },
  { id: 'imaging', type: 'major', name: 'Qualifying cardiac imaging', detail: 'Examples: vegetation, abscess, significant new regurgitation on echocardiography or new prosthetic valve dehiscence. FDG-PET/CT has site and timing requirements.' },
  { id: 'surgical', type: 'major', name: 'Qualifying surgical inspection', detail: 'Direct evidence during surgery when major imaging criteria and subsequent tissue confirmation are absent.' },
  { id: 'risk', type: 'minor', name: 'Predisposition', detail: 'Examples: prior IE, selected congenital lesions, prior valve repair or replacement, intracardiac device, or injection drug use.' },
  { id: 'fever', type: 'minor', name: 'Documented fever >38°C', detail: 'Count the documented temperature, not chills alone.' },
  { id: 'vascular', type: 'minor', name: 'Vascular phenomenon', detail: 'Examples: embolic stroke, septic pulmonary infarcts, splenic abscess or Janeway lesions.' },
  { id: 'immune', type: 'minor', name: 'Immunologic phenomenon', detail: 'Examples: Osler nodes, Roth spots, positive rheumatoid factor or immune complex glomerulonephritis.' },
  { id: 'minorMicro', type: 'minor', name: 'Microbiology below major threshold', detail: 'Use the source table for qualifying findings; do not count the same evidence toward both categories.' },
  { id: 'minorImaging', type: 'minor', name: 'Early postimplant FDG-PET/CT finding', detail: 'Qualifying uptake involving implanted material within three months. See the source table for exact anatomic criteria.' },
  { id: 'exam', type: 'minor', name: 'New regurgitation on auscultation', detail: 'Counts when echocardiography is unavailable; a changed preexisting murmur is insufficient.' },
] as const

type Criterion = (typeof criteria)[number]['id']

function Source({ href, children }: { href: string; children: string }) {
  return <a href={href} className="text-primary underline underline-offset-2">{children}</a>
}

export function EndocarditisPage() {
  const [selected, setSelected] = useState<Criterion[]>([])
  const [resultRevealed, setResultRevealed] = useState(false)
  const major = criteria.filter(rule => rule.type === 'major' && selected.includes(rule.id)).length
  const minor = criteria.filter(rule => rule.type === 'minor' && selected.includes(rule.id)).length
  const result = major >= 2 || (major === 1 && minor >= 3) || minor >= 5
    ? 'Definite by clinical criteria'
    : (major === 1 && minor >= 1) || minor >= 3
      ? 'Possible by clinical criteria'
      : 'Below the possible threshold'
  function toggle(id: Criterion) {
    setResultRevealed(false)
    setSelected(current => current.includes(id)
      ? current.filter(item => item !== id)
      : [...current.filter(item => !(id === 'imaging' && item === 'surgical')), id])
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Infective endocarditis</h1>
        <p className="mt-2 text-muted-foreground">Recognize the risk, get meaningful cultures and imaging, and know when a negative study is not enough.</p>
      </header>
      <Card>
        <CardHeader><CardTitle>First decisions · All ages</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Suspect it:</strong> unexplained persistent bacteremia or fever plus a susceptible cardiac substrate, new valve dysfunction, or an embolic finding. <em>S. aureus</em> bacteremia should prompt evaluation for an endovascular source; clues include metastatic pain, new conduction changes, or emboli.</p>
          <p><strong>Culture before therapy when feasible:</strong> obtain separate sets with appropriate volumes; do not delay urgent treatment in an unstable patient. Prior antibiotics are a common reason for negative cultures. Tell the lab what you suspect and work with ID on targeted testing when cultures remain negative.</p>
          <p><strong>Escalate early:</strong> new heart failure, persistent infection despite appropriate therapy, suspected perivalvular extension, or significant embolic risk warrants early discussion with an endocarditis team and cardiac surgery.</p>
          <p><Source href={aha}>AHA endocarditis statement (2026)</Source> · <Source href={cultureNegative}>AHA culture-negative statement (2025)</Source></p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Pediatric · Congenital and postoperative risk</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Ask about congenital heart disease, previous valve repair/replacement, conduits, and central access. Central-line bacteremia can have an endovascular source but a central line alone does not count as a Duke predisposition category.</p>
            <p>In children with S. aureus bacteremia, obtain transthoracic echo when there is structural heart disease, prolonged bacteremia, or endocarditis findings. Complex postoperative anatomy, prosthetic material, inadequate windows, or continuing concern after a negative study warrant pediatric cardiology input on repeat or transesophageal imaging.</p>
            <p><Source href={pediatric}>Pediatric congenital heart disease guideline (2025)</Source> · <Source href={sab}>IDSA/ESCMID bacteremia consensus (2026)</Source></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Adult · Native valve vs prosthetic/device</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Consider native-valve disease with bloodstream infection by <em>S. aureus</em>, oral streptococci or <em>E. faecalis</em>. Prosthetic and device infections can also involve organisms commonly dismissed as contaminants; interpret the species, culture pattern and device context together.</p>
            <p>Start with transthoracic echo when endocarditis is suspected. Transesophageal echo is often needed for prosthetic valves, devices, suspected complications, or continuing suspicion despite an initial negative transthoracic study. Cardiac CT and FDG-PET/CT can help in selected cases.</p>
            <p><Source href={esc}>ESC imaging and management guidance (2023)</Source> · <Source href={duke}>Duke-ISCVID organism definitions</Source></p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Practice the 2023 Duke-ISCVID criteria</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>Select categories that already meet <Source href={duke}>Table 2 definitions</Source>. Count each category once. This exercise shows the clinical combinations, not the separate pathologic criteria or a clinical rule-out.</p>
          <details className="rounded-lg border px-3 py-2">
            <summary className="cursor-pointer font-medium">Try a case: fever after valve replacement</summary>
            <p className="mt-2">An adult with a prosthetic valve has a temperature of 38.6°C and two separately obtained blood culture sets positive for <em>S. aureus</em>. The first transthoracic study does not identify a vegetation. Select the qualifying categories below before checking the classification.</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-primary">Reveal the reasoning</summary>
              <p className="mt-1">One major (microbiology) plus two minor (predisposition and fever) gives possible IE. A negative transthoracic study does not exclude prosthetic-valve disease. Transesophageal echo and early team involvement are appropriate. <Source href={aha}>AHA endocarditis statement (2026)</Source></p>
            </details>
          </details>
          {(['major', 'minor'] as const).map(type => (
            <fieldset key={type} className="space-y-2">
              <legend className="mb-1 font-semibold capitalize">{type} categories</legend>
              {criteria.filter(rule => rule.type === type).map(rule => (
                <label key={rule.id} className="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2">
                  <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" checked={selected.includes(rule.id)} onChange={() => toggle(rule.id)} disabled={rule.id === 'surgical' && selected.includes('imaging')} />
                  <span><span className="block font-medium">{rule.name}</span><span className="text-muted-foreground">{rule.detail}</span></span>
                </label>
              ))}
            </fieldset>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setResultRevealed(true)}>Check classification</Button>
            <Button variant="outline" onClick={() => { setSelected([]); setResultRevealed(false) }}>Reset</Button>
          </div>
          <div aria-live="polite">
            {resultRevealed && (
              <div className="space-y-1 rounded-lg border bg-muted p-3">
                <p className="font-semibold">{result} · {major} major, {minor} minor</p>
                <p>Definite: 2 major, 1 major + 3 minor, or 5 minor. Possible: 1 major + 1 minor or 3 minor, if definite criteria are not met. Persistent suspicion still needs reassessment even below the possible threshold.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
