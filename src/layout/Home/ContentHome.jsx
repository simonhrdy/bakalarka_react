import { useState, useMemo } from "react";
import MatchPanel from "../../components/MatchPanel";
import Match from "../Match/Match";
import Link from "../../components/Link";
import Gap from "../../components/Gap";
import InfoPanel from "../../components/InfoPanel";
import Button from "../../components/Button";

export default function ContentHome({ games, league, favoriteTeams }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sortedGames = useMemo(() => {
        return [...games].sort((a, b) => {
            const [hA, mA] = a.time_of_game.split(":").map(Number);
            const [hB, mB] = b.time_of_game.split(":").map(Number);
            return hA * 60 + mA - (hB * 60 + mB);
        });
    }, [games]);

    const paginatedGroupedGames = useMemo(() => {
        const leagueGroups = sortedGames.reduce((acc, game) => {
            const leagueId = game.league.id;
            if (!acc[leagueId]) acc[leagueId] = [];
            acc[leagueId].push(game);
            return acc;
        }, {});

        const leagueEntries = Object.entries(leagueGroups);

        const pages = [];
        let currentPage = [];
        let count = 0;

        for (const [leagueId, games] of leagueEntries) {
            if (count + games.length > itemsPerPage && currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [];
                count = 0;
            }
            currentPage.push([leagueId, games]);
            count += games.length;
        }

        if (currentPage.length > 0) pages.push(currentPage);

        return pages;
    }, [sortedGames]);

    const currentGroupedPage = paginatedGroupedGames[currentPage - 1] || [];
    const isEmpty = currentGroupedPage.length === 0;

    return (
        <div className={"lg:px-20 px-5 flex flex-col lg:flex-row gap-20 mt-3 contentHome"}>
            <div className={"flex flex-col gap-12"}>
                <InfoPanel className={"infoPanel font-bold"} headline={"Vybrané ligy"}>
                    <Gap gap={"4"} />
                    {league && league.length > 0 ? (
                        league.slice(0, 10).map(leagueItem => (
                            <Link
                                key={leagueItem.id}
                                classNameDiv={"flex flex-row-reverse items-center justify-end gap-3"}
                                text={leagueItem.name}
                                href={`/league/${leagueItem.id}`}
                            >
                                {leagueItem.image_src && (
                                    <img
                                        src={leagueItem.image_src}
                                        alt={leagueItem.name}
                                        className="w-6 h-6 object-contain bg-white rounded-2xl"
                                    />
                                )}
                            </Link>
                        ))
                    ) : null}
                </InfoPanel>

                {favoriteTeams.length > 0 && (
                    <InfoPanel className={"infoPanel font-bold"} headline={"Oblíbené týmy"}>
                        {favoriteTeams.map(team => (
                            <Link
                                key={team.team_id.id}
                                classNameDiv={"flex flex-row-reverse items-center justify-end gap-3 mt-4"}
                                text={team.team_id.name + " " + (team.team_id.surname ?? "")}
                                href={`/team/${team.team_id.id}`}
                            >
                                <img
                                    src={team.team_id.image_src}
                                    alt={team.team_id.name}
                                    className="w-6 h-6"
                                />
                            </Link>
                        ))}
                    </InfoPanel>
                )}
            </div>

            <div className={"flex flex-col gap-12 justify-center"}>
                {isEmpty ? (
                    <InfoPanel
                        className={"infoPanel font-bold text-red-700"}
                        headline={"Dnes nejsou naplánovány žádné zápasy."}
                    />
                ) : (
                    <>
                        {currentGroupedPage.map(([leagueId, leagueGames]) => {
                            const leagueName = leagueGames[0].league.name;

                            return (
                                <MatchPanel key={leagueId} headline={leagueName} src={"/images/englad.svg"}>
                                    {leagueGames.map(game => (
                                        <Match
                                            key={game.id}
                                            time={game.time_of_game}
                                            team1Img={game.homeTeam.image}
                                            team2Img={game.awayTeam.image}
                                            team1={game.homeTeam.name}
                                            team2={game.awayTeam.name}
                                            team1surname={game.homeTeam.surname}
                                            team2surname={game.awayTeam.surname}
                                            score1={game.parametrs.goals_home}
                                            score2={game.parametrs.goals_away}
                                            id={game.id}
                                        />
                                    ))}
                                </MatchPanel>
                            );
                        })}

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <Button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                text="Předchozí"
                                id="prevPage"
                                className={currentPage === 1 ? " opacity-50 pointer-events-none" : ""}
                            />
                            <span>Stránka {currentPage}</span>
                            <Button
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        prev < paginatedGroupedGames.length ? prev + 1 : prev
                                    )
                                }
                                text="Další"
                                id="nextPage"
                                className={currentPage >= paginatedGroupedGames.length ? " opacity-50 pointer-events-none" : ""}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
