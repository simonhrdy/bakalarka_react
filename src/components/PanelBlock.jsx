import Link from "./Link";

export default function PanelBlock({ position, players }) {
    return (
        <div className="match py-6">
            <div className="flex flex-col gap-3 flex-1">
                <h1>{position}</h1>
            </div>
            <div className="flex gap-3 flex-row flex-1 flex-wrap">
                {players.map((player) => (
                    <Link key={player.id} href={"/player/" + player.id} text={player.first_name + " " + player.last_name + ", "}>

                    </Link>
                ))}
            </div>
        </div>
    );
}
