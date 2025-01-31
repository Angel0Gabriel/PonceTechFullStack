'use client'
import { Badge } from '@/components/ui/badge'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { MoreHorizontal } from 'lucide-react'

import { useContext, useEffect } from 'react'
import { UsersContext } from '@/contexts/UsersContext'
import { deleteUser, getUsers } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'

export interface UserData {
  id?: string
  name: string
  email: string
  birthDate: Date
  status: boolean
}

export default function UsersTable() {
  const { setIsOpen, setUsers, setSelectedUser, users } =
    useContext(UsersContext)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    async function fetchUsers() {
      if (!isAuthenticated) return

      try {
        const usersData = await getUsers()
        setUsers(usersData)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        alert('Erro ao buscar usuários. Tente novamente.')
      }
    }

    fetchUsers()
  }, [setIsOpen, setUsers, isAuthenticated])

  async function handleSetUserToEdit(user: UserData) {
    setSelectedUser(user)
    setIsOpen(true)
  }

  async function handleDeleteUser(id: string) {
    try {
      await deleteUser(id)

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
      alert('Erro ao excluir usuário. Tente novamente.')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">
              Data de Nascimento
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </>

          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id}>
              <>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.birthDate
                    ? new Date(user.birthDate).toLocaleDateString('pt-BR')
                    : 'Data inválida'}
                </TableCell>
                <TableCell>
                  {user.status === true ? (
                    <Badge variant="outline" className="bg-green-500 font-bold">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500 font-bold">
                      Inativo
                    </Badge>
                  )}
                </TableCell>
              </>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSetUserToEdit(user)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (user.id) handleDeleteUser(user.id)
                      }}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
