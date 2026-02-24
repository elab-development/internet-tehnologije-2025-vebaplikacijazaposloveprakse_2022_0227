import { describe, it, expect } from 'vitest';
import { Role, JobStatus, ApplicationStatus } from "@prisma/client";
import { validateApplication, canStudentDeleteApplication } from '../lib/tests/application-logic';

describe('Application Logic - Unit Tests', () => {
    //1. TEST: Validiranje uslova za konkurisanje na oglas
  describe('validateApplication() - Provera uslova za konkurisanje', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7); 
    
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    it('trebalo bi da dozvoli studentu da se prijavi na aktivan oglas unutar roka', () => {
      const res = validateApplication(Role.STUDENT, JobStatus.ACTIVE, futureDate);
      expect(res.valid).toBe(true);
    });

    it('NE bi trebalo da dozvoli kompaniji da konkurise', () => {
      const res = validateApplication(Role.COMPANY, JobStatus.ACTIVE, futureDate);
      expect(res.valid).toBe(false);
      expect(res.status).toBe(403);
      expect(res.message).toContain("Samo korisnici");
    });

    it('NE bi trebalo da dozvoli prijavu na neaktivan oglas', () => {
      const res = validateApplication(Role.STUDENT, JobStatus.CLOSED, futureDate);
      expect(res.valid).toBe(false);
      expect(res.message).toContain("nije aktivan");
    });

    it('NE bi trebalo da dozvoli prijavu ako je deadline prosao', () => {
      const res = validateApplication(Role.STUDENT, JobStatus.ACTIVE, pastDate);
      expect(res.valid).toBe(false);
      expect(res.message).toContain("istekao");
    });
  });
  //2. TEST: Validiranje brisanja sopstvene prijave na oglas
  describe('canStudentDeleteApplication() - Brisanje sopstvene prijave', () => {
    it('trebalo bi da dozvoli studentu da obrise svoju PENDING prijavu', () => {
      const res = canStudentDeleteApplication(Role.STUDENT, 10, 10, ApplicationStatus.PENDING);
      expect(res.allowed).toBe(true);
    });

    it('NE bi trebalo da dozvoli brisanje tudje prijave (Security check)', () => {
      const res = canStudentDeleteApplication(Role.STUDENT, 10, 11, ApplicationStatus.PENDING);
      expect(res.allowed).toBe(false);
      expect(res.message).toContain("Niste vlasnik");
    });

    it('NE bi trebalo da dozvoli brisanje ako je prijava vec ACCEPTED ili REJECTED', () => {
      const res = canStudentDeleteApplication(Role.STUDENT, 10, 10, ApplicationStatus.ACCEPTED);
      expect(res.allowed).toBe(false);
      expect(res.message).toContain("obrađena");
    });

    it('NE bi trebalo da dozvoli kompaniji da koristi ovu funkciju', () => {
      const res = canStudentDeleteApplication(Role.COMPANY, 10, 10, ApplicationStatus.PENDING);
      expect(res.allowed).toBe(false);
    });
  });
});