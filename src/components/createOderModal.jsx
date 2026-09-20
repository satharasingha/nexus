import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function CreateOrderModal(props) {
    /*  firstName : user.firstName,
        lastName : user.lastName,
        addressLineOne : req.body.addressLineOne,
        adressLineTwo : req.body.adressLineTwo,
        city : req.body.city,
        state : req.body.state,
        postalCode : req.body.postalCode,
        phone : req.body.phone,*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    const cart = props.cart;

    async function createOder() {
        try {
            const token = localStorage.getItem("token");

            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items: [],
            };

            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                data.items.push({
                    productId: item.product.productId,
                    quantity: item.quantity,
                });
            }

            const result = await api.post("/orders", data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            alert(result.data.message);
            toast.success("Order created successfully!");
            setIsModalOpen(false);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "An error occurred while creating the order."
            );
        }
    }

    return (
        <>
            {/* ============ TRIGGER BUTTON ============ */}
            <button
                className="group relative px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <span className="relative z-10 flex items-center gap-2">
                    Order Now
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                    </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* ============ MODAL ============ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="relative w-full max-w-[520px] rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#151515] to-[#0d0d0d] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-24 w-[250px] h-[250px] bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none"></div>

                        {/* Gold top line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                        {/* Header */}
                        <div className="relative flex items-start justify-between gap-4 p-6 border-b border-white/10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                    <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[10px] font-semibold">
                                        Checkout
                                    </p>
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">
                                    Shipping{" "}
                                    <span className="text-[#D4AF37]">
                                        Details
                                    </span>
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    Fill in your delivery information
                                </p>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/40 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer shrink-0"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form body */}
                        <div className="relative p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="First Name"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <InputField
                                    label="Last Name"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            {/* Address */}
                            <InputField
                                label="Address Line 1"
                                placeholder="123 Main Street"
                                value={addressLineOne}
                                onChange={(e) =>
                                    setAddressLineOne(e.target.value)
                                }
                            />

                            <InputField
                                label="Address Line 2"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={addressLineTwo}
                                onChange={(e) =>
                                    setAddressLineTwo(e.target.value)
                                }
                            />

                            {/* City + State */}
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="City"
                                    placeholder="Colombo"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <InputField
                                    label="State"
                                    placeholder="Western"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                            {/* Postal + Phone */}
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Postal Code"
                                    placeholder="00100"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                                <InputField
                                    label="Phone"
                                    placeholder="+94 77 123 4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="relative p-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                            <button
                                className="group flex-1 h-12 rounded-xl border border-white/15 bg-white/5 text-gray-300 font-semibold hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="group relative flex-1 h-12 rounded-xl bg-[#D4AF37] text-black font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] cursor-pointer"
                                onClick={createOder}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Place Order
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        →
                                    </span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* =========================================================
   INPUT FIELD
========================================================= */
function InputField({ label, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg bg-black border border-white/10 px-3.5 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-[#D4AF37]/60 focus:bg-black/80 transition-colors duration-300"
            />
        </div>
    );
}