'use client'

import { UsersContextProvider } from '@/contexts/UsersContext'
import UsersDashboard from './components/UsersDashboard'

export default function Home() {
  return (
    <UsersContextProvider>
      <UsersDashboard />
    </UsersContextProvider>
  )
}
