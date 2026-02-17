import { Ad } from "../types/ad";
export const adService = {
    getAds: async (): Promise<Ad[]> => {
        const res = await fetch("/api/ads",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobavljanju oglasa");
        return result;
    },
    getAdById: async (id: number): Promise<Ad> => {
        const res = await fetch(`/api/ads/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobavljanju oglasa");
        return result;
    },
    createAd: async (data: Omit<Ad, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>): Promise<Ad> => {
        const res = await fetch("/api/ads",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri kreiranju oglasa");
        return result;
    }
};