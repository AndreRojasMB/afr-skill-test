"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  FileBarChart,
  History,
  LayoutDashboard,
  Lightbulb,
  MapPinned,
  Menu,
  Package,
  QrCode,
  ShieldCheck,
  Siren,
  Users,
  Wrench,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/luminaires", label: "Luminarias", icon: Lightbulb },
  { href: "/qr-scan", label: "Escaneo QR", icon: QrCode },
  { href: "/field-survey", label: "Relevamiento", icon: ClipboardList },
  { href: "/maintenance", label: "Mantenimientos", icon: Wrench },
  { href: "/incidents", label: "Incidencias", icon: Siren },
  { href: "/inventory", label: "Inventario", icon: Package },
  { href: "/users", label: "Usuarios y roles", icon: Users },
  { href: "/audit", label: "Auditoria", icon: History },
  { href: "/reports", label: "Reportes", icon: FileBarChart },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="app-shell">
      {open ? <button className="overlay" aria-label="Cerrar menu" onClick={() => setOpen(false)} /> : null}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Lightbulb size={24} />
          </div>
          <div>
            <p className="brand-title">Smart City QR</p>
            <p className="brand-subtitle">Telegestion municipal</p>
          </div>
        </div>
        <nav className="nav-list" aria-label="Navegacion principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`} onClick={() => setOpen(false)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <header className="topbar">
        <button className="menu-button" type="button" aria-label="Abrir menu" onClick={() => setOpen(true)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div>
          <strong>Municipio de Cochabamba</strong>
          <div className="mobile-only-text">Operacion de alumbrado publico</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="badge info">
            <MapPinned size={14} /> Distrito activo
          </span>
          <span className="badge success">
            <ShieldCheck size={14} /> RBAC
          </span>
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
