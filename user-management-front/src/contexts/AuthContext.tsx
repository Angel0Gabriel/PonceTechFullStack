/* eslint-disable camelcase */
'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { getAuthToken, setAuthToken, clearAuthToken } from '@/services/api'
import { login } from '@/services/auth'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    setIsAuthenticated(!!token)

    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleLogin = async (email: string) => {
    try {
      const { access_token } = await login(email)
      setAuthToken(access_token)
      Cookies.set('authToken', access_token)
      setIsAuthenticated(true)
      router.push('/')
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    Cookies.remove('authToken')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
