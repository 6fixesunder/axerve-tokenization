import "./Cart.scss";
import { useContext } from "react";
import { ProductType } from "../../model/ProductType";
import { Button } from "@material-ui/core";
import { AppContext } from "../../hooks/UseAppContext";

function Cart() {
    const { cart, removeProductFroMCart } = useContext(AppContext);
    const productsListFactory = () => {

        if (!cart.length) {
            return
        }

        const groupById: any = {};
        for (const p of cart) {
            const product: ProductType = p;
            if (!groupById[product.id]) {
                groupById[product.id] = []
            }
            groupById[product.id].unshift(product);
        }

        const listById = Object.keys(groupById);

        return listById.map(id => {
            const products = groupById[id];
            const prices = products.map((p: ProductType) => p.price);
            const productTotal = prices.reduce((acc: number, next: number) => acc + next);
            return <div key={id} className="CartProduct">
                <p>{products[0].name} ({products.length})</p>
                <p><b>Total: </b>{`${productTotal}€`}</p>
                <div className="ButtonContainer">
                    <Button variant="contained"
                        color="primary"
                        onClick={() => {
                            removeProductFroMCart(id);
                        }}
                    >
                        Remove
                </Button>
                </div>
            </div>
        })
    }

    return (
        <div className="Cart">
            {
                productsListFactory()?.length ?
                    <div className="CartContainer">
                        <div className="ProductsList">
                            {productsListFactory()}
                        </div>
                    </div>
                    : <div className="EmptyContainer">
                        <p>Empty cart. Go to home and buy something</p>
                    </div>
            }
        </div>
    )
}

export default Cart;