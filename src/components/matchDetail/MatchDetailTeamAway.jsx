import { useState } from "react";
import { editFavoriteTeam, getFavoriteTeams } from "../../Repositories/UserRepository";
import UserLocalStorage from "../../Auth/UserAuth";

export default function MatchDetailTeamAway(props) {
    const [showModal, setShowModal] = useState(false);

    const handleFavoriteClick = async (teamId) => {
        if (!UserLocalStorage.isUserLoggedIn()) {
            setShowModal(true);
            return;
        }

        try {
            await editFavoriteTeam(teamId);
            const updatedFavorites = await getFavoriteTeams();
            props.setFavoriteTeams(updatedFavorites);
        } catch (error) {
            console.error("Error adding favorite", error);
        }
    };

    return (
        <>
            <div className="rounded-lg flex items-center gap-3 lg:gap-6 w-fit matchDetailTeam matchDetailTeamAway">
                <div
                    className={`text-white flex flex-col items-center cursor-pointer ${props.isFavorited ? "" : "not-favorite"}`}
                    onClick={() => handleFavoriteClick(props.id)}
                >
                    <span data-id={props.id} className="lg:text-3xl md:text-3xl text-xl cursor-pointer">⭐</span>
                    <p className="text-lg font-bold lg:block hidden">({props.position}. místo)</p>
                </div>

                <div className="imageClub">
                    <div className="bg-white p-2 lg:p-6 rounded-lg shadow-md flex items-center">
                        <img src={props.logo} alt="" className="h-20 w-20 object-contain" />
                    </div>
                    <h2 className="text-center mt-2">{props.name} {props.surname}</h2>
                </div>

                <div className="bg-white p-3 rounded-lg lg:hidden flex-col items-center shadow-md absolute pravo hidden">
                    <p className="font-bold text-black">FORM</p>
                    {["W", "W", "W", "L", "L"].map((result, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center text-white font-bold text-lg rounded-full mt-2 ${
                                result === "W" ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                            {result}
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-xl font-bold mb-4">Přihlášení nutné</h2>
                        <p className="text-gray-600">Pro přidání do oblíbených týmů se prosím přihlaste.</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="submit-btn"
                            >
                                Zavřít
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
