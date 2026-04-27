import { ComponentCategory } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateComponentDto {
  @IsString()
  name!: string;

  @IsEnum(ComponentCategory)
  category!: ComponentCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minimumStock?: number;
}
