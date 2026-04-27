import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.role.findMany({
      orderBy: { name: "asc" },
      include: { permissions: { include: { permission: true } } },
    });
  }

  create(dto: CreateRoleDto) {
    return this.prisma.role.upsert({
      where: { name: dto.name },
      update: { description: dto.description },
      create: dto,
    });
  }
}
