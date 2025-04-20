import React from 'react';

export default function Input({ value, onChange = () => {}, label, type, name, className ,required = true, placeholder = "", autoComplete = "" }) {
    return (
        <div className={"flex flex-col"}>
            {label && <label>{label}</label>}
            <input required={required} className={className} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} autoComplete={autoComplete} />
        </div>
    );
}
