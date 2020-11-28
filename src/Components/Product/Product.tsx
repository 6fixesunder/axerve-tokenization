import React, { useContext } from 'react';
import './Product.scss';
import Button from '@material-ui/core/Button/Button';
import { ProductType } from '../../model/ProductType';
import { AppContext } from '../../hooks/UseAppContext';
import useCart from '../../hooks/UseCart';

interface Props {
    className?: string;
    product: ProductType;
}

function Product(props: Props) {
    const { productsImgs } = useContext(AppContext);
    const { setProductInCart, removeProductFroMCart } = useCart();
    const getImg = (imgName: string) => {
        //@ts-ignore
        return productsImgs[imgName].default
    }

    return (
        <div className={`Product ${props.className}`}>
            <h3 className="ProductName">{props.product.name}</h3>
            <div className="Body">
                <img width={20 + '%'} height={20 + '%'} src={getImg(props.product.imgName)} alt={"Watch"} />
                <h4>Description</h4>
                <p>{props.product.description}</p>
                <h4>Price</h4>
                <p>{`${props.product.price}€`}</p>
            </div>
            <div className="ButtonContainer">
                <Button variant="contained"
                    color="primary"
                    onClick={() => {
                        setProductInCart({
                            ...props.product,
                        })
                    }}
                >
                    Add
                </Button>
                <Button variant="contained"
                    color="primary"
                    onClick={() => {
                        removeProductFroMCart(props.product.id);
                    }}
                >
                    Remove
                </Button>
            </div>
        </div>)

}

export default Product;