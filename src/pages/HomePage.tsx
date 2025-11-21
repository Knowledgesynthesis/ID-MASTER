import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Activity,
  Shield,
  Syringe,
  Heart,
  Bone,
  Droplet,
  Users,
  Stethoscope,
  BookOpen,
  ClipboardList,
} from 'lucide-react'

const modules = [
  {
    title: 'Sepsis & Septic Shock',
    description: 'Early recognition, source identification, and management principles',
    icon: Activity,
    path: '/sepsis',
    color: 'text-red-500',
  },
  {
    title: 'HIV Management',
    description: 'Opportunistic infections, CD4 patterns, and ART overview',
    icon: Shield,
    path: '/hiv',
    color: 'text-purple-500',
  },
  {
    title: 'Hepatitis B & C',
    description: 'Serology interpretation and treatment frameworks',
    icon: Syringe,
    path: '/hepatitis',
    color: 'text-orange-500',
  },
  {
    title: 'Infective Endocarditis',
    description: 'Duke criteria, organisms, and empiric logic',
    icon: Heart,
    path: '/endocarditis',
    color: 'text-pink-500',
  },
  {
    title: 'Osteomyelitis & Septic Arthritis',
    description: 'Diagnostic pathways and organism patterns',
    icon: Bone,
    path: '/osteomyelitis',
    color: 'text-blue-500',
  },
  {
    title: 'Skin & Soft Tissue Infections',
    description: 'Cellulitis, abscess, and necrotizing fasciitis',
    icon: Droplet,
    path: '/skin',
    color: 'text-green-500',
  },
  {
    title: 'Sexually Transmitted Infections',
    description: 'Syphilis, chlamydia, gonorrhea, and more',
    icon: Users,
    path: '/sti',
    color: 'text-yellow-500',
  },
  {
    title: 'UTI & Pyelonephritis',
    description: 'Classification, diagnosis, and management',
    icon: Stethoscope,
    path: '/uti',
    color: 'text-cyan-500',
  },
]

const additionalSections = [
  {
    title: 'Clinical Cases',
    description: 'Interactive case-based learning scenarios',
    icon: BookOpen,
    path: '/cases',
    color: 'text-indigo-500',
  },
  {
    title: 'Assessment',
    description: 'Test your knowledge with practice questions',
    icon: ClipboardList,
    path: '/assessment',
    color: 'text-teal-500',
  },
]

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome to ID Master
        </h1>
        <p className="text-muted-foreground text-lg">
          Master infectious disease reasoning through interactive learning
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <Link key={module.path} to={module.path}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalSections.map((section) => (
              <Link key={section.path} to={section.path}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <section.icon className={`h-6 w-6 ${section.color}`} />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
