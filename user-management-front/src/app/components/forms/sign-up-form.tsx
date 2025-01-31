/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const userSignUpFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'O nome é obrigatório')
    .regex(/^[A-Za-z]+$/, 'Insira apenas letras'),
  lastName: z
    .string()
    .min(1, 'O sobrenome é obrigatório')
    .regex(/^[A-Za-z]+$/, 'Insira apenas letras'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})

type UserSignUpFormSchemaType = z.infer<typeof userSignUpFormSchema>

export interface UserResponse {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export function SignUpForm() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [, setCreateNewUser] = useState<any>()

  const { handleSubmit, register, formState, reset } =
    useForm<UserSignUpFormSchemaType>({
      resolver: zodResolver(userSignUpFormSchema),
    })

  const { errors, isSubmitting } = formState

  async function handleCreateNewUser(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    const { firstName, lastName, ...rest } = data

    const newData = {
      ...rest,
      name: `${firstName} ${lastName}`,
    }

    try {
      const response = await fetch('http://localhost:4000/entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const dataResponse: UserResponse = await response.json()
      const formattedData = structuredClone(dataResponse) as Omit<
        UserResponse,
        'password'
      > & { password?: string }

      delete formattedData.password

      setCreateNewUser(newData)
      localStorage.setItem(
        '@vida-verde:loggedUser',
        JSON.stringify(formattedData),
      )
      reset()

      alert('Usuário criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar o usuário:', error)
      alert('Erro ao criar o usuário. Por favor, tente novamente.')
    }
  }
  return (
    <form onSubmit={handleSubmit(handleCreateNewUser)}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <div className="flex flex-col gap-1">
              <Input
                id="first-name"
                placeholder="John"
                required
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-xs text-red-600">
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <div className="flex flex-col gap-1">
              <Input
                id="last-name"
                placeholder="Doe"
                required
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className="text-xs text-red-600">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex flex-col gap-1">
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              required
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex flex-col gap-1">
            <Input
              id="password"
              type="password"
              required
              {...register('password')}
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Create an account
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        {/* <Link to="/login" className="underline">
          Sign in
        </Link> */}
      </div>
    </form>
  )
}
