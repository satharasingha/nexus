import { useState } from "react";
import { getCartTotal } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";
import { useLocation, Link } from "react-router-dom";
import CreateOrderModal from "../components/createOderModal";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-6 lg:px-12 pt-10 pb-44 gap-6">
            {/* ================= HEADER ================= */}
            <div className="w-full max-w-[900px] flex items-center justify-between mb-2">
                <div>
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] transition-colors duration-300 mb-3"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">
                            ←
                        </span>
                        Continue Shopping
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Your <span className="text-[#D4AF37]">Cart</span>
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {cart.length} {cart.length === 1 ? "item" : "items"} in
                        your cart
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-[900px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* ================= CART ITEMS ================= */}
            <div className="w-full max-w-[900px] flex flex-col gap-4">
                {cart.map((item, index) => {
                    return (
                        <div
                            key={item.product.productId}
                            className="group relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0d0d0d] hover:border-[#D4AF37]/40 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <div className="relative flex flex-col sm:flex-row items-center gap-4 p-4">
                                {/* Image */}
                                <div className="relative w-[100px] h-[100px] shrink-0 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 w-full sm:w-auto">
                                    <h1 className="text-base font-semibold text-white truncate group-hover:text-[#D4AF37] transition-colors duration-300">
                                        {item.product.name}
                                    </h1>
                                    <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">
                                        SKU: {item.product.productId}
                                    </p>

                                    <div className="flex items-baseline gap-3 mt-2 flex-wrap">
                                        <p className="text-[#D4AF37] font-bold text-base">
                                            {getFormattedPrice(
                                                item.product.price
                                            )}
                                        </p>
                                        {item.product.labelledPrice >
                                            item.product.price && (
                                            <span className="text-xs text-gray-500 line-through">
                                                {getFormattedPrice(
                                                    item.product.labelledPrice
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity control */}
                                <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto">
                                    <div className="w-[110px] h-[36px] rounded-full border border-white/15 bg-[#0d0d0d] flex items-center justify-between px-1.5 group-hover:border-[#D4AF37]/40 transition-colors duration-300">
                                        <button
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer"
                                            onClick={() => {
                                                const newCart = [...cart];
                                                newCart[index].quantity -= 1;
                                                if (
                                                    newCart[index].quantity <=
                                                    0
                                                ) {
                                                    newCart.splice(index, 1);
                                                }
                                                setCart(newCart);
                                            }}
                                        >
                                            −
                                        </button>
                                        <span className="font-semibold text-white text-sm tabular-nums">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => {
                                                const newCart = [...cart];
                                                newCart[index].quantity += 1;
                                                setCart(newCart);
                                            }}
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="text-sm font-bold text-white tabular-nums">
                                        {getFormattedPrice(
                                            item.product.price * item.quantity
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* ================= EMPTY STATE ================= */}
                {cart.length === 0 && (
                    <div className="w-full rounded-2xl border border-white/10 bg-[#111111] p-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                            🛒
                        </div>
                        <h2 className="text-xl font-bold">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 mt-2 mb-6">
                            Add some products to get started.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-6 py-3 rounded-lg bg-[#D4AF37] text-black font-semibold hover:bg-[#F4D77D] transition-colors duration-300"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>

            {/* ================= FIXED CHECKOUT BAR =================
                NOTE: removed backdrop-blur-xl — it was turning this bar into
                the containing block for the modal's `fixed` overlay, which
                trapped the modal inside the bar instead of the viewport.
            */}
            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-4">
                    <div className="max-w-[900px] mx-auto rounded-2xl border border-[#D4AF37]/30 bg-[#0b0b0b] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
                        {/* gold top line */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5">
                            {/* Total */}
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-widest text-gray-500">
                                    Order Total
                                </span>
                                <p className="text-2xl font-bold text-[#D4AF37] tabular-nums">
                                    {getFormattedPrice(getCartTotal(cart))}
                                </p>
                            </div>

                            {/* Modal trigger */}
                            <div className="w-full sm:w-auto">
                                <CreateOrderModal cart={cart} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}