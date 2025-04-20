import MatchResult from "./MatchResult";
import MatchDetailDate from "./MatchDetailDate";
import MatchDetailTeamHome from "./MatchDetailTeamHome";
import MatchDetailTeamAway from "./MatchDetailTeamAway";

export default function MatchResultPanel(props) {
    console.log(props)
    const favoriteTeamIds = props.favoriteTeams.map(team => team.team_id.id);
    const isHomeFavorited = favoriteTeamIds.includes(props.data.homeTeam.id);
    const isAwayFavorited = favoriteTeamIds.includes(props.data.awayTeam.id);

    const sortedTeams = [...props.positions.teams].sort((a, b) => b.points - a.points);

    const getTeamPosition = (teamId) => {
        return sortedTeams.findIndex(team => team.id === teamId) + 1;
    };

    const homeTeamPosition = getTeamPosition(props.data.homeTeam.id);
    const awayTeamPosition = getTeamPosition(props.data.awayTeam.id);

    const homeGoals = props.data.parametrs["Domácí tým"]?.["Počet gólů"]
        ?? props.data.parametrs["Domácí tým"]?.["Počet vyhraných setů"]
        ?? [];

    const awayGoals = props.data.parametrs["Hostující tým"]?.["Počet gólů"]
        ?? props.data.parametrs["Hostující tým"]?.["Počet vyhraných setů"]
        ?? [];


    return(
        <div className={"pb-24 pt-12"} style={styleContainer}>
            <MatchDetailDate date={props.data.date} time={props.data.time} stadium={props.data.homeTeam.stadium}></MatchDetailDate>
            <div className={"lg:px-20 flex flex-row justify-between"}>
                <MatchDetailTeamHome position={homeTeamPosition} isFavorited={isHomeFavorited} logo={props.data.homeTeam.image} name={props.data.homeTeam.name} surname={props.data.homeTeam.surname} id={props.data.homeTeam.id} setFavoriteTeams={props.setFavoriteTeams}></MatchDetailTeamHome>
                <MatchResult status={props.data.status} home={homeGoals} away={awayGoals}></MatchResult>
                <MatchDetailTeamAway position={awayTeamPosition} isFavorited={isAwayFavorited} logo={props.data.awayTeam.image} name={props.data.awayTeam.name} surname={props.data.awayTeam.surname} id={props.data.awayTeam.id} setFavoriteTeams={props.setFavoriteTeams}></MatchDetailTeamAway>
            </div>
        </div>
    );
}

const styleContainer = {
    backgroundColor: "#241F55",
    fontWeight: "bold",
};
