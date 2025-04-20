import React from "react";
import Text from "../../components/Text";
import Title from "../../components/Title";
import HtmlText from "../../components/HtmlText";
import Image from "../../components/Image";
import Statistic from "../../components/Statistic";

export default function MatchContent(props) {
    console.log(props);
    const homeTeamStats = props.data.parametrs["Domácí tým"];
    const awayTeamStats = props.data.parametrs["Hostující tým"];

    const actions = React.useMemo(() => {
        const raw = props.data.actions;
        if (!raw) return [];
        if (typeof raw === 'string') {
            try {
                return JSON.parse(raw);
            } catch (e) {
                console.error('Nepodařilo se parse props.data.actions:', e);
                return [];
            }
        }
        return Array.isArray(raw) ? raw : [];
    }, [props.data.actions]);

    const getEventLabel = (action) => {
        const sport = props.data.sport.url;
        const type = action.type;
        if (sport === "fotbal") {
            if (type === 1) return "Gól";
            if (type === 2) return "Žlutá karta";
            if (type === 3) return "Červená karta";
        } else if (sport === "hokej") {
            if (type === 1) return "Gól";
            if (type === 2) return "2 minutový trest";
            if (type === 3) return "5 minutový trest";
            if (type === 4) return "5+10 trest";
        }
        return "";
    };

    return (
        <div className="lg:px-20 py-5 lg:py-10 px-5">
            {props.activeTab === "prehled" && (
                <div>
                    <Title className="font-bold text-xl lg:text-center lg:text-3xl lg:border-white lg:border-b-2 lg:pb-3" text="Přehled" />

                    <div className="mt-5 lg:mt-10">
                        <div className="flex justify-between">
                            <div className="w-full">
                                {actions
                                    .filter(action => action.team === "home" && action.minute)
                                    .sort((a, b) => a.minute - b.minute)
                                    .map((action, index) => (
                                        <div key={index} className="flex justify-start items-center mb-2">
                                            <Text text={`${action.minute}'`} className="mr-2 text-sm lg:text-xl font-semibold" />
                                            <Text text={action.name} className="text-left text-sm lg:text-xl font-semibold" />
                                            <Text text=" " className="mr-2 text-sm lg:text-xl" />
                                            <Text text="-" className="mr-2 text-sm lg:text-xl" />
                                            <Text text={getEventLabel(action)} className="mr-2 text-sm lg:text-xl" />
                                        </div>
                                    ))}
                            </div>

                            <div className="w-full">
                                {actions
                                    .filter(action => action.team === "away" && action.minute)
                                    .sort((a, b) => a.minute - b.minute)
                                    .map((action, index) => (
                                        <div key={index} className="flex justify-end items-center mb-2">
                                            <Text text={`${action.minute}'`} className="mr-2 text-sm lg:text-xl font-semibold" />
                                            <Text text={action.name} className="text-right text-sm lg:text-xl font-semibold" />
                                            <Text text=" " className="mr-2 text-sm lg:text-xl" />
                                            <Text text="-" className="mr-2 text-sm lg:text-xl" />
                                            <Text text={getEventLabel(action)} className="mr-2 text-sm lg:text-xl" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {props.activeTab === "sestavy" && (
                <div>
                    <Title className="font-bold text-xl lg:text-center lg:text-3xl lg:border-white lg:border-b-2 lg:pb-3 mb-3" text="Sestavy" />
                    {props.lineup.length === 0 ? (
                        <Text text="Sestavy nejsou dostupné" className="text-center text-sm lg:text-lg font-bold" />
                    ) : (
                        <div className="flex justify-between">
                            {/* Domácí tým */}
                            <div id={props.data.homeTeam.id}>

                                <Text text="Základní sestava" className="font-semibold text-lg mb-2" />
                                {props.lineup
                                    .filter(player => player.team.id === props.data.homeTeam.id && player.is_starter)
                                    .map(player => (
                                        <div key={player.id} className="flex items-center space-x-3 mb-2">
                                            <Image
                                                src={player.player.image_src}
                                                alt={player.player.first_name}
                                                className="lg:w-10 lg:h-10 md:w-10 md:h-10 h-8 w-8 rounded-full lg:bject-cover"
                                            />
                                            <Text
                                                text={`${player.player.number} - ${player.player.first_name} ${player.player.last_name} (${player.player.position})`}
                                            />
                                        </div>
                                    ))}

                                {/* Náhradníci */}
                                <Text text="Náhradníci" className="font-semibold text-lg mt-4 mb-2" />
                                {props.lineup
                                    .filter(player => player.team.id === props.data.homeTeam.id && !player.is_starter)
                                    .map(player => (
                                        <div key={player.id} className="flex items-center space-x-3 mb-2">
                                            <Image
                                                src={player.player.image_src}
                                                alt={player.player.first_name}
                                                className="lg:w-10 lg:h-10 md:w-10 md:h-10 h-8 w-8 rounded-full lg:bject-cover"
                                            />
                                            <Text
                                                text={`${player.player.number} - ${player.player.first_name} ${player.player.last_name} (${player.player.position})`}
                                            />
                                        </div>
                                    ))}
                                <Text text="Trenér" className="font-semibold text-lg text-left mt-4 mb-2" />
                                <Text className="text-left" text={props.data.homeTeam.coach} />
                            </div>

                            {/* Hostující tým */}
                            <div id={props.data.awayTeam.id}>

                                {/* Základní sestava */}
                                <Text text="Základní sestava" className="font-semibold text-lg text-right mb-2" />
                                {props.lineup
                                    .filter(player => player.team.id === props.data.awayTeam.id && player.is_starter)
                                    .map(player => (
                                        <div key={player.id} className="flex items-center space-x-3 mb-2 justify-end">
                                            <Text className="text-right"
                                                  text={`(${player.player.position}) ${player.player.last_name} ${player.player.first_name} - ${player.player.number}`}
                                            />
                                            <Image
                                                src={player.player.image_src}
                                                alt={player.player.first_name}
                                                className="lg:w-10 lg:h-10 md:w-10 md:h-10 h-8 w-8 rounded-full lg:bject-cover"
                                            />
                                        </div>
                                    ))}

                                {/* Náhradníci */}
                                <Text text="Náhradníci" className="font-semibold text-lg text-right mt-4 mb-2" />
                                {props.lineup
                                    .filter(player => player.team.id === props.data.awayTeam.id && !player.is_starter)
                                    .map(player => (
                                        <div key={player.id} className="flex items-center space-x-3 mb-2 justify-end">
                                            <Text className="text-right"
                                                  text={`(${player.player.position}) ${player.player.last_name} ${player.player.first_name} - ${player.player.number}`}
                                            />
                                            <Image
                                                src={player.player.image_src}
                                                alt={player.player.first_name}
                                                className="lg:w-10 lg:h-10 md:w-10 md:h-10 h-8 w-8 rounded-full lg:bject-cover"
                                            />
                                        </div>
                                    ))}
                                <Text text="Trenér" className="font-semibold text-lg text-right mt-4 mb-2" />
                                <Text className="text-right" text={props.data.awayTeam.coach} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {props.activeTab === "statistiky" && (
                <div className="flex flex-col">
                    <Title className="font-bold text-xl lg:text-center lg:text-3xl lg:border-white lg:border-b-2 lg:pb-3" text="Statistiky" />
                    <div className="py-5 lg:py-8">
                        {Object.keys(homeTeamStats).map((statKey, index) => (
                            <Statistic
                                key={index}
                                title={statKey}
                                homeValue={homeTeamStats[statKey]}
                                awayValue={awayTeamStats[statKey]}
                            />
                        ))}
                    </div>
                </div>
            )}
            {props.activeTab === "analytika" && (
                <div>
                    <Title className="font-bold text-xl lg:text-center lg:text-3xl lg:border-white lg:border-b-2 lg:pb-3 mb-3" text="Analýza zápasu" />
                    {props.analysis.content ? <HtmlText text={props.analysis.content} /> : <p>Analýza zápasu není k dispozici</p>}
                </div>
            )}
            {props.activeTab === "sazeni" && (
                <div>
                    <Title className="font-bold text-xl lg:text-center lg:text-3xl lg:border-white lg:border-b-2 lg:pb-3 mb-3" text="Sázková poradna" />
                    {props.betting.content ? <HtmlText text={props.betting.content} /> : <p>Sázková poradna není k dispozici</p>}
                </div>
            )}
        </div>
    );
}