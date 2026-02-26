import {Role, JobType, JobStatus, StudentStatus, ApplicationStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding baze podataka...");

  // Brisanje postojecih podataka
  await prisma.jobApplication.deleteMany();
  await prisma.savedAd.deleteMany();
  await prisma.ad.deleteMany();
  await prisma.student.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Password123!", 12);

  // ============ ADMIN ============
  await prisma.user.create({
    data: {
      email: "admin@careerhub.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "CareerHub",
      phone: "0601234567",
      role: Role.ADMIN,
    },
  });

  // ============ KOMPANIJE ============
  const companyUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: "microsoft@careerhub.com",
        password: hashedPassword,
        firstName: "Microsoft",
        lastName: "Serbia",
        phone: "0611111111",
        role: Role.COMPANY,
        companyProfile: {
          create: {
            companyName: "Microsoft Serbia",
            taxNumber: "111111111",
            regNumber: "11111111",
            industry: "Informacione tehnologije",
            website: "https://microsoft.com",
            description: "Globalna tehnološka kompanija",
            location: "Beograd",
            isApproved: true,
          },
        },
      },
      include: { companyProfile: true },
    }),
    prisma.user.create({
      data: {
        email: "nordeus@careerhub.com",
        password: hashedPassword,
        firstName: "Nordeus",
        lastName: "doo",
        phone: "0622222222",
        role: Role.COMPANY,
        companyProfile: {
          create: {
            companyName: "Nordeus",
            taxNumber: "222222222",
            regNumber: "22222222",
            industry: "Gaming",
            website: "https://nordeus.com",
            description: "Vodeća gaming kompanija u Srbiji",
            location: "Beograd",
            isApproved: true,
          },
        },
      },
      include: { companyProfile: true },
    }),
    prisma.user.create({
      data: {
        email: "levi9@careerhub.com",
        password: hashedPassword,
        firstName: "Levi9",
        lastName: "doo",
        phone: "0633333333",
        role: Role.COMPANY,
        companyProfile: {
          create: {
            companyName: "Levi9",
            taxNumber: "333333333",
            regNumber: "33333333",
            industry: "Softverski razvoj",
            website: "https://levi9.com",
            description: "IT outsourcing kompanija",
            location: "Novi Sad",
            isApproved: false,
          },
        },
      },
      include: { companyProfile: true },
    }),
  ]);

  // ============ STUDENTI ============
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: "student1@careerhub.com",
        password: hashedPassword,
        firstName: "Marko",
        lastName: "Marković",
        phone: "0641111111",
        role: Role.STUDENT,
        studentProfile: {
          create: {
            studentIndex: "2021/0001",
            status: StudentStatus.STUDYING,
            profileDescription: "Student softverskog inženjerstva, zainteresovan za web razvoj",
          },
        },
      },
      include: { studentProfile: true },
    }),
    prisma.user.create({
      data: {
        email: "student2@careerhub.com",
        password: hashedPassword,
        firstName: "Ana",
        lastName: "Anić",
        phone: "0642222222",
        role: Role.STUDENT,
        studentProfile: {
          create: {
            studentIndex: "2021/0002",
            status: StudentStatus.STUDYING,
            profileDescription: "Student računarskih nauka, zainteresovana za UI/UX dizajn",
          },
        },
      },
      include: { studentProfile: true },
    }),
    prisma.user.create({
      data: {
        email: "student3@careerhub.com",
        password: hashedPassword,
        firstName: "Nikola",
        lastName: "Nikolić",
        phone: "0643333333",
        role: Role.STUDENT,
        studentProfile: {
          create: {
            studentIndex: "2020/0003",
            status: StudentStatus.GRADUATED,
            profileDescription: "Diplomirani inženjer, traži posao u oblasti backend razvoja",
          },
        },
      },
      include: { studentProfile: true },
    }),
  ]);

  // ============ OGLASI ============
  const ads = await Promise.all([
    prisma.ad.create({
      data: {
        companyId: companyUsers[0].companyProfile!.companyId,
        title: "Frontend Developer Intern",
        description: "Tražimo motivisanog studenta za Frontend Developer internship poziciju",
        requirements: "React, TypeScript, HTML, CSS",
        location: "Beograd",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: JobStatus.ACTIVE,
        jobType: JobType.INTERNSHIP,
      },
    }),
    prisma.ad.create({
      data: {
        companyId: companyUsers[0].companyProfile!.companyId,
        title: "Backend Developer",
        description: "Tražimo iskusnog Backend Developer-a za rad na cloud servisima",
        requirements: "Node.js, PostgreSQL, Docker, AWS",
        location: "Beograd",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        status: JobStatus.ACTIVE,
        jobType: JobType.JOB,
      },
    }),
    prisma.ad.create({
      data: {
        companyId: companyUsers[1].companyProfile!.companyId,
        title: "Game Developer Intern",
        description: "Internship pozicija za razvoj mobilnih igara",
        requirements: "Unity, C#, osnove game developmenta",
        location: "Beograd",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: JobStatus.ACTIVE,
        jobType: JobType.INTERNSHIP,
      },
    }),
    prisma.ad.create({
      data: {
        companyId: companyUsers[1].companyProfile!.companyId,
        title: "UI/UX Designer",
        description: "Tražimo kreativnog UI/UX dizajnera za gaming projekte",
        requirements: "Figma, Adobe XD, iskustvo u dizajnu igara",
        location: "Beograd",
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: JobStatus.ACTIVE,
        jobType: JobType.JOB,
      },
    }),
    prisma.ad.create({
      data: {
        companyId: companyUsers[0].companyProfile!.companyId,
        title: "DevOps Engineer",
        description: "Pozicija za DevOps inženjera",
        requirements: "Docker, Kubernetes, CI/CD",
        location: "Beograd",
        deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: JobStatus.EXPIRED,
        jobType: JobType.JOB,
      },
    }),
  ]);

  // ============ PRIJAVE ============
  await Promise.all([
    prisma.jobApplication.create({
      data: {
        adId: ads[0].id,
        studentId: studentUsers[0].studentProfile!.studentId,
        status: ApplicationStatus.PENDING,
      },
    }),
    prisma.jobApplication.create({
      data: {
        adId: ads[0].id,
        studentId: studentUsers[1].studentProfile!.studentId,
        status: ApplicationStatus.ACCEPTED,
      },
    }),
    prisma.jobApplication.create({
      data: {
        adId: ads[1].id,
        studentId: studentUsers[2].studentProfile!.studentId,
        status: ApplicationStatus.REJECTED,
      },
    }),
    prisma.jobApplication.create({
      data: {
        adId: ads[2].id,
        studentId: studentUsers[0].studentProfile!.studentId,
        status: ApplicationStatus.PENDING,
      },
    }),
  ])}