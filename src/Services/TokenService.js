export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return;
    }

    const tokenExp = JSON.parse(atob(token.split('.')[1])).exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenExp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
};
