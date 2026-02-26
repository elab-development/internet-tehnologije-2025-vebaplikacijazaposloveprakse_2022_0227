"use client";
import { RegisterForm } from "@/src/components/pages/auth/RegisterForm";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { Suspense } from "react";
export default function RegisterPage() {
    return (
        <Suspense fallback={<LoadingState/>}>
            <RegisterForm />
        </Suspense>
    );
}