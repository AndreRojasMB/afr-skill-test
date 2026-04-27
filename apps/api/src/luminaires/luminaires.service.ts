import { Injectable } from "@nestjs/common";
import { Prisma, LuminaireStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLuminaireDto } from "./dto/create-luminaire.dto";
import { LuminaireQueryDto } from "./dto/luminaire-query.dto";
import { UpdateLuminaireDto } from "./dto/update-luminaire.dto";

@Injectable()
export class LuminairesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: LuminaireQueryDto) {
    const where: Prisma.LuminaireWhereInput = {
      status: query.status,
      technology: query.technology,
      powerWatts: query.powerWatts,
      zoneId: query.zoneId,
      zone: query.zone ? { name: { contains: query.zone, mode: "insensitive" } } : undefined,
    };

    return this.prisma.luminaire.findMany({
      where,
      include: this.includeRelations(),
      orderBy: { createdAt: "desc" },
    });
  }

  create(dto: CreateLuminaireDto, changedById?: string) {
    const qrCode = dto.qrCode ?? `QR-${dto.municipalCode}`;
    return this.prisma.luminaire.create({
      data: {
        ...dto,
        qrCode,
        installedAt: dto.installedAt ? new Date(dto.installedAt) : undefined,
        stateHistory: {
          create: {
            previousStatus: null,
            newStatus: dto.status ?? LuminaireStatus.OPERATIVA,
            changedById,
            reason: "Registro inicial de luminaria.",
          },
        },
      },
      include: this.includeRelations(),
    });
  }

  findOne(id: string) {
    return this.prisma.luminaire.findUnique({ where: { id }, include: this.includeRelations() });
  }

  findByQr(qrCode: string) {
    return this.prisma.luminaire.findUnique({ where: { qrCode }, include: this.includeRelations() });
  }

  async update(id: string, dto: UpdateLuminaireDto, changedById?: string) {
    const before = await this.prisma.luminaire.findUnique({ where: { id } });
    const { reason, ...data } = dto;
    const next = await this.prisma.luminaire.update({
      where: { id },
      data: {
        ...data,
        installedAt: dto.installedAt ? new Date(dto.installedAt) : undefined,
      },
      include: this.includeRelations(),
    });

    if (dto.status && before?.status !== dto.status) {
      await this.prisma.stateHistory.create({
        data: {
          luminaireId: id,
          previousStatus: before?.status,
          newStatus: dto.status,
          changedById,
          reason: reason ?? "Cambio de estado registrado desde panel.",
        },
      });
    }

    return next;
  }

  remove(id: string) {
    return this.prisma.luminaire.delete({ where: { id } });
  }

  private includeRelations() {
    return {
      zone: { include: { district: { include: { municipality: true } } } },
      components: { include: { component: true } },
      incidents: { orderBy: { createdAt: "desc" as const }, take: 10 },
      maintenances: { orderBy: { createdAt: "desc" as const }, take: 10, include: { technician: { select: { id: true, name: true } } } },
      stateHistory: { orderBy: { createdAt: "desc" as const }, take: 10 },
    };
  }
}
