import Button from "../Button";

export default function MatchControlPanel(props) {
    return(
      <div className={"mt-3 py-3 mb-3"} style={styleContainer}>
            <div className={"flex flex-row lg:gap-8 lg:px-20 flex-wrap"}>
                <Button className={props.activeType === "prehled" ? "-red-700" : ""} onClick={() => props.setActiveTab("prehled")} text={"Přehled"}></Button>
                <Button className={props.activeType === "sestavy" ? "-red-700" : ""} onClick={() => props.setActiveTab("sestavy")} text={"sestavy"}></Button>
                <Button className={props.activeType === "statistiky" ? "-red-700" : ""} onClick={() => props.setActiveTab("statistiky")} text={"statistiky"}></Button>
                <Button className={props.activeType === "analytika" ? "-red-700" : ""} onClick={() => props.setActiveTab("analytika")} text={"analytika"}></Button>
                <Button className={props.activeType === "sazeni" ? "-red-700" : ""} onClick={() => props.setActiveTab("sazeni")} text={"sázení"}></Button>
            </div>
      </div>
    );
}

const styleContainer = {
    backgroundColor: "#241F55",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px"
}