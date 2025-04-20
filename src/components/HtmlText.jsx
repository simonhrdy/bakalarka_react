import React from "react";

export default function HtmlText({ text }) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
}