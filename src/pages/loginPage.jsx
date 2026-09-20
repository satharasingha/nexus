import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email: ", email);
        console.log("Password: ", password);
        //backend localhost:3000/users/login

        axios
            .post(import.meta.env.VITE_API_URL + "/users/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                //alert("Login successful!");
                toast.success("Login successful!");
                if (response.data.isAdmin) {
                    //redirect to admin dashboard
                    //window.location.href = "/admin"

                    navigate("/admin");
                } else {
                    //redirect to homepage
                    //window.location.href = "/"
                    navigate("/");
                }
            })
            .catch((error) => {
                //alert(error.response.data.message);
                toast.error(error.response.data.message);
            });
    }

    return (
        <div className="w-full min-h-screen flex bg-[#0a0a0a] text-white relative overflow-hidden">
            {/* ================= LEFT: BRAND / HERO ================= */}
            <div className="hidden lg:flex w-1/2 h-screen relative flex-col justify-between p-12 overflow-hidden">
                {/* Background gradient + grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.22),transparent_55%)]"></div>
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>

                {/* Glow blobs */}
                <div className="absolute right-[-120px] top-[-120px] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse"></div>
                <div className="absolute left-[-150px] bottom-[-150px] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

                {/* Logo top-left */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">
                        N
                    </div>
                    <div>
                        <p className="font-bold tracking-[0.2em] text-sm">
                            NEXUS
                        </p>
                        <p className="text-[10px] text-gray-500 tracking-[0.3em]">
                            LAPTOPS
                        </p>
                    </div>
                </div>

                {/* Center content */}
                <div className="relative z-10 max-w-[460px]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[11px] font-semibold">
                            Welcome Back
                        </p>
                    </div>

                    <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight">
                        Sign in to
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D77D] to-[#D4AF37]">
                            Power Your
                        </span>
                        <span className="block">Next Move.</span>
                    </h1>

                    <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                        Access your orders, manage your cart, and stay on top
                        of everything Nexus.
                    </p>
                </div>

                {/* Bottom trust line */}
                <div className="relative z-10 flex items-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">✓</span>
                        Genuine Products
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">◈</span>
                        Islandwide Delivery
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">⚙</span>
                        Expert Support
                    </div>
                </div>
            </div>

            {/* ================= RIGHT: FORM ================= */}
            <div className="w-full lg:w-1/2 h-screen flex justify-center items-center relative p-6">
                {/* Background for mobile / small screens */}
                <div className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.15),transparent_60%)]"></div>
                <div
                    className="absolute inset-0 lg:hidden opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>

                <div className="relative w-full max-w-[420px]">
                    {/* Card */}
                    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0d0d0d] p-8 sm:p-10 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
                        {/* Decorative glows */}
                        <div className="absolute -top-24 -right-24 w-[260px] h-[260px] bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-24 w-[220px] h-[220px] bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none"></div>

                        {/* Gold top line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                        <div className="relative">
                            {/* Mobile logo */}
                            <div className="lg:hidden flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">
                                    N
                                </div>
                                <div>
                                    <p className="font-bold tracking-[0.2em] text-sm">
                                        NEXUS
                                    </p>
                                    <p className="text-[10px] text-gray-500 tracking-[0.3em]">
                                        LAPTOPS
                                    </p>
                                </div>
                            </div>

                            {/* Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4">
                                    <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[10px] font-semibold">
                                        Account
                                    </p>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Sign{" "}
                                    <span className="text-[#D4AF37]">
                                        in
                                    </span>
                                </h2>
                                <p className="text-gray-500 text-sm mt-2">
                                    Enter your credentials to continue.
                                </p>
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5 block">
                                    Email
                                </label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#D4AF37]/60 transition-colors duration-300"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5 block">
                                    Password
                                </label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    placeholder="••••••••"
                                    type="password"
                                    className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#D4AF37]/60 transition-colors duration-300"
                                />
                            </div>

                            {/* Forgot password */}
                            <p className="mb-6 w-full text-right text-sm text-gray-500">
                                Forget password?{" "}
                                <Link
                                    to="/forgot-password"
                                    className="text-[#D4AF37] hover:text-[#F4D77D] transition-colors duration-300 font-semibold"
                                >
                                    Click here
                                </Link>
                            </p>

                            {/* Submit */}
                            <button
                                onClick={handleLogin}
                                className="group relative w-full h-12 rounded-xl bg-[#D4AF37] text-black font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Sign In
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        →
                                    </span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-white/10"></div>
                                <span className="text-xs text-gray-600 uppercase tracking-widest">
                                    or
                                </span>
                                <div className="flex-1 h-px bg-white/10"></div>
                            </div>

                            {/* Register */}
                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-[#D4AF37] hover:text-[#F4D77D] transition-colors duration-300 font-semibold"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Below-card helper */}
                    <p className="text-center text-xs text-gray-600 mt-6">
                        By signing in you agree to our{" "}
                        <span className="text-gray-400">Terms</span> &{" "}
                        <span className="text-gray-400">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
}