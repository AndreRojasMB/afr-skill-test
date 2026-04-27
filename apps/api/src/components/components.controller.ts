import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { ComponentsService } from "./components.service";
import { CreateComponentDto } from "./dto/create-component.dto";
import { UpdateComponentDto } from "./dto/update-component.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERVISOR", "ALMACEN")
@Controller("components")
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  findAll() {
    return this.componentsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateComponentDto) {
    return this.componentsService.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateComponentDto) {
    return this.componentsService.update(id, dto);
  }
}
