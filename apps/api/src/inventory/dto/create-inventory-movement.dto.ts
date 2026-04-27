import { InventoryMovementType } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateInventoryMovementDto {
  @IsString()
  componentId!: string;

  @IsEnum(InventoryMovementType)
  type!: InventoryMovementType;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsString()
  reason!: string;

  @IsOptional()
  @IsString()
  maintenanceId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  warehouseName?: string;
}
