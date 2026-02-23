import { Role, JobStatus, ApplicationStatus } from "@prisma/client";

export function validateApplication(userRole: string | null,adStatus: string,deadline: Date,now: Date = new Date()) {
  if (userRole !== Role.STUDENT) return { valid: false, status: 403, message: "Samo korisnici mogu aplicirati" };
  if (adStatus !== JobStatus.ACTIVE) return { valid: false, status: 403, message: "Oglas nije aktivan" };
  if (now > deadline) return { valid: false, status: 403, message: "Rok je istekao" };
  return { valid: true };
}

export function canStudentDeleteApplication(userRole: string | null,applicationStudentId: number,currentUserId: number,applicationStatus: string) {
  if (userRole !== Role.STUDENT) return { allowed: false, message: "Samo korisnici brišu svoje prijave" };
  if (applicationStudentId !== currentUserId) return { allowed: false, message: "Niste vlasnik prijave" };
  if (applicationStatus !== ApplicationStatus.PENDING) return { allowed: false, message: "Prijava je već obrađena" };
  return { allowed: true };
}