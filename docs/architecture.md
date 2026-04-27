# Arquitectura

## Vision

El MVP usa una arquitectura monorepo para separar experiencia web, API y contratos compartidos. El objetivo es entregar una base mantenible para gestion municipal de luminarias publicas con QR, trazabilidad tecnica y futura evolucion hacia IoT.

## Componentes

- `apps/web`: panel Next.js con rutas de dashboard, luminarias, QR, relevamiento, mantenimiento, incidencias, inventario, usuarios, auditoria y reportes.
- `apps/api`: API NestJS con modulos por dominio, JWT, RBAC, DTOs con `class-validator` y Prisma.
- `packages/shared`: constantes y tipos compartidos para roles, estados y enums principales.
- `apps/api/prisma`: schema, migraciones futuras y seed.

## Backend

Modulos iniciales:

- AuthModule
- UsersModule
- RolesModule
- MunicipalitiesModule
- ZonesModule
- LuminairesModule
- QrModule
- MaintenanceModule
- IncidentsModule
- InventoryModule
- ComponentsModule
- AuditLogsModule
- ReportsModule
- HealthModule

La API usa `JwtAuthGuard` y `RolesGuard`. Los roles previstos son `ADMIN`, `SUPERVISOR`, `TECNICO`, `ALMACEN` y `AUDITOR`.

## Frontend

El frontend evita importar directamente el proyecto v0 para no heredar problemas de providers, Tailwind/PostCSS o hydration. Se conserva la referencia en `legacy/smart-lighting-ui-v0` y se reimplementa una UI limpia con CSS propio, iconos Lucide y datos demo coherentes con el seed.

## Integracion

La web consume `NEXT_PUBLIC_API_URL`. En Fase 1 el login tiene fallback controlado si el backend no esta activo; la intencion final es JWT real contra `/auth/login`.
