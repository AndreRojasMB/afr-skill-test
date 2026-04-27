# Sistema de Telegestion de Luminarias Publicas - Smart City QR MVP

Plataforma profesional para municipios que centraliza el inventario, trazabilidad y mantenimiento de luminarias publicas mediante codigos QR. La Fase 1 prioriza una implementacion viable sin hardware IoT: cada poste/luminaria tiene un QR unico que permite consultar ficha tecnica, reportar fallas y registrar mantenimiento desde campo.

## Stack

- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- Base de datos: PostgreSQL objetivo Neon
- ORM: Prisma
- Auth: JWT + bcrypt
- Permisos: RBAC por roles
- UI: dashboard municipal inspirado en la referencia local v0 conservada en `legacy/smart-lighting-ui-v0`
- Monorepo: npm workspaces

## Estructura

```text
apps/
  api/   NestJS API, Prisma schema y seed
  web/   Next.js dashboard
packages/
  shared/ tipos y constantes compartidas
docs/
  architecture.md
  database.md
  git-flow.md
  neon-setup.md
  phase-1-report.md
legacy/
  original-test-repo/
  smart-lighting-ui-v0/
```

## Instalacion

```bash
npm install
```

Copiar variables:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Configurar `DATABASE_URL` con la cadena de Neon y `JWT_SECRET` con un secreto largo. No subir `.env`.

## Comandos

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev -w @smart-city/api
npm run dev -w @smart-city/web
npm run lint
npm run typecheck
npm run build
```

Frontend local: `http://localhost:3000`

Backend local: `http://localhost:4000`

Health check: `GET http://localhost:4000/health`

## Credenciales demo

- `admin@demo.com` / `Admin123*`
- `supervisor@demo.com` / `Supervisor123*`
- `tecnico@demo.com` / `Tecnico123*`
- `almacen@demo.com` / `Almacen123*`

El login web intenta usar el backend real y, si no esta activo, usa fallback demo controlado para poder revisar la UI.

## Alcance Fase 1

- Registro y consulta de luminarias.
- Generacion/consulta de QR por luminaria.
- Vista simulada de escaneo QR mobile-first.
- Mantenimientos, incidencias, inventario y componentes.
- Usuarios, roles y RBAC basico.
- Auditoria y reportes iniciales.
- Prisma schema completo y seed demo para Cochabamba.
- Documentacion para Neon y Git Flow.

## Neon

Ver [docs/neon-setup.md](docs/neon-setup.md). Resumen:

1. Crear proyecto PostgreSQL en Neon.
2. Copiar `DATABASE_URL`.
3. Pegar en `apps/api/.env`.
4. Ejecutar `npm run prisma:migrate`.
5. Ejecutar `npm run seed`.

## Proximas fases

- GIS avanzado y mapas reales.
- App movil nativa y modo offline.
- Carga real de fotos a S3/MinIO.
- Integracion PLC/cableado, sensores IoT y telemetria.
- Analitica predictiva.
- Multi-municipio/SaaS.
- Reportes PDF avanzados.
- Portal ciudadano para reporte de fallas.
