import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <Link
            to={"/overview/" + product.productId}
            state={product}
            className="group relative w-[300px] h-[450px] m-10 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer 
            bg-gradient-to-b from-[#151515] to-[#0d0d0d] 
            border border-white/10 
            hover:border-[#D4AF37]/60 
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] 
            hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,0.3)] 
            transition-all duration-500 
            hover:-translate-y-2"
        >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Image area */}
            <div className="w-[300px] h-[300px] relative overflow-hidden bg-[#0a0a0a]">
                {/* Secondary image (revealed on hover) */}
                <img
                    src={product.images[1]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-700 group-hover:scale-110"
                />
                {/* Primary image (fades out on hover) */}
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500 z-10"
                />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none"></div>

                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                {/* Discount badge */}
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

                {/* Quick view overlay */}
                <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center pb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="px-5 py-2 rounded-full bg-[#D4AF37] text-black text-sm font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        Quick View
                    </span>
                </div>
            </div>

            {/* Info area */}
            <div className="relative flex-1 flex flex-col justify-between px-5 py-5 z-10">
                {/* Product name */}
                <h1 className="text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {product.name}
                </h1>

                {/* Price row */}
                <div className="w-full flex flex-col">
                    {product.labelledPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                            {product.labelledPrice}
                        </span>
                    )}
                    <span className="text-xl font-bold text-[#D4AF37] mt-1">
                        {product.price}
                    </span>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-3"></div>

                    {/* Bottom accent */}
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 uppercase tracking-widest">
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