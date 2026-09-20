import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import CustomerOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settings";
import api from "../utils/api";
import getFormattedPrice from "../utils/price-format";
import { getApprovedReviews } from "../utils/reviews";

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

function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useReveal();

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(40px)" : "translateY(0)",
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* =========================================================
   HOME PAGE
========================================================= */
export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col">
            <Header />

            <div className="w-full flex-1 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<HomeContent />} />

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
                    <Route path="/my-orders" element={<CustomerOrdersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </div>
        </div>
    );
}

/* =========================================================
   HOME CONTENT
========================================================= */
function HomeContent() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState(true);

    /* ---- featured products ---- */
    useEffect(() => {
        api.get("/products")
            .then((response) => {
                setFeaturedProducts(response.data.slice(0, 4));
                setLoadingFeatured(false);
            })
            .catch(() => {
                setLoadingFeatured(false);
            });
    }, []);

    /* ---- testimonials ---- */
    useEffect(() => {
        getApprovedReviews(6)
            .then((res) => {
                setTestimonials(res.data || []);
                setLoadingTestimonials(false);
            })
            .catch(() => {
                setTestimonials([]);
                setLoadingTestimonials(false);
            });
    }, []);

    return (
        <div className="w-full">
            {/* =========================================================
                HERO
            ========================================================= */}
            <section className="relative min-h-[720px] flex items-center overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(212,175,55,0.22),transparent_45%)]"></div>

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>

                <div className="absolute right-[-120px] top-[-120px] w-[550px] h-[550px] rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse"></div>
                <div className="absolute left-[-180px] bottom-[-180px] w-[450px] h-[450px] rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-12 items-center py-20">
                    <div className="max-w-xl">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[11px] font-semibold">
                                    Premium Laptop Store
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={150}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
                                Power Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D77D] to-[#D4AF37]">
                                    Next Move.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={300}>
                            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                                Discover powerful laptops built for work,
                                gaming, creativity and everything in between.
                                Curated hardware. Honest pricing. Real support.
                            </p>
                        </Reveal>

                        <Reveal delay={450}>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    to="/products"
                                    className="group relative px-8 py-4 rounded-xl bg-[#D4AF37] text-black font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_45px_rgba(212,175,55,0.45)]"
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
                                    className="px-8 py-4 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                >
                                    Explore Categories
                                </a>
                            </div>
                        </Reveal>

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

                    <Reveal delay={300}>
                        <div className="flex justify-center items-center">
                            <div className="relative w-full max-w-[560px]">
                                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[120px] rounded-full"></div>

                                <img
                                    src="/hero-laptop.png"
                                    alt="Nexus Premium Laptop"
                                    className="relative z-10 w-full object-contain drop-shadow-[0_25px_60px_rgba(212,175,55,0.25)]"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                                <div className="relative z-10 h-[380px] flex items-center justify-center border border-[#D4AF37]/20 rounded-3xl bg-gradient-to-br from-[#151515] to-[#080808] overflow-hidden group">
                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-lg"></div>
                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-lg"></div>

                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.18),transparent_70%)]"></div>
                                    <div className="relative text-center">
                                        <div className="text-[#D4AF37] text-8xl font-bold mb-4 group-hover:scale-110 transition-transform duration-700">
                                            N
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-[0.3em]">
                                            NEXUS
                                        </h2>
                                        <p className="text-gray-500 mt-3 tracking-[0.4em] text-xs">
                                            LAPTOPS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">
                        Scroll
                    </span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                </div>
            </section>

            {/* =========================================================
                FEATURE STRIP
            ========================================================= */}
            <section className="border-y border-white/10 bg-[#0d0d0d] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.04),transparent)]"></div>
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

            {/* =========================================================
                CATEGORIES
            ========================================================= */}
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
                            <span className="text-[#D4AF37]">Category</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-md mx-auto">
                            Find the right technology for your needs.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {[
                        { name: "Gaming Laptops", icon: "🎮" },
                        { name: "Business Laptops", icon: "💼" },
                        { name: "Ultrabooks", icon: "💻" },
                        { name: "Workstations", icon: "⚡" },
                        { name: "Accessories", icon: "⌨" },
                    ].map((cat, i) => (
                        <Reveal key={cat.name} delay={i * 100}>
                            <CategoryCard name={cat.name} icon={cat.icon} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* =========================================================
                FEATURED PRODUCTS (ONLY 4)
            ========================================================= */}
            <section className="bg-[#0d0d0d] py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <Reveal>
                        <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4">
                                    <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                        Handpicked
                                    </p>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">
                                    Featured{" "}
                                    <span className="text-[#D4AF37]">
                                        Laptops
                                    </span>
                                </h2>
                                <p className="text-gray-500 mt-3">
                                    Powerful machines selected for you.
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

                    {loadingFeatured ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-[420px] rounded-2xl border border-white/10 bg-[#111111] animate-pulse"
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product, i) => (
                                <Reveal key={product.productId} delay={i * 100}>
                                    <FeaturedProductCard product={product} />
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================
                PROMO
            ========================================================= */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#171717] via-[#0f0f0f] to-[#0b0b0b]">
                        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        ></div>

                        <div className="relative z-10 p-10 md:p-16 lg:p-20 grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
                                    <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                        Nexus Promise
                                    </p>
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                                    Built for your
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D77D]">
                                        {" "}
                                        next level.
                                    </span>
                                </h2>

                                <p className="text-gray-400 max-w-xl mt-6 leading-relaxed text-lg">
                                    Whether you're building software, creating
                                    content, running a business or dominating
                                    your next game, Nexus helps you find the
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                                    <p className="text-[#D4AF37] text-3xl font-bold">
                                        24h
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Fast Dispatch
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                                    <p className="text-[#D4AF37] text-3xl font-bold">
                                        100%
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Genuine Stock
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                                    <p className="text-[#D4AF37] text-3xl font-bold">
                                        2yr
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Warranty
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                                    <p className="text-[#D4AF37] text-3xl font-bold">
                                        7/7
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* =========================================================
                TESTIMONIALS (DYNAMIC FROM BACKEND)
            ========================================================= */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
                <Reveal>
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-5">
                            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                Testimonials
                            </p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                            What Our{" "}
                            <span className="text-[#D4AF37]">Customers</span>{" "}
                            Say
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-md mx-auto">
                            Real reviews from real Nexus customers.
                        </p>
                    </div>
                </Reveal>

                {loadingTestimonials ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-[260px] rounded-2xl border border-white/10 bg-[#111111] animate-pulse"
                            ></div>
                        ))}
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-12 rounded-2xl border border-white/10 bg-[#111111]">
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                            ★
                        </div>
                        <p className="text-gray-400">
                            No reviews yet. Be the first to share your
                            experience!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => {
                            const fullName = `${t.userId?.firstName ?? "User"} ${
                                t.userId?.lastName ?? ""
                            }`.trim();

                            return (
                                <Reveal key={t._id} delay={i * 150}>
                                    <div className="group relative h-full rounded-2xl border border-white/10 bg-[#111111] p-7 hover:border-[#D4AF37]/40 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative">
                                            {/* Top row: quote + stars */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="text-[#D4AF37] text-4xl leading-none">
                                                    "
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-[#D4AF37]">
                                                        {"★".repeat(t.rating)}
                                                    </span>
                                                    <span className="text-gray-600">
                                                        {"★".repeat(
                                                            5 - t.rating
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Review text */}
                                            <p className="text-gray-300 leading-relaxed line-clamp-5">
                                                {t.text}
                                            </p>

                                            {/* User info */}
                                            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a7020] flex items-center justify-center text-black font-bold overflow-hidden shrink-0">
                                                    {t.userId?.image ? (
                                                        <img
                                                            src={t.userId.image}
                                                            alt={fullName}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                    ) : (
                                                        fullName[0]
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-white truncate">
                                                        {fullName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {t.productName ||
                                                            "Verified Customer"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* =========================================================
                NEWSLETTER
            ========================================================= */}
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
                            Get updates about new laptops, exclusive deals and
                            technology.
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

            {/* =========================================================
                FOOTER
            ========================================================= */}
            <footer className="bg-black border-t border-white/10 py-12">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">
                            N
                        </div>
                        <div>
                            <p className="font-bold tracking-[0.2em]">
                                NEXUS
                            </p>
                            <p className="text-xs text-gray-500 tracking-[0.3em]">
                                LAPTOPS
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link
                            to="/products"
                            className="hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            Products
                        </Link>
                        <Link
                            to="/contact-us"
                            className="hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/my-orders"
                            className="hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            Orders
                        </Link>
                    </div>

                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} Nexus Laptops. All rights
                        reserved.
                    </p>
                </div>
            </footer>
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

/* =========================================================
   FEATURED PRODUCT CARD (LOCAL)
========================================================= */
function FeaturedProductCard({ product }) {
    return (
        <Link
            to={"/overview/" + product.productId}
            state={product}
            className="group relative w-full rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer
            bg-gradient-to-b from-[#151515] to-[#0d0d0d]
            border border-white/10
            hover:border-[#D4AF37]/60
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]
            hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,0.3)]
            transition-all duration-500
            hover:-translate-y-2"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Image */}
            <div className="relative w-full h-[240px] overflow-hidden bg-[#0a0a0a]">
                <img
                    src={product.images[1]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-700 group-hover:scale-110"
                />
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500 z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20 pointer-events-none"></div>

                {product.labelledPrice > product.price && (
                    <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-bold tracking-wide shadow-lg">
                        {Math.round(
                            ((product.labelledPrice - product.price) /
                                product.labelledPrice) *
                                100
                        )}
                        % OFF
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="relative flex-1 flex flex-col justify-between px-5 py-5 z-10">
                <h1 className="text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {product.name}
                </h1>

                <div className="w-full flex flex-col mt-4">
                    {product.labelledPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                            {getFormattedPrice(product.labelledPrice)}
                        </span>
                    )}
                    <span className="text-lg font-bold text-[#D4AF37] mt-1">
                        {getFormattedPrice(product.price)}
                    </span>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-3"></div>

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                            In Stock
                        </span>
                        <span className="text-[#D4AF37] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                            View
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                →
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}