import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import getFormattedPrice from "../utils/price-format";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export default function CustomerOrderDetailsModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const order = props.order;

  return (
    <>
      {/* ============ TRIGGER ICON ============ */}
      <button
        className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
        }}
        aria-label="View order details"
      >
        <FaEye className="text-base" />
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
          <div className="relative w-full max-w-[820px] rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#151515] to-[#0d0d0d] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
            {/* Decorative glows */}
            <div className="absolute -top-24 -right-24 w-[320px] h-[320px] bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-[280px] h-[280px] bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none"></div>

            {/* Gold top line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

            {/* ============ HEADER ============ */}
            <div className="relative flex items-start justify-between gap-4 p-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-[10px] font-semibold">
                    Order Details
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Order <span className="text-[#D4AF37]">Summary</span>
                  </h1>
                  <span className="inline-block rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-mono text-gray-400">
                    {order.orderId}
                  </span>
                </div>
                <p className="text-sm text-gray-500 italic mt-2">
                  {order.email}
                </p>
              </div>

              {/* Close button */}
              <button
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/40 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-all duration-300 cursor-pointer shrink-0"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* ============ META INFO ============ */}
            <div className="relative p-6 flex flex-col gap-4 border-b border-white/10">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                    Phone
                  </p>
                  <p className="text-sm text-white font-medium">
                    {order.phone}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <MdHome className="text-base" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="font-semibold text-white">
                      {order.firstName} {order.lastName}
                    </span>
                    {", "}
                    {order.addressLineOne} {order.addressLineTwo}
                    {", "}
                    {order.city}
                    {", "}
                    {order.state}
                    {", "}
                    {order.postalCode}
                  </p>
                </div>
              </div>

              {/* Date + Status */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                    Order Date
                  </p>
                  <p className="text-sm text-white font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <span className="inline-block rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {order.status}
                </span>
              </div>

              {/* Notes */}
              <div className="rounded-xl border border-white/10 bg-[#111111] p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                  Order Notes
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {order.notes || "—"}
                </p>
              </div>
            </div>

            {/* ============ ITEMS LIST ============ */}
            <div className="relative p-6 flex flex-col gap-3 max-h-[340px] overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                  Items ({order.items.length})
                </p>
              </div>

              {order.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="group relative rounded-xl border border-white/10 bg-[#111111] p-3 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(212,175,55,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative flex items-center justify-between gap-4">
                      {/* Left: image + info */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-[72px] h-[72px] rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="font-semibold text-white text-sm line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                            {item.product.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            Qty:{" "}
                            <span className="text-gray-300 font-medium">
                              {item.quantity}
                            </span>
                          </span>
                          <span className="text-xs text-gray-500">
                            Price:{" "}
                            <span className="text-[#D4AF37] font-medium">
                              {getFormattedPrice(item.product.price)}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Right: line total */}
                      <div className="text-right shrink-0">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                          Subtotal
                        </p>
                        <p className="text-lg font-bold text-[#D4AF37] tabular-nums">
                          {getFormattedPrice(
                            item.product.price * item.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ============ TOTAL FOOTER ============ */}
            <div className="relative p-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                  Order Total
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <p className="text-3xl font-bold text-[#D4AF37] tabular-nums">
                {getFormattedPrice(order.total)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
