import { Download, FileBarChart } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { incidents, inventory, luminaires, maintenances } from "@/lib/demo-data";

function countBy<T extends string>(values: T[]) {
  return values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export default function ReportsPage() {
  const byStatus = countBy(luminaires.map((item) => item.status));
  const byPriority = countBy(incidents.map((item) => item.priority));
  const byTechnician = countBy(maintenances.map((item) => item.technician));
  const byTechnology = countBy(luminaires.map((item) => item.technology));
  const lowStock = inventory.filter((item) => item.currentStock <= item.minimumStock);

  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Reportes iniciales</h1>
          <p className="page-description">Indicadores listos para conectar a endpoints `/reports/*` y exportacion CSV.</p>
        </div>
        <button className="button secondary" type="button"><Download size={18} /> Exportar CSV</button>
      </section>

      <section className="grid two">
        <ReportPanel title="Luminarias por estado" rows={Object.entries(byStatus)} />
        <ReportPanel title="Incidencias por prioridad" rows={Object.entries(byPriority)} />
        <ReportPanel title="Mantenimiento por tecnico" rows={Object.entries(byTechnician)} />
        <ReportPanel title="Tecnologias instaladas" rows={Object.entries(byTechnology)} />
      </section>

      <section className="table-card" style={{ marginTop: 16 }}>
        <h2 className="panel-title">Stock bajo</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Componente</th><th>Stock actual</th><th>Minimo</th><th>Estado</th></tr></thead>
            <tbody>
              {lowStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.currentStock}</td>
                  <td>{item.minimumStock}</td>
                  <td><StatusBadge value="REQUIERE_COMPONENTE" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ReportPanel({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <div className="panel">
      <h2 className="panel-title"><FileBarChart size={18} /> {title}</h2>
      <div className="timeline">
        {rows.map(([label, value]) => (
          <div className="timeline-item" key={label}>
            <strong>{label}</strong>
            <p>{value} registros</p>
          </div>
        ))}
      </div>
    </div>
  );
}
