# Phase 1 Report

## Auditoria inicial

- El workspace local no estaba inicializado como repo Git.
- La raiz contenia la descarga v0 `Smart Lighting UI` con `app/`, `components/`, `hooks/`, `lib/`, `styles/`, `public/` y documentacion generada.
- El remoto `https://github.com/AndreRojasMB/afr-skill-test.git` tenia `main`, `franco-rojas` y estructura de ejercicios: `web-desarrollo`, `mobile-desarrollo`, `db-desarrollo`, `python-desarrollo`.
- La referencia v0 se movio a `legacy/smart-lighting-ui-v0`.
- La estructura original del remoto se movio a `legacy/original-test-repo`.

## Uso de referencia v0

Se inspeccionaron `layout.tsx`, `ClientWrapper`, `Navbar`, `Sidebar`, `LanguageProvider` y `MunicipalityProvider`. La nueva UI no importa esos providers para evitar errores previos de contexto, dependencias Tailwind/PostCSS e hydration. Se uso como referencia visual de dashboard municipal.

## Implementado

- Monorepo npm workspaces con `apps/web`, `apps/api`, `packages/shared` y `docs`.
- Prisma schema completo con entidades, relaciones y enums solicitados.
- Seed inicial con roles, usuarios demo, municipio, zonas, luminarias, inventario, incidencias, mantenimiento y auditoria.
- NestJS API con modulos de auth, users, roles, municipalities, zones, luminaires, QR, maintenance, incidents, inventory, components, audit logs, reports y health.
- JWT, bcrypt, DTOs con `class-validator` y RBAC basico.
- Next.js web con rutas de login, dashboard, luminarias, detalle, QR, relevamiento, mantenimiento, incidencias, inventario, usuarios, auditoria y reportes.
- `.env.example` para API y web.

## Verificaciones

- `npm install`: OK. Se instalaron dependencias y se genero `package-lock.json`.
- `npm audit --omit=dev`: OK, 0 vulnerabilidades despues de actualizar Nest a 11.x, bcrypt a 6.x y aplicar overrides para `lodash` y `postcss`.
- `npm run prisma:validate`: OK con `DATABASE_URL` temporal de ejemplo.
- `npm run prisma:generate`: OK, Prisma Client generado con Prisma 6.19.3. Prisma reporta que 7.8.0 existe como major update; no se adopto para evitar una migracion mayor en esta fase.
- `npm run typecheck`: OK.
- `npm run lint`: OK. En esta base el script de lint ejecuta `tsc --noEmit` por workspace.
- `npm run build -w @smart-city/api`: OK.
- `npm run build -w @smart-city/web`: OK.
- `npm run build`: OK para shared, API y web.
- `Invoke-WebRequest http://127.0.0.1:3000/dashboard`: OK, HTTP 200.

No se ejecuto `prisma migrate dev` ni `seed` contra una base real porque no hay `DATABASE_URL` Neon configurada en el workspace. Queda documentado en `docs/neon-setup.md`.

## Dev server

El frontend quedo levantado en segundo plano en `http://127.0.0.1:3000`.

## Pendiente

- Migraciones reales y seed contra Neon requieren `DATABASE_URL` real.
- Carga real de evidencias/fotos queda para fase futura.
- Mapas GIS avanzados e IoT no se implementan en Fase 1 por alcance.
