import React from "react";

export default function ImageWithBorder({logo, className = "h-20 w-20"}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src={logo} alt="Team Logo" className={className} />
        </div>
    );
}
