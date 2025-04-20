import React, {useState} from "react";
import ImageWithBorder from "../../components/ImageWithBorder";
import Title from "../../components/Title";
import Star from "../../components/Star";
import Text from "../../components/Text";
import FlexDiv from "../../components/FlexDiv";
import UserLocalStorage from "../../Auth/UserAuth";
import {editFavoriteTeam, getFavoriteTeams} from "../../Repositories/UserRepository";

export default function TopBanner({data, favoriteTeams, setFavoriteTeams}) {
    const favoriteTeamIds = favoriteTeams.map(team => team.team_id.id);
    const isFavorited = favoriteTeamIds.includes(data.id);
    const [showModal, setShowModal] = useState(false);

    const handleFavoriteClick = async (teamId) => {
        if (!UserLocalStorage.isUserLoggedIn()) {
            setShowModal(true);
            return;
        }
        try {
            await editFavoriteTeam(teamId);
            const updatedFavorites = await getFavoriteTeams();
            setFavoriteTeams(updatedFavorites);
        } catch (error) {
            console.error("Error adding favorite", error);
        }
    };

    return (
        <>
        <div className="top-banner flex">
            <div className={"flex flex-row items-start gap-10 lg:px-20 py-5 px-5"}>
                <ImageWithBorder className={"lg:h-28 lg:w-28 w-16 h-16 object-contain"} logo={data.image_src}></ImageWithBorder>
                <div>
                    <div className={"flex flex-row items-center gap-3"}>
                        <Title className={"font-bold text-3xl"} text={data.name + " " + (data.surname ?? "")}></Title>
                        <div
                            className={`text-white flex flex-col items-center cursor-pointer ${isFavorited ? "" : "not-favorite"}`}
                            onClick={() => handleFavoriteClick(data.id)}
                        >
                            <Star></Star>
                        </div>
                    </div>
                    <FlexDiv className={"gap-3 flex mt-2 lg:mt-5"}>
                        <Text className={"font-bold"} text={"Stadion:"}></Text>
                        <Text text={data.stadium_id?.name}></Text>
                    </FlexDiv>
                    <FlexDiv className={"gap-3 flex mt-1"}>
                        <Text className={"font-bold"} text={"Kapacita:"}></Text>
                        <Text text={data.stadium_id?.capacity}></Text>
                    </FlexDiv>
                    <FlexDiv className={"gap-3 flex mt-1"}>
                        <Text className={"font-bold"} text={"Trenér:"}></Text>
                        <Text text={data.coach ?? ""}></Text>
                    </FlexDiv>
                </div>
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