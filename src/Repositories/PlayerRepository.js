import apiService from "../Services/ApiService";

export async function getPlayer(id) {
    try {
        return apiService.get(`/players/${id}`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}


export async function getPlayerStats(id) {
    try {
        return apiService.get(`/player-stats/${id}`);
    } catch (error) {
        if (error.response && error.response.status === 401 || error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}


export async function getPlayerMatches(id) {
    try {
        return apiService.get(`/players/${id}/matches`);
    } catch (error) {
        if (error.response && error.response.status === 401 || error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}