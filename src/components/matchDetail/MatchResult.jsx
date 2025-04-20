export default function MatchResult(props) {
    return(
                <div className={"date flex flex-col text-center mt-10 mx-4 matchResult"}>
                    <div className={"flex flex-row justify-center gap-3 result"}>
                        <p>{props.home}</p>
                        <p>-</p>
                        <p>{props.away}</p>
                    </div>
                    <p>{props.status}</p>
                </div>
    );
}
