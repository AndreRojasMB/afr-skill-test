import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuditLogsService } from "./audit-logs.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "AUDITOR", "SUPERVISOR")
@Controller("audit-logs")
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  findAll() {
    return this.auditLogsService.findAll();
  }
}
