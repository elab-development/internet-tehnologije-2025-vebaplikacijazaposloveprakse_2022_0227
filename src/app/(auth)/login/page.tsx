"use client";
import { LoginForm } from "@/src/components/pages/auth/LoginForm";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingState/>}>
            <LoginForm />
        </Suspense>
    );
}