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
        <header className="w-full h-[100px] relative flex items-center justify-center shrink-0 border-b border-white/10 backdrop-blur-xl bg-black/80 z-50">
            {/* Subtle gold glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

            {/* Logo */}
            <Link
                to="/"
                className="w-[200px] h-full absolute left-10 flex justify-center items-center group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-[60px] mr-2 rounded-3xl relative z-10 ring-1 ring-[#D4AF37]/30 group-hover:ring-[#D4AF37]/60 transition-all duration-300"
                    />
                </div>
            </Link>

            {/* Nav Links */}
            <nav className="h-full flex justify-center items-center gap-10">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`relative text-lg font-semibold tracking-wide transition-colors duration-300 group ${
                                isActive
                                    ? "text-[#D4AF37]"
                                    : "text-white/80 hover:text-white"
                            }`}
                        >
                            {link.label}
                            {/* Animated underline */}
                            <span
                                className={`absolute -bottom-2 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                                    isActive
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                            ></span>
                            {/* Subtle glow on hover */}
                            <span className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Data */}
            <div className="h-[50px] absolute right-30 flex justify-center items-center">
                <UserData />
            </div>

            {/* Cart */}
            <Link
                to="/cart"
                className="w-[50px] h-[50px] absolute right-10 flex justify-center items-center group"
            >
                <div className="relative w-full h-full flex items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/60 transition-all duration-300">
                    <BiCart className="text-white text-3xl group-hover:text-[#D4AF37] transition-colors duration-300" />
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </Link>
        </header>
    );
}