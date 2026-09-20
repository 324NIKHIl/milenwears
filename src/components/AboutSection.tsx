import React, { useState } from 'react';
import { Shield, Sparkles, Compass, Eye, Award, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Brand Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold uppercase tracking-widest border border-sky-200">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>The Milenwears Atelier Manifesto</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            We Design for the Space <br className="hidden sm:inline" />
            Between Ocean and Sky.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            The Milenwears was founded on a singular conviction: luxury eyewear should not rely on oversized logos or fragile plastic. We craft architectural silhouettes from renewable organic acetate and aerospace-grade Japanese titanium, paired with polarized lenses that treat light as an instrument of clarity.
          </p>
        </div>

        {/* Interactive Glare vs Polarized Optical Slider */}
        <div className="mb-20 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 border border-slate-200/70">
          <div className="max-w-xl mx-auto text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
              Interactive Optical Simulator
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              See The Milenwears Polarized Difference
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Drag the slider below to compare ordinary sun lenses with our 9-layer anti-reflective polarized optics.
            </p>
          </div>

          {/* Comparative visual canvas */}
          <div className="relative aspect-16/9 sm:aspect-21/9 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-md select-none">
            
            {/* Background Image: With Polarized Clarity & Blue Saturation */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-blue-950 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                alt="Coastal clear sea"
                className="w-full h-full object-cover saturate-125 contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-sky-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold tracking-wide border border-sky-400/40">
                Milenwears 9-Layer Polarized (Glueless)
              </div>
            </div>

            {/* Foreground Image: Unpolarized Glare (Clipped by slider) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-[896px] sm:w-[1024px] max-w-none h-full">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                  alt="Coastal sea with intense reflection"
                  className="w-full h-full object-cover brightness-140 contrast-80 saturate-70"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xs mix-blend-screen" />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium tracking-wide">
                  Standard Unpolarized (Blinding Glare)
                </div>
              </div>
            </div>

            {/* Dividing Line & Handle */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-xl cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-lg flex items-center justify-center text-xs font-bold -ml-4 pointer-events-auto cursor-ew-resize border border-slate-200">
                ⇄
              </div>
            </div>

            {/* Invisible Range Input for touch/mouse interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Compare polarized vs standard lens clarity"
            />
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Notice how our polarized coating cuts surface water reflection, restores natural saturation, and eliminates squinting strain.
          </p>
        </div>

        {/* 3 Pillars of Milenwears Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Mazzucchelli 1849 Bio-Acetate
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Derived from organic renewable cotton seed linters and FSC wood pulp. Cured for 90 days before spending 72 continuous hours in rotating birch wood tumbling barrels with Italian pumice stones for a deep, tactile sheen.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>100% Biodegradable Cellulose Base</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Zero petroleum phthalates or toxic stabilizers</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Sabae Japanese Beta-Titanium
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Forged in Fukui Prefecture, Japan. Beta-titanium contains natural spring memory, allowing the frame arms to gently contour to diverse face profiles without requiring tight pressure on the temporal bones.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Featherweight: starting at 16 grams</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Screwless German-machined micro hinges</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              9-Layer Cerulean Optics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Each lens incorporates a dual-sided oleophobic and hydrophobic nano-seal, sandwiched around optical polarizing crystal. Designed specifically to reduce high-glare ocean light reflections.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Full UV400 UVA & UVB protection</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Diamond scratch-resistant hard coat</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Atelier Commitment Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-400">
              Lifetime Frame Guarantee
            </span>
            <h4 className="font-display text-2xl font-bold">
              We stand behind every hinge, rivet, and bevel.
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If your Milenwears frame ever loosens, misaligns, or suffers hardware failure, our atelier provides complimentary adjustments, screw renewals, and warranty replacements for life.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="font-display text-2xl font-bold text-sky-400 block">30</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Day Ocean Trial</span>
            </div>
            <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="font-display text-2xl font-bold text-sky-400 block">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">UV400 Certified</span>
            </div>
            <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="font-display text-2xl font-bold text-sky-400 block">&infin;</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Hinge Warranty</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
