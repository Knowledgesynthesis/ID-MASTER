import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SepsisPage } from './pages/SepsisPage'
import { HIVPage } from './pages/HIVPage'
import { HepatitisPage } from './pages/HepatitisPage'
import { EndocarditisPage } from './pages/EndocarditisPage'
import { OsteomyelitisPage } from './pages/OsteomyelitisPage'
import { SkinInfectionsPage } from './pages/SkinInfectionsPage'
import { STIPage } from './pages/STIPage'
import { UTIPage } from './pages/UTIPage'
import { CasesPage } from './pages/CasesPage'
import { AssessmentPage } from './pages/AssessmentPage'
import { SettingsPage } from './pages/SettingsPage'
import { LearningLabPage } from './pages/LearningLabPage'
import { FebrileInfantPage } from './pages/FebrileInfantPage'
import { PediatricPneumoniaPage } from './pages/PediatricPneumoniaPage'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'

function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sepsis" element={<SepsisPage />} />
          <Route path="/hiv" element={<HIVPage />} />
          <Route path="/hepatitis" element={<HepatitisPage />} />
          <Route path="/endocarditis" element={<EndocarditisPage />} />
          <Route path="/osteomyelitis" element={<OsteomyelitisPage />} />
          <Route path="/skin" element={<SkinInfectionsPage />} />
          <Route path="/sti" element={<STIPage />} />
          <Route path="/uti" element={<UTIPage />} />
          <Route path="/febrile-infant" element={<FebrileInfantPage />} />
          <Route path="/pediatric-pneumonia" element={<PediatricPneumoniaPage />} />
          <Route path="/learn" element={<LearningLabPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={(
            <div className="mx-auto max-w-xl space-y-3 py-8">
              <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
              <p className="text-muted-foreground">Try finding the topic in the library.</p>
              <Link to="/" className="id-reset">Go to the library</Link>
            </div>
          )} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
