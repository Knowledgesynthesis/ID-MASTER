import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, XCircle } from 'lucide-react'

interface DukeCriteria {
  majorCriteria: {
    positiveBloodCultures: boolean
    endocardialInvolvement: boolean
  }
  minorCriteria: {
    predisposition: boolean
    fever: boolean
    vascularPhenomena: boolean
    immunologicPhenomena: boolean
    microbiologicEvidence: boolean
  }
}

export function EndocarditisPage() {
  const [criteria, setCriteria] = useState<DukeCriteria>({
    majorCriteria: {
      positiveBloodCultures: false,
      endocardialInvolvement: false,
    },
    minorCriteria: {
      predisposition: false,
      fever: false,
      vascularPhenomena: false,
      immunologicPhenomena: false,
      microbiologicEvidence: false,
    },
  })

  const calculateDiagnosis = () => {
    const majorCount = Object.values(criteria.majorCriteria).filter(Boolean).length
    const minorCount = Object.values(criteria.minorCriteria).filter(Boolean).length

    if (majorCount === 2 || (majorCount === 1 && minorCount >= 3) || minorCount === 5) {
      return { level: 'Definite', color: 'text-red-500' }
    } else if (majorCount === 1 && minorCount >= 1 && minorCount <= 2) {
      return { level: 'Possible', color: 'text-yellow-500' }
    } else {
      return { level: 'Rejected', color: 'text-muted-foreground' }
    }
  }

  const diagnosis = calculateDiagnosis()

  const toggleMajor = (key: keyof typeof criteria.majorCriteria) => {
    setCriteria((prev) => ({
      ...prev,
      majorCriteria: {
        ...prev.majorCriteria,
        [key]: !prev.majorCriteria[key],
      },
    }))
  }

  const toggleMinor = (key: keyof typeof criteria.minorCriteria) => {
    setCriteria((prev) => ({
      ...prev,
      minorCriteria: {
        ...prev.minorCriteria,
        [key]: !prev.minorCriteria[key],
      },
    }))
  }

  const resetCriteria = () => {
    setCriteria({
      majorCriteria: {
        positiveBloodCultures: false,
        endocardialInvolvement: false,
      },
      minorCriteria: {
        predisposition: false,
        fever: false,
        vascularPhenomena: false,
        immunologicPhenomena: false,
        microbiologicEvidence: false,
      },
    })
  }

  const CriterionButton = ({
    label,
    description,
    checked,
    onClick,
  }: {
    label: string
    description: string
    checked: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="w-full p-3 border rounded-lg text-left hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          {checked ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </button>
  )

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Infective Endocarditis
        </h1>
        <p className="text-muted-foreground mt-2">
          Duke criteria, organisms, and empiric logic
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Duke Criteria Builder</CardTitle>
          <CardDescription>
            Interactive tool to apply Duke criteria for IE diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-muted/50">
              <div>
                <p className="font-semibold text-lg">Diagnosis</p>
                <p className="text-sm text-muted-foreground">
                  Based on selected criteria
                </p>
              </div>
              <p className={`text-2xl font-bold ${diagnosis.color}`}>{diagnosis.level}</p>
            </div>

            <Button variant="outline" onClick={resetCriteria} className="w-full md:w-auto">
              Reset All Criteria
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Major Criteria</h3>
            <div className="space-y-2">
              <CriterionButton
                label="Positive Blood Cultures"
                description="Typical microorganisms from 2 separate blood cultures, or persistently positive cultures"
                checked={criteria.majorCriteria.positiveBloodCultures}
                onClick={() => toggleMajor('positiveBloodCultures')}
              />
              <CriterionButton
                label="Endocardial Involvement"
                description="Echo showing vegetation, abscess, new prosthetic valve dehiscence, or new valvular regurgitation"
                checked={criteria.majorCriteria.endocardialInvolvement}
                onClick={() => toggleMajor('endocardialInvolvement')}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Minor Criteria</h3>
            <div className="space-y-2">
              <CriterionButton
                label="Predisposition"
                description="Predisposing heart condition or IVDU"
                checked={criteria.minorCriteria.predisposition}
                onClick={() => toggleMinor('predisposition')}
              />
              <CriterionButton
                label="Fever"
                description="Temperature ≥38.0°C (100.4°F)"
                checked={criteria.minorCriteria.fever}
                onClick={() => toggleMinor('fever')}
              />
              <CriterionButton
                label="Vascular Phenomena"
                description="Arterial emboli, septic pulmonary infarcts, mycotic aneurysm, intracranial hemorrhage, Janeway lesions"
                checked={criteria.minorCriteria.vascularPhenomena}
                onClick={() => toggleMinor('vascularPhenomena')}
              />
              <CriterionButton
                label="Immunologic Phenomena"
                description="Glomerulonephritis, Osler nodes, Roth spots, positive rheumatoid factor"
                checked={criteria.minorCriteria.immunologicPhenomena}
                onClick={() => toggleMinor('immunologicPhenomena')}
              />
              <CriterionButton
                label="Microbiologic Evidence"
                description="Positive blood culture not meeting major criteria, or serologic evidence of active infection"
                checked={criteria.minorCriteria.microbiologicEvidence}
                onClick={() => toggleMinor('microbiologicEvidence')}
              />
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/20">
            <p className="text-sm font-medium mb-2">Diagnostic Categories:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Definite IE: 2 major criteria, OR 1 major + 3 minor, OR 5 minor criteria</li>
              <li>Possible IE: 1 major + 1-2 minor criteria</li>
              <li>Rejected: Firm alternative diagnosis, or resolution with ≤4 days antibiotics, or no pathologic evidence</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Causative Organisms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                organism: 'Staphylococcus aureus',
                context: 'Most common overall; IVDU, healthcare-associated',
                characteristics: 'Acute presentation, high complication rate',
              },
              {
                organism: 'Viridans streptococci',
                context: 'Native valve IE; poor dentition',
                characteristics: 'Subacute presentation, dental procedures',
              },
              {
                organism: 'Enterococcus species',
                context: 'Elderly patients, GU procedures',
                characteristics: 'Difficult to treat, may need prolonged therapy',
              },
              {
                organism: 'Coagulase-negative staphylococci',
                context: 'Prosthetic valve IE',
                characteristics: 'Early (surgical) vs late (community) acquisition',
              },
              {
                organism: 'HACEK organisms',
                context: 'Slow-growing gram-negative bacteria',
                characteristics: 'Haemophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella',
              },
            ].map((item) => (
              <div key={item.organism} className="p-3 border rounded-lg space-y-1">
                <p className="font-medium">{item.organism}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Context:</span> {item.context}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Notes:</span> {item.characteristics}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complications of IE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { type: 'Cardiac', examples: 'Heart failure, valve destruction, perivalvular abscess, conduction abnormalities' },
              { type: 'Embolic', examples: 'Stroke, splenic infarct, renal infarct, mycotic aneurysm' },
              { type: 'Immunologic', examples: 'Glomerulonephritis, arthritis' },
              { type: 'Infectious', examples: 'Metastatic abscesses, vertebral osteomyelitis' },
            ].map((complication) => (
              <div key={complication.type} className="p-3 border rounded-lg">
                <p className="font-medium text-sm">{complication.type}</p>
                <p className="text-xs text-muted-foreground mt-1">{complication.examples}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indications for Surgical Intervention</CardTitle>
          <CardDescription>Educational overview - not treatment guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {[
              'Heart failure due to valve dysfunction (most common indication)',
              'Perivalvular extension (abscess, fistula, heart block)',
              'Persistent infection despite appropriate antibiotics',
              'Recurrent emboli despite appropriate therapy',
              'Large mobile vegetations (especially if >10mm with embolic event)',
              'Prosthetic valve endocarditis (especially early PVE)',
              'Fungal endocarditis',
            ].map((indication) => (
              <li key={indication} className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">{indication}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
