import { IncidentPriority, IncidentStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateIncidentDto {
  @IsOptional()
  @IsString()
  luminaireId?: string;

  @IsOptional()
  @IsString()
  reportedById?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsEnum(IncidentPriority)
  priority?: IncidentPriority;

  @IsOptional()
  @IsEnum(IncidentStatus)
  status?: IncidentStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  evidenceUrl?: string;
}
