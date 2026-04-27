import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";
import { MaintenanceService } from "./maintenance.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "TECNICO", "ALMACEN")
@Controller("maintenance")
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, dto);
  }
}
