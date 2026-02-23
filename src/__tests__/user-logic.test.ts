import { describe, it, expect } from 'vitest';
import { Role } from "@prisma/client";
import { prepareUserUpdateData } from '../lib/tests/user-logic';

describe('User Profile Logic - Unit Tests', () => {
    //1. TEST: Validacija podataka za update
  describe('priprema podataka za update korisnika', () => {
    
    it('provera da li se osnovna polja (ime, prezime, telefon) ispravno mapiraju', () => {
      const data = { firstName: "Marko", lastName: "Marković", phone: "061234567" };
      const result = prepareUserUpdateData(Role.STUDENT, data) as any;
      
      expect(result.firstName).toBe("Marko");
      expect(result.lastName).toBe("Marković");
      expect(result.phone).toBe("061234567");
    });

    it('student profile ne sme da sadrzi polja namenjena kompanijama', () => {
      const data = { 
        firstName: "Jovan", 
        studentIndex: "2023/0001", 
        companyName: "Eksterna Firma" 
      };
      
      const result = prepareUserUpdateData(Role.STUDENT, data) as any;
      
      expect(result.studentProfile).toBeDefined();
      expect(result.studentProfile.update.studentIndex).toBe("2023/0001");
      expect(result.companyProfile).toBeUndefined();
    });

    it('company profile mora da izoluje podatke firme i ignorise studentska polja', () => {
      const data = { 
        companyName: "Tech Hub", 
        industry: "IT", 
        studentIndex: "INDEX123" 
      };
      
      const result = prepareUserUpdateData(Role.COMPANY, data) as any;
      
      expect(result.companyProfile).toBeDefined();
      expect(result.companyProfile.update.companyName).toBe("Tech Hub");
      expect(result.companyProfile.update.industry).toBe("IT");
      expect(result.studentProfile).toBeUndefined();
    });

    it('prazna polja treba da ostanu undefined zbog Prisma update logike', () => {
      const data = { firstName: "Ana" }; 
      const result = prepareUserUpdateData(Role.STUDENT, data) as any;
      
      expect(result.firstName).toBe("Ana");
      expect(result.lastName).toBeUndefined();
      expect(result.studentProfile.update.studentIndex).toBeUndefined();
    });
  });

});