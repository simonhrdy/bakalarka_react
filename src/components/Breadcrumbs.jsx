export default function Breadcrumbs(props) {
    return (
        <div className={"breadcrumbs lg:px-20 py-5 px-5"}>
            {props.sportHref && props.leagueHref ? (
                <p>
                    <a href={props.sportHref}>{props.sport}</a> &gt;
                    <a href={props.leagueHref}>{props.league}</a>
                </p>
            ) : <p></p>}
            <p className={"back"}>
                <a href={"/"}>
                    <img src={"/images/arrow_back.svg"} alt={""} />
                    ZPĚT NA HLAVNÍ STRÁNKU
                </a>
            </p>
        </div>
    );
}