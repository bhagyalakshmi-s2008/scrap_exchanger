import React from 'react';
import { Scale, ShieldCheck, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Scrap<span className="text-emerald-400">IQ</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-driven scrap material grading, spot commodities pricing, and verified circular exchange infrastructure for global industrial recyclers.
            </p>
          </div>

          {/* Standards & Specs */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">
              Circularity Standards
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>ISRI Scrap Specifications Circular</li>
              <li>Bureau of International Recycling (BIR)</li>
              <li>LME Secondary Non-Ferrous Rules</li>
              <li>Basel Convention Transboundary Compliance</li>
            </ul>
          </div>

          {/* Commodities */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">
              Traded Scrap Classes
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Electrolytic Millberry Copper</li>
              <li>Architectural 6061 Aluminum Profiles</li>
              <li>High-Yield E-Waste Server Boards</li>
              <li>EV Battery Black Mass (NMC/LFP)</li>
            </ul>
          </div>

          {/* Decarbonization */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">
              ESG Compliance
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Scope 3 Avoided Emissions Ledger</li>
              <li>GHG Protocol Corporate Standard</li>
              <li>Chain-of-Custody Digital Certificates</li>
              <li>Certified Weighbridge Settlement</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} ScrapIQ Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500/80 font-mono">ISRI Member Facility Certified</span>
            <span>·</span>
            <span>Terms of Trade</span>
            <span>·</span>
            <span>Physical Delivery Escrow</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
