import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Sepsis',
    question:
      'A patient with suspected sepsis has BP 85/50, HR 120, lactate 4.5 mmol/L despite 2L crystalloid. What defines this as septic shock?',
    options: [
      'Hypotension alone',
      'Elevated lactate alone',
      'Persistent hypotension requiring vasopressors AND lactate ≥2 mmol/L despite adequate fluid resuscitation',
      'Any hypotension with infection',
    ],
    correctAnswer: 2,
    explanation:
      'Septic shock requires persistent hypotension requiring vasopressors to maintain MAP ≥65 AND lactate ≥2 mmol/L despite adequate volume resuscitation.',
  },
  {
    id: 2,
    category: 'HIV',
    question: 'At what CD4 count is Pneumocystis jirovecii pneumonia (PCP) prophylaxis indicated?',
    options: ['<500 cells/μL', '<350 cells/μL', '<200 cells/μL', '<50 cells/μL'],
    correctAnswer: 2,
    explanation:
      'PCP prophylaxis (typically TMP-SMX) is indicated when CD4 count falls below 200 cells/μL.',
  },
  {
    id: 3,
    category: 'Hepatitis B',
    question:
      'A patient has HBsAg negative, anti-HBc positive, anti-HBs positive. What does this indicate?',
    options: [
      'Acute HBV infection',
      'Chronic HBV infection',
      'Resolved HBV infection with immunity',
      'Vaccination only',
    ],
    correctAnswer: 2,
    explanation:
      'HBsAg negative (no active infection), anti-HBc positive (past infection), anti-HBs positive (immunity) indicates resolved infection.',
  },
  {
    id: 4,
    category: 'Endocarditis',
    question:
      'Which Duke criteria combination qualifies as "definite" infective endocarditis?',
    options: [
      '1 major criterion only',
      '2 major criteria',
      '3 minor criteria',
      '1 major + 2 minor criteria',
    ],
    correctAnswer: 1,
    explanation:
      'Definite IE requires 2 major criteria, OR 1 major + 3 minor criteria, OR 5 minor criteria.',
  },
  {
    id: 5,
    category: 'Osteomyelitis',
    question: 'What is the preferred imaging modality for diagnosing osteomyelitis?',
    options: ['Plain radiograph', 'CT scan', 'MRI', 'Ultrasound'],
    correctAnswer: 2,
    explanation:
      'MRI is the most sensitive and specific imaging modality for osteomyelitis, detecting early marrow edema and soft tissue involvement.',
  },
  {
    id: 6,
    category: 'Skin Infections',
    question:
      'Which finding is most specific for necrotizing fasciitis compared to cellulitis?',
    options: [
      'Erythema',
      'Warmth',
      'Pain out of proportion to physical findings',
      'Swelling',
    ],
    correctAnswer: 2,
    explanation:
      'Pain out of proportion to examination findings is the most sensitive early sign of necrotizing fasciitis.',
  },
  {
    id: 7,
    category: 'Syphilis',
    question:
      'A patient has a painless genital ulcer with firm borders. RPR and FTA-ABS are both positive. What stage of syphilis is this?',
    options: ['Primary syphilis', 'Secondary syphilis', 'Latent syphilis', 'Tertiary syphilis'],
    correctAnswer: 0,
    explanation:
      'Primary syphilis presents with painless chancre. Both non-treponemal (RPR) and treponemal (FTA-ABS) tests are positive.',
  },
  {
    id: 8,
    category: 'UTI',
    question: 'Which urinalysis finding is most suggestive of pyelonephritis?',
    options: ['Pyuria', 'Bacteriuria', 'WBC casts', 'Positive nitrites'],
    correctAnswer: 2,
    explanation:
      'WBC casts indicate upper urinary tract involvement (kidney) and are highly suggestive of pyelonephritis.',
  },
  {
    id: 9,
    category: 'HIV',
    question:
      'What is the goal viral load for a patient on effective antiretroviral therapy?',
    options: [
      '<100,000 copies/mL',
      '<10,000 copies/mL',
      '<1,000 copies/mL',
      'Undetectable (<20-50 copies/mL)',
    ],
    correctAnswer: 3,
    explanation:
      'The goal of ART is to suppress viral replication to undetectable levels (typically <20-50 copies/mL depending on assay).',
  },
  {
    id: 10,
    category: 'Sepsis',
    question:
      'What is the recommended timing for antibiotic administration in septic shock?',
    options: [
      'Within 6 hours',
      'Within 3 hours',
      'Within 1 hour',
      'After all cultures return',
    ],
    correctAnswer: 2,
    explanation:
      'Current guidelines recommend administering antibiotics within 1 hour of recognizing septic shock, after obtaining cultures.',
  },
]

export function AssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const categories = ['All', ...Array.from(new Set(questions.map((q) => q.category)))]

  const filteredQuestions =
    selectedCategory === 'All'
      ? questions
      : questions.filter((q) => q.category === selectedCategory)

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(false)
  }

  const handleCheckAnswer = () => {
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Test your knowledge with practice questions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
          <CardDescription>
            Select a category or view all questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {currentQuestion.category}
                </span>
              </div>
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-lg">{currentQuestion.question}</p>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-muted/50'
                } ${showExplanation ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {selectedAnswer === index && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-background" />
                      </div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {!showExplanation && selectedAnswer !== null && (
            <Button onClick={handleCheckAnswer} className="w-full md:w-auto">
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
              <p className="text-sm mb-2">
                <span className="font-medium">Correct answer:</span>{' '}
                {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === filteredQuestions.length - 1}
            >
              Next Question
            </Button>
          </div>

          <div className="flex gap-1">
            {filteredQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index === currentQuestionIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About This Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            This assessment contains practice questions covering all major topics in infectious
            disease. Use it to test your knowledge and reinforce key concepts.
          </p>
          <p>
            Questions are not tracked or scored. Focus on understanding the explanations rather
            than just getting the right answer. Review related module content if you're unsure
            about any topic.
          </p>
          <p className="text-xs italic">
            These questions are for educational purposes only and do not replace clinical
            guidelines or formal assessments.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
