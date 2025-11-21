import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface STICase {
  id: number
  presentation: string
  labFindings: string[]
  diagnosis: string
  notes: string
}

const stiCases: STICase[] = [
  {
    id: 1,
    presentation: 'Painless genital ulcer with firm borders',
    labFindings: ['RPR: Positive (1:32)', 'FTA-ABS: Positive', 'Darkfield microscopy: Spirochetes visible'],
    diagnosis: 'Primary Syphilis',
    notes:
      'Classic painless chancre. Both non-treponemal (RPR/VDRL) and treponemal (FTA-ABS/TP-PA) tests positive in primary syphilis.',
  },
  {
    id: 2,
    presentation: 'Diffuse maculopapular rash including palms and soles',
    labFindings: ['RPR: Positive (1:128)', 'FTA-ABS: Positive', 'History of painless ulcer 6 weeks ago'],
    diagnosis: 'Secondary Syphilis',
    notes:
      'Systemic manifestations with characteristic rash. High RPR titers common. May have condyloma lata, mucous patches.',
  },
  {
    id: 3,
    presentation: 'Mucopurulent cervicitis on exam',
    labFindings: [
      'NAAT: Positive for Chlamydia trachomatis',
      'NAAT: Positive for Neisseria gonorrhoeae',
      'Urine pregnancy test: Negative',
    ],
    diagnosis: 'Chlamydia & Gonorrhea Co-infection',
    notes:
      'Common co-infection requiring treatment for both. Always test for both simultaneously. Screen for other STIs.',
  },
  {
    id: 4,
    presentation: 'Profuse frothy yellow-green vaginal discharge with odor',
    labFindings: ['Wet mount: Motile trichomonads', 'pH > 4.5', 'Strawberry cervix on exam'],
    diagnosis: 'Trichomoniasis',
    notes:
      'Trichomonas vaginalis infection. Treat patient and partner(s). Associated with increased HIV transmission risk.',
  },
]

