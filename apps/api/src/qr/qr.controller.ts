import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { QrService } from "./qr.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "TECNICO")
@Controller("qr")
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post("generate/:luminaireId")
  generate(@Param("luminaireId") luminaireId: string) {
    return this.qrService.generate(luminaireId);
  }

  @Get(":luminaireId")
  get(@Param("luminaireId") luminaireId: string) {
    return this.qrService.get(luminaireId);
  }
}
