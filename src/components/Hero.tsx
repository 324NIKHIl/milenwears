import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Sun, Eye, Award } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onAboutClick: () => void;
  featuredProduct: Product;
  onQuickView: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onAboutClick,
  featuredProduct,
  onQuickView,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Subtle modern geometric background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/70 text-sky-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>THE 2026 HORIZON CAPSULE</span>
              <span className="w-1 h-1 rounded-full bg-sky-400"></span>
              <span className="text-sky-600 font-normal">Italian Acetate & Titanium</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Architectural Clarity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-slate-900">
                Sculpted for Pure Light.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Precision eyewear stripped of excessive branding. Handcrafted from renewable Italian bio-acetate and Japanese aerospace beta-titanium, equipped with 9-layer polarized optics that sharpen contrast without color distortion.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onShopClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-sky-500/20 group cursor-pointer"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-learn-craft-btn"
                onClick={onAboutClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all duration-200 cursor-pointer"
              >
                <span>The Milenwears Atelier</span>
              </button>
            </div>

            {/* Micro Feature Proofs */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/70 text-slate-600">
              <div className="flex items-start gap-2.5">
                <Sun className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">UV400 Polarized</p>
                  <p className="text-[11px] text-slate-500">Zero glare surface</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Lifetime Frame Care</p>
                  <p className="text-[11px] text-slate-500">German barrel hinges</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">30-Day Ocean Trial</p>
                  <p className="text-[11px] text-slate-500">Complimentary returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Eyewear Spotlight Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl shadow-sky-950/5 border border-slate-100 hover:shadow-2xl transition-all duration-300">
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                  Iconic Design
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Edition 01 / 500
                </span>
              </div>

              {/* Product Hero Image */}
              <div className="relative aspect-4/3 w-full bg-gradient-to-b from-sky-50/50 to-white rounded-2xl overflow-hidden mb-5 group">
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Lens Spec Pill */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 shadow-xs flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                  <Eye className="w-3.5 h-3.5 text-sky-600" />
                  <span>Cerulean Polarized Gradient</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {featuredProduct.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-900">${featuredProduct.price}</span>
                    {featuredProduct.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ${featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {featuredProduct.subtitle}
                </p>

                {/* Color swatches preview */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">Shades:</span>
                    {featuredProduct.colorways.map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-white shadow-xs inline-block"
                        style={{ backgroundColor: c.colorHex }}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <button
                    id="hero-quick-view-btn"
                    onClick={() => onQuickView(featuredProduct)}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Quick Specs &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative background glass card */}
            <div className="hidden sm:block absolute -bottom-4 -left-6 bg-slate-900 text-white p-4 rounded-2xl shadow-lg border border-slate-800 max-w-[200px] z-10 animate-bounce-subtle">
              <p className="text-[10px] uppercase font-bold tracking-wider text-sky-400">100% Optical Glass</p>
              <p className="text-xs font-medium text-slate-200 mt-0.5">Zero distortion across peripheral edges</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
