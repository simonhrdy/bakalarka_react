const Link = ({ className, classNameDiv, href, style, children, text, onClick }) => {
    return (
        <span className={classNameDiv}>
            <a className={className} href={href} style={style} onClick={onClick}>
                {text}
            </a>
            {children}
        </span>
    );
}

export default Link;
