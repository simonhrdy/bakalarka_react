import React from "react";
import Button from "../../components/Button";

export default function TeamControlPanel({ setType, activeType }) {
    return (
        <div className="mt-3 py-3 mb-3" style={styleContainer}>
            <div className="flex flex-row gap-4 lg:gap-8 lg:px-20 px-5">
                <Button
                    id="lineUp"
                    text="Soupiska"
                    onClick={() => setType("lineUp")}
                    className={activeType === "lineUp" ? "-red-700" : ""}
                />
                <Button
                    id="results"
                    text="Výsledky"
                    onClick={() => setType("results")}
                    className={activeType === "results" ? "-red-700" : ""}
                />
                <Button
                    id="program"
                    text="Program"
                    onClick={() => setType("program")}
                    className={activeType === "program" ? "-red-700" : ""}
                />
            </div>
        </div>
    );
}

const styleContainer = {
    backgroundColor: "#241F55",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px"
};
