import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import Breadcrumbs from "../../components/Breadcrumbs";
import {getPlayer, getPlayerMatches, getPlayerStats} from "../../Repositories/PlayerRepository";
import TopBanner from "./TopBanner";
import ContentPlayer from "./ContentPlayer";
import GameDto from "../../DTOs/GameDto";

export default function PlayerDetail() {
    const id = useParams().id;
    const [data, setData] = useState([]);
    const [stats, setStats] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let playerData = await getPlayer(id);
                let playerStats = await getPlayerStats(id);
                let playerGames = await getPlayerMatches(id);
                setData(playerData);
                setStats(playerStats);
                setGames(playerGames);
            } catch (error) {
                console.error("Chyba při načítání dat:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <LoadingSpinner><p>Načítám data...</p></LoadingSpinner>;
    }

    if (!data || data.length === 0) {
        return <div>   <Breadcrumbs />
            <div className="errorPage">Žádná data.</div>
        </div>;
    }

    return (
        <div>
            <Breadcrumbs/>
            <TopBanner data={data} stats={stats.parametrs}></TopBanner>
            <ContentPlayer data={games}></ContentPlayer>
        </div>
    );
}