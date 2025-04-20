function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{5,})$/;
    return passwordRegex.test(password);
}

function matchPasswords(password, password_again){
    return password === password_again;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}. ${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

}

export { validatePassword, matchPasswords, formatDate};