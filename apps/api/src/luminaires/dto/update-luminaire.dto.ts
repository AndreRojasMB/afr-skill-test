import { LuminaireStatus, LuminaireTechnology, PoleDisposition } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateLuminaireDto {
  @IsOptional()
  @IsString()
  qrCode?: string;

  @IsOptional()
  @IsString()
  municipalCode?: string;

  @IsOptional()
  @IsEnum(LuminaireTechnology)
  technology?: LuminaireTechnology;

  @IsOptional()
  @IsInt()
  @Min(1)
  powerWatts?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsDateString()
  installedAt?: string;

  @IsOptional()
  @IsInt()
  estimatedUsefulLifeHours?: number;

  @IsOptional()
  @IsEnum(LuminaireStatus)
  status?: LuminaireStatus;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  zoneId?: string;

  @IsOptional()
  @IsNumber()
  poleHeightMeters?: number;

  @IsOptional()
  @IsNumber()
  distanceBetweenPolesMeters?: number;

  @IsOptional()
  @IsEnum(PoleDisposition)
  poleDisposition?: PoleDisposition;

  @IsOptional()
  @IsNumber()
  monthlyConsumptionEstimateKwh?: number;

  @IsOptional()
  @IsNumber()
  operatingHoursPerDay?: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
