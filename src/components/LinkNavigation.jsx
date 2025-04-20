import Link from "./Link";

export default function LinkNavigation({className,classNameDiv, href, style, src,imgClass, text, alt = ""}) {
    return (
            <div>
                <Link classNameDiv={classNameDiv} href={href} className={className} text={text}><img src={src} className={imgClass} alt={alt}/></Link>
            </div>
    )
}