import React from "react";

export default function FlexDiv({ children, className }) {
    return (
        <div className={`flex ${className}`}>{children}</div>
    );
}