import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMunicipalityDto } from "./dto/create-municipality.dto";

@Injectable()
export class MunicipalitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.municipality.findMany({
      include: { districts: { include: { zones: true } } },
      orderBy: { name: "asc" },
    });
  }

  create(dto: CreateMunicipalityDto) {
    return this.prisma.municipality.create({ data: dto });
  }
}
