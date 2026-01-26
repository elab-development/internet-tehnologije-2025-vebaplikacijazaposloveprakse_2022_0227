"use client";
import { createContext, useState, useEffect, useContext} from "react";
import { AuthUser } from "../types/user";
import { userService } from "../services/userService";
import { authService } from "../services/authService";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const userData = await userService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    const logout = async () => {
        await authService.logout();
        setUser(null);
        window.location.href = "/login";
    }
    return (
        <AuthContext.Provider value={{ user, loading, logout, refetch: fetchUserData }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth mora biti koriscen unutar AuthProvider-a');
  }
  return context;
}