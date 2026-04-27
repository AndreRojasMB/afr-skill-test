# Git Flow

## Ramas

- `main`: rama estable remota.
- `develop`: integracion de desarrollo.
- `feature/phase-1-foundation`: trabajo actual de Fase 1.

## Flujo aplicado

```bash
git status
git branch --all
git checkout -b develop origin/main
git checkout -b feature/phase-1-foundation
```

## Commits usados

- `chore: inspect repository and prepare project structure`
- `chore: setup monorepo with Next.js and NestJS`
- `feat(api): add prisma schema and database seed`
- `feat(api): add auth users roles and RBAC`
- `feat(api): add luminaires qr maintenance incidents inventory modules`
- `feat(web): add dashboard layout and auth screens`
- `chore: update dependencies after security audit`
- `docs: add architecture database neon and phase 1 report`

## Merge recomendado

Despues de verificaciones:

```bash
git checkout develop
git merge --no-ff feature/phase-1-foundation
git checkout main
git merge --no-ff develop
```

No hacer push hasta confirmar variables, build y migraciones en el ambiente correcto.
