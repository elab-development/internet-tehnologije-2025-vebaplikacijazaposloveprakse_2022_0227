import { describe, it, expect } from 'vitest';
import { Role } from "@prisma/client";
import { canDeleteAd, canCreateAd, canViewMyAds, canModifyAd } from '../lib/tests/ad-logic'; 

describe('Ad Logic & Permissions - Unit Tests', () => {

  // 1. TEST: Brisanje oglasa
  describe('canDeleteAd()', () => {
    it('trebalo bi da dozvoli ADMINU da obriše tudji oglas', () => {
      expect(canDeleteAd("1", Role.ADMIN, 99)).toBe(true);
    });

    it('trebalo bi da dozvoli vlasniku (COMPANY) da obriše svoj oglas', () => {
      expect(canDeleteAd("50", Role.COMPANY, 50)).toBe(true);
    });

    it('NE bi trebalo da dozvoli kompaniji da obriše tudji oglas', () => {
      expect(canDeleteAd("50", Role.COMPANY, 51)).toBe(false);
    });

    it('trebalo bi da vrati false ako korisnik nije ulogovan', () => {
      expect(canDeleteAd(null, null, 50)).toBe(false);
    });
  });

  // 2. TEST: Kreiranje oglasa
  describe('canCreateAd()', () => {
    it('trebalo bi da dozvoli ulogu COMPANY', () => {
      expect(canCreateAd(Role.COMPANY)).toBe(true);
    });

    it('NE bi trebalo da dozvoli ulogu STUDENT', () => {
      expect(canCreateAd(Role.STUDENT)).toBe(false);
    });
  });

  // 3. TEST: Pristup "Moji Oglasi" sekciji
  describe('canViewMyAds()', () => {
    it('trebalo bi da vrati 401 (Unauthorized) ako nema userId', () => {
      const res = canViewMyAds(null, null);
      expect(res.isValid).toBe(false);
      expect(res.status).toBe(401);
    });

    it('trebalo bi da zabrani pristup studentu (403)', () => {
      const res = canViewMyAds("10", Role.STUDENT);
      expect(res.isValid).toBe(false);
      expect(res.status).toBe(403);
    });

    it('trebalo bi da propusti validnu kompaniju sa ispravnim ID-jem', () => {
      const res = canViewMyAds("15", Role.COMPANY);
      expect(res.isValid).toBe(true);
      expect(res.parsedId).toBe(15);
    });

    it('trebalo bi da baci gresku 400 ako je ID nevalidan (NaN)', () => {
      const res = canViewMyAds("abc", Role.COMPANY);
      expect(res.isValid).toBe(false);
      expect(res.status).toBe(400);
    });
  });

  // 4. TEST: Modifikacija oglasa (Update)
  describe('canModifyAd()', () => {
    it('trebalo bi da dozvoli modifikaciju vlasniku', () => {
      const res = canModifyAd("20", Role.COMPANY, 20);
      expect(res.allowed).toBe(true);
    });

    it('trebalo bi da zabrani modifikaciju ako ID-jevi ne odgovaraju', () => {
      const res = canModifyAd("20", Role.COMPANY, 21);
      expect(res.allowed).toBe(false);
      expect(res.status).toBe(403);
    });
  });
});