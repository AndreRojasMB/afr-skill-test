import { IncidentPriority, IncidentStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateIncidentDto {
  @IsString()
  luminaireId!: string;

  @IsOptional()
  @IsString()
  reportedById?: string;

  @IsString()
  type!: string;

  @IsEnum(IncidentPriority)
  priority!: IncidentPriority;

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
