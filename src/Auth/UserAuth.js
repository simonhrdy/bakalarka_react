class UserLocalStorage {
    static getUser() {
        const userString = localStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    }

    static getUserToken() {
        return localStorage.getItem("token");
    }

    static setToken(token) {
        localStorage.setItem("token", token);
    }

    static setUser(user) {
        localStorage.setItem('user', JSON.stringify({
            email: user.email,
            username: user.name,
            roles: user.roles,
            id: user.id
        }));
    }

    static getUserID() {
        const user = UserLocalStorage.getUser();
        return user ? user.id : null
    }

    static getUserEmail() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.email : null;
    }

    static getUsername() {
        const user = UserLocalStorage.getUser();
        return user ? user.username : null;
    }

    static getUserRole() {
        const user = UserLocalStorage.getUser();
        return user ? user.role : null;
    }

    static isUserLoggedIn() {
        return !!localStorage.getItem("user");
    }

    static isAdmin() {
        const user = UserLocalStorage.getUser();
        return user && user.role === "Admin";
    }

    static logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.replace("/")
    }
}

export default UserLocalStorage;
