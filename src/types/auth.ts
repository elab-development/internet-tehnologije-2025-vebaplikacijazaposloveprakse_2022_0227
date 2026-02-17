export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: Role;
    
    // Student fields
    studentIndex?: string;
    profileDescription?: string;
    
    // Company fields
    companyName?: string;
    taxNumber?: string;
    regNumber?: string;
    industry?: string;
    website?: string;
    location?: string;
}
export enum Role {
    STUDENT = "STUDENT",
    COMPANY = "COMPANY",
    ADMIN = "ADMIN",
}
export interface AuthResponse {
    message: string;
    user?: {
        email: string;
        role: string;
    };
}