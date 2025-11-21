import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

interface CaseScenario {
  id: number
  presentation: string
  findings: string[]
  diagnosis: string
  reasoning: string
  urgency: 'routine' | 'urgent' | 'emergency'
}

const skinCases: CaseScenario[] = [
  {
    id: 1,
    presentation: 'Diffuse erythema and warmth on lower leg',
    findings: [
      'No purulent drainage',
      'No fluctuance',
      'Well-demarcated borders',
      'Tender to palpation',
    ],
    diagnosis: 'Cellulitis',
    reasoning:
      'Diffuse erythema without purulence or fluctuance suggests non-purulent cellulitis, typically streptococcal.',
    urgency: 'routine',
  },
  {
    id: 2,
    presentation: 'Localized swelling with purulent drainage',
    findings: [
      'Fluctuant mass',
      'Purulent material expressed',
      'Surrounding erythema',
      'Warm and tender',
    ],
    diagnosis: 'Abscess',
    reasoning:
      'Fluctuance and purulent drainage indicate abscess formation requiring incision and drainage.',
    urgency: 'urgent',
  },
  {
    id: 3,
    presentation: 'Rapidly spreading erythema with severe pain',
    findings: [
      'Pain out of proportion to findings',
      'Hemorrhagic bullae',
      'Skin necrosis',
      'Crepitus on palpation',
      'Systemic toxicity',
    ],
    diagnosis: 'Necrotizing Fasciitis',
    reasoning:
      'Pain out of proportion, bullae, necrosis, and crepitus are red flags for necrotizing soft tissue infection requiring emergency surgery.',
    urgency: 'emergency',
  },
  {
    id: 4,
    presentation: 'Erythema with central purulent lesion',
    findings: [
      'Multiple furuncles coalescing',
      'Purulent drainage from multiple points',
      'Surrounding cellulitis',
      'Previous similar lesions',
    ],
    diagnosis: 'Carbuncle',
    reasoning:
      'Multiple coalescing furuncles form a carbuncle, typically caused by S. aureus.',
    urgency: 'urgent',
  },
]

