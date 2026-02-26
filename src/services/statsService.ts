export const statsService = {
  async getStats() {
    try {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Problem sa statistikom");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};