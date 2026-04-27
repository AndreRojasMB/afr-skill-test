import { LuminaireStatus, LuminaireTechnology } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class LuminaireQueryDto {
  @IsOptional()
  @IsEnum(LuminaireStatus)
  status?: LuminaireStatus;

  @IsOptional()
  @IsEnum(LuminaireTechnology)
  technology?: LuminaireTechnology;

  @IsOptional()
  @IsString()
  zoneId?: string;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  powerWatts?: number;
}
