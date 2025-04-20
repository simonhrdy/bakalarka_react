import apiService from '../Services/ApiService';
import GameDto from '../DTOs/GameDto';

export async function getAllGames(date, sport) {
    try {
        let dateOfDay = date ?? new Date().toISOString().split("T")[0];
        const url = `/game/date/${dateOfDay}/${sport}`;
        const response = await apiService.get(url);
        if (response) {
            return await Promise.all(response.map(async (game) => new GameDto(game)));
        }
        return [];
    } catch (error) {
        console.error("Chyba při načítání her:", error);
        return [];
    }
}

export async function getGameById(id) {
    try {
        const url = `/game/${id}`;
        const response = await apiService.get(url);
        if (response) {
            return new GameDto(response);
        }
        return null;
    } catch (error) {
        console.error("Chyba při načítání her:", error);
        return null;
    }
}

export async function getGameAnalysis(id) {
    try {
        return apiService.get(`/game/${id}/getAnalysis`);
    } catch (error) {
        if (error.response.status === 404) {
            return [];
        }
        throw error;
    }
}

export async function getGameBetting(id) {
    try {
        return apiService.get(`/game/${id}/getBetting`);
    } catch (error) {
        if (error.response.status === 404) {
            return [];
        }
        throw error;
    }
}


export async function getGameLineup(id) {
    try {
        return apiService.get(`/game/${id}/getLineup`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}
