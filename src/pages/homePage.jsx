import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import CustomerOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settings";

/* =========================================================
   SCROLL REVEAL HOOK
========================================================= */
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

/* =========================================================
   REVEAL WRAPPER
========================================================= */
function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useReveal();

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col">
            <Header />

            <div className="w-full flex-1 overflow-y-auto">
                <Routes>
                    {/* ================= HOME ================= */}
                    <Route
                        path="/"
                        element={
                            <div className="w-full">
                                {/* HERO SECTION */}
                                <section className="relative min-h-[700px] flex items-center overflow-hidden bg-black">
                                    {/* Background glow */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.22),transparent_40%)]"></div>

                                    {/* Grid pattern overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                                            backgroundSize: "60px 60px",
                                        }}
                                    ></div>

                                    <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse"></div>
                                    <div className="absolute left-[-150px] bottom-[-150px] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

                                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-10 items-center">
                                        {/* Hero text */}
                                        <div className="max-w-xl">
                                            <Reveal>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
                                                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-semibold">
                                                        Premium Technology
                                                    </p>
                                                </div>
                                            </Reveal>

                                            <Reveal delay={150}>
                                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                                                    Power Your
                                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D77D] to-[#D4AF37]">
                                                        Next Move.
                                                    </span>
                                                </h1>
                                            </Reveal>

                                            <Reveal delay={300}>
                                                <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                                                    Discover powerful laptops
                                                    built for work, gaming,
                                                    creativity and everything in
                                                    between.
                                                </p>
                                            </Reveal>

                                            <Reveal delay={450}>
                                                <div className="flex flex-wrap gap-4 mt-8">
                                                    <Link
                                                        to="/products"
                                                        className="group relative px-8 py-4 rounded-lg bg-[#D4AF37] text-black font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                                                    >
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            Shop Laptops
                                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                                →
                                                            </span>
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </Link>

                                                    <a
                                                        href="#categories"
                                                        className="px-8 py-4 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                                    >
                                                        Explore Categories
                                                    </a>
                                                </div>
                                            </Reveal>

                                            {/* Stats */}
                                            <Reveal delay={600}>
                                                <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#D4AF37]">
                                                            500+
                                                        </p>
                                                        <p className="text-gray-500 text-sm">
                                                            Products
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#D4AF37]">
                                                            10K+
                                                        </p>
                                                        <p className="text-gray-500 text-sm">
                                                            Happy Customers
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#D4AF37]">
                                                            4.9★
                                                        </p>
                                                        <p className="text-gray-500 text-sm">
                                                            Rating
                                                        </p>
                                                    </div>
                                                </div>
                                            </Reveal>
                                        </div>

                                        {/* Hero laptop */}
                                        <Reveal delay={300}>
                                            <div className="flex justify-center items-center">
                                                <div className="relative w-full max-w-[600px]">
                                                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[100px] rounded-full"></div>

                                                    <img
                                                        src="/hero-laptop.png"
                                                        alt="Nexus Premium Laptop"
                                                        className="relative z-10 w-full object-contain drop-shadow-[0_25px_60px_rgba(212,175,55,0.25)]"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                    {/* Fallback visual */}
                                                    <div className="relative z-10 h-[350px] flex items-center justify-center border border-[#D4AF37]/20 rounded-3xl bg-gradient-to-br from-[#151515] to-[#080808] overflow-hidden group">
                                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_70%)]"></div>
                                                        <div className="relative text-center">
                                                            <div className="text-[#D4AF37] text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-500">
                                                                N
                                                            </div>
                                                            <h2 className="text-3xl font-bold tracking-[0.2em]">
                                                                NEXUS
                                                            </h2>
                                                            <p className="text-gray-500 mt-2 tracking-[0.3em] text-sm">
                                                                LAPTOPS
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    </div>

                                    {/* Scroll indicator */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                                        <span className="text-gray-500 text-xs tracking-widest uppercase">
                                            Scroll
                                        </span>
                                        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                                    </div>
                                </section>

                                {/* FEATURE STRIP */}
                                <section className="border-y border-white/10 bg-[#0d0d0d] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.03),transparent)]"></div>
                                    <div className="relative max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
                                        <FeatureCard
                                            icon="✓"
                                            title="Genuine Products"
                                            desc="Authentic devices"
                                            border
                                        />
                                        <FeatureCard
                                            icon="◈"
                                            title="Islandwide Delivery"
                                            desc="Fast & secure shipping"
                                            border
                                        />
                                        <FeatureCard
                                            icon="$"
                                            title="Best Value"
                                            desc="Competitive pricing"
                                            border
                                        />
                                        <FeatureCard
                                            icon="⚙"
                                            title="Expert Support"
                                            desc="We're here to help"
                                        />
                                    </div>
                                </section>

                                {/* CATEGORIES */}
                                <section
                                    id="categories"
                                    className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24"
                                >
                                    <Reveal>
                                        <div className="text-center mb-14">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-5">
                                                <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                                    Explore
                                                </p>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                                                Shop by{" "}
                                                <span className="text-[#D4AF37]">
                                                    Category
                                                </span>
                                            </h2>
                                            <p className="text-gray-500 mt-4 max-w-md mx-auto">
                                                Find the right technology for
                                                your needs.
                                            </p>
                                        </div>
                                    </Reveal>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                                        {[
                                            {
                                                name: "Gaming Laptops",
                                                icon: "🎮",
                                            },
                                            {
                                                name: "Business Laptops",
                                                icon: "💼",
                                            },
                                            {
                                                name: "Ultrabooks",
                                                icon: "💻",
                                            },
                                            {
                                                name: "Workstations",
                                                icon: "⚡",
                                            },
                                            {
                                                name: "Accessories",
                                                icon: "⌨",
                                            },
                                        ].map((cat, i) => (
                                            <Reveal key={cat.name} delay={i * 100}>
                                                <CategoryCard
                                                    name={cat.name}
                                                    icon={cat.icon}
                                                />
                                            </Reveal>
                                        ))}
                                    </div>
                                </section>

                                {/* FEATURED PRODUCTS */}
                                <section className="bg-[#0d0d0d] py-24 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

                                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                                        <Reveal>
                                            <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-12">
                                                <div>
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4">
                                                        <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                                            Our Collection
                                                        </p>
                                                    </div>
                                                    <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">
                                                        Featured{" "}
                                                        <span className="text-[#D4AF37]">
                                                            Laptops
                                                        </span>
                                                    </h2>
                                                    <p className="text-gray-500 mt-3">
                                                        Powerful machines selected
                                                        for you.
                                                    </p>
                                                </div>

                                                <Link
                                                    to="/products"
                                                    className="group inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:text-[#F4D77D] transition-colors duration-300"
                                                >
                                                    View All Products
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        →
                                                    </span>
                                                </Link>
                                            </div>
                                        </Reveal>

                                        {/* Product page preview */}
                                        <Reveal delay={200}>
                                            <div className="relative bg-black rounded-2xl border border-white/10 p-5 overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
                                                <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-3xl rounded-full"></div>
                                                <div className="relative">
                                                    <ProductsPage />
                                                </div>
                                            </div>
                                        </Reveal>
                                    </div>
                                </section>

                                {/* PROMO SECTION */}
                                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
                                    <Reveal>
                                        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#171717] via-[#0f0f0f] to-[#0b0b0b]">
                                            {/* Decorative elements */}
                                            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                                            <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

                                            {/* Grid pattern */}
                                            <div
                                                className="absolute inset-0 opacity-[0.04]"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                                                    backgroundSize: "40px 40px",
                                                }}
                                            ></div>

                                            <div className="relative z-10 p-10 md:p-16 lg:p-20">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
                                                    <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                                        Nexus Promise
                                                    </p>
                                                </div>

                                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 max-w-2xl leading-tight tracking-tight">
                                                    Built for your
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D77D]">
                                                        {" "}
                                                        next level.
                                                    </span>
                                                </h2>

                                                <p className="text-gray-400 max-w-xl mt-6 leading-relaxed text-lg">
                                                    Whether you're building
                                                    software, creating content,
                                                    running a business or
                                                    dominating your next game,
                                                    Nexus helps you find the
                                                    hardware to get there.
                                                </p>

                                                <Link
                                                    to="/products"
                                                    className="group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[#D4AF37] text-black rounded-lg font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300"
                                                >
                                                    Find Your Laptop
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        →
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* NEWSLETTER */}
                                <section className="relative bg-gradient-to-br from-[#D4AF37] via-[#E5C558] to-[#D4AF37] text-black py-20 overflow-hidden">
                                    <div className="absolute inset-0 opacity-10">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage:
                                                    "radial-gradient(circle at 20% 50%, black 1px, transparent 1px)",
                                                backgroundSize: "30px 30px",
                                            }}
                                        ></div>
                                    </div>

                                    <Reveal>
                                        <div className="relative max-w-[800px] mx-auto text-center px-6">
                                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                                Stay Ahead with Nexus
                                            </h2>

                                            <p className="mt-4 opacity-70 text-lg">
                                                Get updates about new laptops,
                                                exclusive deals and technology.
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="flex-1 px-6 py-4 rounded-lg outline-none bg-white/90 backdrop-blur text-black placeholder-gray-500 focus:ring-2 focus:ring-black/20 transition-all duration-300"
                                                />

                                                <button className="px-8 py-4 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                                                    Subscribe
                                                </button>
                                            </div>

                                            <p className="mt-4 text-sm opacity-50">
                                                No spam. Unsubscribe anytime.
                                            </p>
                                        </div>
                                    </Reveal>
                                </section>
                            </div>
                        }
                    />

                    {/* ================= OTHER PAGES ================= */}

                    <Route path="/products" element={<ProductsPage />} />

                    <Route
                        path="/contact-us"
                        element={
                            <div className="min-h-screen flex items-center justify-center">
                                <h1 className="text-4xl font-bold">
                                    Contact Us
                                </h1>
                            </div>
                        }
                    />

                    <Route
                        path="/overview/:productId"
                        element={<ProductOverviewPage />}
                    />

                    <Route path="/cart" element={<CartPage />} />

                    <Route
                        path="/my-orders"
                        element={<CustomerOrdersPage />}
                    />

                    <Route path="/settings" element={<SettingsPage />} />

                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </div>
        </div>
    );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ icon, title, desc, border }) {
    return (
        <div
            className={`group p-6 text-center transition-colors duration-300 hover:bg-[#D4AF37]/5 ${
                border ? "border-r border-white/10" : ""
            }`}
        >
            <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300">
                {icon}
            </div>
            <h3 className="font-semibold mt-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                {title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{desc}</p>
        </div>
    );
}

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({ name, icon }) {
    return (
        <Link
            to="/products"
            className="group relative rounded-2xl border border-white/10 bg-[#111111] p-7 text-center hover:border-[#D4AF37]/60 hover:bg-[#171717] transition-all duration-500 overflow-hidden block"
        >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-3xl group-hover:bg-[#D4AF37] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {icon}
                </div>

                <h3 className="font-semibold mt-5 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {name}
                </h3>

                <p className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                    </span>
                </p>
            </div>
        </Link>
    );
}