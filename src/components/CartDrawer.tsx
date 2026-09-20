import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, colorwayName: string, delta: number) => void;
  onRemoveItem: (productId: string, colorwayName: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountAmount: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
}

const FREE_SHIPPING_THRESHOLD = 200;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  setDiscountCode,
  discountAmount,
  applyDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

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
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="font-display font-bold text-lg text-slate-900">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-sky-50/70 border-b border-sky-100">
            <div className="flex items-center justify-between text-xs font-semibold text-sky-950 mb-1.5">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Complimentary Global Express Unlocked!
                  </span>
                ) : (
                  <span>Add <strong className="text-sky-700">${remainingForFreeShipping.toFixed(2)}</strong> more for Free Express Shipping</span>
                )}
              </span>
              <span className="text-[11px] text-sky-700 font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-sky-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-slate-800 text-base">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Discover our architectural sunglasses handcrafted from titanium and Italian bio-acetate.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-600 transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColorway.name}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.selectedColorway.image || item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="pr-6">
                      <h4 className="font-display font-bold text-sm text-slate-900 leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300"
                          style={{ backgroundColor: item.selectedColorway.colorHex }}
                        />
                        <span>{item.selectedColorway.name}</span>
                        {item.product.polarized && (
                          <span className="text-sky-700 font-medium">&bull; Polarized</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColorway.name, -1)}
                          className="w-5 text-slate-500 hover:text-slate-900 text-xs font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColorway.name, 1)}
                          className="w-5 text-slate-500 hover:text-slate-900 text-xs font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedColorway.name)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with Promo, Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-100 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try MILEN15)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-sky-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {discountCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <span>Applied: <strong>{discountCode}</strong></span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Special Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? 'FREE' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span>
                    ${(subtotal - discountAmount + (remainingForFreeShipping === 0 ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                id="cart-proceed-to-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-sky-500/20 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-sky-300" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
