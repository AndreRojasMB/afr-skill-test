import { ClipboardList, Save } from "lucide-react";

export default function FieldSurveyPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Relevamiento inicial</h1>
          <p className="page-description">Formulario tecnico para levantar informacion real de campo antes de migraciones LED o integraciones IoT.</p>
        </div>
      </section>

      <form className="form-card">
        <h2 className="panel-title"><ClipboardList size={18} /> Datos del municipio y responsable</h2>
        <div className="filters">
          <div className="field"><label>Municipio</label><input defaultValue="Cochabamba" /></div>
          <div className="field"><label>Responsable de registro</label><input defaultValue="Tecnico de Campo" /></div>
          <div className="field"><label>Telefono/correo</label><input defaultValue="+591 70000000 / tecnico@demo.com" /></div>
          <div className="field"><label>Zona/distrito</label><input defaultValue="Cala Cala / Distrito 1" /></div>
        </div>

        <h2 className="panel-title">Condicion actual</h2>
        <div className="filters">
          <div className="field"><label>Tipo de luminaria existente</label><select defaultValue="VAPOR_SODIO"><option>LED</option><option>VAPOR_SODIO</option><option>MERCURIO</option><option>HALOGENURO_METALICO</option><option>FLUORESCENTE</option></select></div>
          <div className="field"><label>Cantidad instalada</label><input type="number" defaultValue={38} /></div>
          <div className="field"><label>Potencia instalada</label><input defaultValue="150W" /></div>
          <div className="field"><label>Cantidad requerida LED</label><input type="number" defaultValue={42} /></div>
          <div className="field"><label>Luminarias en desuso</label><input type="number" defaultValue={4} /></div>
          <div className="field"><label>Altura de postes</label><input defaultValue="7m" /></div>
          <div className="field"><label>Distancia entre postes</label><input defaultValue="30m" /></div>
          <div className="field"><label>Disposicion de postes</label><select defaultValue="UNILATERAL"><option>UNILATERAL</option><option>BILATERAL</option><option>BILATERAL_DESPLAZADO</option></select></div>
        </div>
        <div className="field">
          <label>Observaciones</label>
          <textarea defaultValue="Sector con luminarias antiguas y consumo alto. Priorizar reemplazo LED en vias principales." />
        </div>
        <button className="button" type="button" style={{ marginTop: 14 }}><Save size={18} /> Guardar relevamiento</button>
      </form>
    </>
  );
}
