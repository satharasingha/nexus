import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex  items-center bg-accent">
            <div className="w-[300px] h-full text-white">

                {/* <h1 className="text-2xl font-bold mb-4">Using anchor tags 👇</h1>

                <a href="/admin/" className="block py-2 px-4 hover:bg-gray-700">Orders</a>
                <a href="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</a>
                <a href="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</a>
                <a href="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700">Reviews</a>

                <h1 className="text-2xl font-bold mb-4">Using link tags 👇</h1> */}
                    
                <Link to="/admin/" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700">Reviews</Link>


            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl">
                <Routes>
                    <Route path="/" element ={<AdminOrdersPage/>} />
                    <Route path="/products" element ={<AdminProductsPage/>} />
                    <Route path="/add-product" element ={<AdminAddProductPage/>} />
                    <Route path="/edit-product" element ={<AdminEditProductPage/>} />
                    <Route path="/users" element ={<h1>Users Dashboard</h1>} />
                    <Route path="/reviews" element ={<h1>Reviews Dashboard</h1>} />
                </Routes>
            </div>
        </div>
    )
}