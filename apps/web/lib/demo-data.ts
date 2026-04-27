import type {
  IncidentPriority,
  IncidentStatus,
  LuminaireStatus,
  LuminaireTechnology,
  MaintenanceStatus,
  MaintenanceType,
  PoleDisposition,
} from "@smart-city/shared";

export interface Luminaire {
  id: string;
  qrCode: string;
  municipalCode: string;
  technology: LuminaireTechnology;
  powerWatts: number;
  brand: string;
  model: string;
  installedAt: string;
  estimatedUsefulLifeHours: number;
  status: LuminaireStatus;
  latitude: number;
  longitude: number;
  address: string;
  zone: string;
  district: string;
  poleHeightMeters: number;
  distanceBetweenPolesMeters: number;
  poleDisposition: PoleDisposition;
  monthlyConsumptionEstimateKwh: number;
  operatingHoursPerDay: number;
}

export interface Incident {
  id: string;
  luminaireId: string;
  type: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  description: string;
  reportedBy: string;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  luminaireId: string;
  technician: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  failureType?: string;
  technicalNotes: string;
  componentsUsed: string[];
  createdAt: string;
}

export interface ComponentStock {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  warehouseName: string;
  unit: string;
}

export const luminaires: Luminaire[] = [
  {
    id: "lum-001",
    qrCode: "QR-LUM-COCH-D1-0001",
    municipalCode: "LUM-COCH-D1-0001",
    technology: "LED",
    powerWatts: 70,
    brand: "Philips",
    model: "RoadFlair",
    installedAt: "2024-01-05",
    estimatedUsefulLifeHours: 50000,
    status: "OPERATIVA",
    latitude: -17.36651,
    longitude: -66.15902,
    address: "Av. America y Pando",
    zone: "Cala Cala",
    district: "Distrito 1",
    poleHeightMeters: 7,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "UNILATERAL",
    monthlyConsumptionEstimateKwh: 25.2,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-002",
    qrCode: "QR-LUM-COCH-D1-0002",
    municipalCode: "LUM-COCH-D1-0002",
    technology: "VAPOR_SODIO",
    powerWatts: 150,
    brand: "General Electric",
    model: "HPS Cobra",
    installedAt: "2024-02-05",
    estimatedUsefulLifeHours: 18000,
    status: "FALLANDO",
    latitude: -17.36711,
    longitude: -66.15821,
    address: "Av. America oeste",
    zone: "Cala Cala",
    district: "Distrito 1",
    poleHeightMeters: 9,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL",
    monthlyConsumptionEstimateKwh: 54,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-003",
    qrCode: "QR-LUM-COCH-D1-0003",
    municipalCode: "LUM-COCH-D1-0003",
    technology: "MERCURIO",
    powerWatts: 250,
    brand: "Osram",
    model: "Mercury Classic",
    installedAt: "2024-03-05",
    estimatedUsefulLifeHours: 18000,
    status: "APAGADA",
    latitude: -17.36598,
    longitude: -66.15744,
    address: "Calle Beijing",
    zone: "Cala Cala",
    district: "Distrito 1",
    poleHeightMeters: 7,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "UNILATERAL",
    monthlyConsumptionEstimateKwh: 90,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-004",
    qrCode: "QR-LUM-COCH-D1-0004",
    municipalCode: "LUM-COCH-D1-0004",
    technology: "LED",
    powerWatts: 40,
    brand: "Schreder",
    model: "Teceo",
    installedAt: "2024-04-05",
    estimatedUsefulLifeHours: 50000,
    status: "OPERATIVA",
    latitude: -17.36522,
    longitude: -66.16022,
    address: "Cala Cala plaza",
    zone: "Cala Cala",
    district: "Distrito 1",
    poleHeightMeters: 5,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL_DESPLAZADO",
    monthlyConsumptionEstimateKwh: 14.4,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-005",
    qrCode: "QR-LUM-COCH-D2-0005",
    municipalCode: "LUM-COCH-D2-0005",
    technology: "HALOGENURO_METALICO",
    powerWatts: 400,
    brand: "Sylvania",
    model: "MetalArc",
    installedAt: "2024-05-05",
    estimatedUsefulLifeHours: 18000,
    status: "EN_MANTENIMIENTO",
    latitude: -17.3895,
    longitude: -66.1568,
    address: "Av. Heroinas",
    zone: "Centro",
    district: "Distrito 2",
    poleHeightMeters: 9,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL",
    monthlyConsumptionEstimateKwh: 144,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-006",
    qrCode: "QR-LUM-COCH-D2-0006",
    municipalCode: "LUM-COCH-D2-0006",
    technology: "FLUORESCENTE",
    powerWatts: 80,
    brand: "Toshiba",
    model: "FluoUrban",
    installedAt: "2024-06-05",
    estimatedUsefulLifeHours: 12000,
    status: "DESUSO",
    latitude: -17.3901,
    longitude: -66.1579,
    address: "Plaza 14 de Septiembre",
    zone: "Centro",
    district: "Distrito 2",
    poleHeightMeters: 4,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "UNILATERAL",
    monthlyConsumptionEstimateKwh: 28.8,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-007",
    qrCode: "QR-LUM-COCH-D2-0007",
    municipalCode: "LUM-COCH-D2-0007",
    technology: "LED",
    powerWatts: 150,
    brand: "Philips",
    model: "Luma",
    installedAt: "2024-07-05",
    estimatedUsefulLifeHours: 50000,
    status: "OPERATIVA",
    latitude: -17.3921,
    longitude: -66.1557,
    address: "Calle Espana",
    zone: "Centro",
    district: "Distrito 2",
    poleHeightMeters: 7,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL_DESPLAZADO",
    monthlyConsumptionEstimateKwh: 54,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-008",
    qrCode: "QR-LUM-COCH-D2-0008",
    municipalCode: "LUM-COCH-D2-0008",
    technology: "VAPOR_SODIO",
    powerWatts: 250,
    brand: "Indal",
    model: "Vial HPS",
    installedAt: "2024-08-05",
    estimatedUsefulLifeHours: 18000,
    status: "FALLANDO",
    latitude: -17.3887,
    longitude: -66.1542,
    address: "Av. Ayacucho",
    zone: "Centro",
    district: "Distrito 2",
    poleHeightMeters: 9,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL",
    monthlyConsumptionEstimateKwh: 90,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-009",
    qrCode: "QR-LUM-COCH-D3-0009",
    municipalCode: "LUM-COCH-D3-0009",
    technology: "LED",
    powerWatts: 70,
    brand: "Schreder",
    model: "Ampera",
    installedAt: "2024-09-05",
    estimatedUsefulLifeHours: 50000,
    status: "OPERATIVA",
    latitude: -17.3772,
    longitude: -66.1515,
    address: "Av. Melchor Perez",
    zone: "Queru Queru",
    district: "Distrito 3",
    poleHeightMeters: 7,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "UNILATERAL",
    monthlyConsumptionEstimateKwh: 25.2,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-010",
    qrCode: "QR-LUM-COCH-D3-0010",
    municipalCode: "LUM-COCH-D3-0010",
    technology: "MERCURIO",
    powerWatts: 150,
    brand: "Osram",
    model: "MV-Urban",
    installedAt: "2024-10-05",
    estimatedUsefulLifeHours: 18000,
    status: "APAGADA",
    latitude: -17.3761,
    longitude: -66.1523,
    address: "Queru Queru norte",
    zone: "Queru Queru",
    district: "Distrito 3",
    poleHeightMeters: 5,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL",
    monthlyConsumptionEstimateKwh: 54,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-011",
    qrCode: "QR-LUM-COCH-D3-0011",
    municipalCode: "LUM-COCH-D3-0011",
    technology: "LED",
    powerWatts: 40,
    brand: "Philips",
    model: "Essential LED",
    installedAt: "2024-11-05",
    estimatedUsefulLifeHours: 50000,
    status: "OPERATIVA",
    latitude: -17.3784,
    longitude: -66.1509,
    address: "Calle Tarija",
    zone: "Queru Queru",
    district: "Distrito 3",
    poleHeightMeters: 4,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "UNILATERAL",
    monthlyConsumptionEstimateKwh: 14.4,
    operatingHoursPerDay: 12,
  },
  {
    id: "lum-012",
    qrCode: "QR-LUM-COCH-D3-0012",
    municipalCode: "LUM-COCH-D3-0012",
    technology: "HALOGENURO_METALICO",
    powerWatts: 400,
    brand: "Sylvania",
    model: "HighBay Street",
    installedAt: "2024-12-05",
    estimatedUsefulLifeHours: 18000,
    status: "REEMPLAZADA",
    latitude: -17.3797,
    longitude: -66.1534,
    address: "Av. Circunvalacion",
    zone: "Queru Queru",
    district: "Distrito 3",
    poleHeightMeters: 9,
    distanceBetweenPolesMeters: 30,
    poleDisposition: "BILATERAL_DESPLAZADO",
    monthlyConsumptionEstimateKwh: 144,
    operatingHoursPerDay: 12,
  },
];

