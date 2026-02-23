import { Role } from "@prisma/client";

export function prepareUserUpdateData(role: Role, data: any) {
  const baseData = {
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    phone: data.phone || undefined,
  };
  if (role === Role.STUDENT) {
    return {
      ...baseData,
      studentProfile: {
        update: {
          studentIndex: data.studentIndex || undefined,
          profileDescription: data.profileDescription || undefined,
          status: data.status || undefined
        },
      },
    };
  }
  if (role === Role.COMPANY) {
    return {
      ...baseData,
      companyProfile: {
        update: {
          companyName: data.companyName || undefined,
          taxNumber: data.taxNumber || undefined,
          regNumber: data.regNumber || undefined,
          industry: data.industry || undefined,
          website: data.website || undefined,
          location: data.location || undefined,
          logoUrl: data.logoUrl || undefined,
          description: data.profileDescription || undefined
        },
      },
    };
  }
  return baseData;
}