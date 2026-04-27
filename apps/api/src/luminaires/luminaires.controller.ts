import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "../common/auth-user";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateLuminaireDto } from "./dto/create-luminaire.dto";
import { LuminaireQueryDto } from "./dto/luminaire-query.dto";
import { UpdateLuminaireDto } from "./dto/update-luminaire.dto";
import { LuminairesService } from "./luminaires.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "TECNICO", "AUDITOR")
@Controller("luminaires")
export class LuminairesController {
  constructor(private readonly luminairesService: LuminairesService) {}

  @Get()
  findAll(@Query() query: LuminaireQueryDto) {
    return this.luminairesService.findAll(query);
  }

  @Post()
  @Roles("ADMIN", "SUPERVISOR")
  create(@Body() dto: CreateLuminaireDto, @Req() request: RequestWithUser) {
    return this.luminairesService.create(dto, request.user?.sub);
  }

  @Get("qr/:qrCode")
  findByQr(@Param("qrCode") qrCode: string) {
    return this.luminairesService.findByQr(qrCode);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.luminairesService.findOne(id);
  }

  @Patch(":id")
  @Roles("ADMIN", "SUPERVISOR", "TECNICO")
  update(@Param("id") id: string, @Body() dto: UpdateLuminaireDto, @Req() request: RequestWithUser) {
    return this.luminairesService.update(id, dto, request.user?.sub);
  }

  @Delete(":id")
  @Roles("ADMIN")
  remove(@Param("id") id: string) {
    return this.luminairesService.remove(id);
  }
}
