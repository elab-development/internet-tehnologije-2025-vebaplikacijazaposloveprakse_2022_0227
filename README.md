# CareerHub - Platforma za poslove i prakse

**Live**: https://career-hub-xolr.onrender.com/

> Hosted na Render free tier-u, normalno je da prvi load traje ~30 sekundi.

---

CareerHub povezuje studente i kompanije. Kompanije postavljaju oglase za poslove i prakse, studenti pretrazuju ponude, prate statistiku zarada i citaju IT vesti.

## Tehnologije

- **Next.js** (App Router)
- **PostgreSQL** + **Prisma**
- **Tailwind CSS** (Brutalist UI)
- **Recharts**
- **Adzuna API** (plate), **GNews API** (vesti)

## Funkcionalnosti

- Dashboard sa grafovima (studenti vs kompanije, prosecne plate)
- Pretraga oglasa za posao i praksu
- IT vesti preko GNews integracije
- Admin panel (upravljanje korisnicima, odobravanje kompanija)
- Prisma Studio za direktan rad sa bazom

---

## Pokretanje lokalno

Potrebno: **Node.js** i **PostgreSQL**.

### 1. Kloniranje

```bash
git clone https://github.com/elab-development/internet-tehnologije-2025-vebaplikacijazaposloveprakse_2022_0227.git
cd careerhub
```

### 2. Instalacija

```bash
npm install
```

### 3. .env fajl

```env
DATABASE_URL="postgresql://postgres:VASA_SIFRA@localhost:VAS_PORT/poslovi_prakse?schema=public"
JWT_SECRET="vasa_tajna_rec"
ADZUNA_APP_ID="vas_id"
ADZUNA_APP_KEY="vas_kljuc"
GNEWS_API_KEY="vas_gnews_kljuc"
```

### 4. Inicijalizacija baze

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Pokretanje

```bash
npm run dev
```

App je dostupan na http://localhost:3000, a Prisma Studio na:

```bash
npx prisma studio
```

---
