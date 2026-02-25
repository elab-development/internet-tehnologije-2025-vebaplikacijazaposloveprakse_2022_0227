export interface StudentApplication {
  id: number;
  studentId: number;
  adId: number;
  appliedAt: Date;
  status: string;
  ad: {
    id: number;
    title: string;
    jobType: string;
    company: {
      companyId: number;
      companyName: string;
      logoUrl: string | null;
    };
  };
  student: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
    };
    avatarUrl?: string | null;
    studentIndex?: string | null;
  };
}
export type JobApplication = StudentApplication;
export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}