export const incidents: Incident[] = [
  {
    id: "inc-001",
    luminaireId: "lum-003",
    type: "luminaria apagada",
    priority: "ALTA",
    status: "ASIGNADA",
    description: "Punto oscuro en interseccion secundaria.",
    reportedBy: "Supervisora Municipal",
    createdAt: "2026-04-20",
  },
  {
    id: "inc-002",
    luminaireId: "lum-008",
    type: "parpadeo",
    priority: "MEDIA",
    status: "EN_REVISION",
    description: "Parpadeo intermitente durante inspeccion nocturna.",
    reportedBy: "Tecnico de Campo",
    createdAt: "2026-04-22",
  },
  {
    id: "inc-003",
    luminaireId: "lum-010",
    type: "cable expuesto",
    priority: "CRITICA",
    status: "VALIDADA",
    description: "Riesgo electrico cercano a parada de transporte.",
    reportedBy: "Supervisora Municipal",
    createdAt: "2026-04-24",
  },
];

export const maintenances: Maintenance[] = [
  {
    id: "mnt-001",
    luminaireId: "lum-005",
    technician: "Tecnico de Campo",
    type: "CORRECTIVO",
    status: "EN_PROGRESO",
    failureType: "driver danado",
    technicalNotes: "Requiere reemplazo de driver y verificacion de fotocelda.",
    componentsUsed: ["Driver LED", "Fotocelda"],
    createdAt: "2026-04-21",
  },
  {
    id: "mnt-002",
    luminaireId: "lum-001",
    technician: "Tecnico de Campo",
    type: "PREVENTIVO",
    status: "PROGRAMADO",
    technicalNotes: "Revision trimestral de conexion y limpieza.",
    componentsUsed: [],
    createdAt: "2026-04-28",
  },
  {
    id: "mnt-003",
    luminaireId: "lum-003",
    technician: "Cuadrilla Norte",
    type: "REEMPLAZO",
    status: "REQUIERE_COMPONENTE",
    failureType: "luminaria apagada",
    technicalNotes: "Programar conversion a LED.",
    componentsUsed: ["Luminaria LED 70W"],
    createdAt: "2026-04-23",
  },
];

