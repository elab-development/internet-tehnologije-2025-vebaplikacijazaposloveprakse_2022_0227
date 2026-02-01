import { Ad } from "../types/ad";
export const adService = {
    getAds: async (): Promise<Ad[]> => {
        const res = await fetch("/api/ads");
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobavljanju oglasa");
        return result;
    },
};