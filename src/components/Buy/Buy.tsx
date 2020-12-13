import React, { useContext, useState } from "react";
import "./Buy.scss";
import Button from "@material-ui/core/Button/Button";
import AxerveAPI from "../../utils/AxerveAPI";
import useCart from "../../hooks/UseCart";
import { AppContext, IAppContext } from "../../hooks/UseAppContext";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

function Buy() {
    const [openModal, setOpenModal] = useState(false);
    const [paymentResultMessage, setPaymentResultMessage] = useState("");
    const { cart, totalPrice, emptyCart } = useCart();
    const {
        paymentID,
        cardToken,
        setPaymentID,
        cardDetails,
        setLoaderVisibility,
        setCardToken,
    }: IAppContext = useContext(AppContext);

    const buyProduct = async () => {

        const check = (res: any, p: string) => {
            if (res.error.code !== '0') {
                console.error(`Error invoking ${p} : ${res.error}`);
                throw res.error;
            }
        }

        try {

            const total = totalPrice().toString();
            setLoaderVisibility(true);
            const createRes: any = await AxerveAPI.createPayment(total, paymentID);
            check(createRes, "create");

            /***
             * You can use the first paymentID of the first payment of this user
             * for all his future payments, or you can set it to the latest (maybe
             * this is safer in case of some expiration policy which I'm not aware)
             * **/
            if (!paymentID?.length) {
                setPaymentID(createRes.payload.paymentID);
            }

            const submitRes: any = await AxerveAPI.submitPayment(cardDetails,
                createRes.payload.paymentToken,
                cardToken);
            check(submitRes, "submit");

            /***
             * If the card token isn't populated yet, take it calling detail api. 
             * 
             * Note :
             * The card token is also given back by the submit result api,
             * but I encountered a strange situation using Axerve in production mode 
             * where, for some reason, the card token in the submit result was empty
             * and the only way to obtain it was calling the detail.
             *  
             * **/
            if (!cardToken.length) {
                const detailRes: any = await AxerveAPI.detail(createRes.payload.paymentToken, createRes.payload.paymentID);
                check(detailRes, "detail");
                setCardToken(detailRes.payload.token);
            }

            emptyCart();
            setOpenModal(true);
            setPaymentResultMessage("Payment successfull executed!");

        } catch (e) {
            console.error(`Error in payment: `,e.response?.data?.error);
            setOpenModal(true);
            setPaymentResultMessage(`Error during the payment: ${e.response?.data?.error?.description}`);
        } finally {
            setLoaderVisibility(false);
        }
    }

    return (
        <div className="Buy">
            <Button variant="contained"
                disabled={cart.length === 0}
                color="primary"
                onClick={buyProduct}
            >
                Buy
            </Button>
            <Dialog
                open={openModal}
                onClose={() => { setOpenModal(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Pyment info"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {paymentResultMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenModal(false) }} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )


}

export default Buy;