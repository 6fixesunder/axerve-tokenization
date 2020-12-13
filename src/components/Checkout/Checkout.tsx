import React from "react";
import Button from "@material-ui/core/Button/Button";
import "./Checkout.scss";
import { useHistory } from "react-router-dom";
import useCart from "../../hooks/UseCart";

function Checkout() {
    const history = useHistory();
    const { cart, totalPrice } = useCart();

    return (
        <div className="Checkout">
            <p><b>Total: </b>{`${totalPrice()}€`}</p>
            <div className="CheckoutButtonContainer">
                <Button variant="contained"
                    color="primary"
                    disabled={cart.length === 0}
                    onClick={() => {
                        history.push("/payment");
                    }}
                >
                    Checkout
            </Button>
            </div>
        </div>

    )

}

export default Checkout;