import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, Info } from 'lucide-react'

interface VitalSigns {
  temp: number
  hr: number
  sbp: number
  dbp: number
  lactate: number
}

const sepsisScenarios = [
  {
    id: 1,
    vitals: { temp: 39.5, hr: 122, sbp: 88, dbp: 60, lactate: 3.5 },
    source: 'Urinary',
    interpretation: 'Sepsis with possible early shock',
    findings: 'Elevated lactate with hypotension despite adequate volume status suggests septic shock.',
  },
  {
    id: 2,
    vitals: { temp: 38.8, hr: 105, sbp: 110, dbp: 70, lactate: 2.1 },
    source: 'Pulmonary',
    interpretation: 'Sepsis without shock',
    findings: 'Fever and tachycardia with preserved perfusion. Monitor closely for deterioration.',
  },
  {
    id: 3,
    vitals: { temp: 40.1, hr: 135, sbp: 75, dbp: 50, lactate: 5.2 },
    source: 'Abdominal',
    interpretation: 'Septic shock',
    findings: 'Severe hypotension with significantly elevated lactate indicating tissue hypoperfusion.',
  },
]

export function SepsisPage() {
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [showInterpretation, setShowInterpretation] = useState(false)
  const scenario = sepsisScenarios[selectedScenario]

  const getSeverityColor = (lactate: number) => {
    if (lactate >= 4) return 'bg-red-500'
    if (lactate >= 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getSeverityLabel = (vitals: VitalSigns) => {
    if (vitals.lactate >= 4 || vitals.sbp < 90) return 'Critical'
    if (vitals.lactate >= 2 || vitals.hr > 110) return 'Warning'
    return 'Stable'
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Sepsis & Septic Shock
        </h1>
        <p className="text-muted-foreground mt-2">
          Early recognition, source identification, and management principles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Sepsis Definition</p>
              <p className="text-sm text-muted-foreground">
                Life-threatening organ dysfunction caused by dysregulated host response to infection
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Septic Shock</p>
              <p className="text-sm text-muted-foreground">
                Sepsis with persistent hypotension requiring vasopressors and elevated lactate (≥2 mmol/L) despite adequate fluid resuscitation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Sepsis Navigator</CardTitle>
          <CardDescription>
            Explore different sepsis scenarios and learn to identify severity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {sepsisScenarios.map((s, idx) => (
              <Button
                key={s.id}
                variant={selectedScenario === idx ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedScenario(idx)
                  setShowInterpretation(false)
                }}
              >
                Scenario {s.id}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Vital Signs</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-xl font-semibold">{scenario.vitals.temp}°C</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-xl font-semibold">{scenario.vitals.hr} bpm</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-xl font-semibold">
                    {scenario.vitals.sbp}/{scenario.vitals.dbp}
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Lactate</p>
                  <p className="text-xl font-semibold">{scenario.vitals.lactate} mmol/L</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Suspected Source</p>
                  <p className="text-xl font-semibold">{scenario.source}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Severity</p>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${getSeverityColor(
                        scenario.vitals.lactate
                      )}`}
                    />
                    <p className="text-xl font-semibold">
                      {getSeverityLabel(scenario.vitals)}
                    </p>
                  </div>
                </div>
              </div>
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
                <p className="text-sm text-muted-foreground">{scenario.findings}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Sources of Sepsis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { source: 'Pulmonary', description: 'Pneumonia, empyema' },
              { source: 'Urinary', description: 'UTI, pyelonephritis, obstructive uropathy' },
              { source: 'Abdominal', description: 'Cholecystitis, appendicitis, diverticulitis, peritonitis' },
              { source: 'Skin/Soft Tissue', description: 'Cellulitis, abscess, necrotizing fasciitis' },
              { source: 'CNS', description: 'Meningitis, brain abscess' },
              { source: 'Catheter/Line', description: 'Central line-associated bloodstream infection' },
            ].map((item) => (
              <div key={item.source} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.source}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Initial Management Principles</CardTitle>
          <CardDescription>Educational overview only - not clinical guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="text-sm">
              <span className="font-medium">Obtain cultures before antibiotics</span>
              <p className="text-muted-foreground ml-5 mt-1">
                Blood cultures (at least 2 sets), urine, respiratory samples as indicated
              </p>
            </li>
            <li className="text-sm">
              <span className="font-medium">Early broad-spectrum empiric therapy</span>
              <p className="text-muted-foreground ml-5 mt-1">
                Within 1 hour of recognition when possible
              </p>
            </li>
            <li className="text-sm">
              <span className="font-medium">Fluid resuscitation</span>
              <p className="text-muted-foreground ml-5 mt-1">
                Crystalloid fluids for patients with hypotension or elevated lactate
              </p>
            </li>
            <li className="text-sm">
              <span className="font-medium">Source control</span>
              <p className="text-muted-foreground ml-5 mt-1">
                Remove infected devices, drain abscesses, debride necrotizing infections
              </p>
            </li>
            <li className="text-sm">
              <span className="font-medium">Vasopressors if needed</span>
              <p className="text-muted-foreground ml-5 mt-1">
                For persistent hypotension despite fluid resuscitation
              </p>
            </li>
            <li className="text-sm">
              <span className="font-medium">Reassess frequently</span>
              <p className="text-muted-foreground ml-5 mt-1">
                Monitor vital signs, lactate clearance, and organ function
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
