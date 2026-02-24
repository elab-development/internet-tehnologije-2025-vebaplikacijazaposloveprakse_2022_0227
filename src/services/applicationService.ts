import { ApplicationStatus } from "../types/jobApplication";

export const applicationService = {
    applyToAd: async (adId: number): Promise<void> => {
        const res = await fetch(`/api/application/${adId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri prijavljivanju na oglas");
    },
    updateApplicationStatus: async (applicationId: number, status: ApplicationStatus): Promise<void> => {
        const res = await fetch(`/api/application/${applicationId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri azuriranju statusa prijave");
    },
    deleteApplication: async (applicationId: number): Promise<void> => {
        const res = await fetch(`/api/application/${applicationId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Greska pri brisanju prijave");
    }
};