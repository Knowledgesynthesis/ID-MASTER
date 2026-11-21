import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const oi = 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/'
const pediatricOi = 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-pediatric-opportunistic-infections/pneumocycstis-jirovecii-pneumonia'
const infantTesting = 'https://clinicalinfo.hiv.gov/en/guidelines/pediatric-arv/diagnosis-hiv-infection-infants-and-children'
const art = 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/what-start-initial-combination-regimens'

const patterns = [
  { name: 'Oropharyngeal / esophageal candidiasis', range: 'Often below 200', cutoff: 200, clue: 'Thrush suggests oropharyngeal disease; odynophagia raises concern for esophageal involvement.', action: 'Routine primary antifungal prophylaxis is not recommended.', url: oi + 'candidiasis' },
  { name: 'Pneumocystis pneumonia (PCP)', range: 'Often below 200', cutoff: 200, clue: 'Subacute dyspnea, dry cough and fever are typical; CD4 does not diagnose PCP.', url: oi + 'prophylaxis-prevent-first-episode' },
  { name: 'Toxoplasma encephalitis', range: 'Risk rises below 100', cutoff: 100, clue: 'Consider with compatible neurologic findings; the primary prevention decision also depends on Toxoplasma IgG.', url: oi + 'prophylaxis-prevent-first-episode' },
  { name: 'Cryptococcosis', range: 'Risk rises below 100', cutoff: 100, clue: 'Subacute headache or altered mental status needs urgent evaluation, not a screening-only pathway.', action: 'No routine primary fluconazole in the U.S. without a positive serum cryptococcal antigen. In newly diagnosed asymptomatic HIV, the U.S. guideline recommends serum CrAg screening at CD4 ≤200, particularly ≤50.', url: oi + 'cryptococcosis' },
  { name: 'Disseminated MAC', range: 'Risk rises below 50', cutoff: 50, clue: 'Fever, weight loss and night sweats are possible; rule out disseminated MAC before starting prophylaxis.', url: oi + 'prophylaxis-prevent-first-episode' },
  { name: 'Cytomegalovirus end-organ disease', range: 'Risk rises below 50', cutoff: 50, clue: 'New floaters, visual field loss or reduced acuity in advanced HIV warrant urgent eye assessment.', action: 'Do not give primary valganciclovir prophylaxis, even if blood CMV DNA is detectable.', url: oi + 'cytomegalovirus' },
]

