
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
    }
};