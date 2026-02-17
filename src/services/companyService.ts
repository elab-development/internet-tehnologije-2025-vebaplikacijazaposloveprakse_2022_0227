import { Company } from "@/src/types/company";

export const companyService = {
    async getCompanies(page: number = 1, limit: number = 10): Promise<{ data: Company[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
        const res = await fetch(`/api/companies?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobijanju kompanija");
        
        return result;
    },
    async getCompanyById(id: number): Promise<Company> {
        const res = await fetch(`/api/companies/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobijanju kompanije");
        
        return result;
    }
}