import { RoleName } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsEnum(RoleName)
  name!: RoleName;

  @IsOptional()
  @IsString()
  description?: string;
}
