/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, Colorway, CartItem, Order, BlogPost } from './types';
import { PRODUCTS } from './data/products';
import { BLOG_POSTS } from './data/blog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopSection } from './components/ShopSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { Sparkles, ArrowRight, ShieldCheck, Sun, Check, Star } from 'lucide-react';
import { ProductCard } from './components/ProductCard';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'blog'>('home');
  
  // Persistent Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('milenwears_cart') || localStorage.getItem('azure_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('milenwears_wishlist') || localStorage.getItem('azure_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Promo Code State
  const [discountCode, setDiscountCode] = useState<string>('MILEN15');
  const [discountRate, setDiscountRate] = useState<number>(0.15); // 15% default discount
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('milenwears_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('milenwears_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, colorway: Colorway, quantity: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColorway.name === colorway.name
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedColorway: colorway, quantity }];
    });
    showToast(`Added ${product.name} (${colorway.name}) to Bag`);
  };

  const handleUpdateQuantity = (productId: string, colorwayName: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColorway.name === colorwayName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, colorwayName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColorway.name === colorwayName)
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((id) => id !== product.id);
      }
      showToast(`Saved ${product.name} to Wishlist`);
      return [...prev, product.id];
    });
  };

  // Discount code application
  const handleApplyDiscount = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'MILEN15' || formatted === 'MILENWEARS15' || formatted === 'AZURE15') {
      setDiscountCode('MILEN15');
      setDiscountRate(0.15);
      return { success: true, message: 'Code MILEN15 applied: 15% discount!' };
    }
    if (formatted === 'SUMMER20' || formatted === 'SUMMER') {
      setDiscountCode('SUMMER');
      setDiscountRate(0.20);
      return { success: true, message: 'Code SUMMER applied: 20% discount!' };
    }
    return { success: false, message: 'Invalid promo code. Try MILEN15.' };
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountCode ? cartSubtotal * discountRate : 0;

  const handleOrderSuccess = (order: Order) => {
    // Clear cart once order is confirmed
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-2 h-2 rounded-full bg-sky-400"></div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        setIsWishlistOpen={setIsWishlistOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main App Content Views */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onShopClick={() => {
                const el = document.getElementById('bestsellers-strip');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onAboutClick={() => setActiveTab('about')}
              featuredProduct={PRODUCTS[0]}
              onQuickView={(p) => setModalProduct(p)}
            />

            {/* Bestseller Highlights Strip */}
            <section id="bestsellers-strip" className="py-16 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                      Curated Highlights
                    </span>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 mt-2">
                      Featured Silhouettes
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Our most sought-after frames, precision hand-polished in Italy and Japan.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    <span>View Entire Catalog ({PRODUCTS.length} Silhouettes)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 Spotlight Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setModalProduct(p)}
                      onAddToCart={(p, c) => handleAddToCart(p, c)}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* Technical Craftsmanship Callout */}
            <section className="py-16 bg-gradient-to-b from-slate-50 to-sky-50/50 border-y border-slate-200/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
                      The Precision Architecture
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                      Designed for Light. <br />
                      Engineered for Zero Fatigue.
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every pair of The Milenwears sunglasses passes through 72 individual steps. From our custom 7-barrel hinges to our anti-reflective crystal lenses, we balance weight distribution to eliminate temple pressure points.
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <span className="font-bold text-slate-900 block">Class 3 UV400</span>
                        <span className="text-slate-500 text-[11px]">100% full-spectrum defense</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <span className="font-bold text-slate-900 block">Japanese Titanium</span>
                        <span className="text-slate-500 text-[11px]">Aerospace spring flexibility</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('about')}
                      className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-sky-600 transition-colors shadow-xs"
                    >
                      <span>Read The Atelier Story</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
                    </button>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="aspect-4/3 rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative group">
                      <img
                        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80"
                        alt="Handcrafted The Milenwears Eyewear"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-md text-xs">
                        <p className="font-bold text-slate-900">Hand-Cast Cellulose Acetate</p>
                        <p className="text-[11px] text-slate-500">Mazzucchelli 1849 &bull; Lombardy, Italy</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Journal / Blog Preview */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                      Editorial & Guides
                    </span>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mt-2">
                      From The Milenwears Journal
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('blog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1"
                  >
                    <span>Read All Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {BLOG_POSTS.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setActiveTab('blog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-center"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full sm:w-36 h-28 object-cover rounded-xl border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                          {post.category} &bull; {post.readTime}
                        </span>
                        <h4 className="font-display font-bold text-sm text-slate-900 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SHOP GALLERY */}
        {activeTab === 'shop' && (
          <ShopSection
            products={PRODUCTS}
            onQuickView={(p) => setModalProduct(p)}
            onAddToCart={(p, c) => handleAddToCart(p, c)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* VIEW 3: ABOUT US SECTION */}
        {activeTab === 'about' && <AboutSection />}

        {/* VIEW 4: BLOG / JOURNAL SECTION */}
        {activeTab === 'blog' && <BlogSection posts={BLOG_POSTS} />}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={(product, colorway, qty) => handleAddToCart(product, colorway, qty)}
        isWishlisted={modalProduct ? wishlist.includes(modalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        discountAmount={discountAmount}
        applyDiscount={handleApplyDiscount}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={PRODUCTS}
        onQuickView={(p) => setModalProduct(p)}
        onAddToCart={(p, c) => handleAddToCart(p, c)}
        onRemoveFromWishlist={(id) => {
          setWishlist((prev) => prev.filter((item) => item !== id));
          showToast('Removed from Wishlist');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        blogPosts={BLOG_POSTS}
        onSelectProduct={(p) => setModalProduct(p)}
        onSelectArticle={() => {
          setActiveTab('blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Integrated E-Commerce Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discountAmount={discountAmount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
