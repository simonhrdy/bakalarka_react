import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

import TopBanner from "./TopBanner";
import TeamControlPanel from "./TeamControlPanel";
import ContentTeam from "./ContentTeam";
import LoadingSpinner from "../../components/LoadingSpinner";
import {getTeam} from "../../Repositories/TeamRepository";
import {getFavoriteTeams} from "../../Repositories/UserRepository";

export default function TeamDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("lineUp");
    const [favoriteTeams, setFavoriteTeams] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let teamData = await getTeam(id);
                let favoriteTeams = await getFavoriteTeams();
                setData(teamData);
                setFavoriteTeams(favoriteTeams);
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
            <TopBanner favoriteTeams={favoriteTeams} setFavoriteTeams={setFavoriteTeams} data={data}></TopBanner>
            <TeamControlPanel setType={setType} activeType={type} />
            <ContentTeam type={type} data={data} id={id}></ContentTeam>
        </div>
    );
}