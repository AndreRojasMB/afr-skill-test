import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateComponentDto } from "./dto/create-component.dto";
import { UpdateComponentDto } from "./dto/update-component.dto";

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.component.findMany({ include: { inventoryItems: true }, orderBy: { name: "asc" } });
  }

  create(dto: CreateComponentDto) {
    return this.prisma.component.create({ data: dto });
  }

  update(id: string, dto: UpdateComponentDto) {
    return this.prisma.component.update({ where: { id }, data: dto, include: { inventoryItems: true } });
  }
}
