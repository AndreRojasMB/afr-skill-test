import { MaintenanceStatus, MaintenanceType } from "@prisma/client";
import { IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class MaintenanceComponentInput {
  @IsString()
  componentId!: string;

  @IsInt()
  @Min(1)
  quantityUsed!: number;
}

export class CreateMaintenanceDto {
  @IsString()
  luminaireId!: string;

  @IsString()
  technicianId!: string;

  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @IsOptional()
  @IsEnum(MaintenanceStatus)
  status?: MaintenanceStatus;

  @IsOptional()
  @IsString()
  failureType?: string;

  @IsOptional()
  @IsString()
  technicalNotes?: string;

  @IsOptional()
  @IsString()
  evidenceBeforeUrl?: string;

  @IsOptional()
  @IsString()
  evidenceAfterUrl?: string;

  @IsOptional()
  @IsDateString()
  reviewedAt?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaintenanceComponentInput)
  componentsUsed?: MaintenanceComponentInput[];
}
