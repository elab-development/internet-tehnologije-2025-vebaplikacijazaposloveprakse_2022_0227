import { Role } from "@prisma/client";
import { StudentStatus } from "@prisma/client";
export interface BaseUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: Role;
}
export interface StudentProfile {
    studentIndex: string;
    profileDescription?: string | null;
    status: StudentStatus;
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
    studentProfile?: StudentProfile | null;
    companyProfile?: CompanyProfile | null;
};

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  studentProfile?: {
    studentIndex?: string;
    profileDescription?: string | null;
    status?: StudentStatus;
  };
  companyProfile?: {
    companyName?: string;
    industry?: string | null;
    location?: string | null;
    website?: string | null;
    taxNumber?: string;
    regNumber?: string | null;
  };
}