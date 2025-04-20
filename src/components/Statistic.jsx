import React from "react";

export default function Statistic({ title, homeValue, awayValue, sportType }) {
    return (
        <div className="flex justify-between items-center mb-4 mt-4 lg:mt-10 border-bg-custom pb-3">
            <div className="w-1/3 text-left">
                <span className="font-bold text-sm lg:text-xl text-center ml-3 lg:ml-10">{homeValue}</span>
            </div>
            <div className="w-1/3 text-center relative">
                <span className="font-semibold text-sm lg:text-xl relative z-10">{title}</span>
            </div>
            <div className="w-1/3 text-right">
                <span className="font-bold text-sm lg:text-xl lg:mr-10 mr-3 text-center">{awayValue}</span>
            </div>
        </div>
    );
}
