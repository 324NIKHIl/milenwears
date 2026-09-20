import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, Shield, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'shop' | 'about' | 'blog';
  setActiveTab: (tab: 'home' | 'shop' | 'about' | 'blog') => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistCount: number;
  setIsWishlistOpen: (open: boolean) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  wishlistCount,
  setIsWishlistOpen,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: 'home' | 'shop' | 'about' | 'blog') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro-bar: Minimal announcements */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-blue-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="font-medium text-white tracking-wide">SUMMER RELEASE:</span>
            <span className="hidden sm:inline text-slate-400">Complimentary global express shipping on all handcrafted frames</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hidden md:flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-sky-400" /> Lifetime Hinge Warranty
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-sky-300 font-medium tracking-wider">CODE: MILEN15 (15% OFF)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Navigation links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                id="nav-link-home"
                onClick={() => handleNavClick('home')}
                className={`text-sm font-medium tracking-wide transition-colors py-2 relative ${
                  activeTab === 'home'
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Home
                {activeTab === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full"></span>
                )}
              </button>

              <button
                id="nav-link-shop"
                onClick={() => handleNavClick('shop')}
                className={`text-sm font-medium tracking-wide transition-colors py-2 relative flex items-center gap-1.5 ${
                  activeTab === 'shop'
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Shop Gallery
                <span className="text-[10px] uppercase font-bold tracking-widest bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-sm border border-sky-100">
                  New
                </span>
                {activeTab === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full"></span>
                )}
              </button>

              <button
                id="nav-link-about"
                onClick={() => handleNavClick('about')}
                className={`text-sm font-medium tracking-wide transition-colors py-2 relative ${
                  activeTab === 'about'
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                About Us
                {activeTab === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full"></span>
                )}
              </button>

              <button
                id="nav-link-blog"
                onClick={() => handleNavClick('blog')}
                className={`text-sm font-medium tracking-wide transition-colors py-2 relative ${
                  activeTab === 'blog'
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Journal & Care
                {activeTab === 'blog' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full"></span>
                )}
              </button>
            </nav>

            {/* Mobile menu trigger */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center: Brand Mark */}
            <div className="flex-1 md:flex-initial text-center md:text-left">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('home')}
                className="inline-flex flex-col items-center group cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.16em] text-slate-900 group-hover:text-sky-600 transition-colors uppercase">
                    THE MILENWEARS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sky-500 transform group-hover:scale-125 transition-transform"></span>
                </div>
                <span className="text-[9px] tracking-[0.35em] uppercase text-slate-400 font-medium">
                  Optics &bull; Atelier
                </span>
              </button>
            </div>

            {/* Right: Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Quick Search Button */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                className="flex items-center gap-2 text-slate-600 hover:text-sky-600 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-all text-xs font-medium"
                title="Search sunglasses and journal (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-slate-500 group-hover:text-sky-600" />
                <span className="hidden lg:inline text-slate-500">Search frames...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-400 rounded border border-slate-200">
                  /
                </kbd>
              </button>

              {/* Wishlist Button */}
              <button
                id="header-wishlist-btn"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-slate-600 hover:text-rose-500 rounded-full hover:bg-rose-50/60 transition-colors"
                title="View Saved Frames"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart / Bag Button */}
              <button
                id="header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-slate-900 hover:bg-sky-600 text-white px-3 sm:px-4 py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-sky-200" />
                <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
                <span className="bg-sky-500 text-white text-xs font-bold px-1.5 py-0.2 rounded-full min-w-[1.25rem] text-center">
                  {totalCartItems}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu slide down */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'home' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${
                activeTab === 'shop' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Shop Collection</span>
              <span className="text-xs bg-sky-100 text-sky-700 font-medium px-2 py-0.5 rounded">All Frames</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'about' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About The Milenwears Atelier
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'blog' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Journal & Lens Science
            </button>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-900"
              >
                <Search className="w-4 h-4" />
                <span>Search catalog & journal</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
