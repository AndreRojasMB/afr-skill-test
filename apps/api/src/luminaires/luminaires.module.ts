import { Module } from "@nestjs/common";
import { LuminairesController } from "./luminaires.controller";
import { LuminairesService } from "./luminaires.service";

@Module({
  controllers: [LuminairesController],
  providers: [LuminairesService],
  exports: [LuminairesService],
})
export class LuminairesModule {}
