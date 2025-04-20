import React from 'react';

export default function Select({ options, value, onChange, label, name, className }) {
    return (
        <div className={"flex flex-col mt-3"}>
            {label && <label>{label}</label>}
            <select className={className} name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
