/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { boolean, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useContext, useEffect } from 'react'
import { UsersContext } from '@/contexts/UsersContext'
import { SelectDemo } from '../Select'
import { UserData } from '../UsersDashboard/components/UsersTable'
import { DatePickerDemo } from '../DatePicker'
import { createUser, getUsers, updateUser } from '@/services/api'

const CreateUserFormSchema = z.object({
  name: z.string().min(3, 'O nome deve conter pelo menos 3 letras'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  birthDate: z.date({
    required_error: 'Insira uma data de aniversário',
    invalid_type_error: 'Insira uma data válida',
  }),

  status: z.string({ message: 'Defina o status do funcionário' }),
})

type CreateUserFormSchemaType = z.infer<typeof CreateUserFormSchema>

type CreateUserFormProps = {
  initialData?: UserData
  isEditing?: boolean
}

export function CreateUserForm(props: CreateUserFormProps) {
  const defaultValues = {
    create: {
      name: '',
      email: '',
      birthDate: undefined,
      status: 'true',
    },
    edit: {
      name: props.initialData?.name,
      email: props.initialData?.email,
      birthDate: props.initialData?.birthDate
        ? new Date(props.initialData?.birthDate)
        : undefined,
      status: JSON.stringify(props.initialData?.status),
    },
  }

  const { handleSubmit, register, formState, reset, control } =
    useForm<CreateUserFormSchemaType>({
      resolver: zodResolver(CreateUserFormSchema),
      defaultValues: defaultValues[props.isEditing ? 'edit' : 'create'],
    })

  const { errors, isSubmitting } = formState

  const { setUsers, setIsOpen } = useContext(UsersContext)

  async function handleCreateUser(data: CreateUserFormSchemaType) {
    try {
      const { status } = data

      const parsedStatus = status === 'true'
      if (props.isEditing && props.initialData && props.initialData.id) {
        await handleUpdateUser(props.initialData.id, {
          ...data,
          status: String(parsedStatus),
        })

        const updatedUsers = await getUsers()
        setUsers(updatedUsers)
      } else {
        const newUser = { ...data, status: parsedStatus }

        const createdUser = await createUser(newUser)

        const updatedUsers = await getUsers()
        setUsers(updatedUsers)

        reset()
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Erro ao criar/atualizar usuário:', error)
      alert('Erro ao criar/atualizar usuário. Tente novamente.')
    }
  }

  async function handleUpdateUser(
    userId: string,
    updatedUserData: CreateUserFormSchemaType,
  ) {
    try {
      const userData = {
        ...updatedUserData,
        birthDate: updatedUserData.birthDate,
      }

      const updatedUser = await updateUser(userId, {
        ...updatedUserData,
        status: updatedUserData.status === 'true',
      })

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updatedUser } : user,
        ),
      )

      setIsOpen(false)
      reset()
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      alert('Erro ao atualizar usuário. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <div className="flex flex-col justify-center gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="flex flex-col gap-1">
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              {...register('name')}
            />
            {errors?.name && (
              <span className="text-xs text-red-600">
                {errors.name.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              id="email"
              type="text"
              placeholder="johndoe@example.com"
              required
              {...register('email')}
            />
            {errors?.email && (
              <span className="text-xs text-red-600">
                {errors.email.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
          </div>
          <div className="flex flex-col gap-1">
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePickerDemo
                  selected={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            {errors?.birthDate && (
              <span className="text-xs text-red-600">
                {errors.birthDate.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="status">Status</Label>
          </div>
          <div className="flex flex-col gap-1">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectDemo
                  data={[
                    { label: 'Ativo', value: 'true' },
                    { label: 'Inativo', value: 'false' },
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.status && (
              <span className="text-xs text-red-600">
                {errors.status.message}
              </span>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full mt-3">
            {props.isEditing ? 'Salvar mudanças' : 'Criar Usuário'}
          </Button>
        </div>
      </div>
    </form>
  )
}
