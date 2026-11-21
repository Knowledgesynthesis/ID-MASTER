import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun } from 'lucide-react'

export function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore()
  const dark = theme === 'dark'

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Theme preference is saved on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-medium">
              {dark ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
              {dark ? 'Dark mode' : 'Light mode'}
            </span>
            <Button onClick={toggleTheme} variant="outline">Switch to {dark ? 'light' : 'dark'} mode</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
