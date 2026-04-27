import { History } from "lucide-react";
import { auditLogs } from "@/lib/demo-data";

export default function AuditPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Auditoria</h1>
          <p className="page-description">Bitacora simple de usuario, accion, entidad afectada, fecha y resumen de cambios.</p>
        </div>
      </section>

      <section className="table-card">
        <h2 className="panel-title"><History size={18} /> Logs recientes</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Usuario</th><th>Accion</th><th>Entidad</th><th>ID entidad</th><th>Fecha/hora</th><th>Cambios</th></tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.entity}</td>
                  <td>{log.entityId}</td>
                  <td>{log.createdAt}</td>
                  <td>{log.changes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
