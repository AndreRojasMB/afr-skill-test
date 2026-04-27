import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateMunicipalityDto } from "./dto/create-municipality.dto";
import { MunicipalitiesService } from "./municipalities.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR")
@Controller("municipalities")
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMunicipalityDto) {
    return this.municipalitiesService.create(dto);
  }
}
