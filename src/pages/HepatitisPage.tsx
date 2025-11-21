import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, XCircle } from 'lucide-react'

const hbvScenarios = [
  {
    id: 1,
    name: 'Acute Hepatitis B',
    serology: { hbsag: true, antiHBc: true, antiHBs: false },
    interpretation: 'Acute HBV infection',
    details: 'HBsAg positive indicates active infection. Anti-HBc (IgM) present in acute phase. Anti-HBs not yet developed.',
  },
  {
    id: 2,
    name: 'Chronic Hepatitis B',
    serology: { hbsag: true, antiHBc: true, antiHBs: false },
    interpretation: 'Chronic HBV infection',
    details: 'HBsAg positive for >6 months = chronic infection. Anti-HBc (IgG) indicates past exposure. No protective antibody.',
  },
  {
    id: 3,
    name: 'Resolved Infection',
    serology: { hbsag: false, antiHBc: true, antiHBs: true },
    interpretation: 'Resolved HBV infection with immunity',
    details: 'HBsAg cleared. Anti-HBc indicates past infection. Anti-HBs provides immunity.',
  },
  {
    id: 4,
    name: 'Vaccinated',
    serology: { hbsag: false, antiHBc: false, antiHBs: true },
    interpretation: 'Immune due to HBV vaccination',
    details: 'Only anti-HBs positive indicates vaccine-induced immunity, not natural infection.',
  },
  {
    id: 5,
    name: 'Susceptible',
    serology: { hbsag: false, antiHBc: false, antiHBs: false },
    interpretation: 'Susceptible to HBV',
    details: 'All markers negative. No immunity, no current or past infection. Vaccination recommended.',
  },
]

export function HepatitisPage() {
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [showInterpretation, setShowInterpretation] = useState(false)
  const scenario = hbvScenarios[selectedScenario]

  const SerologyMarker = ({ label, positive }: { label: string; positive: boolean }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className="font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        {positive ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">Positive</span>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Negative</span>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Hepatitis B & C
        </h1>
        <p className="text-muted-foreground mt-2">
          Serology interpretation and treatment frameworks
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hepatitis B Serology Interpreter</CardTitle>
          <CardDescription>
            Learn to interpret common HBV serology patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {hbvScenarios.map((s, idx) => (
              <Button
                key={s.id}
                variant={selectedScenario === idx ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedScenario(idx)
                  setShowInterpretation(false)
                }}
              >
                {s.name}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <SerologyMarker label="HBsAg (Hepatitis B surface antigen)" positive={scenario.serology.hbsag} />
              <SerologyMarker label="Anti-HBc (Antibody to core antigen)" positive={scenario.serology.antiHBc} />
              <SerologyMarker label="Anti-HBs (Antibody to surface antigen)" positive={scenario.serology.antiHBs} />
            </div>

            <Button
              onClick={() => setShowInterpretation(!showInterpretation)}
              className="w-full md:w-auto"
            >
              {showInterpretation ? 'Hide' : 'Show'} Interpretation
            </Button>

            {showInterpretation && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
                <p className="font-semibold text-lg">{scenario.interpretation}</p>
                <p className="text-sm text-muted-foreground">{scenario.details}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>HBV Serology Markers Explained</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium">HBsAg (Surface Antigen)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Indicates active HBV infection (acute or chronic). First serologic marker to appear.
                Chronic if present {'>'} 6 months.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">Anti-HBc (Core Antibody)</p>
              <p className="text-sm text-muted-foreground mt-1">
                IgM anti-HBc: acute infection. IgG anti-HBc: past or chronic infection.
                Appears during acute infection and persists for life.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">Anti-HBs (Surface Antibody)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Indicates recovery and immunity. Also present after successful vaccination.
                Provides protection against HBV.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">HBeAg (e Antigen)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Indicates high viral replication and infectivity. Not routinely tested in all scenarios.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">HBV DNA</p>
              <p className="text-sm text-muted-foreground mt-1">
                Direct measurement of viral load. Used to monitor treatment response and disease activity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hepatitis C Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Screening & Diagnosis</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Anti-HCV Antibody</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Initial screening test. Positive indicates exposure but doesn't differentiate active
                  from cleared infection.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">HCV RNA (Viral Load)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confirmatory test for active infection. Detectable RNA = active HCV.
                  Undetectable RNA with positive antibody = cleared infection.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Natural History</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>~75-85% develop chronic infection after acute HCV</li>
              <li>15-25% spontaneously clear virus (antibody positive, RNA negative)</li>
              <li>Chronic HCV can lead to cirrhosis (20-30% over 20-30 years)</li>
              <li>Cirrhosis increases risk of hepatocellular carcinoma</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Treatment Framework</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Modern direct-acting antivirals (DAAs) have revolutionized HCV treatment with
              cure rates {'>'} 95%.
            </p>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium text-sm">Treatment Goals</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sustained virologic response (SVR) = undetectable HCV RNA 12 weeks after
                  treatment completion = cure
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium text-sm">Genotype Testing</p>
                <p className="text-xs text-muted-foreground mt-1">
                  HCV genotype (1-6) helps guide treatment selection, though pan-genotypic
                  regimens now available
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Monitoring in Chronic Hepatitis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Liver function tests (ALT, AST, bilirubin)',
                'Hepatitis B and C viral loads',
                'Fibrosis assessment (FibroScan, biopsy)',
                'HCC screening (ultrasound, AFP in cirrhosis)',
                'Vaccination status (HAV, HBV if not immune)',
                'Treatment adherence and side effects',
              ].map((param) => (
                <div key={param} className="flex items-start space-x-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{param}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Differences: HBV vs HCV</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Hepatitis B</th>
                  <th className="text-left p-2">Hepatitis C</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Transmission</td>
                  <td className="p-2">Blood, sexual, perinatal</td>
                  <td className="p-2">Primarily blood-borne</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Chronicity rate</td>
                  <td className="p-2">~5% (adults), 90% (neonates)</td>
                  <td className="p-2">~75-85%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Vaccine available</td>
                  <td className="p-2">Yes</td>
                  <td className="p-2">No</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium text-foreground">Treatment goal</td>
                  <td className="p-2">Viral suppression (control)</td>
                  <td className="p-2">Cure (SVR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
