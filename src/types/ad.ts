import { JobType, JobStatus } from "@prisma/client";
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

    createdAt: Date | string;
    updatedAt: Date | string;
    _count?: {
        applications: number;
    };
}