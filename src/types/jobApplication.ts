import { ApplicationStatus } from "@prisma/client";

export interface JobApplication {
  id: number;
  adId: number;
  studentId: number;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
}