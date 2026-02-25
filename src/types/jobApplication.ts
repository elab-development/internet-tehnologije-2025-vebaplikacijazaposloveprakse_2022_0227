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
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}