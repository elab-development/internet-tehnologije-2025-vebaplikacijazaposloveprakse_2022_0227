'use client';

import { AdminDashboard } from "../components/pages/AdminDashboard";
import CompanyDashboard from "../components/pages/CompanyDashboard";
import LandingPage from "../components/pages/LandingPage";
import { LoadingState } from "../components/ui/LoadingState";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;
  if(user?.role === Role.ADMIN) return <AdminDashboard />;
  if (user?.role === Role.COMPANY)return <CompanyDashboard />;
  
  return <LandingPage />;
}