#!/bin/sh
echo "Pokretanje migracija..."
npx prisma migrate deploy
echo "Pokretanje aplikacije..."
exec npm start