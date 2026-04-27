import { MaintenanceStatus, MaintenanceType } from "@prisma/client";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsString()
  luminaireId?: string;

  @IsOptional()
  @IsString()
  technicianId?: string;

  @IsOptional()
  @IsEnum(MaintenanceType)
  type?: MaintenanceType;

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
}
