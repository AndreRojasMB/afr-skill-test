# Configuracion Neon

1. Crear una cuenta/proyecto en Neon.
2. Crear una base PostgreSQL para el ambiente deseado.
3. Copiar la cadena de conexion con SSL.
4. Crear `apps/api/.env` a partir de `apps/api/.env.example`.
5. Pegar la cadena en `DATABASE_URL`.
6. Definir `JWT_SECRET` con un valor largo y privado.
7. Ejecutar:

```bash
npm install
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

8. Levantar API:

```bash
npm run dev -w @smart-city/api
```

9. Verificar:

```bash
curl http://localhost:4000/health
```

No inventar ni versionar credenciales reales. `.env` esta ignorado por Git.
