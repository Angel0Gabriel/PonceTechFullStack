import { UserData } from '@/app/components/UsersDashboard/components/UsersTable'

const BASE_URL = 'http://localhost:3000'

let authToken: string | null = null

export const setAuthToken = (token: string) => {
  authToken = token
  localStorage.setItem('authToken', token)
}

export const getAuthToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem('authToken')
  }
  return authToken
}

export const clearAuthToken = () => {
  authToken = null
  localStorage.removeItem('authToken')
}

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const token = getAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Algo deu errado')
  }
  return response.json()
}

export const createUser = async (data: UserData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: getHeaders(),
  })
  return handleResponse(response)
}

export const getUserById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    headers: getHeaders(),
  })
  return handleResponse(response)
}

export const updateUser = async (id: string, data: UserData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export const deleteUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleResponse(response)
}
