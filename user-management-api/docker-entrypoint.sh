#!/bin/sh

# Aguarda o PostgreSQL estar pronto
echo "Waiting for PostgreSQL to start..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL started"

# Verifica se o banco já foi inicializado
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT COUNT(*) FROM \"User\"" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Inicializando banco de dados..."
    psql -U $POSTGRES_USER -d $POSTGRES_DB -f /docker-entrypoint-initdb.d/init.sql
fi

# Executa as migrações
echo "Running migrations..."
npx prisma migrate deploy

# Inicia a aplicação
echo "Starting application..."
npm run start:prod