import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { Product, BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  blogPosts: BlogPost[];
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (post: BlogPost) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  blogPosts,
  onSelectProduct,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  const matchingProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery) ||
          p.frameMaterial.toLowerCase().includes(trimmedQuery) ||
          p.lensColor.toLowerCase().includes(trimmedQuery) ||
          p.description.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const matchingPosts = trimmedQuery
    ? blogPosts.filter(
        (b) =>
          b.title.toLowerCase().includes(trimmedQuery) ||
          b.excerpt.toLowerCase().includes(trimmedQuery) ||
          b.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const quickTags = ['Polarized', 'Aviator', 'Square', 'Titanium', 'Face Shape Guide', 'Bio-Acetate'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        id="global-search-modal"
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sunglasses by frame, material, category or optics..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Popular:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-sky-700 hover:border-sky-300 text-xs transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-6">
          {trimmedQuery ? (
            <>
              {/* Product Matches */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <span>Eyewear Silhouettes ({matchingProducts.length})</span>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="space-y-2">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {p.category} &bull; {p.frameMaterial.split(' ')[0]} {p.polarized && '&bull; Polarized'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">${p.price}</span>
                          <span className="block text-[10px] text-sky-600 font-semibold group-hover:underline">
                            View Specs &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">
                    No frames found for &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>

              {/* Journal Article Matches */}
              {matchingPosts.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Journal Articles ({matchingPosts.length})</span>
                  </div>

                  <div className="space-y-2">
                    {matchingPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          onSelectArticle(post);
                          onClose();
                        }}
                        className="p-3 rounded-2xl hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Idle Suggestions */
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Featured Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/70 hover:border-sky-200 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-500">${p.price} &bull; {p.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <span>Search sunglasses, lens types, and journal guides</span>
          <span>&bull;</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
