import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(
        () => {
            if(!isProductsAreLoaded){
                axios.get(import.meta.env.VITE_API_URL + "/products").then(
                    (response) => {
                        console.log(response.data);
                        setProducts(response.data);
                        setIsProductsAreLoaded(true);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
        ,[isProductsAreLoaded]
    )

    return(
        <div className="w-full h-full flex justify-center flex-wrap">
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard key={item.productId} product={item}/>
                        )
                    }
                )
            }
        </div>
    )
}