import { JobType } from "@prisma/client";
import * as z from "zod";

export const CreateAdSchema = z.object({
  title: z.string().min(5, { error: "Naslov mora imati bar 5 karaktera" }),
  description: z.string().min(10, { error: "Opis mora biti detaljniji" }),
  requirements: z.string().optional(),
  location: z.string().min(2, { error: "Lokacija je obavezna" }),

  deadline: z.string()
    .refine((val) => !isNaN(Date.parse(val)), { error: "Nevalidan format datuma" })
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, { error: "Rok ne moze biti u proslosti" })
    .refine((val) => {
      const selectedDate = new Date(val);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      return selectedDate <= maxDate;
    }, { error: "Rok ne moze biti vise od godinu dana unapred" }),

  jobType: z.enum(JobType),
});
export const UpdateAdSchema = CreateAdSchema.partial();