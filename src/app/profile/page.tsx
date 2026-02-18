"use client"
import { CompanyProfile } from "@/src/components/pages/profiles/CompanyProfile";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { useAuth } from "@/src/context/AuthContext";
import { Role } from "@/src/types/auth";

export default function ProfilePage() {
    const { user, loading } = useAuth();

    if (loading) return <LoadingState />;
    if (user?.role === Role.COMPANY) {
        return <CompanyProfile />;
    }
    // if (user?.role === Role.STUDENT) {
    //     return <StudentProfile />;
    // }
    return (
        <ErrorState message="Niste autorizovani da pristupite ovom sadrzaju." />
    );
}