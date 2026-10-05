import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Scale, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onOpenInspector: () => void;
  onExploreMarketplace: () => void;
  onOpenListingModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInspector,
  onExploreMarketplace,
  onOpenListingModal,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Meta indicator - Zero pill discipline (unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Circular Economy Commodities Network</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">Gemini Metallurgical Vision 3.8</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">ISRI Standard Clearing</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] [text-wrap:balance]">
              AI-Powered Scrap Exchange & Metallurgical Grading
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Instantly grade scrap metal, e-waste, and industrial polymers using computer vision. Trade directly with verified smelters, exchange byproducts via smart barter, and mint ESG carbon offset certificates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenInspector}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                Analyze Scrap with AI
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMarketplace}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Browse Scrap Lots (142 MT)
              </button>

              <button
                onClick={onOpenListingModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                List Industrial Yard Lot →
              </button>
            </div>

            {/* Adjacency Proof Metrics */}
            <div className="pt-6 border-t border-slate-800/70 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                  $18.4M
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Circular Lots Cleared
                </div>
              </div>

              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
                  99.2%
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  AI Assay Accuracy
                </div>
              </div>

              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-teal-400 tabular-nums">
                  48,200 MT
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  CO₂e Emissions Saved
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/hero_scrap_exchanger_1791195166183.jpg"
                alt="Automated circular metal reclamation facility"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Live Overlay Inspection Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-Time Optical Assay</span>
                  </div>
                  <span className="font-mono tabular-nums text-slate-300">Target: Copper & Al Billets</span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Grade 1 Millberry Coil</div>
                    <div className="text-xs text-slate-400 font-mono tabular-nums">
                      Purity 99.4% · ISRI BERRY Standard
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      $9.38 / kg
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Smelter Match: 14 Bidders
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Verification Marker */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-slate-700 shadow-lg text-xs font-medium text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISRI & BIR Verified Clearing</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
