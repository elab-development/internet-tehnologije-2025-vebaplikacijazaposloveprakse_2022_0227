import { Role } from "@prisma/client";
import { Company } from "./company";
export interface BaseUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: Role;
    isBanned: boolean;      
    banReason?: string | null;
    createdAt: Date;
}
export interface StudentProfile {
    studentIndex: string;
    profileDescription?: string | null;
    status: StudentStatus;
    cvUrl?: string | null;
    avatarUrl?: string | null;
}

export type AuthUser = BaseUser & {
    studentProfile?: StudentProfile | null;
    companyProfile?: (Company & { isApproved: boolean, rejectReason?: string | null }) | null;
};

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  studentProfile?: {
    studentIndex?: string;
    profileDescription?: string | null;
    status?: StudentStatus;
    cvUrl?: string | null;
    avatarUrl?: string | null;
  };
  companyProfile?: {
    companyName?: string;
    industry?: string | null;
    location?: string | null;
    website?: string | null;
    taxNumber?: string;
    regNumber?: string | null;
    logoUrl?: string | null;
  };
}
export enum StudentStatus {
  STUDYING = "STUDYING",
  GRADUATED = "GRADUATED"
}