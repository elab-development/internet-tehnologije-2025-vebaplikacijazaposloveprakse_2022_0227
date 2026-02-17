import { get } from "http";
import { Ad } from "../types/ad";
import { JobApplication } from "@prisma/client";
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
    },
    getMyAds: async (): Promise<Ad[]> => {
        const res = await fetch("/api/ads/my-ads",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobavljanju mojih oglasa");
        return result;
    },
    deleteAd: async (id: number): Promise<void> => {
        const res = await fetch(`/api/ads/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri brisanju oglasa");
    },
    getApplicationsForAd: async (adId: number): Promise<JobApplication[]> => {
        const res = await fetch(`/api/ads/${adId}/applications`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri dobavljanju prijava za oglas");
        return result;
    },
    updateAd: async (id: number, data: Omit<Ad, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>): Promise<Ad> => {
        const res = await fetch(`/api/ads/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri izmeni oglasa");
        return result;
    },
};