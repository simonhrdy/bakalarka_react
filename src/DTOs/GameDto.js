import {getKeyMap} from "../Services/SportMap";

export default class GameDto {
    constructor(data) {
        const dateTime = data.date_of_game ? new Date(data.date_of_game) : null;
        this.id = data.id;
        this.lap = data.lap || null;
        this.date = dateTime ? dateTime.toLocaleDateString('cs-CZ') : null;
        this.time_of_game = dateTime ? dateTime.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : null;
        this.parametrs = this.parseParametrs(data.parametrs, data.league_id?.sport?.url);
        this.homeTeam = data.home_team_id ? {
            id: data.home_team_id.id,
            name: data.home_team_id.name,
            surname: data.home_team_id.surname ?? '',
            coach: data.home_team_id.coach,
            image: data.home_team_id.image_src,
            stadium: data.home_team_id.stadium_id?.name
        } : null;
        this.awayTeam = data.away_team_id ? {
            id: data.away_team_id.id,
            name: data.away_team_id.name,
            surname: data.away_team_id.surname ?? '',
            coach: data.away_team_id.coach,
            image: data.away_team_id.image_src
        } : null;
        this.supervisor = data.superviser_id || [];
        this.league = data.league_id ? {
            id: data.league_id.id,
            name: data.league_id.name,
            association: data.league_id.assocation
        } : null;
        this.sport = data.league_id?.sport ? {
            id: data.league_id.sport.id,
            name: data.league_id.sport.name,
            url: data.league_id.sport.url
        } : null;

        this.actions = this.parametrs?.actions || [];

        this.status = data.status === 1 ? "Dohráno" : data.status === 0 ? "Nezahájeno" : null;
    }

    parseParametrs(parametrs, sport) {
        const keyMap = getKeyMap();

        if (!keyMap[sport]) {
            console.error("Neznámý sport:", sport);
            return {};
        }

        try {
            const paramsObj = (typeof parametrs === 'string') ? JSON.parse(parametrs) : parametrs;

            const actions = paramsObj?.actions || [];

            const homeTeamParams = keyMap[sport].home || {};
            const awayTeamParams = keyMap[sport].away || {};

            return {
                "Domácí tým": Object.fromEntries(
                    Object.entries(homeTeamParams).map(([czKey, jsonKey]) => [
                        czKey,
                        paramsObj?.[jsonKey] || null
                    ])
                ),
                "Hostující tým": Object.fromEntries(
                    Object.entries(awayTeamParams).map(([czKey, jsonKey]) => [
                        czKey,
                        paramsObj?.[jsonKey] || null
                    ])
                ),
                actions
            };
        } catch (error) {
            console.error(`Chyba při parsování parametrů pro ${sport}:`, error);
            return {};
        }
    }


    getGameSummary() {
        return `${this.homeTeam?.name || 'N/A'} vs ${this.awayTeam?.name || 'N/A'} (${this.league?.name || 'No league'}, ${this.sport?.name || 'No sport'})`;
    }
}
