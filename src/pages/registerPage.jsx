import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister() {
        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        axios
            .post(import.meta.env.VITE_API_URL + "/users/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response.data);

                toast.success("Registration successful!");

                navigate("/login");
            })
            .catch((error) => {
                console.log(error);

                toast.error(
                    error.response?.data?.message ||
                    "Registration failed. Please try again."
                );
            });
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover">

            <div className="w-1/2 h-full hidden md:block"></div>

            <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center">

                <div className="w-[400px] min-h-[600px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center py-8">

                    <h1 className="text-4xl font-bold mb-8 text-secondary">
                        Create Account
                    </h1>

                    {/* First Name */}
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        type="text"
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Last Name */}
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                        type="text"
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Email */}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        type="email"
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Password */}
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        type="password"
                        className="w-3/4 p-3 mb-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Confirm Password */}
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        className="w-3/4 p-3 bg-accent text-white rounded-lg hover:opacity-90 transition"
                    >
                        Register
                    </button>

                    {/* Login Link */}
                    <p className="mt-6 w-3/4 text-center text-white">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-accent font-semibold"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
