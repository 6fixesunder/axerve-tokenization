import React from "react";
import Button from "@material-ui/core/Button/Button";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import Checkout from "../Checkout/Checkout";
import Buy from "../Buy/Buy";

function Footer() {
    const location = useLocation();
    const selectComponent = () => {
        switch (location.pathname) {
            case "/cart":
                return <Checkout />
            case "/payment":
                return <Buy />
            default:
                return <div className="LinkSite">
                    <a target="_blank" rel="noreferrer" href="https://6fixesunder.com">6fixesunder.com</a>
                </div>
        }
    }

    return (
        <div className="Footer">
            {
                selectComponent()
            }
        </div>
    )

}
export default Footer;