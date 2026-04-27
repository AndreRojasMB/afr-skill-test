# Base de Datos

## Motor

PostgreSQL, objetivo Neon. Prisma es el ORM y fuente de verdad del modelo inicial.

## Entidades principales

- `User`, `Role`, `Permission`, `RolePermission`
- `Municipality`, `District`, `Zone`
- `Luminaire`, `LuminaireComponent`, `StateHistory`
- `Incident`
- `Maintenance`, `MaintenanceComponent`
- `Component`, `InventoryItem`, `InventoryMovement`
- `AuditLog`

## Decisiones

- IDs UUID para evitar dependencia de secuencias por ambiente.
- `Role.name` usa enum `RoleName` para RBAC estable.
- `Luminaire.qrCode` y `municipalCode` son unicos.
- Inventario permite varios almacenes con `@@unique([componentId, warehouseName])`.
- Historial de estado queda separado en `StateHistory` para trazabilidad.
- Auditoria usa JSON opcional para `beforeData` y `afterData`.

## Seed

Incluye roles, permisos, usuarios demo, municipio Cochabamba, tres distritos/zonas, 12 luminarias con tecnologias variadas, componentes, inventario con stock bajo, incidencias, mantenimiento y logs de auditoria.

## Migraciones

Con Neon configurado:

```bash
npm run prisma:migrate
npm run seed
```
