const APP_ID = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
const APP_KEY = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

export const adzunaService = {
    async getAverageSalary(jobTitle: string) {
        const res = await fetch(
            `https://api.adzuna.com/v1/api/jobs/us/history?app_id=${APP_ID}&app_key=${APP_KEY}&what=${encodeURIComponent(jobTitle)}&content-type=application/json`,
            { headers: { "Accept": "application/json" } }
        );
        console.log("Adzuna status:", res.status);
        if (!res.ok) throw new Error("Greska pri dobijanju podataka o platama");
        return res.json();
    }
};