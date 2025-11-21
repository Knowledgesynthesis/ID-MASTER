import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface UTICase {
  id: number
  presentation: string
  findings: string[]
  diagnosis: string
  classification: 'uncomplicated' | 'complicated'
  notes: string
}

const utiCases: UTICase[] = [
  {
    id: 1,
    presentation: 'Young healthy woman with dysuria and frequency',
    findings: [
      'No fever',
      'No CVA tenderness',
      'No systemic symptoms',
      'UA: WBC 50-100/hpf, positive nitrites, positive leukocyte esterase',
    ],
    diagnosis: 'Uncomplicated Cystitis',
    classification: 'uncomplicated',
    notes:
      'Classic uncomplicated UTI in otherwise healthy woman. Short-course treatment appropriate.',
  },
  {
    id: 2,
    presentation: 'Woman with fever, flank pain, and nausea',
    findings: [
      'Fever 38.9°C',
      'CVA tenderness',
      'Dysuria',
      'UA: WBC >100/hpf, WBC casts, bacteria',
    ],
    diagnosis: 'Acute Pyelonephritis',
    classification: 'complicated',
    notes:
      'Upper UTI with systemic symptoms. CVA tenderness and WBC casts suggest kidney involvement.',
  },
  {
    id: 3,
    presentation: 'Diabetic man with urinary symptoms',
    findings: [
      'Poorly controlled diabetes',
      'Dysuria and frequency',
      'No fever',
      'UA: WBC 100+/hpf, many bacteria',
    ],
    diagnosis: 'Complicated Cystitis',
    classification: 'complicated',
    notes:
      'Complicated due to diabetes and male gender. Longer treatment duration needed.',
  },
  {
    id: 4,
    presentation: 'Pregnant woman with asymptomatic bacteriuria',
    findings: [
      'No symptoms',
      'Prenatal screening urine culture',
      'Culture: >100,000 CFU/mL E. coli',
      'No pyuria on UA',
    ],
    diagnosis: 'Asymptomatic Bacteriuria in Pregnancy',
    classification: 'complicated',
    notes:
      'Requires treatment in pregnancy due to risk of progression to pyelonephritis. Screen and treat all pregnant women.',
  },
]

