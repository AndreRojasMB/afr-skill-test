import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { CreateZoneDto } from "./dto/create-zone.dto";

@Injectable()
export class ZonesService {
  constructor(private readonly prisma: PrismaService) {}

  findDistricts() {
    return this.prisma.district.findMany({ include: { zones: true, municipality: true }, orderBy: { name: "asc" } });
  }

  createDistrict(dto: CreateDistrictDto) {
    return this.prisma.district.create({ data: dto });
  }

  findZones() {
    return this.prisma.zone.findMany({ include: { district: { include: { municipality: true } } }, orderBy: { name: "asc" } });
  }

  createZone(dto: CreateZoneDto) {
    return this.prisma.zone.create({ data: dto });
  }
}
