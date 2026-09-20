import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, Package, ArrowRight, ArrowLeft, Lock, Sparkles, Printer, Copy, Check } from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountAmount,
  discountCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Form State
  const [shipping, setShipping] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    caseOption: 'minimalist',
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    method: 'card',
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = shipping.shippingMethod === 'express' ? 15 : (subtotal >= 200 ? 0 : 15);
  const caseUpgradeCost = shipping.caseOption === 'leather' ? 20 : 0;
  const tax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + caseUpgradeCost + tax);

  // Quick fill helper for effortless testing
  const handleFillDemo = () => {
    setShipping({
      firstName: 'Julian',
      lastName: 'Sterling',
      email: 'julian.sterling@example.com',
      phone: '+1 (555) 382-9014',
      address: '742 Ocean Boulevard',
      apartment: 'Penthouse 4B',
      city: 'Santa Monica',
      state: 'CA',
      postalCode: '90401',
      country: 'United States',
      shippingMethod: 'standard',
      caseOption: 'minimalist',
    });
    setPayment({
      cardNumber: '4242 •••• •••• 4242',
      cardName: 'Julian Sterling',
      expiry: '08/28',
      cvv: '842',
      method: 'card',
    });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.firstName || !shipping.email || !shipping.address || !shipping.city || !shipping.postalCode) {
      alert('Please provide your name, email, street address, city, and postal code.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate realistic optical order processing delay
    setTimeout(() => {
      const orderNumber = `AZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `AZR-${Math.random().toString(36).substring(2, 10).toUpperCase()}-US`;
      
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (shipping.shippingMethod === 'express' ? 2 : 4));
      const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const newOrder: Order = {
        id: orderNumber,
        orderNumber,
        date: orderDate,
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shippingCost: shippingCost + caseUpgradeCost,
        tax,
        total,
        shippingDetails: shipping,
        trackingNumber,
        estimatedDelivery,
        status: 'Confirmed',
      };

      setCreatedOrder(newOrder);
      setIsProcessing(false);
      setStep(4);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  const handleCopyTracking = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step !== 4 && !isProcessing) onClose();
        }}
      />

      {/* Modal Container */}
      <div
        id="checkout-flow-modal"
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-[0.16em] text-xs sm:text-sm text-sky-400">
              THE MILENWEARS
            </span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-slate-300 font-medium">
              {step === 4 ? 'Order Confirmed' : 'Encrypted Express Checkout'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step < 4 && (
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-sky-300 bg-sky-950/80 hover:bg-sky-900 px-2.5 py-1 rounded-md border border-sky-800/80 transition-colors"
                title="Fill sample details for quick testing"
              >
                Auto-Fill Demo
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Checkout Steps Progress Indicator */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 font-semibold ${step >= 1 ? 'text-sky-600' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step > 1 ? 'bg-sky-600 text-white' : step === 1 ? 'border-2 border-sky-600 text-sky-600' : 'border border-slate-300 text-slate-400'
              }`}>
                {step > 1 ? '✓' : '1'}
              </span>
              <span>Shipping</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-slate-200"></div>

            <div className={`flex items-center gap-1.5 font-semibold ${step >= 2 ? 'text-sky-600' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step > 2 ? 'bg-sky-600 text-white' : step === 2 ? 'border-2 border-sky-600 text-sky-600' : 'border border-slate-300 text-slate-400'
              }`}>
                {step > 2 ? '✓' : '2'}
              </span>
              <span>Delivery & Case</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-slate-200"></div>

            <div className={`flex items-center gap-1.5 font-semibold ${step >= 3 ? 'text-sky-600' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 3 ? 'border-2 border-sky-600 text-sky-600' : 'border border-slate-300 text-slate-400'
              }`}>
                3
              </span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Shipping Destination
                </h3>
                <p className="text-xs text-slate-500">
                  Where should our atelier dispatch your eyewear package?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.firstName}
                    onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                    placeholder="Julian"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.lastName}
                    onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                    placeholder="Sterling"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email for Order Updates *
                  </label>
                  <input
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    placeholder="julian@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone (Courier SMS updates)
                  </label>
                  <input
                    type="tel"
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="742 Ocean Boulevard"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Apartment, Suite (optional)
                  </label>
                  <input
                    type="text"
                    value={shipping.apartment}
                    onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                    placeholder="Apt 4B"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    placeholder="Santa Monica"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal / ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                    placeholder="90401"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Order Brief Summary */}
              <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Cart Subtotal ({cart.length} frames):</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-3 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Continue to Delivery Options</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method & Case Option */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Delivery & Presentation Case
                </h3>
                <p className="text-xs text-slate-500">
                  Select your preferred speed and custom protective packaging.
                </p>
              </div>

              {/* Shipping Method Radios */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Transit Speed
                </label>
                
                <div
                  onClick={() => setShipping({ ...shipping, shippingMethod: 'standard' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shipping.shippingMethod === 'standard'
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">The Milenwears Standard Courier</p>
                      <p className="text-[11px] text-slate-500">Estimated 3-5 business days &bull; Tracked</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {subtotal >= 200 ? 'FREE' : '$15.00'}
                  </span>
                </div>

                <div
                  onClick={() => setShipping({ ...shipping, shippingMethod: 'express' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shipping.shippingMethod === 'express'
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Air Express Priority</p>
                      <p className="text-[11px] text-slate-500">Guaranteed 1-2 business days &bull; Signature required</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">$15.00</span>
                </div>
              </div>

              {/* Case Packaging Upgrade */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Eyewear Protective Case
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShipping({ ...shipping, caseOption: 'minimalist' })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shipping.caseOption === 'minimalist'
                        ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-slate-900">Origami Collapsible Case</p>
                      <span className="text-[11px] font-bold text-slate-500">Included</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Recycled magnetic triangle fold case that flattens in your pocket.
                    </p>
                  </div>

                  <div
                    onClick={() => setShipping({ ...shipping, caseOption: 'leather' })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shipping.caseOption === 'leather'
                        ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-slate-900">Italian Calfskin Hardcase</p>
                      <span className="text-[11px] font-bold text-sky-700">+$20.00</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Hand-stitched deep navy leather case with embossed Milenwears seal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment & Final Review */}
          {step === 3 && (
            <form onSubmit={handleFinalPayment} className="space-y-5">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Payment & Final Authorization
                </h3>
                <p className="text-xs text-slate-500">
                  All transactions are authenticated via 256-bit tokenized protocols.
                </p>
              </div>

              {/* Fast Digital Pay options simulation */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'apple_pay' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    payment.method === 'apple_pay'
                      ? 'bg-black text-white border-black ring-2 ring-sky-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'google_pay' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    payment.method === 'google_pay'
                      ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-sky-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>Google Pay</span>
                </button>
              </div>

              {/* Credit Card Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-sky-600" /> Credit / Debit Card
                  </span>
                  <div className="flex gap-1 text-[10px] text-slate-400 font-mono">
                    <span>VISA</span> &bull; <span>MC</span> &bull; <span>AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Security Code (CVV)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      placeholder="•••"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={payment.cardName}
                    onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                    placeholder="Julian Sterling"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Order Final Summary Box */}
              <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({shipping.shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {caseUpgradeCost > 0 && (
                  <div className="flex justify-between">
                    <span>Italian Leather Case Upgrade</span>
                    <span>+$20.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-sky-200/60">
                  <span>Total Authorized</span>
                  <span className="text-sky-700 font-extrabold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isProcessing}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Delivery Options</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-sky-300" />
                      <span>Pay ${total.toFixed(2)} & Authorize</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && createdOrder && (
            <div className="space-y-6 text-center sm:text-left">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Order Successfully Authorized
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-800">{createdOrder.shippingDetails.firstName}</strong>. A confirmation and digital certificate of authenticity has been dispatched to <strong>{createdOrder.shippingDetails.email}</strong>.
                </p>
              </div>

              {/* Order Snapshot Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Order Reference</span>
                    <span className="font-mono text-sm font-bold text-slate-900">{createdOrder.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Tracking Code</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-sky-700">
                      <span>{createdOrder.trackingNumber}</span>
                      <button
                        onClick={() => handleCopyTracking(createdOrder.trackingNumber)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="Copy tracking code"
                      >
                        {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Estimated Delivery</span>
                    <span className="font-semibold text-slate-900">{createdOrder.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Items Purchased */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Handcrafted Eyewear Packaged:
                  </span>
                  {createdOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.selectedColorway.image || item.product.images[0]}
                          alt={item.product.name}
                          className="w-8 h-8 object-cover rounded-lg border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{item.product.name}</p>
                          <p className="text-[10px] text-slate-400">{item.selectedColorway.name} &bull; Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Shipping Destination</span>
                    <p className="text-slate-800 font-medium">{createdOrder.shippingDetails.address}, {createdOrder.shippingDetails.city}, {createdOrder.shippingDetails.state} {createdOrder.shippingDetails.postalCode}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Payment Total</span>
                    <p className="text-slate-900 font-bold">${createdOrder.total.toFixed(2)} Paid in Full</p>
                  </div>
                </div>
              </div>

              {/* Actions: Print receipt and Return to store */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>Continue Browsing The Milenwears</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
