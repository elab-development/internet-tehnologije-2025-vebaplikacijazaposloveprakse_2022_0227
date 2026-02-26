export const adzunaService = {
    async getAverageSalary(jobTitle: string) {
        try {
            const response = await fetch(`/api/salary?query=${encodeURIComponent(jobTitle)}`);
            if (!response.ok) throw new Error("Problem sa podacima o plati");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};