export const inventory: ComponentStock[] = [
  { id: "cmp-001", name: "Luminaria LED 70W", category: "luminaria LED", currentStock: 6, minimumStock: 8, warehouseName: "Almacen central", unit: "unidad" },
  { id: "cmp-002", name: "Driver LED", category: "driver", currentStock: 4, minimumStock: 12, warehouseName: "Almacen central", unit: "unidad" },
  { id: "cmp-003", name: "Fotocelda", category: "fotocelda", currentStock: 18, minimumStock: 20, warehouseName: "Almacen central", unit: "unidad" },
  { id: "cmp-004", name: "Fusible", category: "fusible", currentStock: 27, minimumStock: 30, warehouseName: "Almacen central", unit: "unidad" },
  { id: "cmp-005", name: "Cable", category: "cable", currentStock: 240, minimumStock: 100, warehouseName: "Almacen central", unit: "metro" },
  { id: "cmp-006", name: "Conector", category: "conector", currentStock: 11, minimumStock: 25, warehouseName: "Almacen central", unit: "unidad" },
  { id: "cmp-007", name: "Poste metalico", category: "poste", currentStock: 2, minimumStock: 5, warehouseName: "Almacen central", unit: "unidad" },
];

export const users = [
  { id: "usr-001", name: "Administrador Demo", email: "admin@demo.com", role: "ADMIN", isActive: true },
  { id: "usr-002", name: "Supervisora Municipal", email: "supervisor@demo.com", role: "SUPERVISOR", isActive: true },
  { id: "usr-003", name: "Tecnico de Campo", email: "tecnico@demo.com", role: "TECNICO", isActive: true },
  { id: "usr-004", name: "Responsable de Almacen", email: "almacen@demo.com", role: "ALMACEN", isActive: true },
  { id: "usr-005", name: "Auditoria Municipal", email: "auditor@demo.com", role: "AUDITOR", isActive: true },
];

export const auditLogs = [
  { id: "aud-001", user: "Administrador Demo", action: "SEED_INITIALIZED", entity: "System", entityId: "phase-1", createdAt: "2026-04-20 08:00", changes: "Carga inicial de municipio, roles y luminarias." },
  { id: "aud-002", user: "Supervisora Municipal", action: "INCIDENT_CREATED", entity: "Incident", entityId: "inc-001", createdAt: "2026-04-20 21:30", changes: "Incidencia de luminaria apagada asignada." },
  { id: "aud-003", user: "Tecnico de Campo", action: "MAINTENANCE_UPDATED", entity: "Maintenance", entityId: "mnt-001", createdAt: "2026-04-21 10:15", changes: "Mantenimiento correctivo en progreso." },
  { id: "aud-004", user: "Responsable de Almacen", action: "INVENTORY_OUT", entity: "InventoryMovement", entityId: "mov-001", createdAt: "2026-04-21 10:40", changes: "Reserva de Driver LED para mantenimiento." },
];

export function findLuminaire(idOrQr: string) {
  return luminaires.find((luminaire) => luminaire.id === idOrQr || luminaire.qrCode === idOrQr || luminaire.municipalCode === idOrQr);
}

export function statusTone(status: string): "success" | "warning" | "danger" | "info" | "neutral" {
  if (["OPERATIVA", "RESUELTA", "CERRADA", "COMPLETADO"].includes(status)) return "success";
  if (["FALLANDO", "MEDIA", "PROGRAMADO", "ASIGNADO", "VALIDADA"].includes(status)) return "warning";
  if (["APAGADA", "CRITICA", "ALTA", "RECHAZADA"].includes(status)) return "danger";
  if (["EN_MANTENIMIENTO", "EN_REVISION", "EN_PROGRESO", "REQUIERE_COMPONENTE"].includes(status)) return "info";
  return "neutral";
}

export function labelize(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}
