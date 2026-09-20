import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // all | pending | approved
    const [actionId, setActionId] = useState(null);

    /* ================= LOAD ================= */
    const load = () => {
        setLoading(true);
        api.get("/reviews")
            .then((res) => {
                setReviews(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(
                    err?.response?.data?.message ||
                        "Failed to load reviews"
                );
                setLoading(false);
            });
    };

    useEffect(() => {
        load();
    }, []);

    /* ================= APPROVE ================= */
    const approve = async (id) => {
        try {
            setActionId(id);
            await api.put(`/reviews/${id}/approve`);
            toast.success("Review approved");

            // update locally without refetch
            setReviews((prev) =>
                prev.map((r) =>
                    r._id === id ? { ...r, approved: true } : r
                )
            );
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to approve"
            );
        } finally {
            setActionId(null);
        }
    };

    /* ================= DELETE ================= */
    const remove = async (id) => {
        if (!window.confirm("Delete this review permanently?")) return;

        try {
            setActionId(id);
            await api.delete(`/reviews/${id}`);
            toast.success("Review deleted");
            setReviews((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to delete"
            );
        } finally {
            setActionId(null);
        }
    };

    /* ================= DERIVED ================= */
    const filtered = reviews.filter((r) => {
        if (filter === "pending") return !r.approved;
        if (filter === "approved") return r.approved;
        return true;
    });

    const pendingCount = reviews.filter((r) => !r.approved).length;
    const approvedCount = reviews.filter((r) => r.approved).length;

    /* ================= RENDER ================= */
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-6 lg:px-12 py-12">
            <div className="max-w-[1100px] mx-auto">
                {/* Back link */}
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] transition-colors duration-300 mb-6"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">
                        ←
                    </span>
                    Back to Home
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-semibold">
                                Admin Panel
                            </p>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Manage{" "}
                            <span className="text-[#D4AF37]">Reviews</span>
                        </h1>
                        <p className="text-gray-500 mt-3">
                            Approve or remove customer reviews before they
                            appear on the site.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4">
                        <div className="rounded-xl border border-white/10 bg-[#111111] px-5 py-3">
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Pending
                            </p>
                            <p className="text-2xl font-bold text-[#D4AF37]">
                                {pendingCount}
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#111111] px-5 py-3">
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Approved
                            </p>
                            <p className="text-2xl font-bold text-green-400">
                                {approvedCount}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: "all", label: "All", count: reviews.length },
                        {
                            key: "pending",
                            label: "Pending",
                            count: pendingCount,
                        },
                        {
                            key: "approved",
                            label: "Approved",
                            count: approvedCount,
                        },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border ${
                                filter === tab.key
                                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                                    : "bg-[#111111] text-gray-400 border-white/10 hover:border-[#D4AF37]/40 hover:text-white"
                            }`}
                        >
                            {tab.label}{" "}
                            <span
                                className={
                                    filter === tab.key
                                        ? "opacity-70"
                                        : "opacity-50"
                                }
                            >
                                ({tab.count})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-[180px] rounded-2xl border border-white/10 bg-[#111111] animate-pulse"
                            ></div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                            ★
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Nothing here
                        </h3>
                        <p className="text-gray-500">
                            {filter === "pending"
                                ? "No reviews waiting for approval."
                                : filter === "approved"
                                ? "No approved reviews yet."
                                : "No reviews yet."}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filtered.map((r) => {
                            const fullName = `${
                                r.userId?.firstName ?? "Deleted User"
                            } ${r.userId?.lastName ?? ""}`.trim();

                            const isBusy = actionId === r._id;

                            return (
                                <div
                                    key={r._id}
                                    className={`group relative rounded-2xl border bg-[#111111] p-5 overflow-hidden transition-all duration-300 ${
                                        r.approved
                                            ? "border-green-500/20 hover:border-green-500/40"
                                            : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(212,175,55,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="relative">
                                        {/* Top row: user + status badge */}
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a7020] flex items-center justify-center text-black font-bold overflow-hidden shrink-0">
                                                    {r.userId?.image ? (
                                                        <img
                                                            src={r.userId.image}
                                                            alt={fullName}
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
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {r.productName ||
                                                            "Unknown Product"}{" "}
                                                        •{" "}
                                                        {new Date(
                                                            r.createdAt
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status badge */}
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    r.approved
                                                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                                        : "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                                                }`}
                                            >
                                                {r.approved
                                                    ? "✓ Approved"
                                                    : "⏳ Pending"}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="mt-3 text-lg">
                                            <span className="text-[#D4AF37]">
                                                {"★".repeat(r.rating)}
                                            </span>
                                            <span className="text-gray-700">
                                                {"★".repeat(5 - r.rating)}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({r.rating}/5)
                                            </span>
                                        </div>

                                        {/* Review text */}
                                        <p className="text-gray-300 mt-3 leading-relaxed">
                                            {r.text}
                                        </p>

                                        {/* Product ID */}
                                        <p className="text-xs text-gray-600 font-mono mt-3">
                                            SKU: {r.productId}
                                        </p>

                                        {/* Actions */}
                                        <div className="mt-4 flex gap-2 flex-wrap">
                                            {!r.approved && (
                                                <button
                                                    onClick={() =>
                                                        approve(r._id)
                                                    }
                                                    disabled={isBusy}
                                                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isBusy
                                                        ? "Approving..."
                                                        : "✓ Approve"}
                                                </button>
                                            )}

                                            {r.approved && (
                                                <span className="px-4 py-2 text-sm text-green-400 flex items-center gap-1">
                                                    Live on site
                                                </span>
                                            )}

                                            <button
                                                onClick={() => remove(r._id)}
                                                disabled={isBusy}
                                                className="px-4 py-2 rounded-lg bg-red-600/90 text-white text-sm font-semibold hover:bg-red-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isBusy
                                                    ? "Working..."
                                                    : "🗑 Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}