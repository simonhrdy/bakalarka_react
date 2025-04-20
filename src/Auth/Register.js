import {matchPasswords, validatePassword} from "../Services/Validator";
import apiService from '../Services/ApiService';

export async function register(email, password, password_again, name) {
    if (!validatePassword(password)) {
        return {
            message: "Heslo musí mít minimálně 5 znaků, jedno velké písmeno a jeden speciální znak"
        };
    }

    if (!matchPasswords(password, password_again)) {
        return {
            message: "Hesla se neshodují"
        };
    }

    try {
        const response = await apiService.post('/api/users', {
            email: email,
            password: password,
            name: name,
            role: "ROLE_USER",
        }, {
            headers: {
                'Content-Type': 'application/ld+json'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
