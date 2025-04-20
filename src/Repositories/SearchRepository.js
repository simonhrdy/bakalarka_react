import apiService from "../Services/ApiService";

export async function search(value) {
    try {
        return apiService.get(`/search/${value}`);
    } catch (error) {
        if (error.response && error.response.status === 401 || error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}