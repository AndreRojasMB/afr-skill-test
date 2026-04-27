"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("Admin123*");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const session = await login(email, password);
      window.localStorage.setItem("smart-city-session", JSON.stringify(session));
      router.push("/dashboard");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No se pudo iniciar sesion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand" style={{ color: "#172033", padding: "0 0 18px", borderBottom: "1px solid var(--line)" }}>
          <div className="brand-mark">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="brand-title">Smart City QR MVP</p>
            <p className="brand-subtitle" style={{ color: "var(--muted)" }}>
              Acceso operativo municipal
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Contrasena</label>
            <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {error ? <p className="badge danger" role="alert">{error}</p> : null}
          <button className="button" type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? "Validando..." : "Ingresar"}
          </button>
          <p className="mobile-only-text">
            Demo: ADMIN, SUPERVISOR, TECNICO, ALMACEN y AUDITOR. Si el backend no esta activo, se usa fallback controlado.
          </p>
        </div>
      </form>
    </main>
  );
}
