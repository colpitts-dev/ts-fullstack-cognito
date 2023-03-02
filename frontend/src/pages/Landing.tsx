import { Link } from 'react-router-dom'
import { PublicLayout } from '../components/layouts/PublicLayout'

import { useAuth } from '../hooks/useAuth'

export const LandingPage = () => {
  const auth = useAuth()

  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-screen mt-4 text-center">
        <section className="-mt-24 space-y-4">
          <h1 className="text-4xl font-bold">AWS Cognito Starter</h1>

          {auth.isAuthenticated ? (
            <>
              <h3 className="text-xl font-bold text-green-500">
                STATUS: AUTHENTICATED
              </h3>
              <Link to="/dashboard">
                <p className="text-lg underline">Go to Dashboard</p>
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-red-500">
                STATUS: NOT AUTHENTICATED
              </h3>
              <Link to="/signin">
                <p className="text-lg underline">Sign In</p>
              </Link>
            </>
          )}
        </section>
      </div>
    </PublicLayout>
  )
}
