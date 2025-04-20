import apiService from '../Services/ApiService';
import UserLocalStorage from "./UserAuth";

export async function login(username, password) {
    try {
        const loginData = await apiService.post('/login_check', { username, password });

       const token = loginData.token;
       apiService.setToken(token);
         UserLocalStorage.setToken(token);

       return await apiService.get('/users/me');

    } catch (error) {
        console.error("Chyba při přihlašování nebo získávání uživatelských dat:", error);
        throw error;
    }
}
