import { Injectable } from "@nestjs/common";
import { IncidentPriority, LuminaireStatus, MaintenanceStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [
      total,
      operativas,
      fallando,
      apagadas,
      incidenciasAbiertas,
      mantenimientosPendientes,
      stockBajo,
      ultimasAcciones,
    ] = await Promise.all([
      this.prisma.luminaire.count(),
      this.prisma.luminaire.count({ where: { status: LuminaireStatus.OPERATIVA } }),
      this.prisma.luminaire.count({ where: { status: LuminaireStatus.FALLANDO } }),
      this.prisma.luminaire.count({ where: { status: LuminaireStatus.APAGADA } }),
      this.prisma.incident.count({ where: { status: { notIn: ["RESUELTA", "CERRADA", "RECHAZADA"] } } }),
      this.prisma.maintenance.count({ where: { status: { in: [MaintenanceStatus.PROGRAMADO, MaintenanceStatus.ASIGNADO, MaintenanceStatus.EN_PROGRESO, MaintenanceStatus.REQUIERE_COMPONENTE] } } }),
      this.lowStock(),
      this.prisma.auditLog.findMany({ include: { user: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    ]);

    return {
      totalLuminaires: total,
      operational: operativas,
      failing: fallando,
      off: apagadas,
      openIncidents: incidenciasAbiertas,
      pendingMaintenance: mantenimientosPendientes,
      lowStockComponents: stockBajo.length,
      latestActions: ultimasAcciones,
    };
  }

  luminairesByStatus() {
    return this.prisma.luminaire.groupBy({ by: ["status"], _count: { status: true } });
  }

  incidentsByPriority() {
    return this.prisma.incident.groupBy({ by: ["priority"], _count: { priority: true }, orderBy: { priority: "asc" } });
  }

  async maintenanceByTechnician() {
    const grouped = await this.prisma.maintenance.groupBy({ by: ["technicianId"], _count: { technicianId: true } });
    const users = await this.prisma.user.findMany({
      where: { id: { in: grouped.map((item) => item.technicianId) } },
      select: { id: true, name: true, email: true },
    });
    return grouped.map((item) => ({
      technician: users.find((user) => user.id === item.technicianId),
      count: item._count.technicianId,
    }));
  }

  async lowStock() {
    const items = await this.prisma.inventoryItem.findMany({ include: { component: true } });
    return items.filter((item) => item.currentStock <= item.component.minimumStock);
  }

  technologiesInstalled() {
    return this.prisma.luminaire.groupBy({ by: ["technology"], _count: { technology: true } });
  }

  incidentPriorityOrder(priority: IncidentPriority) {
    return ["BAJA", "MEDIA", "ALTA", "CRITICA"].indexOf(priority);
  }
}
