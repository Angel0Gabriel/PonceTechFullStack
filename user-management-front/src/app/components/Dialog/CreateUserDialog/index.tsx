import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { PlusCircle } from 'lucide-react'
import { useContext } from 'react'
import { UsersContext } from '@/contexts/UsersContext'
import { CreateUserForm } from '../../forms/create-user'

export default function CreateUserDialog({ ...rest }) {
  const { isOpen, setIsOpen, selectedUser, setSelectedUser } =
    useContext(UsersContext)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...rest}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="h-8 gap-1"
          onClick={() => setSelectedUser(null)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedUser ? `Editar Usuário` : `Criar Usuário`}
          </DialogTitle>
          <DialogDescription>
            {selectedUser
              ? `Edite os detalhes do usuário e salve`
              : `Adicione um novo usuário`}
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-2">
          <CreateUserForm
            isEditing={!!selectedUser}
            initialData={selectedUser ?? undefined}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
