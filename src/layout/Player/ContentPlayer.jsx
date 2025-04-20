import React, {useState} from "react";
import MatchPanel from "../../components/MatchPanel";
import Match from "../Match/Match";
import LoadingSpinner from "../../components/LoadingSpinner";
import {formatDate} from "../../Services/Validator";

export default function ContentPlayer(props) {
    const [isLoaded, setIsLoaded] = useState(true);

    if (!isLoaded) {
        return (
            <LoadingSpinner>
                <p>Načítám data...</p>
            </LoadingSpinner>
        );
    }

    const matches = props.data || [];

    return (
        <div className="lg:px-20 py-10 px-5">
            <MatchPanel headline="Poslední odhrané zápasy">
                {matches.map((match) => (
                    <Match
                        key={match.id}
                        time={formatDate(match.game.date_of_game)}
                        team1={match.game.home_team_id.name}
                        team1Img={match.game.home_team_id.image_src}
                        team2={match.game.away_team_id.name}
                        team2Img={match.game.away_team_id.image_src}
                        score1={match.game.parametrs?.goals_home}
                        score2={match.game.parametrs?.goals_away}
                        id={match.game.id}
                    />
                ))}
            </MatchPanel>
        </div>
    );
}
