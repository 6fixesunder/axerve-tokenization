import { useContext } from "react";
import { ProductType } from "../model/ProductType";
import { AppContext } from "./UseAppContext";

function useCart() {
    const {
        cart,
        removeProductFroMCart,
        setProductInCart,
        emptyCart
    } = useContext(AppContext);
    const totalPrice = () => {
        if (!cart?.length) {
            return 0
        }
        return cart.map((p: ProductType) => p.price).reduce((acc, next) => acc + next);
    }

    return {
        cart,
        removeProductFroMCart,
        totalPrice,
        setProductInCart,
        emptyCart,
    }
}

export default useCart;