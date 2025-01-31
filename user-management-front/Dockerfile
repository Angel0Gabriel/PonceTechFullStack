FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:3000

# Alterando o comando de inicialização
CMD ["npm", "run", "start"]