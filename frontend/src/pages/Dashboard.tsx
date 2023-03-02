import { useState } from 'react'

import { appConfig } from '../config'
import { useAuth } from '../hooks/useAuth'
import PrivateRoute from '../components/PrivateRoute'
import { DashboardLayout } from '../components/layouts/DashboardLayout'

export function DashboardPage() {
  const [resultData, setResultData] = useState('')
  const auth = useAuth()

  const handleClick = async () => {
    try {
      const res = await fetch(`${appConfig.backendServer}/dashboard`, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      })
      const data = await res.json()

      setResultData(JSON.stringify(data))
    } catch (error) {
      setResultData(JSON.stringify(error))
    }
  }

  if (auth.isLoading) {
    return <div />
  }

  return (
    <PrivateRoute>
      <DashboardLayout>
        <section className="w-full text-center">
          <h1 className="mb-8 text-5xl text-pink-600">
            Welcome {auth.username}!! 🎉
          </h1>
          <button
            className="py-3 mb-4 bg-green-600 px-7 text-bold"
            onClick={handleClick}
          >
            Fetch Message
          </button>
          <pre>{resultData}</pre>
        </section>
      </DashboardLayout>
    </PrivateRoute>
  )
}
