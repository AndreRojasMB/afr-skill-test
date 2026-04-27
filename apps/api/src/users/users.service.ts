import { BadRequestException, Injectable } from "@nestjs/common";
import { RoleName } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: this.safeSelect(),
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id }, select: this.safeSelect() });
  }

  async create(dto: CreateUserDto) {
    const roleId = await this.resolveRoleId(dto.roleId, dto.roleName ?? "TECNICO");
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash: await bcrypt.hash(dto.password, 10),
        roleId,
        isActive: dto.isActive ?? true,
      },
      select: this.safeSelect(),
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: Record<string, unknown> = {
      name: dto.name,
      email: dto.email,
      isActive: dto.isActive,
    };

    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
    if (dto.roleId || dto.roleName) data.roleId = await this.resolveRoleId(dto.roleId, dto.roleName);

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.safeSelect(),
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: this.safeSelect(),
    });
  }

  private async resolveRoleId(roleId?: string, roleName?: RoleName) {
    if (roleId) return roleId;
    if (!roleName) throw new BadRequestException("Debe enviar roleId o roleName.");
    const role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new BadRequestException("Rol no encontrado.");
    return role.id;
  }

  private safeSelect() {
    return {
      id: true,
      name: true,
      email: true,
      isActive: true,
      role: { select: { id: true, name: true, description: true } },
      createdAt: true,
      updatedAt: true,
    };
  }
}