export function SkinInfectionsPage() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const currentCase = skinCases[selectedCase]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-500'
      case 'urgent':
        return 'bg-orange-500'
      default:
        return 'bg-green-500'
    }
  }

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'Emergency'
      case 'urgent':
        return 'Urgent'
      default:
        return 'Routine'
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Skin & Soft Tissue Infections
        </h1>
        <p className="text-muted-foreground mt-2">
          Cellulitis, abscess, and necrotizing fasciitis
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Case Sorter</CardTitle>
          <CardDescription>
            Practice differentiating skin and soft tissue infections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {skinCases.map((c, idx) => (
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
              <p className="font-semibold mb-3">Presentation:</p>
              <p className="text-muted-foreground">{currentCase.presentation}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Clinical Findings:</p>
              <div className="space-y-2">
                {currentCase.findings.map((finding) => (
                  <div key={finding} className="flex items-start space-x-2 p-2 border rounded">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${getUrgencyColor(currentCase.urgency)}`} />
              <span className="font-medium">{getUrgencyLabel(currentCase.urgency)}</span>
            </div>

            <Button
              onClick={() => setShowDiagnosis(!showDiagnosis)}
              className="w-full md:w-auto"
            >
              {showDiagnosis ? 'Hide' : 'Show'} Diagnosis & Reasoning
            </Button>

            {showDiagnosis && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
                <p className="font-semibold text-lg">{currentCase.diagnosis}</p>
                <p className="text-sm text-muted-foreground">{currentCase.reasoning}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cellulitis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Non-purulent Cellulitis</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Organism:</span> β-hemolytic Streptococci (most common)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Features:</span> Diffuse erythema, warmth, no drainage
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Purulent Cellulitis</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Organism:</span> S. aureus (including MRSA)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Features:</span> Associated abscess or purulent drainage
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Risk Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Skin barrier disruption (wounds, ulcers)',
                'Lymphedema or venous insufficiency',
                'Tinea pedis (toe web infections)',
                'Obesity',
                'Diabetes mellitus',
                'Immunosuppression',
              ].map((factor) => (
                <div key={factor} className="flex items-start space-x-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abscess</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border-2 rounded-lg bg-blue-500/10 border-blue-500/20">
            <p className="font-semibold">Key Management Principle</p>
            <p className="text-sm text-muted-foreground mt-1">
              Incision and drainage is the primary treatment. Antibiotics alone are insufficient.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Typical Organisms</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>S. aureus (most common, including MRSA)</li>
              <li>Polymicrobial in certain locations (perirectal, axillary)</li>
              <li>Consider anaerobes if foul-smelling discharge</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">When to Add Antibiotics</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Extensive surrounding cellulitis</li>
              <li>Systemic signs of infection (fever, tachycardia)</li>
              <li>Immunocompromised patient</li>
              <li>Lack of response to I&D alone</li>
              <li>Abscess in difficult-to-drain location</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Necrotizing Fasciitis - Surgical Emergency</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-2 rounded-lg bg-red-500/10 border-red-500/20">
            <p className="font-semibold text-red-500">Critical Red Flags</p>
            <p className="text-sm text-muted-foreground mt-2">
              High clinical suspicion requires immediate surgical consultation. Do not wait for
              imaging or laboratory confirmation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Clinical Red Flags</h3>
            <div className="space-y-2">
              {[
                {
                  flag: 'Pain out of proportion to physical findings',
                  significance: 'Most sensitive early sign',
                },
                {
                  flag: 'Hemorrhagic bullae',
                  significance: 'Indicates deep tissue involvement',
                },
                {
                  flag: 'Skin necrosis or ecchymosis',
                  significance: 'Suggests vascular thrombosis',
                },
                {
                  flag: 'Crepitus',
                  significance: 'Gas production by organisms',
                },
                {
                  flag: 'Systemic toxicity disproportionate to skin findings',
                  significance: 'Sepsis from deep infection',
                },
                {
                  flag: 'Rapid progression',
                  significance: 'Spreads along fascial planes',
                },
              ].map((item) => (
                <div key={item.flag} className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">{item.flag}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.significance}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Types</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Type I (Polymicrobial)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Mixed aerobes and anaerobes. Often in diabetics, postoperative, or
                  immunocompromised.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Type II (Monomicrobial)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Group A Streptococcus (most common). Can occur in healthy individuals. Often
                  associated with toxic shock syndrome.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">LRINEC Score (Laboratory Risk Indicator)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Helps assess risk but should not delay surgical consultation if clinical suspicion is
              high. Score ≥6 suggests necrotizing fasciitis.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Parameters: CRP, WBC, Hemoglobin, Sodium, Creatinine, Glucose</p>
              <p className="italic">Note: Clinical judgment supersedes scoring systems</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Management</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Immediate surgical consultation</span> -
                Urgent surgical debridement is life-saving
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Broad-spectrum antibiotics</span> -
                Cover Strep, Staph, Gram-negatives, anaerobes
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Aggressive resuscitation</span> -
                Often need ICU-level care
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Serial debridement</span> - Often
                requires multiple operations
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Diabetic Foot Infections</p>
              <p className="text-xs text-muted-foreground mt-1">
                Often polymicrobial. Assess for osteomyelitis (probe-to-bone test, MRI). Consider
                vascular assessment for arterial insufficiency.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">MRSA Considerations</p>
              <p className="text-xs text-muted-foreground mt-1">
                Community-acquired MRSA common in purulent infections and abscesses. Risk factors:
                IVDU, contact sports, crowded living conditions, recurrent infections.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Immunocompromised Patients</p>
              <p className="text-xs text-muted-foreground mt-1">
                Lower threshold for imaging and broad-spectrum coverage. Consider atypical organisms
                (fungi, mycobacteria).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