export function UTIPage() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const currentCase = utiCases[selectedCase]

  const getClassificationColor = (classification: string) => {
    return classification === 'uncomplicated' ? 'bg-green-500' : 'bg-orange-500'
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          UTI & Pyelonephritis
        </h1>
        <p className="text-muted-foreground mt-2">
          Classification, diagnosis, and management
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive UTI Navigator</CardTitle>
          <CardDescription>
            Practice distinguishing UTI types and complexity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {utiCases.map((c, idx) => (
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
              <p className="font-semibold mb-2">Presentation:</p>
              <p className="text-muted-foreground">{currentCase.presentation}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Clinical & Laboratory Findings:</p>
              <div className="space-y-2">
                {currentCase.findings.map((finding, idx) => (
                  <div key={idx} className="p-2 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${getClassificationColor(
                  currentCase.classification
                )}`}
              />
              <span className="font-medium capitalize">{currentCase.classification} UTI</span>
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
          <CardTitle>UTI Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-2 rounded-lg bg-green-500/10 border-green-500/20">
              <h3 className="font-semibold mb-2">Uncomplicated UTI</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Infection in otherwise healthy, non-pregnant women with normal urinary tract anatomy
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Premenopausal, non-pregnant women</p>
                <p>• No recent instrumentation</p>
                <p>• No known urologic abnormalities</p>
                <p>• No immunocompromise</p>
              </div>
            </div>

            <div className="p-4 border-2 rounded-lg bg-orange-500/10 border-orange-500/20">
              <h3 className="font-semibold mb-2">Complicated UTI</h3>
              <p className="text-sm text-muted-foreground mb-2">
                UTI in setting of functional/anatomic abnormality or host factors that increase risk
                of treatment failure
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• Male gender</div>
                <div>• Pregnancy</div>
                <div>• Diabetes</div>
                <div>• Immunosuppression</div>
                <div>• Urinary obstruction</div>
                <div>• Indwelling catheter</div>
                <div>• Recent instrumentation</div>
                <div>• Renal transplant</div>
                <div>• Functional/anatomic abnormality</div>
                <div>• Recent antibiotic use</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cystitis vs Pyelonephritis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Cystitis (Lower UTI)</th>
                  <th className="text-left p-2">Pyelonephritis (Upper UTI)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Location</td>
                  <td className="p-2">Bladder</td>
                  <td className="p-2">Kidney</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Fever</td>
                  <td className="p-2">Absent or low-grade</td>
                  <td className="p-2">High fever {'>'} 38°C common</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Systemic symptoms</td>
                  <td className="p-2">Rare</td>
                  <td className="p-2">Nausea, vomiting, malaise</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">CVA tenderness</td>
                  <td className="p-2">Absent</td>
                  <td className="p-2">Present (flank pain)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">UA findings</td>
                  <td className="p-2">Pyuria, bacteriuria, +/- hematuria</td>
                  <td className="p-2">Pyuria, bacteriuria, WBC casts</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Treatment duration</td>
                  <td className="p-2">Short (3-7 days typically)</td>
                  <td className="p-2">Longer (7-14 days)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Urinalysis Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Pyuria (WBCs in urine)</p>
              <p className="text-xs text-muted-foreground mt-1">
                {'>'} 10 WBC/hpf suggests infection but not specific. Can occur with sterile pyuria
                (interstitial nephritis, TB, appendicitis near bladder).
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Bacteriuria</p>
              <p className="text-xs text-muted-foreground mt-1">
                Bacteria visible on UA. Supports infection but can be contamination. Culture confirms.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Nitrites</p>
              <p className="text-xs text-muted-foreground mt-1">
                Positive suggests gram-negative bacteria (E. coli, Proteus, Klebsiella). Many
                organisms don't produce nitrites (enterococcus, Staph saprophyticus).
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Leukocyte Esterase</p>
              <p className="text-xs text-muted-foreground mt-1">
                Indicates WBCs in urine. Sensitive but not specific for UTI.
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-blue-500/10">
              <p className="font-medium text-sm">WBC Casts</p>
              <p className="text-xs text-muted-foreground mt-1">
                Highly suggestive of pyelonephritis or interstitial nephritis. Indicates kidney
                involvement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Uropathogens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                organism: 'Escherichia coli',
                percentage: '70-95%',
                notes: 'Most common cause of community-acquired UTI',
              },
              {
                organism: 'Staphylococcus saprophyticus',
                percentage: '5-15%',
                notes: 'Young sexually active women, does not produce nitrites',
              },
              {
                organism: 'Klebsiella pneumoniae',
                percentage: '3-10%',
                notes: 'More common in diabetics and catheterized patients',
              },
              {
                organism: 'Proteus mirabilis',
                percentage: '3-5%',
                notes: 'Urease-producing, associated with stones',
              },
              {
                organism: 'Enterococcus species',
                percentage: '3-5%',
                notes: 'More common in complicated UTI, catheterized patients',
              },
              {
                organism: 'Pseudomonas aeruginosa',
                percentage: '<5%',
                notes: 'Complicated UTI, catheter-associated, structural abnormalities',
              },
            ].map((item) => (
              <div key={item.organism} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-sm">{item.organism}</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {item.percentage}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Populations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Pregnancy</p>
              <p className="text-xs text-muted-foreground mt-1">
                Screen and treat asymptomatic bacteriuria (increased risk of pyelonephritis).
                Avoid fluoroquinolones and tetracyclines. Nitrofurantoin safe except near term.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Men</p>
              <p className="text-xs text-muted-foreground mt-1">
                All UTIs in men considered complicated. Consider prostatitis if recurrent. Longer
                treatment duration typically needed (7-14 days minimum).
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Catheter-Associated UTI (CAUTI)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Only treat if symptomatic. Remove/replace catheter if possible. Broader organism
                spectrum including Pseudomonas, Enterococcus, Candida.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Recurrent UTI</p>
              <p className="text-xs text-muted-foreground mt-1">
                ≥2 infections in 6 months or ≥3 in 12 months. Consider imaging to rule out
                structural abnormalities. Prophylaxis may be considered in some cases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Red Flags - When to Suspect Complications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {[
              'Sepsis or septic shock',
              'Lack of improvement after 48-72 hours of appropriate antibiotics',
              'Recurrent pyelonephritis',
              'Persistent fever despite treatment',
              'Severe flank pain (consider obstructing stone, abscess)',
              'Immunocompromised host',
              'Recent urologic procedure',
            ].map((flag) => (
              <li key={flag} className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">{flag}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 border rounded-lg bg-yellow-500/10">
            <p className="text-sm">
              <span className="font-medium">Consider imaging (CT urogram or ultrasound) if:</span>{' '}
              Suspected obstruction, abscess, emphysematous pyelonephritis, or lack of clinical
              response.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
