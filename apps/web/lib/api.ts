interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const fallbackUsers: Record<string, { password: string; name: string; role: string }> = {
  "admin@demo.com": { password: "Admin123*", name: "Administrador Demo", role: "ADMIN" },
  "supervisor@demo.com": { password: "Supervisor123*", name: "Supervisora Municipal", role: "SUPERVISOR" },
  "tecnico@demo.com": { password: "Tecnico123*", name: "Tecnico de Campo", role: "TECNICO" },
  "almacen@demo.com": { password: "Almacen123*", name: "Responsable de Almacen", role: "ALMACEN" },
};

export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) return response.json() as Promise<LoginResult>;
  } catch {
    // The controlled fallback keeps the UI testable before Neon is configured.
  }

  const fallback = fallbackUsers[email];
  if (!fallback || fallback.password !== password) {
    throw new Error("Credenciales invalidas.");
  }

  return {
    accessToken: "demo-fallback-token",
    user: {
      id: email,
      name: fallback.name,
      email,
      role: fallback.role,
    },
  };
}
