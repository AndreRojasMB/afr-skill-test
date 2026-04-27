import { Plus, Siren } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { incidents, luminaires } from "@/lib/demo-data";

const failureTypes = [
  "luminaria apagada",
  "parpadeo",
  "baja intensidad",
  "encendida de dia",
  "apagada de noche",
  "poste danado",
  "cable expuesto",
  "fotocelda danada",
  "driver danado",
  "robo/vandalismo",
  "falla de circuito",
  "falla de tablero",
];

export default function IncidentsPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Incidencias</h1>
          <p className="page-description">Registro y seguimiento de fallas con prioridad, estado y evidencia asociada.</p>
        </div>
        <button className="button" type="button"><Plus size={18} /> Crear incidencia</button>
      </section>

      <section className="grid two">
        <div className="table-card">
          <h2 className="panel-title"><Siren size={18} /> Casos registrados</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Luminaria</th><th>Tipo</th><th>Prioridad</th><th>Estado</th><th>Reportado por</th></tr>
              </thead>
              <tbody>
                {incidents.map((incident) => {
                  const luminaire = luminaires.find((item) => item.id === incident.luminaireId);
                  return (
                    <tr key={incident.id}>
                      <td>{incident.id}</td>
                      <td>{luminaire?.municipalCode}</td>
                      <td>{incident.type}</td>
                      <td><StatusBadge value={incident.priority} /></td>
                      <td><StatusBadge value={incident.status} /></td>
                      <td>{incident.reportedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <form className="form-card">
          <h2 className="panel-title">Nuevo reporte</h2>
          <div className="field"><label>Luminaria</label><select>{luminaires.map((item) => <option key={item.id}>{item.municipalCode}</option>)}</select></div>
          <div className="field"><label>Tipo de falla</label><select>{failureTypes.map((type) => <option key={type}>{type}</option>)}</select></div>
          <div className="field"><label>Prioridad</label><select defaultValue="MEDIA"><option>BAJA</option><option>MEDIA</option><option>ALTA</option><option>CRITICA</option></select></div>
          <div className="field"><label>Estado</label><select defaultValue="REPORTADA"><option>REPORTADA</option><option>VALIDADA</option><option>ASIGNADA</option><option>EN_REVISION</option><option>RESUELTA</option><option>CERRADA</option></select></div>
          <div className="field"><label>Descripcion</label><textarea defaultValue="Describir condicion observada, riesgo y referencia de ubicacion." /></div>
          <button className="button" type="button">Guardar incidencia</button>
        </form>
      </section>
    </>
  );
}
