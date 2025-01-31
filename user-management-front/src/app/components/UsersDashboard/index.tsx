/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Tabs, TabsContent } from '@/components/ui/tabs'

import UsersTable from './components/UsersTable'
import { useContext } from 'react'
import { UsersContext } from '@/contexts/UsersContext'
import CreateUserDialog from '../Dialog/CreateUserDialog'
import { useAuth } from '@/contexts/AuthContext'

export default function UsersDashboard() {
  const { users } = useContext(UsersContext)
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="clients">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <CreateUserDialog />
                <div className="relative ml-auto flex-1 md:grow-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                      >
                        <img
                          src="https://github.com/github.png"
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="overflow-hidden rounded-full"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <TabsContent value="clients">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Usuários</CardTitle>
                  <CardDescription>
                    Visualize e edite os usuários disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UsersTable />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Quantidade de Usuários: <strong>{users.length}</strong>{' '}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
