import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getTable from "../../Repositories/LeagueRepository";
import LoadingSpinner from "../../components/LoadingSpinner";
import Breadcrumbs from "../../components/Breadcrumbs";
import TopBanner from "./TopBanner";
import MatchPanel from "../../components/MatchPanel";
import Image from "../../components/Image";

export default function LeagueDetail() {
    let { id } = useParams();
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let leagueData = await getTable(id);
                setData(leagueData);
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

    if (!data || !data.teams || data.teams.length === 0) {
        return <div>   <Breadcrumbs />
            <div className="errorPage">Žádná data pro aktuální sezónu.</div>
        </div>;
    }

    return (
        <div>
            <Breadcrumbs />
        <div className="league-detail">
            <TopBanner data={data}></TopBanner>
            <div className={"lg:px-20 p-5 lg:p-14"}>
                <MatchPanel headline={"Tabulka"}></MatchPanel>
            <table className="league-table">
                <thead>
                <tr>
                    <th>Tým</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {data.teams.sort((a, b) => b.points - a.points).map(team => (
                    <tr key={team.id}>
                        <td className={"flex items-center gap-3"}><Image className={"object-contain lg:w-8 lg:h-8 w-6 h-6"} src={team.image_src} /> {team.name}</td>
                        <td>{team.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}
