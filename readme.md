# Sistema de Gerenciamento de Usuários 🚀

Sistema full-stack para gerenciamento de usuários com autenticação JWT, desenvolvido com Next.js, NestJS e PostgreSQL.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Troubleshooting](#troubleshooting)

## 👀 Visão Geral

Sistema completo para gerenciamento de usuários com:

- Interface web moderna e responsiva
- API RESTful com autenticação JWT
- Banco de dados relacional
- Documentação Swagger
- Docker para fácil implantação

### Funcionalidades Principais

- ✅ Autenticação de usuários
- 📝 CRUD completo de usuários
- 🔒 Proteção de rotas

## 🛠 Tecnologias

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Context API

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Swagger

## ⚙️ Pré-requisitos

- Docker
- Docker Compose
- Git
- Node.js 18+ (para desenvolvimento local)
- NPM ou Yarn

## 📦 Instalação

### Via Docker (Recomendado)

## 🚀 Início Rápido com Docker

### Pré-requisitos

- Docker
- Docker Compose
- Git

### 1. Clone o Repositório

git clone <https://github.com/Angel0Gabriel/PonceTechFullStack.git>

### 2. Executando com Docker Compose

docker-compose up -d --build

Este comando irá:

- Iniciar o banco PostgreSQL
- Construir e iniciar o backend (porta 3000)
- Construir e iniciar o frontend (porta 3001)

## 🎯 Uso

### Acessando a Aplicação

- Frontend: `http://localhost:3001/login`
- API Docs (Swagger): `http://localhost:3000/api/docs`

### Usuários Padrão <você DEVE utilizar os usuários padrão para testar a aplicação>

- O sistema já vem com alguns usuários pré-cadastrados:

| Email            | Descrição             |
| ---------------- | --------------------- |
| admin@teste.com  | Usuário administrador |
| user@teste.com   | Usuário padrão        |
| joao@exemplo.com | Usuário de exemplo    |

## 🔌 API Endpoints

## 🔐 Autenticação

| Método | Rota          | Descrição    | Auth |
| ------ | ------------- | ------------ | ---- |
| POST   | `/auth/login` | Login na API | ✅   |

### Login

1. Faça login usando POST `/auth/login`
2. Copie o `access_token` da resposta
3. Configure o token na aba Auth da requisição desejada
4. Execute a requisição protegida

### Usuários

| Método | Rota         | Descrição        | Auth |
| ------ | ------------ | ---------------- | ---- |
| GET    | `/users`     | Lista usuários   | ✅   |
| GET    | `/users/:id` | Busca usuário    | ✅   |
| POST   | `/users`     | Cria usuário     | ✅   |
| PATCH  | `/users/:id` | Atualiza usuário | ✅   |
| DELETE | `/users/:id` | Remove usuário   | ✅   |

### Exemplos na prática

- Email: admin@teste.com
- Email: user@teste.com
- Email: joao@exemplo.com

1. Como Fazer Login

   Use a rota de login:
   Método: POST
   URL: http://localhost:3000/auth/login
   Body (JSON):
   {
   "email": "admin@teste.com" <Email do usuário que você quer logar>
   }

2. A API retornará uma resposta com o token de acesso, algo similar a:
   {
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }

3. Como Usar o Token de Acesso no Insomnia
   Copiar o Token:
   Após fazer login, copie o access_token da resposta.

   Configurar o Token nas Requisições:
   Abra a requisição que necessita autenticação (exemplo: "Lista usuários")
   Vá na aba "Auth"
   Selecione o tipo "Bearer Token"
   Cole o token no campo "TOKEN"

Dicas Importantes:

- O token tem um tempo de expiração(1 hora)
- Se receber erro 401 (Unauthorized), provavelmente precisa fazer login novamente
- Mantenha o token atualizado para continuar acessando as rotas protegidas
- Para testar, sempre comece fazendo login para obter um token válido

## Observações Importantes

- A maioria das rotas trabalha com dados no formato JSON
- Mantenha o token atualizado para continuar acessando as rotas protegidas

## Fluxo de Uso

1. Faça login usando POST `/auth/login`
2. Copie o `access_token` da resposta
3. Configure o token na aba Auth da requisição desejada
4. Execute a requisição protegida

#### Usuários

`Listar usuários`
GET http://localhost:3000/users

- **Auth**: Bearer Token necessário
- **Content-Type**: application/json

---

`Listar usuários por ID`
GET http://localhost:3000/users/:id

- **Auth**: Bearer Token necessário
- **Content-Type**: application/json

---

`Atualizar usuário`
PATCH http://localhost:3000/users/:id

- **Auth**: Bearer Token necessário
- **Content-Type**: application/json

body `JSON`
{
"name": "João Silva",
"email": "joao@exemplo.com",
"birthDate": "1990-01-01T00:00:00.000Z",
"status": true
}

---

`Apagar usuário`
DELETE http://localhost:3000/users/:id

- **Auth**: Bearer Token necessário
- **Content-Type**: application/json

---

`Criar usuário`
POST http://localhost:3000/users

- **Auth**: Bearer Token necessário
- **Content-Type**: application/json

body `JSON`
{
"name": "João Silva",
"email": "joao@exemplo.com",
"birthDate": "1990-01-01T00:00:00.000Z",
"status": true
}

---

### Parar os Containers

docker-compose down -v
