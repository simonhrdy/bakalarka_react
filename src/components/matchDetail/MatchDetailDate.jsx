export default function MatchDetailDate(props) {
    return (
        <div className={"date flex flex-col text-center gap-1"}>
            <p>{props.date} {props.time}</p>
            <p>{props.stadium}</p>
        </div>
    );
}