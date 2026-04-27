import Link from "next/link";
import { Eye, Plus, QrCode } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { labelize, luminaires } from "@/lib/demo-data";

export default function LuminairesPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Luminarias</h1>
          <p className="page-description">Inventario tecnico con filtros por estado, zona, tecnologia y potencia.</p>
        </div>
        <button className="button" type="button"><Plus size={18} /> Crear luminaria</button>
      </section>

      <section className="table-card">
        <div className="filters">
          <div className="field">
            <label htmlFor="status">Estado</label>
            <select id="status" defaultValue="">
              <option value="">Todos</option>
              <option>OPERATIVA</option>
              <option>FALLANDO</option>
              <option>APAGADA</option>
              <option>EN_MANTENIMIENTO</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="zone">Zona</label>
            <select id="zone" defaultValue="">
              <option value="">Todas</option>
              <option>Cala Cala</option>
              <option>Centro</option>
              <option>Queru Queru</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="technology">Tecnologia</label>
            <select id="technology" defaultValue="">
              <option value="">Todas</option>
              <option>LED</option>
              <option>VAPOR_SODIO</option>
              <option>MERCURIO</option>
              <option>HALOGENURO_METALICO</option>
              <option>FLUORESCENTE</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="power">Potencia</label>
            <select id="power" defaultValue="">
              <option value="">Todas</option>
              <option>40W</option>
              <option>70W</option>
              <option>80W</option>
              <option>150W</option>
              <option>250W</option>
              <option>400W</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Codigo municipal</th>
                <th>Estado</th>
                <th>Tecnologia</th>
                <th>Zona</th>
                <th>Potencia</th>
                <th>QR</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {luminaires.map((luminaire) => (
                <tr key={luminaire.id}>
                  <td><strong>{luminaire.municipalCode}</strong><br /><span className="mobile-only-text">{luminaire.address}</span></td>
                  <td><StatusBadge value={luminaire.status} /></td>
                  <td>{labelize(luminaire.technology)}</td>
                  <td>{luminaire.zone}</td>
                  <td>{luminaire.powerWatts}W</td>
                  <td><span className="badge info"><QrCode size={14} /> {luminaire.qrCode}</span></td>
                  <td>
                    <Link className="button secondary" href={`/luminaires/${luminaire.id}`}>
                      <Eye size={16} /> Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