export function HIVPage() {
  const [params, setParams] = useSearchParams()
  const audience = params.get('audience') === 'pediatric' ? 'pediatric' : 'adult'
  function setAudience(value: 'adult' | 'pediatric') {
    setParams(previous => { const next = new URLSearchParams(previous); next.set('audience', value === 'pediatric' ? 'pediatric' : 'adult'); return next })
  }
  const [cd4, setCd4] = useState(150)
  const [artStatus, setArtStatus] = useState<'starting' | 'suppressed' | 'viremic'>('starting')
  const [toxo, setToxo] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [childAnswer, setChildAnswer] = useState<string | null>(null)

  const pcp = artStatus === 'starting' ? cd4 < 200 : cd4 < 100 || (cd4 <= 200 && artStatus === 'viremic')
  const toxoProphylaxis = cd4 < 100 && toxo
  const activePatterns = patterns.filter(pattern => cd4 < pattern.cutoff)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">HIV Management</h1>
        <p className="text-muted-foreground mt-2">Use CD4 to reason about risk, then check what actually changes prevention.</p>
      </header>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Population">
        <Button aria-pressed={audience === 'adult'} variant={audience === 'adult' ? 'default' : 'outline'} onClick={() => setAudience('adult')}>Adult / adolescent</Button>
        <Button aria-pressed={audience === 'pediatric'} variant={audience === 'pediatric' ? 'default' : 'outline'} onClick={() => setAudience('pediatric')}>Pediatric / perinatal</Button>
      </div>

      {audience === 'adult' ? (
        <Card>
          <CardHeader>
            <CardTitle>CD4 ladder</CardTitle>
            <CardDescription>Adult / adolescent patterns. This illustrates primary prevention of selected infections, not diagnosis or decisions about stopping prophylaxis already in use.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="hiv-cd4" className="font-medium">CD4 count: {cd4} cells/µL</label>
              <input id="hiv-cd4" type="range" min="0" max="800" step="1" value={cd4} onChange={e => setCd4(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex flex-wrap gap-2" role="group" aria-label="CD4 shortcuts">
                {[49, 50, 99, 100, 199, 200, 350].map(value => <Button key={value} size="sm" variant="outline" aria-pressed={cd4 === value} onClick={() => setCd4(value)}>{value}</Button>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="grid gap-1">
                <label htmlFor="hiv-art" className="text-sm font-medium">ART / viral load</label>
                <select id="hiv-art" value={artStatus} onChange={e => setArtStatus(e.target.value as typeof artStatus)} className="rounded-md border bg-background p-2 text-sm">
                  <option value="starting">Not on ART or starting ART</option>
                  <option value="suppressed">On ART, sustained suppression</option>
                  <option value="viremic">On ART, consistently detectable HIV RNA</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={toxo} onChange={e => setToxo(e.target.checked)} /> Toxoplasma IgG positive</label>
            </div>
            <Button aria-expanded={reveal} aria-controls="hiv-prevention" variant="outline" onClick={() => setReveal(!reveal)}>{reveal ? 'Hide' : 'Check'} prevention decisions</Button>
            <div id="hiv-prevention" hidden={!reveal} className="rounded-lg border p-4 space-y-2 text-sm" aria-live="polite">
              <p><strong>PCP:</strong> {pcp ? 'Primary prophylaxis indicated; TMP-SMX is preferred when appropriate.' : 'No new prophylaxis indication from these inputs; stopping existing prophylaxis uses separate criteria.'}</p>
              <p><strong>Toxoplasma:</strong> {toxoProphylaxis ? 'Primary prophylaxis indicated; TMP-SMX can cover both toxoplasmosis and PCP.' : 'The combination of IgG positivity and CD4 below 100 is not present.'}</p>
              <p><strong>MAC:</strong> {cd4 < 50 ? 'Do not add primary prophylaxis if effective ART is being started immediately. If off ART without immediate initiation, persistently viremic on ART, or without a fully suppressive option, assess for prophylaxis after excluding active MAC.' : 'The CD4 threshold below 50 for primary prevention is not met.'}</p>
              <a className="underline underline-offset-4 text-primary" href={oi + 'prophylaxis-prevent-first-episode'}>NIH adult/adolescent OI prophylaxis table</a>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Selected risk patterns at this count</h3>
              {activePatterns.length === 0 && <p className="text-sm text-muted-foreground">No selected teaching pattern is highlighted. The slider cannot rule out any infection; severe immunosuppression is not required for every OI.</p>}
              {activePatterns.map(pattern => <div key={pattern.name} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">{pattern.name} <span className="text-xs text-muted-foreground">· {pattern.range}</span></p>
                <p className="mt-1">{pattern.clue}</p>
                {reveal && pattern.action && <p className="mt-1">{pattern.action}</p>}
                <a href={pattern.url} className="mt-1 inline-block text-primary underline underline-offset-4">NIH source</a>
              </div>)}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Perinatal exposure: age changes the test</CardTitle>
            <CardDescription>Objective: distinguish early infant diagnosis and PCP prevention from the adult CD4 framework.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>A 5-week-old has perinatal HIV exposure. Which test type is used to diagnose HIV at this age?</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Infant HIV testing question">
              {['HIV nucleic acid testing (NAT)', 'Routine HIV antigen/antibody screening'].map(answer => <Button key={answer} variant={childAnswer === answer ? 'default' : 'outline'} className="h-auto min-h-10 whitespace-normal text-left" aria-pressed={childAnswer === answer} onClick={() => setChildAnswer(answer)}>{answer}</Button>)}
            </div>
            {childAnswer && <div className="rounded-lg border p-3" role="status">
              <p className="font-semibold">{childAnswer.includes('NAT') ? 'Correct: use a virologic assay.' : 'Not at this age: use a virologic assay.'}</p>
              <p>Transferred maternal antibody can persist, so use HIV NAT for diagnostic testing in perinatally exposed infants younger than 18 months. Timing and exclusion criteria depend on infant antiretrovirals and ongoing exposure, including breastfeeding.</p>
            </div>}
            <p><strong>PCP prevention:</strong> Infants with HIV receive prophylaxis from age 4–6 weeks through 12 months, regardless of CD4. For exposed infants whose infection cannot be presumptively excluded at 4–6 weeks, assess prophylaxis with the pediatric HIV team.</p>
            <p>With confirmed HIV, the primary prophylaxis cutoff is CD4 below 500 cells/µL at age 1 to under 6 years and below 200 at age 6 years or older. If a count is unavailable, use CD4 below 22% or 14%, respectively. Stopping prophylaxis has separate age- and ART-based criteria.</p>
            <div className="flex flex-wrap gap-3"><a className="text-primary underline underline-offset-4" href={infantTesting}>NIH infant testing</a><a className="text-primary underline underline-offset-4" href={pediatricOi}>NIH pediatric PCP</a></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Antiretroviral therapy and follow-up</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Shared principle:</strong> ART is recommended for people with HIV. Monitor viral load, immune status, adherence, interactions and adverse effects. CD4 count is not a gate for initiating ART.</p>
          <p><strong>Adult / adolescent:</strong> Most people start an oral second-generation integrase inhibitor with one or two nucleos(t)ide reverse-transcriptase inhibitors, depending on regimen eligibility. Resistance, prior PrEP, HBV coinfection, pregnancy and interactions can change the choice. <a className="text-primary underline" href={art}>NIH initial regimens</a></p>
          <p><strong>Pediatric:</strong> Age, weight, formulation, treatment history and resistance matter. Neonatal treatment and prevention for an exposed infant have separate pathways. <a className="text-primary underline" href="https://clinicalinfo.hiv.gov/en/guidelines/pediatric-arv/regimens-recommended-initial-therapy-antiretroviral-naive-children">NIH pediatric initial therapy</a></p>
          <p><strong>U=U:</strong> maintaining an HIV RNA below 200 copies/mL on ART prevents sexual transmission. Use another prevention method for at least the first six months of ART and until suppression has been documented. This is not a breastfeeding recommendation. <a className="text-primary underline" href="https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/arv-therapy-as-prevention">NIH treatment as prevention</a></p>
          <p><strong>Mechanisms:</strong> NRTIs and NNRTIs inhibit reverse transcription by different routes; INSTIs block viral DNA integration; protease inhibitors prevent viral maturation. These are selected classes, not alternatives that can be swapped without checking the regimen. <a className="text-primary underline" href={art}>NIH drug classes</a></p>
          <p><strong>IRIS:</strong> New or worsening inflammatory symptoms after ART can unmask or worsen an OI, but do not assume IRIS without evaluating alternatives. Some CNS infections change ART timing. <a className="text-primary underline" href={oi + 'cryptococcosis'}>NIH cryptococcosis timing</a></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent exposure: act before the PEP window closes</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Shared principle:</strong> after a substantial nonoccupational exposure, urgently assess whether postexposure prophylaxis (nPEP) is indicated. Start as soon as possible when indicated, no later than 72 hours; do not wait for pending laboratory results. The usual course is 28 days.</p>
          <p><strong>Pediatric distinction:</strong> pediatric regimens depend on age and weight. Perinatal exposure at birth is a different prevention pathway, not routine nPEP. <a className="text-primary underline" href="https://www.cdc.gov/mmwr/volumes/74/rr/rr7401a1.htm">CDC nPEP regimens and follow-up</a></p>
        </CardContent>
      </Card>
    </div>
  )
}
