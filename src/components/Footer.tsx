import React, { useState } from 'react';
import { Shield, Sparkles, Mail, Check, ArrowRight, Sun, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'shop' | 'about' | 'blog') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      
      {/* Newsletter Banner Strip */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                The Milenwears Circle
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Receive private access to limited capsule releases.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                Subscribers receive invitation-only previews of seasonal batch runs and technical optical essays. No promotional spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-sky-950/80 border border-sky-600/50 flex items-center gap-3 text-sky-200 text-sm">
                  <Check className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Welcome to The Milenwears Circle. Your invitation code <strong>MILEN15</strong> has been verified for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Join Atelier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4 pr-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-[0.16em] text-white uppercase">
                THE MILENWEARS
              </span>
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Architectural sunglasses engineered for pure horizon light. Handcrafted with Italian bio-acetate from Lombardy, Japanese beta-titanium from Sabae, and polarized optics that protect visual acuity.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>Studio & Design: Via Montenapoleone, Milan</p>
              <p>Titanium Optics Laboratory: Sabae, Fukui, Japan</p>
            </div>
          </div>

          {/* Column: Eyewear Collections */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Silhouettes
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition-colors">
                  The Riviera Aviator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition-colors">
                  Monaco Square Acetate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition-colors">
                  Capri Minimalist Round
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition-colors">
                  Saint-Tropez Cat-Eye
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-sky-400 transition-colors">
                  Biarritz Coastal Shield
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Craft & Knowledge */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Atelier & Lens
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-sky-400 transition-colors">
                  The Milenwears Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-sky-400 transition-colors">
                  Polarized Optical Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-sky-400 transition-colors">
                  Face Shape Fit Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-sky-400 transition-colors">
                  Eyewear Care Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-sky-400 transition-colors">
                  Materials: Bio-Acetate
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Client Care */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Client Care
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="hover:text-sky-400 transition-colors cursor-pointer">
                  30-Day Ocean Trial
                </span>
              </li>
              <li>
                <span className="hover:text-sky-400 transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-sky-400 transition-colors cursor-pointer">
                  Lifetime Hinge Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-sky-400 transition-colors cursor-pointer">
                  Optical Prescription Inquiries
                </span>
              </li>
              <li>
                <span className="hover:text-sky-400 transition-colors cursor-pointer">
                  help@milenwears.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & micro info */}
        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} The Milenwears Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>UV400 Optical Compliance</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
