import { Ad } from "./ad";

export interface Company {
    companyId: number;
    companyName: string;
    taxNumber: string;
    regNumber: string;
    industry: string;
    website: string;
    location: string;
    isApproved: boolean;   
    rejectReason?: string | null; 
    user?: {
        email: string;
        firstName: string;
        lastName: string;
        phone?: string | null;
    };
    ads?: Ad[];
    _count?: {
        ads: number;
    };
}