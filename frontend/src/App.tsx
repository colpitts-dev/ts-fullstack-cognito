import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { VerifyPage } from './pages/Verify'
import { LandingPage } from './pages/Landing'
import { DashboardPage } from './pages/Dashboard'

function App() {
  const auth = useAuth()

  if (auth.isLoading) {
    return <div />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="verify" element={<VerifyPage />} />
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
