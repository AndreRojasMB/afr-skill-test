import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { UpdateIncidentDto } from "./dto/update-incident.dto";

@Injectable()
export class IncidentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.incident.findMany({ include: this.includeRelations(), orderBy: { createdAt: "desc" } });
  }

  create(dto: CreateIncidentDto, fallbackUserId?: string) {
    const reportedById = dto.reportedById ?? fallbackUserId;
    if (!reportedById) throw new BadRequestException("Debe indicar reportedById o usar JWT.");
    return this.prisma.incident.create({
      data: { ...dto, reportedById },
      include: this.includeRelations(),
    });
  }

  findOne(id: string) {
    return this.prisma.incident.findUnique({ where: { id }, include: this.includeRelations() });
  }

  update(id: string, dto: UpdateIncidentDto) {
    return this.prisma.incident.update({ where: { id }, data: dto, include: this.includeRelations() });
  }

  private includeRelations() {
    return {
      luminaire: { select: { id: true, municipalCode: true, qrCode: true, address: true, status: true } },
      reportedBy: { select: { id: true, name: true, email: true } },
    };
  }
}
