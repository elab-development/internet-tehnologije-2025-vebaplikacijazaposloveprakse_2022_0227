export const authService = {
  async login(data: any) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri prijavi");
    
    return result;
  },

  async register(data: any) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri registraciji");

    return result;
  },

  async logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    return res.json();
  }
};