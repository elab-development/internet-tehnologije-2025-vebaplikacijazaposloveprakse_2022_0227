#!/bin/sh
echo "Pokretanje migracija..."
npx prisma migrate deploy
echo "Seedovanje baze..."
npx prisma db seed
echo "Pokretanje aplikacije..."
exec npm start