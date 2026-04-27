import { AlertTriangle, CheckCircle2, Clock, Lightbulb, Package, PowerOff, Siren, Wrench } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { auditLogs, incidents, inventory, luminaires, maintenances } from "@/lib/demo-data";

export default function DashboardPage() {
  const operativas = luminaires.filter((item) => item.status === "OPERATIVA").length;
  const fallando = luminaires.filter((item) => item.status === "FALLANDO").length;
  const apagadas = luminaires.filter((item) => item.status === "APAGADA").length;
  const abiertas = incidents.filter((item) => !["RESUELTA", "CERRADA", "RECHAZADA"].includes(item.status)).length;
  const pendientes = maintenances.filter((item) => item.status !== "COMPLETADO" && item.status !== "CANCELADO").length;
  const bajoStock = inventory.filter((item) => item.currentStock <= item.minimumStock).length;

  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Centro operativo de luminarias</h1>
          <p className="page-description">
            Vista ejecutiva de estado, incidencias, mantenimiento e inventario para una fase QR lista para crecer hacia IoT.
          </p>
        </div>
      </section>

      <section className="grid metrics" aria-label="Metricas operativas">
        <MetricCard label="Total de luminarias" value={luminaires.length} tone="neutral" icon={Lightbulb} />
        <MetricCard label="Operativas" value={operativas} tone="success" icon={CheckCircle2} />
        <MetricCard label="Con falla" value={fallando} tone="warning" icon={AlertTriangle} />
        <MetricCard label="Apagadas" value={apagadas} tone="danger" icon={PowerOff} />
        <MetricCard label="Incidencias abiertas" value={abiertas} tone="danger" icon={Siren} />
        <MetricCard label="Mantenimientos pendientes" value={pendientes} tone="info" icon={Wrench} />
        <MetricCard label="Componentes bajo stock" value={bajoStock} tone="warning" icon={Package} />
        <MetricCard label="Actualizacion" value="Hoy" tone="info" icon={Clock} />
      </section>

      <section className="grid two" style={{ marginTop: 16 }}>
        <div className="table-card">
          <h2 className="panel-title">Ultimas acciones registradas</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Accion</th>
                  <th>Entidad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>{log.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <h2 className="panel-title">Riesgo operativo</h2>
          <div className="timeline">
            {incidents.map((incident) => {
              const luminaire = luminaires.find((item) => item.id === incident.luminaireId);
              return (
                <div className="timeline-item" key={incident.id}>
                  <strong>{incident.type}</strong>
                  <p>{luminaire?.municipalCode} - {luminaire?.zone}</p>
                  <StatusBadge value={incident.priority} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
