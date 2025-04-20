import React from "react";


export default function Image({src, alt, className = "h-10 w-10"}) {
    return (
        <img src={src} alt={alt} className={className} />
    );
}