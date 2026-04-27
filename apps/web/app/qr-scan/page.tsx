"use client";

import Link from "next/link";
import { Camera, ClipboardCheck, FileWarning, QrCode, Save, Wrench } from "lucide-react";
import { FormEvent, useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { findLuminaire, labelize } from "@/lib/demo-data";

export default function QrScanPage() {
  const [code, setCode] = useState("QR-LUM-COCH-D1-0003");
  const [detected, setDetected] = useState(findLuminaire("QR-LUM-COCH-D1-0003"));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDetected(findLuminaire(code.trim()));
  }

  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Escaneo QR</h1>
          <p className="page-description">Vista mobile-first para consultar ficha tecnica y registrar acciones de campo en Fase 1.</p>
        </div>
      </section>

      <section className="phone-frame">
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <div className="qr-box">
            <div>
              <Camera size={74} />
              <strong style={{ display: "block", marginTop: 8 }}>Escanear QR</strong>
              <span className="mobile-only-text">Camara simulada con ingreso manual seguro</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="qr">Codigo QR o municipal</label>
            <input id="qr" value={code} onChange={(event) => setCode(event.target.value)} />
          </div>
          <button className="button" type="submit"><QrCode size={18} /> Buscar luminaria</button>
        </form>

        {detected ? (
          <div className="panel" style={{ marginTop: 14, boxShadow: "none" }}>
            <h2 className="panel-title">{detected.municipalCode}</h2>
            <p className="mobile-only-text">{detected.address} - {detected.zone}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <StatusBadge value={detected.status} />
              <span className="badge neutral">{labelize(detected.technology)} {detected.powerWatts}W</span>
            </div>
            <div className="quick-actions">
              <button className="button secondary" type="button"><ClipboardCheck size={18} /> Registrar revision</button>
              <button className="button secondary" type="button"><FileWarning size={18} /> Reportar falla</button>
              <button className="button secondary" type="button"><Wrench size={18} /> Mantenimiento</button>
              <button className="button secondary" type="button"><Save size={18} /> Cambiar estado</button>
            </div>
            <Link className="button" style={{ marginTop: 12, width: "100%" }} href={`/luminaires/${detected.id}`}>
              Abrir ficha completa
            </Link>
          </div>
        ) : (
          <p className="badge danger" style={{ marginTop: 14 }}>No se encontro luminaria para el codigo ingresado.</p>
        )}
      </section>
    </>
  );
}
