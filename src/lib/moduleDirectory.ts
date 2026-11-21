import { Activity, Baby, Bone, Droplet, Heart, Shield, Stethoscope, Syringe, Users, Wind } from 'lucide-react'

export const audiences = ['All', 'Pediatric', 'Adult', 'Shared'] as const
export type Audience = (typeof audiences)[number]

export const moduleDirectory = [
  {
    title: 'Sepsis & septic shock',
    description: 'Recognize organ dysfunction, choose the right urgency, and reassess resuscitation.',
    path: '/sepsis',
    icon: Activity,
    tracks: ['Pediatric', 'Adult'],
    terms: 'shock emergency perfusion lactate fluids blood culture organ dysfunction Phoenix',
  },
  {
    title: 'HIV',
    description: 'Connect immune status with opportunistic infection risk and treatment priorities.',
    path: '/hiv',
    icon: Shield,
    tracks: ['Pediatric', 'Adult'],
    terms: 'ART CD4 retrovirus opportunistic infection PCP Pneumocystis prophylaxis',
  },
  {
    title: 'Hepatitis B & C',
    description: 'Interpret serology and distinguish adult screening from perinatal follow-up.',
    path: '/hepatitis',
    icon: Syringe,
    tracks: ['Pediatric', 'Adult', 'Shared'],
    terms: 'HBV HCV HBsAg perinatal serology liver newborn',
  },
  {
    title: 'Infective endocarditis',
    description: 'Interpret microbiology and imaging in the context of the Duke-ISCVID criteria.',
    path: '/endocarditis',
    icon: Heart,
    tracks: ['Pediatric', 'Adult', 'Shared'],
    terms: 'Duke blood culture echocardiogram vegetation valve congenital heart disease',
  },
  {
    title: 'Osteomyelitis & septic arthritis',
    description: 'Distinguish bone from joint infection and prioritize cultures, imaging, and source control.',
    path: '/osteomyelitis',
    icon: Bone,
    tracks: ['Pediatric', 'Adult', 'Shared'],
    terms: 'bone joint hip limping limp arthritis Kingella MRI aspiration',
  },
  {
    title: 'Skin & soft tissue infections',
    description: 'Separate cellulitis, abscess, and deep infection without treating them alike.',
    path: '/skin',
    icon: Droplet,
    tracks: ['Pediatric', 'Adult', 'Shared'],
    terms: 'impetigo cellulitis abscess MRSA necrotizing fasciitis SSTI drainage',
  },
  {
    title: 'Sexually transmitted infections',
    description: 'Practice syndrome recognition, specimen selection, treatment, and follow-up.',
    path: '/sti',
    icon: Users,
    tracks: ['Pediatric', 'Adult'],
    terms: 'STI adolescent syphilis gonorrhea chlamydia herpes pregnancy screening NAAT congenital newborn neonatal',
  },
  {
    title: 'UTI & pyelonephritis',
    description: 'Pick the right specimen and compare pediatric UTI with adult cystitis and systemic infection.',
    path: '/uti',
    icon: Stethoscope,
    tracks: ['Pediatric', 'Adult'],
    terms: 'urinary tract infection urine culture infant febrile cystitis pyelonephritis',
  },
  {
    title: 'Febrile young infant',
    description: 'Check pathway eligibility before deciding which age-based evaluation applies.',
    path: '/febrile-infant',
    icon: Baby,
    tracks: ['Pediatric'],
    terms: 'fever newborn neonatal infant sepsis 8 21 22 28 29 60 lumbar puncture',
  },
  {
    title: 'Pediatric pneumonia',
    description: 'Distinguish uncomplicated community-acquired pneumonia from pleural complications.',
    path: '/pediatric-pneumonia',
    icon: Wind,
    tracks: ['Pediatric'],
    terms: 'community acquired CAP respiratory cough effusion empyema antibiotics',
  },
] as const

export function findModules(audience: Audience, query: string) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  const matches = moduleDirectory.filter(({ tracks, title, description, terms }) => {
    if (audience !== 'All' && !tracks.some((track) => track === audience)) return false
    const index = `${title} ${description} ${terms}`.toLocaleLowerCase()
    return words.every((word) => index.includes(word))
  })
  if (audience === 'Pediatric') {
    return matches.sort((a, b) => a.tracks.length - b.tracks.length)
  }
  return matches
}

export const trackLabel = (track: string, path: string) => (
  track === 'Adult' && (path === '/sti' || path === '/hiv') ? 'Adult / adolescent' : track
)


export function moduleLocation(path: string, tracks: readonly string[], audience: Audience) {
  if ((audience === 'Pediatric' || audience === 'Adult') && tracks.includes('Adult') && tracks.includes('Pediatric')) {
    return { pathname: path, search: `?audience=${audience.toLowerCase()}` }
  }
  return path
}
