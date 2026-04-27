import { ArrowDownUp, Package, Plus } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { inventory } from "@/lib/demo-data";

export default function InventoryPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <h1 className="page-title">Inventario / Almacen</h1>
          <p className="page-description">Control de componentes, stock minimo, alertas y movimientos asociados a mantenimiento.</p>
        </div>
        <button className="button" type="button"><Plus size={18} /> Nuevo componente</button>
      </section>

      <section className="grid two">
        <div className="table-card">
          <h2 className="panel-title"><Package size={18} /> Componentes</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Componente</th><th>Categoria</th><th>Stock actual</th><th>Stock minimo</th><th>Alerta</th><th>Almacen</th></tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  const low = item.currentStock <= item.minimumStock;
                  return (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong><br /><span className="mobile-only-text">{item.unit}</span></td>
                      <td>{item.category}</td>
                      <td>{item.currentStock}</td>
                      <td>{item.minimumStock}</td>
                      <td><StatusBadge value={low ? "REQUIERE_COMPONENTE" : "OPERATIVA"} /></td>
                      <td>{item.warehouseName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <form className="form-card">
          <h2 className="panel-title"><ArrowDownUp size={18} /> Movimiento</h2>
          <div className="field"><label>Componente</label><select>{inventory.map((item) => <option key={item.id}>{item.name}</option>)}</select></div>
          <div className="field"><label>Tipo</label><select defaultValue="OUT"><option>IN</option><option>OUT</option><option>ADJUSTMENT</option></select></div>
          <div className="field"><label>Cantidad</label><input type="number" defaultValue={1} /></div>
          <div className="field"><label>Motivo</label><input defaultValue="Uso en mantenimiento correctivo" /></div>
          <div className="field"><label>Mantenimiento asociado</label><input defaultValue="mnt-001" /></div>
          <button className="button" type="button">Registrar movimiento</button>
        </form>
      </section>
    </>
  );
}
