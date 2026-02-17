
export const companyService = {
    async getCompanies() {
        const res = await fetch("/api/companies", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobijanju kompanija");
        
        return result;
    }
}