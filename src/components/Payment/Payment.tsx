import { useContext } from "react";
import { AppContext } from "../../hooks/UseAppContext";
import useCart from "../../hooks/UseCart";
import "./Payment.scss";

export interface CardDetails {
    number: string,
    expiryMonth: string,
    expiryYear: string,
    CVV: string,
}

function Payment() {
    const { cart } = useCart();
    const { cardDetails, setCardDetails } = useContext(AppContext);

    const onCardDetailsChange = (field: string, value: string) => {
        switch (field) {
            case "number":
                setCardDetails({
                    ...cardDetails,
                    number: value
                });
                break;
            case "expiryMonth":
                setCardDetails({
                    ...cardDetails,
                    expiryMonth: value
                });
                break;
            case "expiryYear":
                setCardDetails({
                    ...cardDetails,
                    expiryYear: value
                });
                break;
            case "CVV":
                setCardDetails({
                    ...cardDetails,
                    CVV: value
                });
                break;
        }
    }

    return (
        <div className="Payment">
            {
                cart.length == 0 ?
                    <div>
                        <p>Nothing to pay</p>
                    </div> :
                    <div className="CardDetails">
                        <label>Card number</label>
                        <input
                            value={cardDetails.number}
                            onChange={(e) => {
                                onCardDetailsChange("number", e.target.value);
                            }} />
                        <label>Expiry month</label>
                        <input
                            value={cardDetails.expiryMonth}
                            onChange={(e) => {
                                onCardDetailsChange("expiryMonth", e.target.value);
                            }} />
                        <label>Expiry year</label>
                        <input
                            value={cardDetails.expiryYear}
                            onChange={(e) => {
                                onCardDetailsChange("expiryYear", e.target.value);
                            }} />

                        <label>CVV</label>
                        <input
                            value={cardDetails.CVV}
                            onChange={(e) => {
                                onCardDetailsChange("CVV", e.target.value);
                            }} />
                        <div className="TestCards">
                            <a rel="noreferrer" target="_blank" href={"https://docs.gestpay.it/rest/test/credit-cards/"}>**Test cards</a>
                        </div>
                    </div>
            }
        </div>

    )
}

export default Payment;