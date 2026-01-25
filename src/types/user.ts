export enum UserRole {
    STUDENT = "STUDENT",
    COMPANY = "COMPANY",
    ADMIN = "ADMIN",
}
export interface BaseUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
}
export interface StudentProfile {
    studentIndex: string;
    profileDescription?: string | null;
}
export interface CompanyProfile {
    companyName: string;
    taxNumber: string;
    regNumber: string;
    industry: string;
    website?: string | null;
    location: string;
}

export type AuthUser = BaseUser & {
    student?: StudentProfile | null;
    company?: CompanyProfile | null;
};