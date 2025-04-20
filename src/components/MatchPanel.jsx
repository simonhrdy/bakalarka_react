export default function MatchPanel({ src, headline, date, children}) {
    return (
        <div className={"matchPanel"}>
            <div className={"matchPanelHeader"}>
                <div className={"flex gap-3 items-center"}>
                    {src && <img src={src} alt={""}></img>}
                    <h2>{headline}</h2>
                </div>
                <div>
                </div>
            </div>
            {children}
        </div>
    );
}