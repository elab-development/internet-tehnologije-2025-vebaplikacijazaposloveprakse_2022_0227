import { Company } from "./company";

export interface Ad {
    id: number;
    companyId: number;
    company?: Company;
    title: string;
    description: string;
    requirements: string;
    location: string;
    deadline: Date | string;

    status: JobStatus;
    jobType: JobType;

    hasApplied?: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    _count?: {
        applications: number;
    };
}
export enum JobType {
    INTERNSHIP = "INTERNSHIP",
    JOB = "JOB",
}
export enum JobStatus {
    ACTIVE = "ACTIVE",
    CLOSED = "CLOSED",
    EXPIRED = "EXPIRED",
}