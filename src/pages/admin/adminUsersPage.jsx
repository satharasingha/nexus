import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all"); // all | active | blocked | admins
    const [search, setSearch] = useState("");
    const [actionId, setActionId] = useState(null);

    /* ================= LOAD ================= */
    const load = () => {
        setLoading(true);
        setError(null);

        api.get("/users/all")
            .then((res) => {
                setUsers(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(
                    err?.response?.data?.message ||
                        err?.message ||
                        "Failed to load users"
                );
                setUsers([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        load();
    }, []);

    /* ================= TOGGLE BLOCK ================= */
    const toggleBlock = async (user) => {
        const action = user.isBlocked ? "unblock" : "block";

        if (!window.confirm(`Are you sure you want to ${action} this user?`))
            return;

        try {
            setActionId(user._id);
            await api.put(`/users/${user._id}/block`, {
                isBlocked: !user.isBlocked,
            });
            toast.success(`User ${action}ed successfully`);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id
                        ? { ...u, isBlocked: !u.isBlocked }
                        : u
                )
            );
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                    `Failed to ${action} user`
            );
        } finally {
            setActionId(null);
        }
    };

    /* ================= TOGGLE ADMIN ================= */
    const toggleAdmin = async (user) => {
        const action = user.isAdmin ? "revoke admin from" : "make admin";

        if (!window.confirm(`Are you sure you want to ${action} this user?`))
            return;

        try {
            setActionId(user._id);
            await api.put(`/users/${user._id}/admin`, {
                isAdmin: !user.isAdmin,
            });
            toast.success("User role updated");

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id ? { ...u, isAdmin: !u.isAdmin } : u
                )
            );
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to update role"
            );
        } finally {
            setActionId(null);
        }
    };

    /* ================= DERIVED ================= */
    const filtered = users.filter((u) => {
        // filter
        if (filter === "active" && u.isBlocked) return false;
        if (filter === "blocked" && !u.isBlocked) return false;
        if (filter === "admins" && !u.isAdmin) return false;

        // search
        if (search.trim()) {
            const q = search.toLowerCase();
            const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
            return (
                fullName.includes(q) ||
                u.email.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const totalCount = users.length;
    const activeCount = users.filter((u) => !u.isBlocked).length;
    const blockedCount = users.filter((u) => u.isBlocked).length;
    const adminCount = users.filter((u) => u.isAdmin).length;

    /* ================= RENDER ================= */
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-white px-6 lg:px-12 py-12">
            <div className="max-w-[1200px] mx-auto">
                {/* Back */}
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
                            <span className="text-[#D4AF37]">Users</span>
                        </h1>
                        <p className="text-gray-500 mt-3">
                            View, search, block, or promote user accounts.
                        </p>
                    </div>

                    <button
                        onClick={load}
                        className="px-4 py-2 rounded-lg border border-white/10 bg-[#111111] text-sm text-gray-300 hover:border-[#D4AF37]/40 hover:text-white transition-all duration-300 w-fit"
                    >
                        ↻ Refresh
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatCard label="Total" value={totalCount} accent="white" />
                    <StatCard
                        label="Active"
                        value={activeCount}
                        accent="green"
                    />
                    <StatCard
                        label="Blocked"
                        value={blockedCount}
                        accent="red"
                    />
                    <StatCard
                        label="Admins"
                        value={adminCount}
                        accent="gold"
                    />
                </div>

                {/* Toolbar: search + filters */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg bg-[#111111] border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#D4AF37]/60 transition-colors duration-300"
                        />
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {[
                            {
                                key: "all",
                                label: "All",
                                count: totalCount,
                            },
                            {
                                key: "active",
                                label: "Active",
                                count: activeCount,
                            },
                            {
                                key: "blocked",
                                label: "Blocked",
                                count: blockedCount,
                            },
                            {
                                key: "admins",
                                label: "Admins",
                                count: adminCount,
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
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* ============ BODY ============ */}

                {/* 1. LOADING */}
                {loading && (
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-[90px] rounded-2xl border border-white/10 bg-[#111111] animate-pulse"
                            ></div>
                        ))}
                    </div>
                )}

                {/* 2. ERROR */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 text-3xl mb-4">
                            !
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-red-400">
                            Failed to load users
                        </h3>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={load}
                            className="px-5 py-2 rounded-lg bg-[#D4AF37] text-black font-semibold hover:bg-[#F4D77D] transition-colors duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* 3. EMPTY */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl mb-4">
                            👤
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            No users found
                        </h3>
                        <p className="text-gray-500">
                            {search.trim()
                                ? `No matches for "${search}"`
                                : "No users in this category."}
                        </p>
                    </div>
                )}

                {/* 4. LIST */}
                {!loading && !error && filtered.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {filtered.map((u) => {
                            const fullName = `${u.firstName} ${u.lastName}`;
                            const isBusy = actionId === u._id;

                            return (
                                <div
                                    key={u._id}
                                    className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0d0d0d] hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(212,175,55,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="relative flex flex-col md:flex-row md:items-center gap-4 p-5">
                                        {/* Avatar + info */}
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a7020] flex items-center justify-center text-black font-bold text-lg overflow-hidden shrink-0">
                                                {u.image ? (
                                                    <img
                                                        src={u.image}
                                                        alt={fullName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />
                                                ) : (
                                                    u.firstName?.[0]
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-semibold text-white text-base truncate">
                                                        {fullName}
                                                    </h3>

                                                    {/* Badges */}
                                                    {u.isAdmin && (
                                                        <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider">
                                                            Admin
                                                        </span>
                                                    )}
                                                    {u.isBlocked && (
                                                        <span className="px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                                                            Blocked
                                                        </span>
                                                    )}
                                                    {!u.isEmailVerified && (
                                                        <span className="px-2 py-0.5 rounded-md bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold uppercase tracking-wider">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 truncate mt-1">
                                                    {u.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 shrink-0 flex-wrap">
                                            <button
                                                onClick={() => toggleBlock(u)}
                                                disabled={isBusy}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    u.isBlocked
                                                        ? "bg-green-600 text-white hover:bg-green-500"
                                                        : "bg-red-600/90 text-white hover:bg-red-500"
                                                }`}
                                            >
                                                {u.isBlocked
                                                    ? "✓ Unblock"
                                                    : "⊘ Block"}
                                            </button>

                                            <button
                                                onClick={() => toggleAdmin(u)}
                                                disabled={isBusy}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border ${
                                                    u.isAdmin
                                                        ? "bg-transparent text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                                                        : "bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-[#F4D77D]"
                                                }`}
                                            >
                                                {u.isAdmin
                                                    ? "Revoke Admin"
                                                    : "Make Admin"}
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

/* =========================================================
   STAT CARD
========================================================= */
function StatCard({ label, value, accent = "white" }) {
    const colorClass =
        {
            white: "text-white",
            gold: "text-[#D4AF37]",
            green: "text-green-400",
            red: "text-red-400",
        }[accent] || "text-white";

    return (
        <div className="rounded-xl border border-white/10 bg-[#111111] px-5 py-3">
            <p className="text-xs uppercase tracking-widest text-gray-500">
                {label}
            </p>
            <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
        </div>
    );
}