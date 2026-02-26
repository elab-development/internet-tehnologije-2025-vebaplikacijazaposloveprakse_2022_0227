export const newsService = {
    async getTechNews(topic: string = "technology") {
        try {
            const response = await fetch(`/api/news?query=${topic}`);
            if (!response.ok) throw new Error("Problem sa vestima");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};