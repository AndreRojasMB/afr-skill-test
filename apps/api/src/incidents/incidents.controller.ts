import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "../common/auth-user";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { UpdateIncidentDto } from "./dto/update-incident.dto";
import { IncidentsService } from "./incidents.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "TECNICO", "AUDITOR")
@Controller("incidents")
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }

  @Post()
  @Roles("ADMIN", "SUPERVISOR", "TECNICO")
  create(@Body() dto: CreateIncidentDto, @Req() request: RequestWithUser) {
    return this.incidentsService.create(dto, request.user?.sub);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.incidentsService.findOne(id);
  }

  @Patch(":id")
  @Roles("ADMIN", "SUPERVISOR", "TECNICO")
  update(@Param("id") id: string, @Body() dto: UpdateIncidentDto) {
    return this.incidentsService.update(id, dto);
  }
}
