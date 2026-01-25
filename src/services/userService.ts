import { AuthResponse } from "../types/auth";
import { AuthUser, UpdateUserData } from "../types/user";

export const userService = {
  async getCurrentUser(): Promise<AuthUser> {
    const res = await fetch("/api/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri dobijanju podataka o korisniku");
    
    return result;
  },
  async updateUser(data: UpdateUserData): Promise<AuthResponse> {
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Greska pri azuriranju profila");
    return result;
  }
};