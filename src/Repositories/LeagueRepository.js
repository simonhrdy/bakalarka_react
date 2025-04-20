import apiService from "../Services/ApiService";

export async function getAllLeague(sport) {
    try {
        return await apiService.get(`/league/sport/${sport}`);
    } catch (error) {
        console.error(error);
    }
}

export default function getTable(leagueId) {
    try {
        return apiService.get(`/league/table/${leagueId}`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}
