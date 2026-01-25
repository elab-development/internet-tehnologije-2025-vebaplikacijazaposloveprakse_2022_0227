import { AuthResponse, LoginData, RegisterData } from "../types/auth";

export const authService = {
  async login(data: LoginData):Promise<AuthResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri prijavi");
    
    return result;
  },

  async register(data: RegisterData):Promise<AuthResponse> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri registraciji");

    return result;
  },

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
};