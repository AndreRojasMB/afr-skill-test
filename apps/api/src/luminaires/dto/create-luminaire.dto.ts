import { LuminaireStatus, LuminaireTechnology, PoleDisposition } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateLuminaireDto {
  @IsOptional()
  @IsString()
  qrCode?: string;

  @IsString()
  municipalCode!: string;

  @IsEnum(LuminaireTechnology)
  technology!: LuminaireTechnology;

  @IsInt()
  @Min(1)
  powerWatts!: number;

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

  @IsString()
  address!: string;

  @IsString()
  zoneId!: string;

  @IsOptional()
  @IsNumber()
  poleHeightMeters?: number;

  @IsOptional()
  @IsNumber()
  distanceBetweenPolesMeters?: number;

  @IsEnum(PoleDisposition)
  poleDisposition!: PoleDisposition;

  @IsOptional()
  @IsNumber()
  monthlyConsumptionEstimateKwh?: number;

  @IsOptional()
  @IsNumber()
  operatingHoursPerDay?: number;
}
