import apiService from '../Services/ApiService';

export async function forgotPass(email) {
    try {
        return await apiService.post('/users/forgot-password', {
            email: email,
        });
    } catch (error) {
        console.error(error);
    }
}
