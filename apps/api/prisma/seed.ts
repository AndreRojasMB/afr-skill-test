import { PrismaClient, RoleName, LuminaireStatus, LuminaireTechnology, PoleDisposition, ComponentCategory, IncidentPriority, IncidentStatus, MaintenanceType, MaintenanceStatus, InventoryMovementType } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const roleDescriptions: Record<RoleName, string> = {
  ADMIN: "Administracion total del sistema y configuracion RBAC.",
  SUPERVISOR: "Gestion operativa, validacion de incidencias y seguimiento municipal.",
  TECNICO: "Registro de inspecciones, mantenimiento y evidencias de campo.",
  ALMACEN: "Gestion de componentes, stock y movimientos de inventario.",
  AUDITOR: "Consulta de trazabilidad, reportes y bitacora de auditoria.",
};

const permissions = [
  ["manage", "all"],
  ["read", "dashboard"],
  ["read", "luminaires"],
  ["write", "luminaires"],
  ["read", "maintenance"],
  ["write", "maintenance"],
  ["read", "incidents"],
  ["write", "incidents"],
  ["read", "inventory"],
  ["write", "inventory"],
  ["read", "users"],
  ["write", "users"],
  ["read", "audit-logs"],
  ["read", "reports"],
] as const;

async function main() {
  const roles = new Map<RoleName, string>();
  for (const roleName of Object.values(RoleName)) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: { description: roleDescriptions[roleName] },
      create: { name: roleName, description: roleDescriptions[roleName] },
    });
    roles.set(roleName, role.id);
  }

  const permissionRecords = [];
  for (const [action, resource] of permissions) {
    permissionRecords.push(
      await prisma.permission.upsert({
        where: { action_resource: { action, resource } },
        update: {},
        create: { action, resource },
      }),
    );
  }

  const adminRoleId = roles.get("ADMIN")!;
  for (const permission of permissionRecords) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRoleId, permissionId: permission.id } },
      update: {},
      create: { roleId: adminRoleId, permissionId: permission.id },
    });
  }

  const rolePermissionMap: Record<RoleName, string[]> = {
    ADMIN: ["all"],
    SUPERVISOR: ["dashboard", "luminaires", "maintenance", "incidents", "inventory", "reports", "audit-logs"],
    TECNICO: ["dashboard", "luminaires", "maintenance", "incidents"],
    ALMACEN: ["dashboard", "inventory", "maintenance"],
    AUDITOR: ["dashboard", "reports", "audit-logs", "luminaires", "incidents"],
  };

  for (const roleName of Object.values(RoleName)) {
    if (roleName === "ADMIN") continue;
    const roleId = roles.get(roleName)!;
    const allowedResources = rolePermissionMap[roleName];
    for (const permission of permissionRecords.filter((item) => allowedResources.includes(item.resource))) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId: permission.id } },
        update: {},
        create: { roleId, permissionId: permission.id },
      });
    }
  }

  const users = [
    ["Administrador Demo", "admin@demo.com", "Admin123*", "ADMIN"],
    ["Supervisora Municipal", "supervisor@demo.com", "Supervisor123*", "SUPERVISOR"],
    ["Tecnico de Campo", "tecnico@demo.com", "Tecnico123*", "TECNICO"],
    ["Responsable de Almacen", "almacen@demo.com", "Almacen123*", "ALMACEN"],
  ] as const;

  const createdUsers = new Map<string, string>();
  for (const [name, email, password, roleName] of users) {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, roleId: roles.get(roleName)!, isActive: true },
      create: {
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        roleId: roles.get(roleName)!,
      },
    });
    createdUsers.set(email, user.id);
  }

  const municipality = await prisma.municipality.upsert({
    where: { name_department: { name: "Cochabamba", department: "Cochabamba" } },
    update: {
      contactPhone: "+591 4 4010000",
      contactEmail: "alumbrado@cochabamba.bo",
    },
    create: {
      name: "Cochabamba",
      department: "Cochabamba",
      contactPhone: "+591 4 4010000",
      contactEmail: "alumbrado@cochabamba.bo",
    },
    include: { districts: { include: { zones: true } } },
  });

  const districtZoneSeed = [
    ["Distrito 1", "Cala Cala"],
    ["Distrito 2", "Centro"],
    ["Distrito 3", "Queru Queru"],
  ] as const;

  const zones = [];
  for (const [districtName, zoneName] of districtZoneSeed) {
    const district = await prisma.district.upsert({
      where: { municipalityId_name: { municipalityId: municipality.id, name: districtName } },
      update: {},
      create: { municipalityId: municipality.id, name: districtName },
    });
    zones.push(
      await prisma.zone.upsert({
        where: { districtId_name: { districtId: district.id, name: zoneName } },
        update: {},
        create: { districtId: district.id, name: zoneName },
      }),
    );
  }

  const components = [
    ["Luminaria LED 70W", ComponentCategory.LUMINARIA_LED, "Cuerpo LED para vias urbanas", "unidad", 8, 6],
    ["Driver LED", ComponentCategory.DRIVER, "Driver regulado para luminarias LED", "unidad", 12, 4],
    ["Fotocelda", ComponentCategory.FOTOCELDA, "Sensor de encendido automatico", "unidad", 20, 18],
    ["Fusible", ComponentCategory.FUSIBLE, "Proteccion electrica de luminaria", "unidad", 30, 27],
    ["Cable", ComponentCategory.CABLE, "Cable conductor aislado", "metro", 100, 240],
    ["Conector", ComponentCategory.CONECTOR, "Conector para acometida", "unidad", 25, 11],
    ["Poste metalico", ComponentCategory.POSTE, "Poste metalico galvanizado", "unidad", 5, 2],
  ] as const;

  const componentIds = new Map<string, string>();
  for (const [name, category, description, unit, minimumStock, currentStock] of components) {
    const component = await prisma.component.upsert({
      where: { name },
      update: { category, description, unit, minimumStock },
      create: { name, category, description, unit, minimumStock },
    });
    componentIds.set(name, component.id);
    await prisma.inventoryItem.upsert({
      where: { componentId_warehouseName: { componentId: component.id, warehouseName: "Almacen central" } },
      update: { currentStock },
      create: { componentId: component.id, currentStock, warehouseName: "Almacen central" },
    });
  }

  const luminaireSeed = [
    ["LUM-COCH-D1-0001", "QR-LUM-COCH-D1-0001", LuminaireTechnology.LED, 70, "Philips", "RoadFlair", LuminaireStatus.OPERATIVA, -17.36651, -66.15902, "Av. America y Pando", 7, PoleDisposition.UNILATERAL],
    ["LUM-COCH-D1-0002", "QR-LUM-COCH-D1-0002", LuminaireTechnology.VAPOR_SODIO, 150, "General Electric", "HPS Cobra", LuminaireStatus.FALLANDO, -17.36711, -66.15821, "Av. America oeste", 9, PoleDisposition.BILATERAL],
    ["LUM-COCH-D1-0003", "QR-LUM-COCH-D1-0003", LuminaireTechnology.MERCURIO, 250, "Osram", "Mercury Classic", LuminaireStatus.APAGADA, -17.36598, -66.15744, "Calle Beijing", 7, PoleDisposition.UNILATERAL],
    ["LUM-COCH-D1-0004", "QR-LUM-COCH-D1-0004", LuminaireTechnology.LED, 40, "Schreder", "Teceo", LuminaireStatus.OPERATIVA, -17.36522, -66.16022, "Cala Cala plaza", 5, PoleDisposition.BILATERAL_DESPLAZADO],
    ["LUM-COCH-D2-0005", "QR-LUM-COCH-D2-0005", LuminaireTechnology.HALOGENURO_METALICO, 400, "Sylvania", "MetalArc", LuminaireStatus.EN_MANTENIMIENTO, -17.3895, -66.1568, "Av. Heroínas", 9, PoleDisposition.BILATERAL],
    ["LUM-COCH-D2-0006", "QR-LUM-COCH-D2-0006", LuminaireTechnology.FLUORESCENTE, 80, "Toshiba", "FluoUrban", LuminaireStatus.DESUSO, -17.3901, -66.1579, "Plaza 14 de Septiembre", 4, PoleDisposition.UNILATERAL],
    ["LUM-COCH-D2-0007", "QR-LUM-COCH-D2-0007", LuminaireTechnology.LED, 150, "Philips", "Luma", LuminaireStatus.OPERATIVA, -17.3921, -66.1557, "Calle España", 7, PoleDisposition.BILATERAL_DESPLAZADO],
    ["LUM-COCH-D2-0008", "QR-LUM-COCH-D2-0008", LuminaireTechnology.VAPOR_SODIO, 250, "Indal", "Vial HPS", LuminaireStatus.FALLANDO, -17.3887, -66.1542, "Av. Ayacucho", 9, PoleDisposition.BILATERAL],
    ["LUM-COCH-D3-0009", "QR-LUM-COCH-D3-0009", LuminaireTechnology.LED, 70, "Schreder", "Ampera", LuminaireStatus.OPERATIVA, -17.3772, -66.1515, "Av. Melchor Perez", 7, PoleDisposition.UNILATERAL],
    ["LUM-COCH-D3-0010", "QR-LUM-COCH-D3-0010", LuminaireTechnology.MERCURIO, 150, "Osram", "MV-Urban", LuminaireStatus.APAGADA, -17.3761, -66.1523, "Queru Queru norte", 5, PoleDisposition.BILATERAL],
    ["LUM-COCH-D3-0011", "QR-LUM-COCH-D3-0011", LuminaireTechnology.LED, 40, "Philips", "Essential LED", LuminaireStatus.OPERATIVA, -17.3784, -66.1509, "Calle Tarija", 4, PoleDisposition.UNILATERAL],
    ["LUM-COCH-D3-0012", "QR-LUM-COCH-D3-0012", LuminaireTechnology.HALOGENURO_METALICO, 400, "Sylvania", "HighBay Street", LuminaireStatus.REEMPLAZADA, -17.3797, -66.1534, "Av. Circunvalacion", 9, PoleDisposition.BILATERAL_DESPLAZADO],
  ] as const;

  const luminaires = [];
  for (let index = 0; index < luminaireSeed.length; index += 1) {
    const [municipalCode, qrCode, technology, powerWatts, brand, model, status, latitude, longitude, address, poleHeightMeters, poleDisposition] = luminaireSeed[index];
    const luminaire = await prisma.luminaire.upsert({
      where: { municipalCode },
      update: { status },
      create: {
        municipalCode,
        qrCode,
        technology,
        powerWatts,
        brand,
        model,
        installedAt: new Date(2024, index % 12, 5),
        estimatedUsefulLifeHours: technology === LuminaireTechnology.LED ? 50000 : 18000,
        status,
        latitude,
        longitude,
        address,
        zoneId: zones[index % zones.length].id,
        poleHeightMeters,
        distanceBetweenPolesMeters: 30,
        poleDisposition,
        monthlyConsumptionEstimateKwh: Number(((powerWatts * 12 * 30) / 1000).toFixed(2)),
        operatingHoursPerDay: 12,
      },
    });
    luminaires.push(luminaire);

    await prisma.stateHistory.create({
      data: {
        luminaireId: luminaire.id,
        previousStatus: null,
        newStatus: status,
        changedById: createdUsers.get("supervisor@demo.com"),
        reason: "Carga inicial de inventario municipal.",
      },
    });
  }

  await prisma.luminaireComponent.createMany({
    data: luminaires.slice(0, 4).map((luminaire) => ({
      luminaireId: luminaire.id,
      componentId: componentIds.get("Luminaria LED 70W")!,
      status: "INSTALADO",
    })),
    skipDuplicates: true,
  });

  const incident = await prisma.incident.create({
    data: {
      luminaireId: luminaires[2].id,
      reportedById: createdUsers.get("supervisor@demo.com")!,
      type: "luminaria apagada",
      priority: IncidentPriority.ALTA,
      status: IncidentStatus.ASIGNADA,
      description: "Vecinos reportan punto oscuro en interseccion secundaria.",
      evidenceUrl: "/placeholder-evidence/luminaire-off.jpg",
    },
  });

  await prisma.incident.create({
    data: {
      luminaireId: luminaires[7].id,
      reportedById: createdUsers.get("tecnico@demo.com")!,
      type: "parpadeo",
      priority: IncidentPriority.MEDIA,
      status: IncidentStatus.EN_REVISION,
      description: "Parpadeo intermitente durante inspeccion nocturna.",
    },
  });

  const maintenance = await prisma.maintenance.create({
    data: {
      luminaireId: luminaires[4].id,
      technicianId: createdUsers.get("tecnico@demo.com")!,
      type: MaintenanceType.CORRECTIVO,
      status: MaintenanceStatus.EN_PROGRESO,
      failureType: "driver danado",
      technicalNotes: "Se requiere reemplazo de driver y verificacion de fotocelda.",
      components: {
        create: [
          { componentId: componentIds.get("Driver LED")!, quantityUsed: 1 },
          { componentId: componentIds.get("Fotocelda")!, quantityUsed: 1 },
        ],
      },
    },
  });

  await prisma.inventoryMovement.createMany({
    data: [
      {
        componentId: componentIds.get("Driver LED")!,
        type: InventoryMovementType.OUT,
        quantity: 1,
        reason: "Reserva para mantenimiento correctivo",
        maintenanceId: maintenance.id,
        userId: createdUsers.get("almacen@demo.com")!,
      },
      {
        componentId: componentIds.get("Luminaria LED 70W")!,
        type: InventoryMovementType.IN,
        quantity: 6,
        reason: "Ingreso inicial de luminarias LED",
        userId: createdUsers.get("almacen@demo.com")!,
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      {
        userId: createdUsers.get("admin@demo.com"),
        action: "SEED_INITIALIZED",
        entity: "System",
        entityId: "phase-1",
        afterData: { municipality: municipality.name, luminaires: luminaires.length },
      },
      {
        userId: createdUsers.get("supervisor@demo.com"),
        action: "INCIDENT_CREATED",
        entity: "Incident",
        entityId: incident.id,
        afterData: { type: incident.type, priority: incident.priority },
      },
    ],
  });

  console.log("Seed completed for Smart City QR MVP.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
