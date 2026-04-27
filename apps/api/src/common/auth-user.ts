import type { RoleName } from "@prisma/client";

export interface AuthUser {
  sub: string;
  email: string;
  role: RoleName;
}

export interface RequestWithUser {
  user?: AuthUser;
}
