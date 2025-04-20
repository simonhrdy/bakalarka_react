import { useState } from "react";
import UserLocalStorage from "../../Auth/UserAuth";
import {changeUser} from "../../Repositories/UserRepository";

export default function Profile({ username, onClose }) {
    const [modalType, setModalType] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            setModalType(null);
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            alert("Pole nesmí být prázdné!");
            return;
        }

        const userId = UserLocalStorage.getUserID();
        if (!userId) {
            alert("Chyba: Nenalezeno ID uživatele.");
            return;
        }

        try {
            const data = modalType === "nickname"
                ? { name: inputValue }
                : { password: inputValue };

            const response = await changeUser(userId, data);
            UserLocalStorage.setUser(response);
            setModalType(null);
            onClose();

        } catch (error) {
            alert("Chyba při ukládání změn.");
        }

        setModalType(null);
        setInputValue("");
    };


    return (
        <>
            <div onClick={handleModalClick} className="modalContainer">
                <div className="modal">
                    <div className="modal-header">
                        <div className="icon-container">
                            <img src="/images/profile.svg" alt="login" />
                        </div>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <h1 style={styles}>{username}</h1>
                    <h2 style={styles}>Váš účet u SportMatter</h2>

                    <div className="profileBtnContainer">
                        <div>
                            <button className="profileBtn" onClick={() => setModalType("nickname")}>Změnit přezdívku</button>
                            <button className="profileBtn" onClick={() => setModalType("password")}>Změnit heslo</button>
                        </div>
                    </div>
                </div>
            </div>

            {modalType && (
                <div onClick={handleModalClick} className="modalContainer">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>{modalType === "nickname" ? "Změnit přezdívku" : "Změnit heslo"}</h2>
                            <button className="close-btn" onClick={() => setModalType(null)}>&times;</button>
                        </div>
                        <form className={"modal_form"} onSubmit={handleSubmit}>
                            <input
                                type={modalType === "nickname" ? "text" : "password"}
                                placeholder={modalType === "nickname" ? "Nová přezdívka" : "Nové heslo"}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                            />
                            <button type="submit" className="submit-btn">Uložit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    padding: "0px",
    margin: "0px",
};
