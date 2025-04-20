import apiService from "../Services/ApiService";

export async function getTeam(teamId) {
    try {
        return apiService.get(`/teams/${teamId}`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}


export async function getTeamResults(teamId) {
    try {
        return apiService.get(`/game/${teamId}/results`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}

export async function getTeamSchedule(teamId) {
    try {
        return apiService.get(`/game/${teamId}/schedule`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}
