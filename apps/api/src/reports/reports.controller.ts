import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { ReportsService } from "./reports.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "AUDITOR")
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("dashboard")
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get("luminaires-by-status")
  luminairesByStatus() {
    return this.reportsService.luminairesByStatus();
  }

  @Get("incidents-by-priority")
  incidentsByPriority() {
    return this.reportsService.incidentsByPriority();
  }

  @Get("maintenance-by-technician")
  maintenanceByTechnician() {
    return this.reportsService.maintenanceByTechnician();
  }

  @Get("low-stock")
  lowStock() {
    return this.reportsService.lowStock();
  }

  @Get("technologies-installed")
  technologiesInstalled() {
    return this.reportsService.technologiesInstalled();
  }
}
