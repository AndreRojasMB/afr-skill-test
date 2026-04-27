import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateInventoryItemDto {
  @IsString()
  componentId!: string;

  @IsInt()
  @Min(0)
  currentStock!: number;

  @IsOptional()
  @IsString()
  warehouseName?: string;
}
