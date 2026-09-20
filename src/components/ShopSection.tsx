import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, X, ArrowUpDown, Check } from 'lucide-react';
import { Product, Colorway, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ShopSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, colorway: Colorway) => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  initialSearch?: string;
}

const CATEGORIES: Category[] = ['All', 'Aviator', 'Square', 'Round', 'Cat-Eye', 'Geometric', 'Shield'];

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  initialSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [polarizedOnly, setPolarizedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Polarized filter
        if (polarizedOnly && !p.polarized) {
          return false;
        }
        // Max Price
        if (p.price > maxPrice) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSubtitle = p.subtitle.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchMaterial = p.frameMaterial.toLowerCase().includes(q);
          const matchLens = p.lensColor.toLowerCase().includes(q);
          return matchName || matchSubtitle || matchCategory || matchMaterial || matchLens;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured: bestsellers and new first
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }, [products, selectedCategory, polarizedOnly, sortBy, maxPrice, searchQuery]);

  const hasActiveFilters = selectedCategory !== 'All' || polarizedOnly || maxPrice < 300 || searchQuery.trim() !== '';

  const clearFilters = () => {
    setSelectedCategory('All');
    setPolarizedOnly(false);
    setMaxPrice(300);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="shop-section" className="py-12 sm:py-16 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-sky-100">
            <span>The Permanent Collection</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Clean Geometry. Uncompromising Optics.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Each silhouette is balanced for comfort and weight distribution, featuring medical-grade titanium and bio-acetate with custom blue-toned polarizing filters.
          </p>
        </div>

        {/* Controls & Filter Bar */}
        <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 mb-8 space-y-4">
          
          {/* Top row: Search input & quick toggles */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Embedded Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="shop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by silhouette, material, or lens color..."
                className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right side controls: Polarized toggle, Sort, Max Price */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Polarized Only Pill */}
              <button
                id="toggle-polarized-filter"
                onClick={() => setPolarizedOnly(!polarizedOnly)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  polarizedOnly
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                {polarizedOnly && <Check className="w-3.5 h-3.5" />}
                <span>Polarized Only</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Sort:</span>
                <select
                  id="sort-products-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-2"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Reset filter button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}

            </div>
          </div>

          {/* Bottom row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0 uppercase tracking-wider text-[11px]">
              Silhouettes:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Displaying <strong className="text-slate-900">{filteredProducts.length}</strong> handcrafted models
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          {hasActiveFilters && (
            <span className="text-sky-700 font-medium">
              Filtered results
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={(prod, colorway) => onAddToCart(prod, colorway)}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
              No sunglasses matched your criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
              Try modifying your search keywords or resetting active category and polarized filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-600 transition-colors shadow-xs"
            >
              Show All Frames
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
