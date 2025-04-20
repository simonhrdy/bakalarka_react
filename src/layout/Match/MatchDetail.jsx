import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import MatchResultPanel from "../../components/matchDetail/MatchResultPanel";
import MatchControlPanel from "../../components/matchDetail/MatchControlPanel";
import React, { useEffect, useState } from "react";
import {getGameAnalysis, getGameBetting, getGameById, getGameLineup} from "../../Repositories/GameRepository";
import {getFavoriteTeams} from "../../Repositories/UserRepository";
import MatchContent from "./MatchContent";
import LoadingSpinner from "../../components/LoadingSpinner";
import getTable from "../../Repositories/LeagueRepository";

export default function MatchDetail() {
    const { id } = useParams();
    const [breadcrumbSport, setBreadcrumbSport] = useState("");
    const [breadcrumbLeague, setBreadcrumbLeague] = useState("");
    const [sportHref, setSportHref] = useState("/");
    const [leagueHref, setLeagueHref] = useState("/");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favoriteTeams, setFavoriteTeams] = useState([]);
    const [activeTab, setActiveTab] = useState("prehled");
    const [analysis, setAnalysis] = useState([]);
    const [betting, setBetting] = useState([]);
    const [lineup, setLineup] = useState([]);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let gameData = await getGameById(id);
               let favoriteTeams = await getFavoriteTeams();
               let analysisData = await getGameAnalysis(id);
               let bettingData = await getGameBetting(id);
               let lineupData = await getGameLineup(id);
               let positions = await getTable(gameData.league.id);
                setBreadcrumbSport(gameData.sport.name);
                setBreadcrumbLeague(gameData.league.name);
                setSportHref(`/${gameData.sport.url}`);
                setLeagueHref(`/league/${gameData.league.id}`);
                setData(gameData);
                setFavoriteTeams(favoriteTeams);
                setAnalysis(analysisData);
                setBetting(bettingData);
                setLineup(lineupData);
                setPositions(positions);
            } catch (error) {
                console.error("Chyba při načítání dat:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(r => console.log("Data načtena"));
    }, [id]);


    if (loading) {
        return <LoadingSpinner><p>Načítám data...</p></LoadingSpinner>;
    }

    if (!data || data.length === 0) {
        return <div>   <Breadcrumbs />
            <div className="errorPage">Žádná data</div>
        </div>;
    }

    if (!loading) {
    return (
        <div>
            <Breadcrumbs sport={breadcrumbSport} sportHref={sportHref} league={breadcrumbLeague} leagueHref={leagueHref} />
            <MatchResultPanel positions={positions} favoriteTeams={favoriteTeams} setFavoriteTeams={setFavoriteTeams} data={data} />
            <MatchControlPanel setActiveTab={setActiveTab} activeType={activeTab} />
            <MatchContent lineup={lineup} betting={betting} analysis={analysis} activeTab={activeTab} data={data} />
        </div>
    );

    }
}
