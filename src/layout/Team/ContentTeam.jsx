import React, { useEffect, useState } from "react";
import MatchPanel from "../../components/MatchPanel";
import Match from "../Match/Match";
import PanelBlock from "../../components/PanelBlock";
import LoadingSpinner from "../../components/LoadingSpinner";
import {getTeamResults, getTeamSchedule} from "../../Repositories/TeamRepository";
import GameDto from "../../DTOs/GameDto";

export default function ContentTeam({ type, data, id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        if (type === "results") {
            getTeamResults(id).then((results) => {
                setTeamData(results.map(game => new GameDto(game)));
                setIsLoaded(true);
            });
        } else if (type === "program") {
            getTeamSchedule(id).then((schedule) => {
                setTeamData(schedule.map(game => new GameDto(game)));
                setIsLoaded(true);
            });
        } else {
            setIsLoaded(true);
        }
    }, [type, id]);

    const groupedPlayers = data.players.reduce((acc, player) => {
        if (!acc[player.position]) {
            acc[player.position] = [];
        }
        acc[player.position].push(player);
        return acc;
    }, {});

    if (!isLoaded) {
        return (
            <LoadingSpinner>
                <p>Načítám data...</p>
            </LoadingSpinner>
        );
    }


    return (
        <div className="lg:px-20 py-10 px-5">
            {type === "results" && (
                <MatchPanel headline="Výsledky">
                    {teamData.map((match) => (
                        <Match key={match.id} time={`${match.date} ${match.time_of_game}`} team1={match.homeTeam.name} team1Img={match.homeTeam.image}
                        team2={match.awayTeam.name} team2Img={match.awayTeam.image} team1surname={match.homeTeam.surname} team2surname={match.awayTeam.surname} score1={match.parametrs.goals_home} score2={match.parametrs.goals_away}
                               id={match.id}
                        />
                    ))}
                </MatchPanel>
            )}
            {type === "program" && (
                <MatchPanel headline="Program zápasů">
                    {teamData.map((match) => (
                        <Match key={match.id} time={`${match.date} ${match.time_of_game}`} team1={match.homeTeam.name} team1Img={match.homeTeam.image}
                               team2={match.awayTeam.name} team1surname={match.homeTeam.surname} team2surname={match.awayTeam.surname} team2Img={match.awayTeam.image} status={"Výsledek neznámý, bude se teprve hrát"}
                               id={match.id} />
                    ))}
                </MatchPanel>
            )}
            {type === "lineUp" && (
                <MatchPanel headline="Soupiska týmů">
                    {Object.entries(groupedPlayers).map(([position, players]) => (
                        <PanelBlock key={position} position={position} players={players} />
                    ))}
                </MatchPanel>
            )}
        </div>
    );
}
