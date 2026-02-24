import { Role } from "@prisma/client";

export function canDeleteAd(userId: string | null, userRole: string | null, adOwnerId: number) {
  if (!userId) return false;
  const isAdmin = userRole === Role.ADMIN;
  const isOwner = adOwnerId === parseInt(userId);
  return isAdmin || isOwner;
}

export function canCreateAd(userRole: string | null) {
  return userRole === Role.COMPANY;
}

export function canViewMyAds(userId: string | null, userRole: string | null) {
  if (!userId) {
    return { isValid: false, message: "Morate biti ulogovani da biste videli svoje oglase", status: 401 };
  }
  
  if (userRole !== Role.COMPANY) {
    return { isValid: false, message: "Samo kompanije mogu videti svoje oglase", status: 403 };
  }

  const parsedId = parseInt(userId);
  if (isNaN(parsedId)) {
    return { isValid: false, message: "Nevalidan ID korisnika", status: 400 };
  }

  return { isValid: true, parsedId };
}
export function canModifyAd(userId: string | null, userRole: string | null, adOwnerId: number) {
  if (!userId) return { allowed: false, status: 401, message: "Morate biti ulogovani" };
  
  const parsedUserId = parseInt(userId);
  const isAdmin = userRole === Role.ADMIN;
  const isOwner = adOwnerId === parsedUserId;

  if (isAdmin || isOwner) {
    return { allowed: true };
  }

  return { allowed: false, status: 403, message: "Nemate dozvolu za ovu akciju" };
}