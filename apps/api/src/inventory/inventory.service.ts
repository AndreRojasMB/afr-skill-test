import { BadRequestException, Injectable } from "@nestjs/common";
import { InventoryMovementType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInventoryItemDto } from "./dto/create-inventory-item.dto";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.inventoryItem.findMany({ include: { component: true }, orderBy: { warehouseName: "asc" } });
  }

  upsertItem(dto: CreateInventoryItemDto) {
    return this.prisma.inventoryItem.upsert({
      where: {
        componentId_warehouseName: {
          componentId: dto.componentId,
          warehouseName: dto.warehouseName ?? "Almacen central",
        },
      },
      update: { currentStock: dto.currentStock },
      create: { ...dto, warehouseName: dto.warehouseName ?? "Almacen central" },
      include: { component: true },
    });
  }

  findMovements() {
    return this.prisma.inventoryMovement.findMany({
      include: { component: true, user: { select: { id: true, name: true } }, maintenance: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async createMovement(dto: CreateInventoryMovementDto, fallbackUserId?: string) {
    const userId = dto.userId ?? fallbackUserId;
    if (!userId) throw new BadRequestException("Debe indicar userId o usar JWT.");
    const warehouseName = dto.warehouseName ?? "Almacen central";
    const multiplier = dto.type === InventoryMovementType.IN ? 1 : dto.type === InventoryMovementType.OUT ? -1 : 0;

    return this.prisma.$transaction(async (tx) => {
      const item = await tx.inventoryItem.upsert({
        where: { componentId_warehouseName: { componentId: dto.componentId, warehouseName } },
        update: {},
        create: { componentId: dto.componentId, warehouseName, currentStock: 0 },
      });

      const nextStock = dto.type === InventoryMovementType.ADJUSTMENT ? dto.quantity : item.currentStock + dto.quantity * multiplier;
      if (nextStock < 0) throw new BadRequestException("Stock insuficiente para registrar salida.");

      await tx.inventoryItem.update({ where: { id: item.id }, data: { currentStock: nextStock } });

      return tx.inventoryMovement.create({
        data: {
          componentId: dto.componentId,
          type: dto.type,
          quantity: dto.quantity,
          reason: dto.reason,
          maintenanceId: dto.maintenanceId,
          userId,
        },
        include: { component: true, user: { select: { id: true, name: true } }, maintenance: true },
      });
    });
  }

  async lowStock() {
    const items = await this.prisma.inventoryItem.findMany({ include: { component: true } });
    return items.filter((item) => item.currentStock <= item.component.minimumStock);
  }
}
