import * as z from "zod";
import { StudentStatus } from "@prisma/client";
export const UpdateUserSchema = z.object({
  firstName: z.string().min(2, { error: "Ime je obavezno" }),
  lastName: z.string().min(2, { error: "Prezime je obavezno" }),
  phone: z.string().min(2, { error: "Telefon je obavezan" }),

  companyName: z.string().optional(),
  taxNumber: z.string().optional(),
  regNumber: z.string().optional(),
  industry: z.string().optional(),
  website: z.url({ error: "Neispravan URL" }).optional(),
  location: z.string().optional(),

  studentIndex: z.string().optional(),
  profileDescription: z.string().max(500, { error: "Maksimalno 500 karaktera" }).optional(),
  status: z.enum(StudentStatus).optional(),
});