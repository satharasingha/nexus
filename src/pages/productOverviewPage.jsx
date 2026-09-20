import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlidesShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import { getProductReviews, createReview } from "../utils/reviews";

export default function ProductOverviewPage() {
    const parameters = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loading , success , error

    /* ============== REVIEWS STATE ============== */
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /* ============== FETCH PRODUCT ============== */
    useEffect(() => {
        // axios.get(import.meta.env.VITE_API_URL + "/products/" + parameters.productId)

        api.get("/products/" + parameters.productId)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.message ||
                        "An error occurred while fetching product details."
                );
                setStatus("error");
            });
    }, []);

    /* ============== FETCH PRODUCT REVIEWS ============== */
    useEffect(() => {
        if (product?.productId) {
            getProductReviews(product.productId)
                .then((res) => setReviews(res.data || []))
                .catch(() => setReviews([]));
        }
    }, [product]);

    /* ============== SUBMIT REVIEW ============== */
    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!reviewText.trim()) {
            toast.error("Please write a review before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            await createReview({
                productId: product.productId,
                productName: product.name,
                rating,
                text: reviewText,
            });

            toast.success(
                "Review submitted! It will appear after admin approval."
            );
            setReviewText("");
            setRating(5);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to submit review"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex justify-center items-start py-10 px-6 lg:px-12">
            {/* ================= LOADING ================= */}
            {status == "loading" && (
                <div className="w-full h-[70vh] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            )}

            {/* ================= ERROR ================= */}
            {status == "error" && (
                <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 text-3xl mb-2">
                        !
                    </div>
                    <h1 className="text-2xl font-bold">
                        Failed to load product details.
                    </h1>
                    <Link
                        to="/products"
                        className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#F4D77D] transition-colors duration-300"
                    >
                        Back to Products
                    </Link>
                </div>
            )}

            {/* ================= SUCCESS ================= */}
            {status == "success" && (
                <div className="w-full max-w-[1400px] mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
                        <Link
                            to="/"
                            className="hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            to="/products"
                            className="hover:text-[#D4AF37] transition-colors duration-300"
                        >
                            Products
                        </Link>
                        <span>/</span>
                        <span className="text-[#D4AF37] truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-10">
                        {/* ================= IMAGE SECTION ================= */}
                        <div className="w-full lg:w-1/2 flex justify-center items-start">
                            <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0d0d0d] p-6 overflow-hidden">
                                {/* Decorative glows */}
                                <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>
                                <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none"></div>

                                {/* Grid pattern */}
                                <div
                                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                                        backgroundSize: "40px 40px",
                                    }}
                                ></div>

                                <div className="relative z-10">
                                    <ImageSlideShow images={product.images} />
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg pointer-events-none"></div>
                                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg pointer-events-none"></div>
                            </div>
                        </div>

                        {/* ================= INFO SECTION ================= */}
                        <div className="w-full lg:w-1/2 flex flex-col">
                            {/* Category badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-5 w-fit">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                <span className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                    {product.category}
                                </span>
                            </div>

                            {/* Product name */}
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                {product.name}
                                {product.altNames.map(
                                    (alterantiveName, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="text-gray-500 text-2xl font-medium"
                                            >
                                                {" "}
                                                | {alterantiveName}
                                            </span>
                                        );
                                    }
                                )}
                            </h1>

                            {/* Product ID */}
                            <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs uppercase tracking-widest text-gray-500">
                                    SKU:
                                </span>
                                <span className="text-sm text-gray-400 font-mono">
                                    {product.productId}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

                            {/* Price */}
                            <div className="w-full flex flex-col">
                                <p className="text-[#D4AF37] font-bold text-4xl md:text-5xl tracking-tight">
                                    {getFormattedPrice(product.price)}
                                </p>
                                {product.labelledPrice > product.price && (
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-xl text-gray-500 line-through">
                                            {getFormattedPrice(
                                                product.labelledPrice
                                            )}
                                        </span>
                                        <span className="px-2 py-1 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold">
                                            Save{" "}
                                            {Math.round(
                                                ((product.labelledPrice -
                                                    product.price) /
                                                    product.labelledPrice) *
                                                    100
                                            )}
                                            %
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Brand and Model */}
                            <div className="w-full mt-6 grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-white/10 bg-[#111111] p-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                                        Brand
                                    </p>
                                    <p className="text-white font-semibold">
                                        {product.brand}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-[#111111] p-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                                        Model
                                    </p>
                                    <p className="text-white font-semibold">
                                        {product.model}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="w-full mt-6">
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                    Description
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="group relative flex-1 h-16 rounded-xl bg-[#D4AF37] text-black text-lg font-bold cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                                    onClick={() => {
                                        addToCart(product, 1);
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <svg
                                            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        Add to Cart
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                <Link
                                    to="/checkout"
                                    state={[
                                        {
                                            product: {
                                                productId: product.productId,
                                                name: product.name,
                                                image: product.images[0],
                                                labelledPrice:
                                                    product.labelledPrice,
                                                price: product.price,
                                            },
                                            quantity: 1,
                                        },
                                    ]}
                                    className="group relative flex-1 h-16 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] text-lg font-bold cursor-pointer flex justify-center items-center overflow-hidden transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Buy Now
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            →
                                        </span>
                                    </span>
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3 mt-8">
                                <div className="rounded-xl border border-white/10 bg-[#111111] p-3 text-center">
                                    <div className="text-[#D4AF37] text-lg mb-1">
                                        ✓
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Genuine
                                    </p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-[#111111] p-3 text-center">
                                    <div className="text-[#D4AF37] text-lg mb-1">
                                        ◈
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Fast Delivery
                                    </p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-[#111111] p-3 text-center">
                                    <div className="text-[#D4AF37] text-lg mb-1">
                                        ⚙
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================================================
                        REVIEWS SECTION
                    ========================================================= */}
                    <div className="w-full mt-16">
                        {/* Section header */}
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                    Customer{" "}
                                    <span className="text-[#D4AF37]">
                                        Reviews
                                    </span>
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    {reviews.length}{" "}
                                    {reviews.length === 1
                                        ? "review"
                                        : "reviews"}{" "}
                                    for this product
                                </p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* ============ LEFT: WRITE A REVIEW FORM ============ */}
                            <div className="lg:col-span-1">
                                <form
                                    onSubmit={handleSubmitReview}
                                    className="sticky top-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0d0d0d] p-6 overflow-hidden"
                                >
                                    {/* subtle glow */}
                                    <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>

                                    <div className="relative">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4">
                                            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[10px] font-semibold">
                                                Write a Review
                                            </p>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-4">
                                            Share your honest experience with
                                            this product. Your review will be
                                            visible after admin approval.
                                        </p>

                                        {/* Star selector */}
                                        <div className="mb-4">
                                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Your Rating
                                            </p>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <button
                                                        type="button"
                                                        key={n}
                                                        onClick={() =>
                                                            setRating(n)
                                                        }
                                                        aria-label={`Rate ${n} stars`}
                                                        className={`text-3xl transition-all duration-200 hover:scale-110 ${
                                                            n <= rating
                                                                ? "text-[#D4AF37]"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Textarea */}
                                        <div className="mb-4">
                                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Your Review
                                            </p>
                                            <textarea
                                                value={reviewText}
                                                onChange={(e) =>
                                                    setReviewText(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Tell others what you think about this laptop..."
                                                rows={5}
                                                maxLength={500}
                                                className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#D4AF37]/60 resize-none transition-colors duration-300"
                                            />
                                            <p className="text-xs text-gray-600 mt-1 text-right">
                                                {reviewText.length}/500
                                            </p>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="group relative w-full h-12 rounded-xl bg-[#D4AF37] text-black font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {submitting
                                                    ? "Submitting..."
                                                    : "Submit Review"}
                                                {!submitting && (
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        →
                                                    </span>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#F4D77D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* ============ RIGHT: REVIEWS LIST ============ */}
                            <div className="lg:col-span-2">
                                {reviews.length === 0 ? (
                                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-12 text-center">
                                        <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                                            ★
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">
                                            No reviews yet
                                        </h3>
                                        <p className="text-gray-500">
                                            Be the first to review this
                                            product!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {reviews.map((r) => {
                                            const fullName = `${
                                                r.userId?.firstName ?? "User"
                                            } ${
                                                r.userId?.lastName ?? ""
                                            }`.trim();

                                            return (
                                                <div
                                                    key={r._id}
                                                    className="group relative rounded-2xl border border-white/10 bg-[#111111] p-5 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(212,175,55,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                                    <div className="relative">
                                                        {/* header */}
                                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a7020] flex items-center justify-center text-black font-bold overflow-hidden shrink-0">
                                                                {r.userId
                                                                    ?.image ? (
                                                                    <img
                                                                        src={
                                                                            r
                                                                                .userId
                                                                                .image
                                                                        }
                                                                        alt={
                                                                            fullName
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                        onError={(
                                                                            e
                                                                        ) => {
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
                                                                <p className="text-xs text-gray-500">
                                                                    {new Date(
                                                                        r.createdAt
                                                                    ).toLocaleDateString(
                                                                        undefined,
                                                                        {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="ml-auto text-lg">
                                                                <span className="text-[#D4AF37]">
                                                                    {"★".repeat(
                                                                        r.rating
                                                                    )}
                                                                </span>
                                                                <span className="text-gray-700">
                                                                    {"★".repeat(
                                                                        5 -
                                                                            r.rating
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* text */}
                                                        <p className="text-gray-300 leading-relaxed">
                                                            {r.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}