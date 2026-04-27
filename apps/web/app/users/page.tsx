import { Plus, ShieldCheck, Users } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { users } from "@/lib/demo-data";

const permissions = [
  { role: "ADMIN", permissions: "Acceso total y configuracion RBAC" },
  { role: "SUPERVISOR", permissions: "Operacion, incidencias, mantenimiento y reportes" },
  { role: "TECNICO", permissions: "Escaneo QR, inspecciones, incidencias y mantenimiento" },
  { role: "ALMACEN", permissions: "Componentes, stock y movimientos" },
  { role: "AUDITOR", permissions: "Solo lectura de reportes y auditoria" },
];

export default function UsersPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Usuarios y roles</h1>
          <p className="page-description">RBAC basico para separar responsabilidades municipales y trazabilidad de acciones.</p>
        </div>
        <button className="button" type="button"><Plus size={18} /> Crear usuario</button>
      </section>

      <section className="grid two">
        <div className="table-card">
          <h2 className="panel-title"><Users size={18} /> Usuarios</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><StatusBadge value={user.role} /></td>
                    <td><StatusBadge value={user.isActive ? "OPERATIVA" : "DESUSO"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title"><ShieldCheck size={18} /> Permisos por rol</h2>
          <div className="timeline">
            {permissions.map((item) => (
              <div className="timeline-item" key={item.role}>
                <strong>{item.role}</strong>
                <p>{item.permissions}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
