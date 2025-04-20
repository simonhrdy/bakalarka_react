export default function Gap({gap}){
    let className = "mt-" + gap;
    return (
        <div className={className}></div>
    );
}