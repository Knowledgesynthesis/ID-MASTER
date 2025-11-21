import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
