FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

# Adicionando script para aguardar o banco e executar migrações
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]