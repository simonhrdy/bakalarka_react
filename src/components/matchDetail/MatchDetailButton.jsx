export default function MatchDetailButton(props){
    return(
      <button onClick={props.onClick} className={props.className} style={style}>{props.text}</button>
    );
}

const style = {
    backgroundColor: "#1E1E1E",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "20px",
    padding: "10px",
    border: "1px solid white",
    width: "140px"
}