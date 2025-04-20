import { useEffect, useState } from "react";
import { authResetToken } from "../../Auth/AuthResetToken";
import {resetPass} from "../../Auth/ResetPass";
import {login} from "../../Auth/Login";
import UserLocalStorage from "../../Auth/UserAuth";
import {useParams} from "react-router-dom";

export default function ResetPassword() {
    let { token } = useParams();
    const [isValid, setIsValid] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (token) {
            authResetToken(token)
                .then(response => {
                    setIsValid(true);
                })
                .catch(error => {
                    setIsValid(false);
                    setErrorMessage(error.message);
                    console.error("Token invalid:", error.message);
                });
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Hesla se neshodují.");
            return;
        }
        const data = await resetPass(token, password);
        if(data.message){
            setMessage("Heslo bylo úspěšně změněno. Nyní budete přesměrováni na hlavní stránku.");
            setTimeout(async () => {
                const user = await login(data.email, password);
                UserLocalStorage.setUser(user);
                window.location.replace('/');
            }, 3000);
        } else {
            setErrorMessage("Něco se pokazilo. Zkuste to prosím znovu.");
        }
    };

    return (
        <div className={"mt-10 h-dvh"}>
            {isValid === null ? (
                <p>Ověřování tokenu...</p>
            ) : isValid ? (
                <div className={"reset_password_form"}>
                    <h1 className={"text-center text-xl font-bold"}>Token je platný. Můžete resetovat heslo</h1>
                    <form className="modal_form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">Heslo</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Heslo znovu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message text-center">{errorMessage}</p>}
                        {message && <p className="message text-center">{message}</p>}
                        <button className={"submit-btn mt-5"} type="submit">Resetovat heslo</button>
                    </form>
                </div>
            ) : (
                <>
                    <h1 className={"text-center text-xl font-bold"}>Token je neplatný nebo vypršel</h1>
                    <p className={"text-center mt-3"}>Opakujte akci obnovy hesla, pokud stále nefunguje, kontaktujte nás na <span className={"font-bold"}>support@sportmatter.cz</span></p>
                </>
            )}
        </div>
    );
}
