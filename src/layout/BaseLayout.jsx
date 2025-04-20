import Footer from "../components/Footer";
import Header from "./Header/Header";
import CookiesBanner from "../components/CookiesBanner";
import {checkTokenExpiration} from "../Services/TokenService";
import {useEffect} from "react";

const BaseLayout = ({ children }) => {
    useEffect(() => {
        checkTokenExpiration();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <CookiesBanner />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default BaseLayout;
