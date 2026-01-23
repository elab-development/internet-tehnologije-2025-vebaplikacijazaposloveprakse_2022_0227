import { z } from "zod";

export const RegisterBaseSchema = z.object({
  email: z.email({ error: "Neispravna email adresa" }),
  password: z.string().min(8, { error: "Lozinka mora imati bar 8 karaktera" }),
  firstName: z.string().min(2, { error: "Ime je obavezno" }),
  lastName: z.string().min(2, { error: "Prezime je obavezno" }),
  phone: z.string().optional(),
  role: z.enum(["STUDENT", "COMPANY", "ADMIN"]).default("STUDENT"),

  companyName: z.string().optional(),
  taxNumber: z.string().optional(),
  regNumber: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),

  studentIndex: z.string().optional(),
  profileDescription: z.string().max(500, { error: "Maksimalno 500 karaktera" }).optional(),
});

export const RegisterSchema = RegisterBaseSchema.check(
  z.superRefine((data, ctx) => {
    if (data.role === "COMPANY") {
      if (!data.companyName) ctx.addIssue({ code: "custom", message: "Ime kompanije je obavezno", path: ["companyName"] });
      if (!data.taxNumber) ctx.addIssue({ code: "custom", message: "PIB je obavezan", path: ["taxNumber"] });
      if (!data.regNumber) ctx.addIssue({ code: "custom", message: "Maticni broj je obavezan", path: ["regNumber"] });
      if (!data.industry) ctx.addIssue({ code: "custom", message: "Industrija je obavezna", path: ["industry"] });
      if (!data.website) ctx.addIssue({ code: "custom", message: "Websajt je obavezan", path: ["website"] });
      if (!data.location) ctx.addIssue({ code: "custom", message: "Lokacija je obavezna", path: ["location"] });
    }

    if (data.role === "STUDENT") {
      if (!data.studentIndex) {
        ctx.addIssue({ code: "custom", message: "Broj indeksa je obavezan", path: ["studentIndex"] });
      }
    }
  })
);