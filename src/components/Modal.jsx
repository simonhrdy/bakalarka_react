import Link from "./Link";
import { login } from "../Auth/Login";
import UserLocalStorage from "../Auth/UserAuth";
import React, { useState } from "react";
import { register } from "../Auth/Register";
import { forgotPass } from "../Auth/ForgotPass";
import LoadingSpinner from "./LoadingSpinner";

export default function Modal({ type, onClose, onSwitchModal }) {
    const isLogin = type === 'login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [password_again, setPasswordAgain] = useState('');
    const [name, setName] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                const data = await login(email, password);
                if (data) {
                    UserLocalStorage.setUser(data);
                    window.location.reload();
                } else {
                    setError(data.message);
                }
            } else {
                const data = await register(email, password, password_again, name);
                if (data && !data.message) {
                    onSwitchModal('login');
                } else {
                    setError(data.message);
                }
            }
        } catch (error) {
            setError("Něco se pokazilo");
        }

        setIsLoading(false);
    };

    const handleForgotPasswordSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await forgotPass(email);
            if (data.message) {
                setMessage("Odkaz na změnu hesla byl odeslán na váš email, za 5s se okno zavře");
                setTimeout(() => {
                    onClose();
                }, 5000);
            } else {
                setError("Něco se pokazilo");
            }
        } catch (error) {
            setError("Něco se pokazilo");
        }

        setIsLoading(false);
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        setForgotPassword(true);
    };

    return (
        <div onClick={handleModalClick} className="modalContainer">
            <div className="modal">
                <div className="modal-header">
                    <div className="icon-container">
                        <img src="/images/football-icon.svg" alt="Ikona rugbyového míče" />
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {forgotPassword ? (
                    <>
                        <h1>Obnova hesla</h1>
                        <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
                            <label htmlFor="email">Zadejte svůj email</label>
                            <input type="email" id="email" name="email" required
                                   onChange={(e) => setEmail(e.target.value)}/>
                            {isLoading && <LoadingSpinner className={"spinner-container-form"} classNameSpinner={"spinner-form"}/>}
                            <p className="text-red-700 mb-3">{error}</p>
                            <p className="text-white mb-3">{message}</p>
                            <button type="submit" className="submit-btn"
                                    disabled={isLoading}>{isLoading ? 'Odesílání...' : 'Odeslat'}</button>
                        </form>
                        <p>
                        <Link href="#" text="Zpět na přihlášení" onClick={() => setForgotPassword(false)} />
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Vítejte u SportMatter</h1>
                        <form onSubmit={handleSubmit} className="login-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" autoComplete="username" id="email" name="email" required
                                   onChange={(e) => setEmail(e.target.value)}/>
                            {!isLogin && (
                                <>
                                    <label htmlFor="name">Jméno</label>
                                    <input type="text" autoComplete="username" id="name" name="name" required
                                           onChange={(e) => setName(e.target.value)}/>
                                </>
                            )}
                            <label htmlFor="password">Heslo</label>
                            <input type="password" id="password" autoComplete="current-password" name="password"
                                   required onChange={(e) => setPassword(e.target.value)}/>
                            {!isLogin && (
                                <>
                                    <label htmlFor="confirmPassword">Potvrďte heslo</label>
                                    <input type="password" id="confirmPassword" autoComplete="current-password"
                                           name="confirmPassword" required
                                           onChange={(e) => setPasswordAgain(e.target.value)}/>
                                </>
                            )}
                            {isLogin && (
                                <Link href="#" className="forgot-password" text="Zapomněli jste heslo?"
                                      onClick={handleForgotPassword}/>
                            )}
                            {isLoading && <LoadingSpinner className={"spinner-container-form"} classNameSpinner={"spinner-form"}/>}
                            <p className="text-red-700 mb-3">{error}</p>
                            <button type="submit" className="submit-btn"
                                    disabled={isLoading}>{isLoading ? 'Odesílání...' : (isLogin ? 'Přihlásit se' : 'Registrovat se')}</button>
                        </form>
                        <p className="register-text">
                        {isLogin ? 'Ještě nemáte účet? ' : 'Máte již účet? '}
                            <Link href="#" text={isLogin ? 'Registrace' : 'Přihlásit se'} onClick={() => onSwitchModal(isLogin ? 'register' : 'login')} />
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
