import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Activity, AlertCircle } from 'lucide-react'

interface OIInfo {
  name: string
  cd4Range: string
  description: string
  prophylaxis?: string
}

const opportunisticInfections: OIInfo[] = [
  {
    name: 'Candida (oral/esophageal)',
    cd4Range: '<200',
    description: 'White patches in mouth or throat, dysphagia',
    prophylaxis: 'Fluconazole (if recurrent)',
  },
  {
    name: 'Pneumocystis jirovecii pneumonia (PCP)',
    cd4Range: '<200',
    description: 'Dyspnea, dry cough, fever',
    prophylaxis: 'TMP-SMX (primary prophylaxis indicated)',
  },
  {
    name: 'Toxoplasma encephalitis',
    cd4Range: '<100',
    description: 'Headache, confusion, focal neurologic deficits',
    prophylaxis: 'TMP-SMX (same as PCP prophylaxis)',
  },
  {
    name: 'Cryptococcal meningitis',
    cd4Range: '<100',
    description: 'Headache, fever, altered mental status',
    prophylaxis: 'Fluconazole (in endemic areas)',
  },
  {
    name: 'Mycobacterium avium complex (MAC)',
    cd4Range: '<50',
    description: 'Fever, night sweats, weight loss, diarrhea',
    prophylaxis: 'Azithromycin or clarithromycin',
  },
  {
    name: 'Cytomegalovirus (CMV)',
    cd4Range: '<50',
    description: 'Retinitis, colitis, esophagitis',
    prophylaxis: 'Valganciclovir (if CMV viremia detected)',
  },
]

export function HIVPage() {
  const [selectedCD4, setSelectedCD4] = useState<number>(350)
  const [showProphylaxis, setShowProphylaxis] = useState(false)

  const getRelevantOIs = (cd4: number): OIInfo[] => {
    return opportunisticInfections.filter((oi) => {
      if (oi.cd4Range === '<200' && cd4 < 200) return true
      if (oi.cd4Range === '<100' && cd4 < 100) return true
      if (oi.cd4Range === '<50' && cd4 < 50) return true
      return false
    })
  }

  const getCD4Category = (cd4: number) => {
    if (cd4 >= 500) return { label: 'Normal/Near Normal', color: 'bg-green-500' }
    if (cd4 >= 200) return { label: 'Moderate Risk', color: 'bg-yellow-500' }
    if (cd4 >= 100) return { label: 'High Risk', color: 'bg-orange-500' }
    return { label: 'Critical Risk', color: 'bg-red-500' }
  }

  const relevantOIs = getRelevantOIs(selectedCD4)
  const cd4Category = getCD4Category(selectedCD4)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">HIV Management</h1>
        <p className="text-muted-foreground mt-2">
          Opportunistic infections, CD4 patterns, and ART overview
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            <Activity className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">CD4 Count</p>
              <p className="text-sm text-muted-foreground">
                Key marker for immune function; determines OI risk and need for prophylaxis
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Opportunistic Infections</p>
              <p className="text-sm text-muted-foreground">
                Infections that occur when immune system is severely compromised (CD4 {'<'} 200)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CD4 Ladder - Opportunistic Infection Risk</CardTitle>
          <CardDescription>
            Explore how different CD4 counts correlate with infection risks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium">CD4 Count: {selectedCD4} cells/μL</label>
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${cd4Category.color}`} />
                <span className="text-sm font-medium">{cd4Category.label}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="800"
              step="10"
              value={selectedCD4}
              onChange={(e) => setSelectedCD4(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>200</span>
              <span>500</span>
              <span>800</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Opportunistic Infections at CD4 = {selectedCD4}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProphylaxis(!showProphylaxis)}
              >
                {showProphylaxis ? 'Hide' : 'Show'} Prophylaxis
              </Button>
            </div>

            {relevantOIs.length === 0 ? (
              <div className="p-4 border rounded-lg bg-green-500/10 border-green-500/20">
                <p className="text-sm">
                  No major opportunistic infections typically occur at this CD4 level. Continue
                  monitoring and maintain ART adherence.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {relevantOIs.map((oi) => (
                  <div
                    key={oi.name}
                    className="p-3 border rounded-lg bg-muted/50 space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium">{oi.name}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        CD4 {oi.cd4Range}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{oi.description}</p>
                    {showProphylaxis && oi.prophylaxis && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-sm">
                          <span className="font-medium">Prophylaxis: </span>
                          {oi.prophylaxis}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Antiretroviral Therapy (ART) Overview</CardTitle>
          <CardDescription>Educational framework - not treatment guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Goals of ART</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Suppress viral replication to undetectable levels</li>
                <li>Restore and preserve immune function (increase CD4 count)</li>
                <li>Reduce HIV-related morbidity and mortality</li>
                <li>Prevent HIV transmission</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Major Drug Classes</h3>
              <div className="space-y-2">
                {[
                  {
                    class: 'NRTIs (Nucleoside Reverse Transcriptase Inhibitors)',
                    description: 'Backbone of most regimens; blocks reverse transcriptase enzyme',
                  },
                  {
                    class: 'NNRTIs (Non-Nucleoside Reverse Transcriptase Inhibitors)',
                    description: 'Alternative RT inhibitors with different binding site',
                  },
                  {
                    class: 'Integrase Inhibitors',
                    description: 'Prevents integration of viral DNA into host genome',
                  },
                  {
                    class: 'Protease Inhibitors',
                    description: 'Blocks viral protease enzyme needed for viral maturation',
                  },
                ].map((drug) => (
                  <div key={drug.class} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{drug.class}</p>
                    <p className="text-xs text-muted-foreground mt-1">{drug.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Typical Regimen Structure</h3>
              <p className="text-sm text-muted-foreground">
                Modern ART typically combines 2-3 drugs from different classes, often in
                single-tablet regimens to improve adherence. Common approach: 2 NRTIs + 1
                integrase inhibitor or NNRTI or boosted protease inhibitor.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Monitoring Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'CD4 count (immune recovery)',
                  'Viral load (suppression goal: undetectable)',
                  'Adherence assessment',
                  'Drug interactions and side effects',
                  'Resistance testing (if virologic failure)',
                  'Opportunistic infection screening',
                ].map((param) => (
                  <div key={param} className="flex items-start space-x-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{param}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Immune Reconstitution Inflammatory Syndrome (IRIS)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Paradoxical worsening of infection symptoms after starting ART due to recovering
            immune system. Most common in first 3 months of therapy.
          </p>
          <div className="space-y-2">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">When to suspect:</p>
              <p className="text-xs text-muted-foreground mt-1">
                New or worsening symptoms of known or subclinical OI shortly after ART
                initiation, with rising CD4 and falling viral load
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Common presentations:</p>
              <p className="text-xs text-muted-foreground mt-1">
                TB (most common), CMV retinitis, cryptococcal meningitis, MAC infection
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
