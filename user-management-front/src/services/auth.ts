export interface AuthResponse {
  access_token: string
}

export const login = async (email: string): Promise<AuthResponse> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Falha na autenticação')
  }

  return response.json()
}
