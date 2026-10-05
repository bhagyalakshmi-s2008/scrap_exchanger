import React, { useState } from 'react';
import { Leaf, Award, Download, CheckCircle, ShieldCheck, Factory, FileText, Printer } from 'lucide-react';

export const EsgCarbonDashboard: React.FC = () => {
  const [tradedTons, setTradedTons] = useState<number>(4820);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('Apex Secondary Metallurgy Corp');

  // Multiplier formulas: 1 MT secondary scrap saves ~3.8 MT CO2 on average blend, 1.4 MWh energy
  const netCo2AvoidedMT = Math.round(tradedTons * 3.82);
  const energySavedMWh = Math.round(tradedTons * 1.45);
  const landfillDivertedMT = tradedTons;
  const virginOrePreservedMT = Math.round(tradedTons * 5.4);

  return (
    <section id="esg-impact" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <Leaf className="w-4 h-4" />
              <span>ESG & SCOPE 3 CARBON OFFSET PROTOCOL</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">GHG Protocol Certified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Circular Economy Carbon Ledger
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Secondary scrap recycling cuts up to 95% of the energy consumed by virgin bauxite and copper ore mining. Generate auditable ESG certificates for your corporate sustainability reports.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <Award className="w-4 h-4" />
            Generate ESG Certificate
          </button>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>CO₂e Avoided</span>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-emerald-400 tabular-nums">
              {netCo2AvoidedMT.toLocaleString()} <span className="text-sm font-normal text-slate-400">MT</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Equivalent to taking ~4,100 combustion vehicles off the road.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Clean Energy Conserved</span>
              <Factory className="w-4 h-4 text-teal-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-teal-400 tabular-nums">
              {energySavedMWh.toLocaleString()} <span className="text-sm font-normal text-slate-400">MWh</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Saved vs Hall-Héroult bauxite & reverberatory copper furnaces.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Virgin Ore Preserved</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-amber-400 tabular-nums">
              {virginOrePreservedMT.toLocaleString()} <span className="text-sm font-normal text-slate-400">MT</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Prevents open-pit strip mining and tailing pond runoff.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Landfill Diversion Rate</span>
              <CheckCircle className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-blue-400 tabular-nums">
              99.6%
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Zero hazardous scrap residue routed to uncontrolled burial.
            </div>
          </div>

        </div>

        {/* Interactive Simulation Slider */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                Simulate Your Facility's Annual Scrap Circularization
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust your scrap tonnage to inspect verifiable corporate Scope 3 ESG emissions reduction.
              </p>
            </div>

            <div className="font-mono text-emerald-400 font-bold text-sm bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 tabular-nums">
              Current Volume: {tradedTons.toLocaleString()} Metric Tons
            </div>
          </div>

          <input
            type="range"
            min="100"
            max="25000"
            step="100"
            value={tradedTons}
            onChange={(e) => setTradedTons(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 tabular-nums">
            <span>100 MT</span>
            <span>5,000 MT</span>
            <span>12,500 MT</span>
            <span>25,000 MT</span>
          </div>
        </div>

        {/* ESG Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-base font-bold text-white">ESG Circular Economy Certificate</span>
                </div>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded border border-slate-800 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Certificate Canvas Mockup */}
              <div className="p-6 rounded-xl bg-slate-950 border-2 border-emerald-500/40 text-center space-y-4 font-sans relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
                  VERIFIED CIRCULAR ASSET CERTIFICATE
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  Certificate of Industrial Decarbonization
                </h3>

                <p className="text-xs text-slate-400">
                  This certifies that scrap lots transacted through the ScrapIQ Clearing Network by
                </p>

                <div className="text-base font-extrabold text-emerald-300 font-mono">
                  {companyName}
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800 font-mono text-left text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Certified Net CO₂e Avoided</div>
                    <div className="text-emerald-400 font-bold tabular-nums">
                      {netCo2AvoidedMT.toLocaleString()} Metric Tons
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Certified Material Diverted</div>
                    <div className="text-white font-bold tabular-nums">
                      {tradedTons.toLocaleString()} MT Scrap
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Standard: GHG Protocol / ISO 14064</span>
                  <span>Hash: 0x{Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Facility or Company Name"
                  className="flex-1 py-2 px-3 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />

                <button
                  onClick={() => window.print()}
                  className="py-2 px-4 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
