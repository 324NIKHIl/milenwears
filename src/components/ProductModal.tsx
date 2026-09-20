import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Check, Star, Sparkles, ChevronRight, Ruler } from 'lucide-react';
import { Product, Colorway } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, colorway: Colorway, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColorway, setSelectedColorway] = useState<Colorway>(product.colorways[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Combine product gallery with colorway image
  const galleryImages = [selectedColorway.image, ...product.images.filter(img => img !== selectedColorway.image)];

  const handleAddToCart = () => {
    onAddToCart(product, selectedColorway, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="product-detail-modal"
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors shadow-xs"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Visual Gallery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div>
              {/* Active Image Frame */}
              <div className="relative aspect-4/3 w-full bg-white rounded-2xl overflow-hidden shadow-inner border border-slate-200/60 mb-4">
                <img
                  src={galleryImages[activeImageIndex] || selectedColorway.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {product.polarized && (
                  <div className="absolute top-3 left-3 bg-sky-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs">
                    Polarized Optics
                  </div>
                )}
              </div>

              {/* Thumbnail Bar */}
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {galleryImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-sky-600 ring-2 ring-sky-200'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Blueprint Graphic */}
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                <Ruler className="w-3.5 h-3.5 text-sky-600" />
                <span>Optical Frame Dimensions</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Lens Width</span>
                  <span className="font-semibold text-slate-800">{product.dimensions.lensWidth} mm</span>
                </div>
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Bridge Width</span>
                  <span className="font-semibold text-slate-800">{product.dimensions.bridgeWidth} mm</span>
                </div>
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Temple</span>
                  <span className="font-semibold text-slate-800">{product.dimensions.templeLength} mm</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Standard Universal Fit &bull; Weight: ~22g
              </p>
            </div>
          </div>

          {/* Right Column: Specifications & Checkout Trigger */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                  {product.category} Silhouette
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-full border border-emerald-100">
                  In Stock &bull; Ships in 24h
                </span>
              </div>

              {/* Colorway Selection */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-800">
                    Selected Color: <span className="text-sky-700 font-bold">{selectedColorway.name}</span>
                  </span>
                  <span className="text-slate-400">{product.colorways.length} Finishes</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {product.colorways.map((c) => {
                    const isSelected = selectedColorway.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColorway(c);
                          setActiveImageIndex(0);
                        }}
                        className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-100'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: c.colorHex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specifications List */}
              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                  Craftsmanship & Optics
                </p>
                <ul className="space-y-1.5 list-none">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Primary Action Bar */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                
                {/* Quantity Control */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-950 font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-950 font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-sky-600 text-white shadow-sky-950/10'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-sky-300" />
                      <span>Add to Bag &bull; ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Free 2-Day Shipping over $150</span>
                <span>30-Day Risk-Free Returns</span>
                <span>Includes Hard Case</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
