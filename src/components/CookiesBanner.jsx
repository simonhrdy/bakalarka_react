import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Text from "./Text";
import Button from "./Button";

const CookiesBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = Cookies.get('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'true', { expires: 7 });
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className={"lg:my-5 lg:mx-60 my-5 mx-5"} style={styles.banner}>
                <Text className={"font-bold"} text={"Na této stránce používáme cookies, abychom vylepšili vaše uživatelské zkušenosti. Pokračováním v používání této stránky souhlasíte s naším používáním cookies."}></Text>
                <button onClick={handleAccept} className={"buttonLogin mt-8"} style={styles.button}>
                    Souhlasím
                </button>
            </div>
        )
    );
};

const styles = {
    banner: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#1E1E1E',
        color: 'white',
        padding: '40px 10px',
        textAlign: 'center',
        zIndex: 1000,
        border: "2px solid white",
        borderRadius: "20px",
    }
};

export default CookiesBanner;
