import { Link, useLocation } from 'react-router-dom'
import { Home, Settings, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">ID Master</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 md:py-8 max-w-7xl mx-auto">
        {children}
      </main>

      <nav className="sticky bottom-0 z-50 w-full border-t bg-background md:hidden">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full space-y-1',
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/settings"
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full space-y-1',
              location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
