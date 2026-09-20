import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, Colorway } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, colorway: Colorway) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onQuickView,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="font-display font-bold text-lg text-slate-900">
                Saved Frames ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close saved frames"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-slate-800 text-base">No saved silhouettes</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any pair in our shop gallery to save them for comparison.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-600 transition-colors"
                >
                  Discover Sunglasses
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 relative group"
                >
                  <div
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                        className="font-display font-bold text-sm text-slate-900 hover:text-sky-600 cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ${product.price} &bull; {product.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product, product.colorways[0]);
                        }}
                        className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-sky-600 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-sky-300" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg border border-slate-200 bg-white hover:border-rose-200 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom info */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            Items saved in your session remain preserved.
          </div>

        </div>
      </div>
    </div>
  );
};
