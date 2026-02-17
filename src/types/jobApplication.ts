import { ApplicationStatus } from "@prisma/client";

export interface JobApplication {
  id: number;
  adId: number;
  studentId: number;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  student: {
    studentId: number;
    user: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string | null;
    };
  };
}