export function STIPage() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const currentCase = stiCases[selectedCase]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Sexually Transmitted Infections
        </h1>
        <p className="text-muted-foreground mt-2">
          Syphilis, chlamydia, gonorrhea, and more
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive STI Pattern Matcher</CardTitle>
          <CardDescription>
            Practice recognizing common STI presentations and test patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {stiCases.map((c, idx) => (
              <Button
                key={c.id}
                variant={selectedCase === idx ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedCase(idx)
                  setShowDiagnosis(false)
                }}
              >
                Case {c.id}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 border-2 rounded-lg">
              <p className="font-semibold mb-2">Clinical Presentation:</p>
              <p className="text-muted-foreground">{currentCase.presentation}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Laboratory Findings:</p>
              <div className="space-y-2">
                {currentCase.labFindings.map((finding, idx) => (
                  <div key={idx} className="p-2 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setShowDiagnosis(!showDiagnosis)}
              className="w-full md:w-auto"
            >
              {showDiagnosis ? 'Hide' : 'Show'} Diagnosis & Notes
            </Button>

            {showDiagnosis && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
                <p className="font-semibold text-lg">{currentCase.diagnosis}</p>
                <p className="text-sm text-muted-foreground">{currentCase.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Syphilis - Stages & Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Clinical Stages</h3>
            <div className="space-y-2">
              {[
                {
                  stage: 'Primary Syphilis',
                  timing: '10-90 days post-exposure',
                  features: 'Painless chancre (ulcer) at inoculation site, regional lymphadenopathy',
                },
                {
                  stage: 'Secondary Syphilis',
                  timing: '4-10 weeks after chancre',
                  features:
                    'Disseminated infection: rash (palms/soles), condyloma lata, mucous patches, lymphadenopathy, constitutional symptoms',
                },
                {
                  stage: 'Latent Syphilis',
                  timing: 'After secondary symptoms resolve',
                  features:
                    'Early latent (<1 year): recently acquired. Late latent (>1 year): longer duration. No symptoms but positive serology.',
                },
                {
                  stage: 'Tertiary Syphilis',
                  timing: 'Years to decades later',
                  features: 'Cardiovascular (aortitis), gummatous (granulomas), neurosyphilis',
                },
              ].map((item) => (
                <div key={item.stage} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{item.stage}</p>
                    <span className="text-xs text-muted-foreground">{item.timing}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.features}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Syphilis Testing Strategy</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-blue-500/10">
                <p className="font-medium text-sm">Non-Treponemal Tests (Screening)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">RPR, VDRL:</span> Detect antibodies to cardiolipin.
                  Quantitative titers useful for monitoring treatment response. May have false
                  positives (pregnancy, autoimmune disease). Decline after treatment.
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-blue-500/10">
                <p className="font-medium text-sm">Treponemal Tests (Confirmatory)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">FTA-ABS, TP-PA:</span> Detect specific antibodies to
                  T. pallidum. Remain positive for life (scar). Used to confirm positive RPR/VDRL.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Interpretation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active syphilis: Both non-treponemal and treponemal tests positive with appropriate
                  clinical context. Treated/past syphilis: Treponemal positive, non-treponemal may be
                  negative or low titer.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chlamydia & Gonorrhea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Clinical Presentations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Chlamydia trachomatis</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Often asymptomatic (especially women)</li>
                  <li>Urethritis, cervicitis</li>
                  <li>Complications: PID, epididymitis, reactive arthritis</li>
                  <li>Most common reportable STI</li>
                </ul>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Neisseria gonorrhoeae</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Purulent discharge common in men</li>
                  <li>May be asymptomatic in women</li>
                  <li>Complications: PID, disseminated gonococcal infection</li>
                  <li>Increasing antibiotic resistance</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Testing</h3>
            <div className="p-3 border rounded-lg bg-muted/50">
              <p className="font-medium text-sm">Nucleic Acid Amplification Test (NAAT)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Gold standard. High sensitivity and specificity. Can use urine (first-catch),
                endocervical, urethral, pharyngeal, or rectal specimens. Test for both chlamydia and
                gonorrhea simultaneously.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Principles</h3>
            <ul className="space-y-2 text-sm">
              {[
                'High rate of co-infection - always test and treat for both',
                'Partner notification and treatment essential',
                'Retest 3 months after treatment (high reinfection rate)',
                'Screen all sexually active women <25 years annually',
                'Test all sites of exposure (genital, pharyngeal, rectal)',
              ].map((principle) => (
                <li key={principle} className="flex items-start space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pelvic Inflammatory Disease (PID)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Infection of upper genital tract (uterus, fallopian tubes, ovaries) usually from
            ascending chlamydia or gonorrhea.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Clinical Diagnosis (Low Threshold)</h3>
            <div className="p-3 border rounded-lg bg-yellow-500/10">
              <p className="text-sm">
                <span className="font-medium">Minimum criteria:</span> Sexually active woman with
                pelvic/lower abdominal pain + cervical motion tenderness OR uterine tenderness OR
                adnexal tenderness
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Additional Supportive Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Oral temperature >38.3°C',
                'Mucopurulent cervical discharge',
                'WBCs on wet prep',
                'Elevated ESR or CRP',
                'Positive NAAT for GC or CT',
                'Tubo-ovarian abscess on imaging',
              ].map((criteria) => (
                <div key={criteria} className="flex items-start space-x-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Complications</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Tubo-ovarian abscess</li>
              <li>Chronic pelvic pain</li>
              <li>Ectopic pregnancy (from tubal scarring)</li>
              <li>Infertility</li>
              <li>Fitz-Hugh-Curtis syndrome (perihepatitis)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Important STIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Trichomoniasis</p>
              <p className="text-xs text-muted-foreground mt-1">
                Trichomonas vaginalis (protozoan). Frothy discharge, strawberry cervix. Wet mount
                shows motile trichomonads. Treat patient and partners.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Herpes Simplex Virus (HSV)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Painful grouped vesicles/ulcers. Type-specific serology or PCR. Suppressive therapy
                for recurrent outbreaks. No cure.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Human Papillomavirus (HPV)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Most common STI. Low-risk types: genital warts. High-risk types: cervical cancer.
                Vaccine available (Gardasil 9).
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Lymphogranuloma Venereum (LGV)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Chlamydia trachomatis serovars L1-L3. Painless ulcer → painful
                lymphadenopathy/buboes → proctocolitis. Endemic in some regions, MSM.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partner Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Partner notification and treatment is essential to prevent reinfection and ongoing
              transmission.
            </p>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Expedited Partner Therapy (EPT)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Providing medication or prescription to patient for their partner(s) without
                  examining partner. Legal in many states for chlamydia/gonorrhea.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Lookback Period</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Notify partners from past 60 days (if symptomatic) or past 6 months (if
                  asymptomatic) for chlamydia/gonorrhea.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
