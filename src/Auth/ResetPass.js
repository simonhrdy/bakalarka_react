import apiService from "../Services/ApiService";

export async function resetPass(token, newPassword) {
    try {
        return await apiService.post('/users/reset-password', {
            token: token,
            new_password: newPassword,
        });
    } catch (error) {
        console.error(error);
    }
}
