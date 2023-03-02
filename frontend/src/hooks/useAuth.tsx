import { Amplify, Auth } from 'aws-amplify'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AwsConfigAuth } from '../config/auth'

Amplify.configure({ Auth: AwsConfigAuth })

interface UseAuth {
  isLoading: boolean
  isAuthenticated: boolean
  jwtToken: string
  username: string
  signIn: (username: string, password: string) => Promise<Result>
  signOut: () => void
}

interface Result {
  success: boolean
  message: string
}

type Props = {
  children?: React.ReactNode
}

const authContext = createContext({} as UseAuth)

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [jwtToken, setJwtToken] = useState('')

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(result => {
        setUsername(result.username)
        setJwtToken(result?.signInUserSession?.accessToken?.jwtToken)
        setIsAuthenticated(true)
        setIsLoading(false)
      })
      .catch(() => {
        setUsername('')
        setJwtToken('')
        setIsAuthenticated(false)
        setIsLoading(false)
      })
  }, [])

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password)
      setUsername(result.username)
      setJwtToken(result?.signInUserSession?.accessToken?.jwtToken)
      setIsAuthenticated(true)

      return { success: true, message: '' }
    } catch (error: any) {
      console.error(error.message)

      return {
        success: false,
        message: error.message,
      }
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      setUsername('')
      setIsAuthenticated(false)
      setJwtToken('')
      return { success: true, message: '' }
    } catch (error) {
      return {
        success: false,
        message: 'LOGOUT FAIL',
      }
    }
  }

  return {
    isLoading,
    isAuthenticated,
    jwtToken,
    username,
    signIn,
    signOut,
  }
}
