CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT true
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'admin@teste.com') THEN
        INSERT INTO "User" (email, name, "birthDate", status) VALUES
        ('admin@teste.com', 'Administrador', '1990-01-01T00:00:00.000Z', true),
        ('user@teste.com', 'Usuário Teste', '1995-05-15T00:00:00.000Z', true),
        ('joao@exemplo.com', 'João Silva', '1988-12-25T00:00:00.000Z', true);
    END IF;
END $$;