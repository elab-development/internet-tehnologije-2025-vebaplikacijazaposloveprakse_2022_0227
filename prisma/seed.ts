import { PrismaClient, Role, StudentStatus, JobType, JobStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@careerhub.com" },
    update: {},
    create: {
      email: "admin@careerhub.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "CareerHub",
      role: Role.ADMIN,
    },
  });

  const companyPassword = await bcrypt.hash("company123", 10);
  const companies = [
    { email: "microsoft@careerhub.com", firstName: "Microsoft", lastName: "Corp", companyName: "Microsoft", taxNumber: "111111111", regNumber: "REG001", industry: "Software", location: "Beograd" },
    { email: "google@careerhub.com", firstName: "Google", lastName: "LLC", companyName: "Google", taxNumber: "222222222", regNumber: "REG002", industry: "Technology", location: "Novi Sad" },
    { email: "infostud@careerhub.com", firstName: "Infostud", lastName: "doo", companyName: "Infostud", taxNumber: "333333333", regNumber: "REG003", industry: "IT", location: "Subotica" },
  ];

  for (const c of companies) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        password: companyPassword,
        firstName: c.firstName,
        lastName: c.lastName,
        role: Role.COMPANY,
      },
    });
    await prisma.company.upsert({
      where: { taxNumber: c.taxNumber },
      update: {},
      create: {
        companyId: user.id,
        companyName: c.companyName,
        taxNumber: c.taxNumber,
        regNumber: c.regNumber,
        industry: c.industry,
        location: c.location,
        isApproved: true,
      },
    });
  }

  const studentPassword = await bcrypt.hash("student123", 10);
  const students = [
    { email: "marko@careerhub.com", firstName: "Marko", lastName: "Markovic", studentIndex: "2021/0001" },
    { email: "ana@careerhub.com", firstName: "Ana", lastName: "Anic", studentIndex: "2021/0002" },
    { email: "petar@careerhub.com", firstName: "Petar", lastName: "Petrovic", studentIndex: "2022/0001" },
  ];

  for (const s of students) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        password: studentPassword,
        firstName: s.firstName,
        lastName: s.lastName,
        role: Role.STUDENT,
      },
    });
    await prisma.student.upsert({
      where: { studentId: user.id },
      update: {},
      create: {
        studentId: user.id,
        studentIndex: s.studentIndex,
        status: StudentStatus.STUDYING,
      },
    });
  }

  const allCompanies = await prisma.company.findMany();
  const ads = [
    { title: "Junior Frontend Developer", description: "Trazimo junior frontend developera.", requirements: "React, TypeScript", location: "Beograd", jobType: JobType.JOB, deadline: new Date("2026-06-01") },
    { title: "Backend Praksa", description: "Praksa za backend developere.", requirements: "Node.js, PostgreSQL", location: "Novi Sad", jobType: JobType.INTERNSHIP, deadline: new Date("2026-05-01") },
    { title: "DevOps Engineer", description: "Trazimo DevOps inzenjera.", requirements: "Docker, Kubernetes", location: "Beograd", jobType: JobType.JOB, deadline: new Date("2026-07-01") },
    { title: "Python Developer", description: "Razvoj backend servisa u Pythonu.", requirements: "Python, Django", location: "Subotica", jobType: JobType.JOB, deadline: new Date("2026-06-15") },
    { title: "UI/UX Dizajner Praksa", description: "Praksa za dizajnere.", requirements: "Figma, Adobe XD", location: "Novi Sad", jobType: JobType.INTERNSHIP, deadline: new Date("2026-05-15") },
  ];

  for (let i = 0; i < ads.length; i++) {
    const company = allCompanies[i % allCompanies.length];
    await prisma.ad.create({
      data: {
        ...ads[i],
        companyId: company.companyId,
        status: JobStatus.ACTIVE,
      },
    });
  }

  console.log("Seed zavrseno!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });