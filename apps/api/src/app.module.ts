import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AuditLogsModule } from "./audit-logs/audit-logs.module";
import { ComponentsModule } from "./components/components.module";
import { HealthModule } from "./health/health.module";
import { IncidentsModule } from "./incidents/incidents.module";
import { InventoryModule } from "./inventory/inventory.module";
import { LuminairesModule } from "./luminaires/luminaires.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { MunicipalitiesModule } from "./municipalities/municipalities.module";
import { PrismaModule } from "./prisma/prisma.module";
import { QrModule } from "./qr/qr.module";
import { ReportsModule } from "./reports/reports.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { ZonesModule } from "./zones/zones.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    MunicipalitiesModule,
    ZonesModule,
    LuminairesModule,
    QrModule,
    MaintenanceModule,
    IncidentsModule,
    InventoryModule,
    ComponentsModule,
    AuditLogsModule,
    ReportsModule,
    HealthModule,
  ],
})
export class AppModule {}
