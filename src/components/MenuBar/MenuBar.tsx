import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../hooks/UseAppContext";
import "./MenuBar.scss";

function MenuBar() {
    const { cart } = useContext(AppContext);
    const history = useHistory();

    return (
        <div className="MenuBar">
            <h3>6FixesUnder Shop</h3>
            <div className="Menu">
                <p onClick={() => { history.push('/') }}><u>Home</u></p>
                <p onClick={() => { history.push('/cart') }}><u>Cart({`${cart.length}`})</u></p>
            </div>
        </div>
    )
}
export default MenuBar;