import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { CreateZoneDto } from "./dto/create-zone.dto";
import { ZonesService } from "./zones.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR")
@Controller()
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Get("districts")
  findDistricts() {
    return this.zonesService.findDistricts();
  }

  @Post("districts")
  createDistrict(@Body() dto: CreateDistrictDto) {
    return this.zonesService.createDistrict(dto);
  }

  @Get("zones")
  findZones() {
    return this.zonesService.findZones();
  }

  @Post("zones")
  createZone(@Body() dto: CreateZoneDto) {
    return this.zonesService.createZone(dto);
  }
}
