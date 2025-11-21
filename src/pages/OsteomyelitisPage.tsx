import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function OsteomyelitisPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Osteomyelitis & Septic Arthritis
        </h1>
        <p className="text-muted-foreground mt-2">
          Diagnostic pathways and organism patterns
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Osteomyelitis Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Hematogenous Osteomyelitis</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Spread via bloodstream; most common in children and elderly
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Children: typically metaphysis of long bones</li>
                <li>Adults: typically vertebral bodies (vertebral osteomyelitis)</li>
                <li>Risk factors: bacteremia, IVDU, immunosuppression</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Contiguous Osteomyelitis</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Direct spread from adjacent infection or trauma
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Post-traumatic or post-surgical</li>
                <li>Diabetic foot infections</li>
                <li>Pressure ulcers</li>
                <li>Dental infections spreading to mandible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Organisms by Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                scenario: 'Hematogenous (Adults)',
                organisms: 'S. aureus (including MRSA), E. coli, Pseudomonas',
              },
              {
                scenario: 'Hematogenous (Children)',
                organisms: 'S. aureus, Kingella kingae, Group A Strep',
              },
              {
                scenario: 'Vertebral Osteomyelitis',
                organisms: 'S. aureus, E. coli, TB (Pott disease)',
              },
              {
                scenario: 'IVDU',
                organisms: 'S. aureus, Pseudomonas, Candida',
              },
              {
                scenario: 'Diabetic Foot',
                organisms: 'Polymicrobial: S. aureus, Streptococci, Anaerobes, Gram-negatives',
              },
              {
                scenario: 'Prosthetic Joint',
                organisms: 'Coagulase-negative Staph, S. aureus, Streptococci',
              },
              {
                scenario: 'Sickle Cell Disease',
                organisms: 'Salmonella, S. aureus',
              },
            ].map((item) => (
              <div key={item.scenario} className="p-3 border rounded-lg">
                <p className="font-medium text-sm">{item.scenario}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.organisms}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Imaging</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Plain Radiographs</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    First-line but insensitive early (changes visible after 10-14 days). Look for
                    periosteal elevation, lytic lesions, sclerosis.
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-blue-500/10">
                  <p className="font-medium text-sm">MRI (Preferred)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Most sensitive and specific. Detects early marrow edema, soft tissue involvement,
                    and complications (abscess). Gold standard when available.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">CT Scan</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Better for cortical bone detail and sequestra. Useful when MRI contraindicated.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Nuclear Medicine</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bone scan, labeled WBC scan. Useful for multifocal disease or prosthetic joints.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Laboratory & Microbiology</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Blood cultures (often positive in hematogenous spread)',
                  'ESR and CRP (elevated but nonspecific; useful for monitoring treatment)',
                  'Bone biopsy/aspiration for culture (gold standard for organism identification)',
                  'Avoid superficial swab cultures (unreliable, contaminated)',
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Septic Arthritis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-2 rounded-lg bg-red-500/10 border-red-500/20">
              <p className="font-semibold">Key Point: Joint Aspiration is Mandatory</p>
              <p className="text-sm text-muted-foreground mt-1">
                Hot, swollen, painful joint with decreased range of motion requires synovial fluid
                analysis to rule out septic arthritis.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Synovial Fluid Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Parameter</th>
                      <th className="text-left p-2">Septic Arthritis</th>
                      <th className="text-left p-2">Non-septic Inflammatory</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="p-2 font-medium text-foreground">WBC count</td>
                      <td className="p-2">{'>'}50,000 (often {'>'}100,000)</td>
                      <td className="p-2">2,000-50,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium text-foreground">PMN %</td>
                      <td className="p-2">{'>'}90%</td>
                      <td className="p-2">50-90%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium text-foreground">Gram stain</td>
                      <td className="p-2">Positive in ~50%</td>
                      <td className="p-2">Negative</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium text-foreground">Culture</td>
                      <td className="p-2">Often positive (70-90%)</td>
                      <td className="p-2">Negative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Common Organisms in Septic Arthritis</h3>
              <div className="space-y-2">
                {[
                  { population: 'Adults (non-gonococcal)', organism: 'S. aureus (most common)' },
                  { population: 'Young sexually active adults', organism: 'Neisseria gonorrhoeae' },
                  { population: 'Prosthetic joint infection', organism: 'S. aureus, CoNS, Streptococci' },
                  { population: 'IVDU', organism: 'S. aureus, Pseudomonas, Candida' },
                  { population: 'Immunocompromised', organism: 'Gram-negatives, atypical organisms' },
                ].map((item) => (
                  <div key={item.population} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{item.population}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.organism}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Management Principles</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Urgent drainage (arthrocentesis or surgical washout)',
                  'Empiric antibiotics after cultures obtained',
                  'Most require surgical drainage (especially hip, shoulder)',
                  'Serial aspirations for monitoring/repeat drainage',
                  'Prolonged antibiotic course (typically 3-4 weeks)',
                ].map((principle) => (
                  <li key={principle} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
