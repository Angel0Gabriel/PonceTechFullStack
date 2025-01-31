import { UserData } from '@/app/components/UsersDashboard/components/UsersTable'
import type React from 'react'
import { createContext, type Dispatch, type ReactNode, useState } from 'react'

type UsersContextType = {
  users: UserData[]
  setUsers: Dispatch<React.SetStateAction<UserData[]>>
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
  selectedUser: UserData | null
  setSelectedUser: Dispatch<React.SetStateAction<UserData | null>>
}

export const UsersContext = createContext({} as UsersContextType)

interface UsersContextProviderProps {
  children: ReactNode
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {
  const [users, setUsers] = useState<UserData[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
