import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.maintenance.findMany({
      include: this.includeRelations(),
      orderBy: { createdAt: "desc" },
    });
  }

  create(dto: CreateMaintenanceDto) {
    const { componentsUsed, reviewedAt, ...data } = dto;
    return this.prisma.maintenance.create({
      data: {
        ...data,
        reviewedAt: reviewedAt ? new Date(reviewedAt) : undefined,
        components: componentsUsed?.length
          ? {
              create: componentsUsed.map((component) => ({
                componentId: component.componentId,
                quantityUsed: component.quantityUsed,
              })),
            }
          : undefined,
      },
      include: this.includeRelations(),
    });
  }

  findOne(id: string) {
    return this.prisma.maintenance.findUnique({ where: { id }, include: this.includeRelations() });
  }

  update(id: string, dto: UpdateMaintenanceDto) {
    return this.prisma.maintenance.update({
      where: { id },
      data: { ...dto, reviewedAt: dto.reviewedAt ? new Date(dto.reviewedAt) : undefined },
      include: this.includeRelations(),
    });
  }

  private includeRelations() {
    return {
      luminaire: { select: { id: true, municipalCode: true, qrCode: true, status: true, address: true } },
      technician: { select: { id: true, name: true, email: true } },
      components: { include: { component: true } },
    };
  }
}
