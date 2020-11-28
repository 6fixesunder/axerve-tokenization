import React from 'react';
import { useState } from 'react';
import { CardDetails } from '../components/Payment/Payment';
import { ProductType } from '../model/ProductType';

export interface IAppContext {
    paymentID: string;
    setPaymentID: (p: string) => void;
    cardToken: string;
    setCardToken: (p: string) => void;
    productsImgs: any;
    cart: ProductType[],
    setProductInCart: (p: ProductType) => void;
    removeProductFroMCart: (id: string) => void;
    emptyCart: () => void;
    cardDetails: CardDetails;
    setCardDetails: (c: CardDetails) => void;
    loaderVisible: boolean,
    setLoaderVisibility: (v: boolean) => void;
}

const AxerveFakeCardDetails = {
    number: "4775718800002026",//Axerve test card
    expiryMonth: "05",
    expiryYear: "27",
    CVV: "111",
}

const emptyContext: IAppContext = {
    paymentID: "",
    setPaymentID: (p: string) => { },
    cardToken: "",
    setCardToken: (p: string) => { },
    productsImgs: {},
    cart: [],
    setProductInCart: (p: ProductType) => { },
    removeProductFroMCart: (id: string) => { },
    emptyCart: () => {},
    cardDetails: { ...AxerveFakeCardDetails },
    setCardDetails: (c: CardDetails) => { },
    loaderVisible: false,
    setLoaderVisibility: (v: boolean) => { }
}

export const AppContext = React.createContext(emptyContext);

function UseAppContext(props: any) {

    //CRA images loading workaround for loading all images from a folder
    const importAllImgs = (img: any) => {
        let images: any = {};
        img.keys().forEach((item: any) => { images[item.replace('./', '')] = img(item); });
        return images;
    }

    const productsImgs = importAllImgs(require.context('../img/productsImgs', false, /\.(png|jpe?g|svg)$/));


    const [cart, setCart] = useState<ProductType[]>(emptyContext.cart);
    const [cardToken, setCardToken] = useState(emptyContext.cardToken);
    const [paymentID, setPaymentID] = useState(emptyContext.paymentID);
    const [cardDetails, setCardDetails] = useState(emptyContext.cardDetails);
    const [loaderVisible, setLoaderVisibility] = useState(emptyContext.loaderVisible);

    const removeProductFroMCart = (id: string) => {
        let alreadyRemoved: boolean = false;
        const newCart: ProductType[] = [];
        for (const p of cart) {
            const product: ProductType = p as ProductType;
            if (product.id === id && !alreadyRemoved) {
                alreadyRemoved = true;
                continue;
            }
            newCart.unshift(p);
        }
        setCart([...newCart]);
    }

    const setProductInCart = (product: ProductType) => {
        setCart([...cart, product]);
    }

    const emptyCart = () => {
        setCart([]);
    }

    return (
        <AppContext.Provider value={{
            paymentID,
            setPaymentID,
            cardToken,
            setCardToken,
            productsImgs,
            cart,
            setProductInCart,
            removeProductFroMCart,
            emptyCart,
            cardDetails,
            setCardDetails,
            loaderVisible,
            setLoaderVisibility
        }}
        >
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export default UseAppContext;