import { Role } from "@prisma/client";
import * as z  from "zod";

export const RegisterBaseSchema = z.object({
  email: z.email({ error: "Neispravna email adresa" }),
  password: z.string().min(8, { error: "Lozinka mora imati bar 8 karaktera" }),
  firstName: z.string().min(2, { error: "Ime je obavezno" }),
  lastName: z.string().min(2, { error: "Prezime je obavezno" }),
  phone: z.string().min(2, { error: "Telefon je obavezan" }),
  role: z.enum(Role).default("STUDENT"),

  companyName: z.string().optional(),
  taxNumber: z.string().optional(),
  regNumber: z.string().optional(),
  industry: z.string().optional(),
  website: z.url({ error: "Neispravan URL" }).optional(),
  location: z.string().optional(),

  studentIndex: z.string().optional(),
  profileDescription: z.string().max(500, { error: "Maksimalno 500 karaktera" }).optional(),
});

export const RegisterSchema = RegisterBaseSchema
  .refine((data) => data.role !== Role.COMPANY || (data.companyName?.trim().length ?? 0) > 0, {
    error: "Ime kompanije je obavezno",
    path: ["companyName"],
  })
  .refine((data) => data.role !== Role.COMPANY || !!data.taxNumber, {
    error: "PIB je obavezan",
    path: ["taxNumber"],
  })
  .refine((data) => data.role !== Role.COMPANY || !!data.regNumber, {
    error: "Maticni broj je obavezan",
    path: ["regNumber"],
  })
  .refine((data) => data.role !== Role.COMPANY || !!data.industry, {
    error: "Industrija je obavezna",
    path: ["industry"],
  })
  .refine((data) => data.role !== Role.COMPANY || !!data.website, {
    error: "Websajt je obavezan",
    path: ["website"],
  })
  .refine((data) => data.role !== Role.COMPANY || !!data.location, {
    error: "Lokacija je obavezna",
    path: ["location"],
  })
  .refine((data) => data.role !== Role.STUDENT || !!data.studentIndex, {
    error: "Broj indeksa je obavezan",
    path: ["studentIndex"],
  });

export const LoginSchema = z.object({
  email: z.email({ error: "Neispravna email adresa" }),
  password: z.string().min(1, { error: "Lozinka je obavezna" }),
});