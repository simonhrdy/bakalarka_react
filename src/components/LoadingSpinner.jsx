import React from 'react';

export default function LoadingSpinner({ children, className = "spinner-container", classNameSpinner = "spinner" }) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className={classNameSpinner}></div>
            {children}
        </div>
    );
}