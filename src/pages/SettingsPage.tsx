import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun } from 'lucide-react'

export function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Customize your learning experience
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Choose between light and dark mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="font-medium">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <Button onClick={toggleTheme} variant="outline">
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About ID Master</CardTitle>
          <CardDescription>
            Interactive infectious disease learning platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Mission</h3>
            <p className="text-sm text-muted-foreground">
              ID Master is designed to help medical professionals and students master
              infectious disease reasoning through interactive, case-based learning.
              Our platform covers high-yield topics including sepsis, HIV, hepatitis,
              endocarditis, osteomyelitis, skin infections, STIs, and UTIs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Mobile-first, responsive design</li>
              <li>Offline-capable for learning on the go</li>
              <li>Interactive clinical scenarios</li>
              <li>Comprehensive assessment questions</li>
              <li>Evidence-based educational content</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disclaimers</CardTitle>
          <CardDescription>
            Important information about using this platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Educational Purpose Only</h3>
              <p>
                This application is designed for educational purposes only. It is not intended
                to provide medical advice, diagnosis, or treatment recommendations. All clinical
                scenarios and data presented are synthetic and for learning purposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Not a Substitute for Professional Judgment</h3>
              <p>
                The information provided should not replace clinical judgment or be used as a
                sole basis for patient care decisions. Always consult current clinical guidelines,
                institutional protocols, and senior colleagues when managing patients.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">No Dosing Information</h3>
              <p>
                This platform provides conceptual therapeutic pathways only and does not include
                specific drug dosing information. Always refer to current prescribing guidelines
                and pharmacology references for dosing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Synthetic Data</h3>
              <p>
                All laboratory values, microbiology results, and case scenarios are synthetic
                and created for educational purposes. They do not represent real patient data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Continuous Learning</h3>
              <p>
                Medical knowledge evolves rapidly. While we strive to maintain current
                educational content, always verify information with the most recent clinical
                guidelines and evidence-based resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Version Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ID Master v1.0.0
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
