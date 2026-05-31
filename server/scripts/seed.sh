#!/bin/bash
set -e

echo "============================================"
echo "  NutriProgress - Database Seed"
echo "============================================"

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-nutriprogress_dev}
DB_USER=${DB_USER:-nutriprogress}
export PGPASSWORD=${DB_PASSWORD:-nutriprogress123}

echo "Conectando em $DB_HOST:$DB_PORT/$DB_NAME..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"; do
    echo "Aguardando PostgreSQL..."
    sleep 2
done

echo "PostgreSQL disponível. Executando seed..."

psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" << 'SQL'

INSERT INTO users (id, email, password_hash, role, is_active, email_verified)
VALUES (
    gen_random_uuid(),
    'admin@nutriprogress.com',
    '$2a$10$placeholder_hash_change_in_production',
    'ADMIN',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

DO $$
BEGIN
    RAISE NOTICE 'Seed executado com sucesso em %', NOW();
END $$;

SQL

echo "Seed finalizado com sucesso!"
