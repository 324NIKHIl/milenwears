import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product, Colorway } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, colorway: Colorway) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(product.colorways[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Active image: if hovered and multiple images exist, show second image or colorway image
  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : selectedColorway.image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColorway);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-slate-50 overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-sky-600 text-white rounded-md shadow-xs">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-white rounded-md shadow-xs">
              Bestseller
            </span>
          )}
          {product.polarized && (
            <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-sky-50 text-sky-800 border border-sky-200/60 rounded-md">
              Polarized
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 scale-110'
              : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image with smooth transition */}
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Hover Quick View Overlay Banner */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/40 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-md hover:bg-sky-600 hover:text-white text-slate-900 text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Specs</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-sky-700 tracking-wide uppercase text-[10px]">
              {product.category} &bull; {product.frameMaterial.split(' ')[0]}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Colorway Swatches & Price */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          
          {/* Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colorways.map((c) => {
              const isSelected = selectedColorway.name === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorway(c)}
                  className={`relative w-4 h-4 rounded-full border transition-all ${
                    isSelected
                      ? 'ring-2 ring-sky-500 ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.colorHex }}
                  title={`${c.name}`}
                  aria-label={`Select ${c.name} colorway`}
                />
              );
            })}
          </div>

          {/* Pricing */}
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-1.5">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Add to Bag */}
        <button
          id={`add-to-bag-${product.id}`}
          onClick={handleQuickAdd}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-sky-600 text-white shadow-xs hover:shadow-md'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-sky-300" />
              <span>Add &bull; {selectedColorway.name}</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
