import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, QrCode, Wrench } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { findLuminaire, incidents, labelize, maintenances } from "@/lib/demo-data";

export default async function LuminaireDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const luminaire = findLuminaire(id);
  if (!luminaire) notFound();

  const luminaireIncidents = incidents.filter((incident) => incident.luminaireId === luminaire.id);
  const luminaireMaintenances = maintenances.filter((maintenance) => maintenance.luminaireId === luminaire.id);

  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">{luminaire.municipalCode}</h1>
          <p className="page-description">{luminaire.address} - {luminaire.zone}, {luminaire.district}</p>
        </div>
        <Link className="button secondary" href="/luminaires">Volver</Link>
      </section>

      <section className="grid two">
        <div className="panel">
          <h2 className="panel-title">Ficha tecnica</h2>
          <div className="detail-list">
            <div className="detail-item"><span className="detail-label">ID unico</span><span className="detail-value">{luminaire.id}</span></div>
            <div className="detail-item"><span className="detail-label">Codigo QR</span><span className="detail-value">{luminaire.qrCode}</span></div>
            <div className="detail-item"><span className="detail-label">Tecnologia</span><span className="detail-value">{labelize(luminaire.technology)}</span></div>
            <div className="detail-item"><span className="detail-label">Potencia</span><span className="detail-value">{luminaire.powerWatts}W</span></div>
            <div className="detail-item"><span className="detail-label">Marca/modelo</span><span className="detail-value">{luminaire.brand} {luminaire.model}</span></div>
            <div className="detail-item"><span className="detail-label">Fecha instalacion</span><span className="detail-value">{luminaire.installedAt}</span></div>
            <div className="detail-item"><span className="detail-label">Vida util estimada</span><span className="detail-value">{luminaire.estimatedUsefulLifeHours.toLocaleString()} h</span></div>
            <div className="detail-item"><span className="detail-label">Estado</span><span className="detail-value"><StatusBadge value={luminaire.status} /></span></div>
            <div className="detail-item"><span className="detail-label">Latitud/longitud</span><span className="detail-value">{luminaire.latitude}, {luminaire.longitude}</span></div>
            <div className="detail-item"><span className="detail-label">Altura de poste</span><span className="detail-value">{luminaire.poleHeightMeters}m</span></div>
            <div className="detail-item"><span className="detail-label">Distancia entre postes</span><span className="detail-value">{luminaire.distanceBetweenPolesMeters}m</span></div>
            <div className="detail-item"><span className="detail-label">Disposicion</span><span className="detail-value">{labelize(luminaire.poleDisposition)}</span></div>
          </div>
        </div>
        <aside className="panel">
          <h2 className="panel-title">QR operativo</h2>
          <div className="qr-box">
            <div>
              <QrCode size={82} />
              <strong style={{ display: "block", marginTop: 8 }}>{luminaire.qrCode}</strong>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <button className="button" type="button"><QrCode size={18} /> Generar/ver QR</button>
            <button className="button secondary" type="button"><Camera size={18} /> Adjuntar evidencia</button>
          </div>
        </aside>
      </section>

      <section className="grid two" style={{ marginTop: 16 }}>
        <div className="panel">
          <h2 className="panel-title"><Wrench size={18} /> Historial de mantenimiento</h2>
          <div className="timeline">
            {luminaireMaintenances.length ? luminaireMaintenances.map((maintenance) => (
              <div className="timeline-item" key={maintenance.id}>
                <strong>{labelize(maintenance.type)}</strong>
                <p>{maintenance.technicalNotes}</p>
                <StatusBadge value={maintenance.status} />
              </div>
            )) : <p className="mobile-only-text">Sin mantenimientos registrados.</p>}
          </div>
        </div>
        <div className="panel">
          <h2 className="panel-title">Historial de incidencias</h2>
          <div className="timeline">
            {luminaireIncidents.length ? luminaireIncidents.map((incident) => (
              <div className="timeline-item" key={incident.id}>
                <strong>{incident.type}</strong>
                <p>{incident.description}</p>
                <StatusBadge value={incident.status} />
              </div>
            )) : <p className="mobile-only-text">Sin incidencias registradas.</p>}
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2 className="panel-title">Componentes instalados y evidencias</h2>
        <div className="detail-list">
          <div className="detail-item"><span className="detail-label">Componentes</span><span className="detail-value">Luminaria, fotocelda, conexion y proteccion electrica</span></div>
          <div className="detail-item"><span className="detail-label">Evidencia fase 1</span><span className="detail-value">Placeholder listo para S3/MinIO en fase futura</span></div>
        </div>
      </section>
    </>
  );
}
