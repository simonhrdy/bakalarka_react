import axios from 'axios';

class ApiService {
    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    getHeaders() {
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    async post(endpoint, data) {
        try {
            const response = await axios.post(`${this.apiUrl}${endpoint}`, data, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error(`Chyba při odesílání POST na ${endpoint}:`, error);
            throw error;
        }
    }

    async get(endpoint) {
        try {
            const response = await axios.get(`${this.apiUrl}${endpoint}`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async put(endpoint, data) {
        try {
            const response = await axios.put(`${this.apiUrl}${endpoint}`, data, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error(`Chyba při odesílání PUT na ${endpoint}:`, error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await axios.delete(`${this.apiUrl}${endpoint}`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error(`Chyba při odesílání DELETE na ${endpoint}:`, error);
            throw error;
        }
    }
}

const apiService = new ApiService();
export default apiService;
