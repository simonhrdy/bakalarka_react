import Link from "../../components/Link";

export default function Match({time, team1, team1Img, team2, team2Img, score1, score2, status, id, team1surname, team2surname}) {
    return (
        <div className={"match py-4"}>
            <p>{time}</p>
            <img className={"lg:mx-20 mx-6"} alt={""} src={"/images/line.svg"}></img>
            <div className={"flex flex-col gap-2 lg:gap-3 flex-1"}>
                <div className={"flex gap-3 lg:gap-6 items-center teamContainer"}>
                    <img alt={""} width={"30px"} src={team1Img}></img>
                    <p>{team1} {team1surname}</p>
                </div>
                <div className={"flex gap-3 lg:gap-6 items-center teamContainer"}>
                    <img alt={""} width={"30px"} src={team2Img}></img>
                    <p>{team2} {team2surname}</p>
                </div>
            </div>
            <div className={"flex gap-3 flex-col flex-1 result"}>
                <p>{score1}</p>
                <p>{score2}</p>
            </div>
            <Link href={"/match/" + id} className={"flex justify-end items-end flex-1 detail"} text={"Detail"}/>
        </div>
    );
}