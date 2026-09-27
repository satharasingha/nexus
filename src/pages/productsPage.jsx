import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(() => {
        if (!isProductsAreLoaded) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/products`)
                .then((response) => {
                    console.log("PRODUCTS:", response.data);
                    console.log(
                        "IMAGES:",
                        response.data.map((product) => product.images)
                    );

                    setProducts(response.data);
                    setIsProductsAreLoaded(true);
                })
                .catch((error) => {
                    console.error("Failed to load products:", error);
                });
        }
    }, [isProductsAreLoaded]);

    return (
        <div className="w-full h-full flex justify-center flex-wrap">
            {products.map((item) => (
                <ProductCard
                    key={item.productId}
                    product={item}
                />
            ))}
        </div>
    );
}