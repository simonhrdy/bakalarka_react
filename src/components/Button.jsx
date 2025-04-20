export default function Button(props){
    return(
        <button className={`text-xs panelButton lg:text-lg text${props.className}`} onClick={props.onClick} id={props.id}>{props.text}</button>
    );
}
