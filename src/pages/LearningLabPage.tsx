import { ArrowRight, ClipboardList, FlaskConical, GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'

const activities = [
  {
    path: '/cases',
    icon: GitBranch,
    label: 'Clinical cases',
    title: 'Reason through a case',
    description: 'Decide what to do first, then work through the next finding. Practice how a change in age or severity changes your decision.',
  },
  {
    path: '/assessment',
    icon: ClipboardList,
    label: 'Assessment',
    title: 'Test your recall',
    description: 'Choose an answer before you see the rationale. Review missed decisions and check yourself again.',
  },
]

export function LearningLabPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div className="space-y-2">
        <p className="id-section-label"><FlaskConical size={16} aria-hidden="true" /> Practice and retrieval</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Learning Lab</h1>
        <p className="text-muted-foreground">Start with a case when you want to practice a sequence. Use assessment when you want a quick check across topics.</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {activities.map(({ path, icon: Icon, label, title, description }) => (
          <li key={path}>
            <Link to={path} className="id-module-card">
              <div className="flex items-center justify-between">
                <span className="id-module-icon"><Icon size={22} aria-hidden="true" /></span>
                <ArrowRight className="id-card-arrow" size={19} aria-hidden="true" />
              </div>
              <p className="id-section-label mt-4">{label}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="id-reset" to="/">Browse the topic library <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  )
}
