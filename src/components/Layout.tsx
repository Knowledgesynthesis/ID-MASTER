import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, FlaskConical, LayoutGrid, Settings } from 'lucide-react'

const nav = [
  { to: '/', label: 'Library', icon: LayoutGrid },
  { to: '/learn', label: 'Learning Lab', icon: FlaskConical },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a className="id-skip" href="#main-content">Skip to content</a>
      <header className="id-header sticky top-0 z-40 border-b">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="id-brand flex min-h-12 items-center gap-2.5 py-2.5" aria-label="ID Master library">
            <span className="id-mark"><BookOpen size={20} aria-hidden="true" /></span>
            <span className="text-lg font-bold tracking-tight">ID Master</span>
          </Link>
          <nav aria-label="Primary" className="id-primary-nav flex gap-1 sm:gap-3">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                end={to === '/'}
                to={to}
                aria-current={to === '/learn' && ['/cases', '/assessment'].includes(pathname) ? 'location' : undefined}
                className={({ isActive }) => `id-nav-link ${isActive || (to === '/learn' && ['/cases', '/assessment'].includes(pathname)) ? 'is-current' : ''}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" ref={main} tabIndex={-1} className="id-main flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 md:py-10 lg:px-8">{children}</div>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <span className="font-semibold text-foreground">ID Master</span>
          <p>Synthetic cases for learning. For patient care, use current guidance and local protocols.</p>
        </div>
      </footer>
    </div>
  )
}
