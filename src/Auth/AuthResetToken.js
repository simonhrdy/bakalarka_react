import apiService from "../Services/ApiService";

export async function authResetToken(token) {
    try {
        const response = await apiService.post('/users/verify-token', { token });

        return response.data;
    } catch (error) {
        console.error("Chyba při ověřování tokenu:", error.response?.data || error.message);

        throw new Error(error.response?.data?.error || "Neznámá chyba");
    }
}
