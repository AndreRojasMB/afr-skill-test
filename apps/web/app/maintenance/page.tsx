import { Plus, Wrench } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { labelize, luminaires, maintenances } from "@/lib/demo-data";

export default function MaintenancePage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Mantenimientos</h1>
          <p className="page-description">Programacion, asignacion y trazabilidad tecnica por luminaria y tecnico responsable.</p>
        </div>
        <button className="button" type="button"><Plus size={18} /> Crear mantenimiento</button>
      </section>

      <section className="grid two">
        <div className="table-card">
          <h2 className="panel-title"><Wrench size={18} /> Ordenes activas</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Luminaria</th><th>Tipo</th><th>Estado</th><th>Tecnico</th><th>Componentes</th></tr>
              </thead>
              <tbody>
                {maintenances.map((maintenance) => {
                  const luminaire = luminaires.find((item) => item.id === maintenance.luminaireId);
                  return (
                    <tr key={maintenance.id}>
                      <td>{maintenance.id}</td>
                      <td>{luminaire?.municipalCode}</td>
                      <td>{labelize(maintenance.type)}</td>
                      <td><StatusBadge value={maintenance.status} /></td>
                      <td>{maintenance.technician}</td>
                      <td>{maintenance.componentsUsed.join(", ") || "Sin componentes"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <form className="form-card">
          <h2 className="panel-title">Nuevo registro</h2>
          <div className="field"><label>Luminaria</label><select defaultValue="lum-001">{luminaires.map((item) => <option key={item.id} value={item.id}>{item.municipalCode}</option>)}</select></div>
          <div className="field"><label>Tipo</label><select defaultValue="PREVENTIVO"><option>PREVENTIVO</option><option>CORRECTIVO</option><option>INSTALACION</option><option>REEMPLAZO</option><option>INSPECCION</option><option>RETIRO_BAJA</option></select></div>
          <div className="field"><label>Estado</label><select defaultValue="PROGRAMADO"><option>PROGRAMADO</option><option>ASIGNADO</option><option>EN_PROGRESO</option><option>REQUIERE_COMPONENTE</option><option>COMPLETADO</option><option>CANCELADO</option></select></div>
          <div className="field"><label>Tecnico responsable</label><input defaultValue="Tecnico de Campo" /></div>
          <div className="field"><label>Componentes usados</label><input defaultValue="Driver LED, Fotocelda" /></div>
          <div className="field"><label>Observacion tecnica</label><textarea defaultValue="Registrar inspeccion visual, medicion y evidencia antes/despues." /></div>
          <button className="button" type="button">Guardar mantenimiento</button>
        </form>
      </section>
    </>
  );
}
