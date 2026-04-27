import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "../common/auth-user";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreateInventoryItemDto } from "./dto/create-inventory-item.dto";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";
import { InventoryService } from "./inventory.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "ALMACEN", "AUDITOR")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Post()
  @Roles("ADMIN", "SUPERVISOR", "ALMACEN")
  upsertItem(@Body() dto: CreateInventoryItemDto) {
    return this.inventoryService.upsertItem(dto);
  }

  @Post("movements")
  @Roles("ADMIN", "SUPERVISOR", "ALMACEN", "TECNICO")
  createMovement(@Body() dto: CreateInventoryMovementDto, @Req() request: RequestWithUser) {
    return this.inventoryService.createMovement(dto, request.user?.sub);
  }

  @Get("movements")
  findMovements() {
    return this.inventoryService.findMovements();
  }

  @Get("low-stock")
  lowStock() {
    return this.inventoryService.lowStock();
  }
}
