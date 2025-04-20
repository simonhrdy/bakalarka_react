import apiService from "../Services/ApiService";

export async function menuRepository() {
    try {
        return await apiService.get("/sports");
    } catch (error) {
        console.error(error);
    }
}
