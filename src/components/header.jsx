import { BiCart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
    const location = useLocation();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/contact-us", label: "Contact Us" },
    ];

    return (
        <header className="w-full h-[80px] shrink-0 sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10">
            {/* gold underline glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

            <div className="w-full h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
                {/* ============ LOGO ============ */}
                <Link to="/" className="flex items-center shrink-0 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#D4AF37]/25 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-[52px] w-auto rounded-2xl relative z-10 ring-1 ring-[#D4AF37]/30 group-hover:ring-[#D4AF37]/60 transition-all duration-300"
                        />
                    </div>
                </Link>

                {/* ============ NAV ============ */}
                <nav className="hidden md:flex items-center gap-9">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative text-base font-semibold tracking-wide transition-colors duration-300 group ${
                                    isActive
                                        ? "text-[#D4AF37]"
                                        : "text-white/80 hover:text-white"
                                }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                                        isActive
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    }`}
                                ></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ============ RIGHT SIDE ============ */}
                <div className="flex items-center gap-3 shrink-0">
                    <UserData />

                    <Link
                        to="/cart"
                        className="w-[46px] h-[46px] flex justify-center items-center group"
                    >
                        <div className="relative w-full h-full flex items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/60 transition-all duration-300">
                            <BiCart className="text-white text-2xl group-hover:text-[#D4AF37] transition-colors duration-300 relative z-10" />
                            <div className="absolute inset-0 bg-[#D4AF37]/25 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}