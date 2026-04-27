export const ROLES = ["ADMIN", "SUPERVISOR", "TECNICO", "ALMACEN", "AUDITOR"] as const;
export type RoleName = (typeof ROLES)[number];

export const LUMINAIRE_TECHNOLOGIES = [
  "LED",
  "VAPOR_SODIO",
  "MERCURIO",
  "HALOGENURO_METALICO",
  "FLUORESCENTE",
  "OTRO",
] as const;
export type LuminaireTechnology = (typeof LUMINAIRE_TECHNOLOGIES)[number];

export const LUMINAIRE_STATUSES = [
  "OPERATIVA",
  "FALLANDO",
  "APAGADA",
  "EN_MANTENIMIENTO",
  "DESUSO",
  "REEMPLAZADA",
] as const;
export type LuminaireStatus = (typeof LUMINAIRE_STATUSES)[number];

export const INCIDENT_PRIORITIES = ["BAJA", "MEDIA", "ALTA", "CRITICA"] as const;
export type IncidentPriority = (typeof INCIDENT_PRIORITIES)[number];

export const INCIDENT_STATUSES = [
  "REPORTADA",
  "VALIDADA",
  "ASIGNADA",
  "EN_REVISION",
  "RESUELTA",
  "CERRADA",
  "RECHAZADA",
] as const;
export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];

export const MAINTENANCE_TYPES = [
  "PREVENTIVO",
  "CORRECTIVO",
  "INSTALACION",
  "REEMPLAZO",
  "INSPECCION",
  "RETIRO_BAJA",
] as const;
export type MaintenanceType = (typeof MAINTENANCE_TYPES)[number];

export const MAINTENANCE_STATUSES = [
  "PROGRAMADO",
  "ASIGNADO",
  "EN_PROGRESO",
  "REQUIERE_COMPONENTE",
  "COMPLETADO",
  "CANCELADO",
] as const;
export type MaintenanceStatus = (typeof MAINTENANCE_STATUSES)[number];

export const POLE_DISPOSITIONS = ["UNILATERAL", "BILATERAL", "BILATERAL_DESPLAZADO", "OTRO"] as const;
export type PoleDisposition = (typeof POLE_DISPOSITIONS)[number];

export interface DashboardMetric {
  label: string;
  value: number | string;
  tone: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface ApiEnvelope<T> {
  data: T;
}
