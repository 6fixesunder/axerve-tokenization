import "./Home.scss";
import ProductsList from "./Products.json";
import Product from "../Product/Product";

function Home() {

    const productsListFactory = () => {
        return ProductsList.map(p => {
            return <Product
            className="ProductInList"
                key={p.id}
                product={{
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    imgName: p.imgName,
                }} />
        })
    }

    return (<div className="Home">
        {
            productsListFactory()
        }
    </div>)
}

export default Home;