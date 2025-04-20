import React, { useState, useEffect } from 'react';
import HeaderNavigation from "../Header/HeaderNavigation";
import Input from "../../components/Input";
import ContentHome from "./ContentHome";
import { getAllGames } from "../../Repositories/GameRepository";
import {useParams} from "react-router-dom";
import {getAllLeague} from "../../Repositories/LeagueRepository";
import {getFavoriteTeamsBySport} from "../../Repositories/UserRepository";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Home() {
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const sport = useParams().sport;
    const [league, setLeague] = useState([]);
    const [favoriteTeams, setFavoriteTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let data = await getAllGames(date, sport);
            let league = await getAllLeague(sport);
            if(localStorage.getItem("token") !== null){
                let favoriteTeamsData = await getFavoriteTeamsBySport(sport);
                setFavoriteTeams(favoriteTeamsData);
            }
            setGames(data);
            setLeague(league);
            setLoading(false);
        };

        if (date) {
            fetchData().then(() => console.log("Data loaded"));
        }
    }, [date]);

    const handleSpanClick = () => {
        const inputElement = document.querySelector(".inputDate");
        if (inputElement) {
            inputElement.showPicker();
            inputElement.focus();
        }
    };

    return (
        <div id={"home"}>
            <HeaderNavigation />
            <div className={"lg:px-20 flex justify-center lg:justify-end items-end py-8 lg:py-10"}>
                <div className="custom-date">
                    <Input
                        className={"flex justify-end items-end w-fit inputDate"}
                        type={"date"}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <span className="icon" onClick={handleSpanClick}>
                        <img src={"/images/calendar.svg"} alt={"calendar"} />
                    </span>
                </div>
            </div>

            {loading ? (
                <LoadingSpinner><p>Načítám data...</p></LoadingSpinner>
            ) : (
                <ContentHome games={games} league={league} favoriteTeams={favoriteTeams} />
            )}
        </div>
    );
}
