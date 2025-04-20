import apiService from "../Services/ApiService";

export async function changeUser(id, data) {
    try {
        apiService.setToken(localStorage.getItem("token"));
        return await apiService.put(`/users/${id}`, data);
    } catch (error) {
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}


export async function getFavoriteTeams() {
    try {
        apiService.setToken(localStorage.getItem("token"));
        return await apiService.get(`/users/favorite-teams`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}

export async function editFavoriteTeam(id){
    try {
        apiService.setToken(localStorage.getItem("token"));
        return await apiService.post(`/users/favorite-teams`, {team_id: id});
    } catch (error) {
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}

export async function getFavoriteTeamsBySport(sport) {
    try {
        apiService.setToken(localStorage.getItem("token"));
        return await apiService.get(`/users/favorite-teams/${sport}`);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Neautorizovaný přístup, vracím prázdné pole.");
            return [];
        }
        console.error("Chyba při aktualizaci uživatele:", error);
        throw error;
    }
}

