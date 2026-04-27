import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateMunicipalityDto {
  @IsString()
  name!: string;

  @IsString()
  department!: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
