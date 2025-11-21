import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'

interface CaseStep {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface ClinicalCase {
  id: number
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  initialPresentation: string
  steps: CaseStep[]
}

const clinicalCases: ClinicalCase[] = [
  {
    id: 1,
    title: 'Septic Shock with Unknown Source',
    category: 'Sepsis',
    difficulty: 'Intermediate',
    initialPresentation:
      'A 65-year-old man presents to the ED with altered mental status, fever (39.5°C), HR 125, BP 82/50, RR 24. His wife reports he has been feeling unwell for 2 days with worsening confusion today.',
    steps: [
      {
        question: 'What is the most appropriate initial step?',
        options: [
          'Start empiric antibiotics immediately',
          'Obtain blood cultures, then start antibiotics within 1 hour',
          'Order CT scan to identify source',
          'Wait for culture results before starting antibiotics',
        ],
        correctAnswer: 1,
        explanation:
          'In septic shock, obtain cultures quickly but do not delay antibiotics. Goal is cultures first, then antibiotics within 1 hour of recognition.',
      },
      {
        question: 'Labs return: Lactate 4.2 mmol/L, WBC 18,000, Cr 1.8 (baseline 1.0). What is the next priority?',
        options: [
          'Start vasopressors immediately',
          'Initiate fluid resuscitation',
          'Order dialysis for acute kidney injury',
          'Obtain infectious disease consultation',
        ],
        correctAnswer: 1,
        explanation:
          'Elevated lactate and hypotension indicate tissue hypoperfusion. Fluid resuscitation is the initial management before vasopressors.',
      },
      {
        question:
          'Despite 2L fluid bolus, BP remains 85/55. Lactate 4.0. What is the appropriate next step?',
        options: [
          'Continue fluids only',
          'Initiate vasopressor support',
          'Discharge to floor with close monitoring',
          'Hold all interventions until source identified',
        ],
        correctAnswer: 1,
        explanation:
          'Persistent hypotension despite adequate fluid resuscitation defines septic shock and requires vasopressor support.',
      },
    ],
  },
  {
    id: 2,
    title: 'Opportunistic Infection in HIV',
    category: 'HIV',
    difficulty: 'Advanced',
    initialPresentation:
      'A 32-year-old man with newly diagnosed HIV (CD4 45 cells/μL) presents with 2 weeks of headache, fever, and confusion. He has not yet started ART.',
    steps: [
      {
        question: 'What are the most concerning diagnoses based on the CD4 count?',
        options: [
          'Pneumocystis pneumonia',
          'Cryptococcal meningitis or Toxoplasma encephalitis',
          'Candida esophagitis',
          'Mycobacterium avium complex',
        ],
        correctAnswer: 1,
        explanation:
          'CD4 <100 increases risk for cryptococcal meningitis and toxoplasma encephalitis, both of which present with neurologic symptoms.',
      },
      {
        question: 'Which initial test is most appropriate?',
        options: [
          'Chest X-ray',
          'Head CT followed by lumbar puncture',
          'Serum cryptococcal antigen alone',
          'Start empiric treatment without testing',
        ],
        correctAnswer: 1,
        explanation:
          'CNS symptoms require head imaging before LP to rule out mass lesion. CT first, then LP for CSF analysis including cryptococcal antigen and toxoplasma PCR if available.',
      },
      {
        question:
          'CSF shows: Opening pressure 35 cm H2O, WBC 25, protein 80, glucose 30, cryptococcal antigen positive. What is the diagnosis?',
        options: [
          'Bacterial meningitis',
          'Viral meningitis',
          'Cryptococcal meningitis',
          'Toxoplasma encephalitis',
        ],
        correctAnswer: 2,
        explanation:
          'Elevated opening pressure with positive CSF cryptococcal antigen confirms cryptococcal meningitis. Elevated opening pressure is common and requires management.',
      },
    ],
  },
  {
    id: 3,
    title: 'Necrotizing Soft Tissue Infection',
    category: 'Skin Infections',
    difficulty: 'Advanced',
    initialPresentation:
      'A 45-year-old diabetic woman presents with rapidly worsening right leg pain and swelling for 1 day. Exam shows erythema with dusky discoloration, hemorrhagic bullae, and severe pain with minimal palpation. Temp 39°C, HR 115, BP 100/60.',
    steps: [
      {
        question: 'What is the most likely diagnosis?',
        options: ['Cellulitis', 'Deep vein thrombosis', 'Necrotizing fasciitis', 'Simple abscess'],
        correctAnswer: 2,
        explanation:
          'Pain out of proportion, hemorrhagic bullae, dusky discoloration, and rapid progression are red flags for necrotizing fasciitis.',
      },
      {
        question: 'What is the most appropriate next step?',
        options: [
          'Start oral antibiotics and discharge',
          'Obtain MRI to confirm diagnosis',
          'Immediate surgical consultation for exploration/debridement',
          'Observe for 24 hours with IV antibiotics',
        ],
        correctAnswer: 2,
        explanation:
          'Necrotizing fasciitis is a surgical emergency. Do not delay surgery for imaging. Clinical suspicion warrants immediate surgical consultation.',
      },
      {
        question: 'What empiric antibiotic coverage is appropriate while awaiting surgery?',
        options: [
          'Narrow coverage for Staph only',
          'Antifungal therapy alone',
          'Broad coverage: Staph, Strep, Gram-negatives, and anaerobes',
          'No antibiotics until culture results',
        ],
        correctAnswer: 2,
        explanation:
          'Necrotizing infections can be polymicrobial. Empiric broad-spectrum coverage is essential while awaiting surgical cultures.',
      },
    ],
  },
]

export function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const startCase = (caseId: number) => {
    setSelectedCase(caseId)
    setCurrentStep(0)
    setSelectedAnswers([])
    setShowExplanation(false)
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentStep] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(false)
  }

  const checkAnswer = () => {
    setShowExplanation(true)
  }

  const nextStep = () => {
    if (selectedCase !== null && currentStep < clinicalCases[selectedCase - 1].steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowExplanation(false)
    }
  }

  const resetCase = () => {
    setSelectedCase(null)
    setCurrentStep(0)
    setSelectedAnswers([])
    setShowExplanation(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500'
      case 'Intermediate':
        return 'bg-yellow-500'
      case 'Advanced':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (selectedCase === null) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Clinical Cases</h1>
          <p className="text-muted-foreground mt-2">
            Interactive case-based learning scenarios
          </p>
        </div>

        <div className="space-y-4">
          {clinicalCases.map((clinicalCase) => (
            <Card key={clinicalCase.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{clinicalCase.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {clinicalCase.initialPresentation}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {clinicalCase.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-2 w-2 rounded-full ${getDifficultyColor(
                        clinicalCase.difficulty
                      )}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {clinicalCase.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {clinicalCase.steps.length} steps
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => startCase(clinicalCase.id)} className="w-full md:w-auto">
                  Start Case
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use Clinical Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Each case presents a realistic clinical scenario with multiple decision points. Work
              through each step, select your answer, and review the explanation to understand the
              reasoning.
            </p>
            <p>
              These cases are designed to reinforce key concepts from the modules and develop
              clinical reasoning skills. Take your time to think through each question before
              selecting an answer.
            </p>
            <p className="text-xs italic">
              Remember: These are educational scenarios. Always refer to current guidelines and
              consult with supervisors for real patient care.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentCase = clinicalCases[selectedCase - 1]
  const step = currentCase.steps[currentStep]
  const selectedAnswer = selectedAnswers[currentStep]
  const isCorrect = selectedAnswer === step.correctAnswer
  const isLastStep = currentStep === currentCase.steps.length - 1

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{currentCase.title}</h1>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {currentCase.steps.length}
          </p>
        </div>
        <Button variant="outline" onClick={resetCase}>
          Exit Case
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Case Presentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{currentCase.initialPresentation}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{step.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {step.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-muted/50'
                } ${showExplanation ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                      selectedAnswer === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {selectedAnswer === index && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-background" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {!showExplanation && selectedAnswer !== null && (
            <Button onClick={checkAnswer} className="w-full md:w-auto">
              Check Answer
            </Button>
          )}

          {showExplanation && (
            <div
              className={`p-4 border-2 rounded-lg ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              <p className="font-semibold mb-2">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Correct answer:</span>{' '}
                {step.options[step.correctAnswer]}
              </p>
              <p className="text-sm text-muted-foreground">{step.explanation}</p>
            </div>
          )}

          {showExplanation && !isLastStep && (
            <Button onClick={nextStep} className="w-full md:w-auto">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {showExplanation && isLastStep && (
            <div className="space-y-3">
              <div className="p-4 border rounded-lg bg-blue-500/10">
                <p className="font-semibold mb-2">Case Complete!</p>
                <p className="text-sm text-muted-foreground">
                  You've worked through all steps of this case. Review the explanations to
                  reinforce key concepts.
                </p>
              </div>
              <Button onClick={resetCase} className="w-full md:w-auto">
                Return to Cases
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {currentCase.steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < currentStep
                ? 'bg-primary'
                : index === currentStep
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
