import React, { useState, useEffect } from 'react';
import { Scale, ArrowRightLeft, Sparkles, Leaf, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ScrapIndex, SwapResult } from '../types/scrap';

interface SwapCalculatorProps {
  indices: ScrapIndex[];
  initialOfferingMaterialId?: string;
  initialOfferingQtyKg?: number;
  onPostBarterOffer?: (result: SwapResult) => void;
}

export const SwapCalculator: React.FC<SwapCalculatorProps> = ({
  indices,
  initialOfferingMaterialId = 'al-extrusion',
  initialOfferingQtyKg = 5000,
  onPostBarterOffer,
}) => {
  const [offeringId, setOfferingId] = useState<string>(initialOfferingMaterialId);
  const [offeringQtyKg, setOfferingQtyKg] = useState<number>(initialOfferingQtyKg);
  const [requestingId, setRequestingId] = useState<string>('cu-millberry');
  const [swapResult, setSwapResult] = useState<SwapResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  // Sync with prop changes if passed
  useEffect(() => {
    if (initialOfferingMaterialId) {
      setOfferingId(initialOfferingMaterialId);
    }
    if (initialOfferingQtyKg) {
      setOfferingQtyKg(initialOfferingQtyKg);
    }
  }, [initialOfferingMaterialId, initialOfferingQtyKg]);

  // Recalculate swap
  useEffect(() => {
    const offerMat = indices.find((i) => i.id === offeringId) || indices[2];
    const reqMat = indices.find((i) => i.id === requestingId) || indices[0];

    const offeringGrossValue = offeringQtyKg * offerMat.price;
    const equivalentTargetQtyKg = Math.round((offeringGrossValue / reqMat.price) * 100) / 100;
    const ratio = Math.round((offerMat.price / reqMat.price) * 1000) / 1000;

    const carbonOffsetCombined = Math.round(
      offeringQtyKg * offerMat.co2OffsetPerUnitKg + equivalentTargetQtyKg * reqMat.co2OffsetPerUnitKg
    );

    setSwapResult({
      offering: {
        material: offerMat.name,
        qtyKg: offeringQtyKg,
        ratePerKg: offerMat.price,
        grossValueUSD: Math.round(offeringGrossValue * 100) / 100,
      },
      requested: {
        material: reqMat.name,
        equivalentQtyKg: equivalentTargetQtyKg,
        ratePerKg: reqMat.price,
        grossValueUSD: Math.round(offeringGrossValue * 100) / 100,
      },
      exchangeRatio: ratio,
      netCashAdjustmentUSD: 0,
      carbonOffsetCombinedKg: carbonOffsetCombined,
    });
  }, [offeringId, offeringQtyKg, requestingId, indices]);

  const handleSwapDirections = () => {
    const prevOffer = offeringId;
    setOfferingId(requestingId);
    setRequestingId(prevOffer);
  };

  return (
    <section id="material-barter" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <ArrowRightLeft className="w-4 h-4" />
            <span>ALGORITHMIC MATERIAL BARTER ENGINE</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Zero-Cash Circular Arbitrage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Exchange Byproducts for Required Raw Scrap
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Manufacturers can trade process scrap directly with other foundries without cash volatility, clearing fees, or currency risk. Real-time commodity index ratios ensure mathematically fair swaps.
          </p>
        </div>

        {/* Swap Interactive Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 lg:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: What You Offer (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white uppercase tracking-wider">You Offer (Surplus Scrap)</span>
                <span className="font-mono text-emerald-400">Selling Position</span>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Select Your Scrap Commodity</label>
                <select
                  value={offeringId}
                  onChange={(e) => setOfferingId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {indices.map((idx) => (
                    <option key={idx.id} value={idx.id}>
                      {idx.name} (${idx.price.toFixed(2)}/{idx.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Lot Volume</span>
                  <span className="font-mono text-white font-bold tabular-nums">
                    {offeringQtyKg.toLocaleString()} kg ({(offeringQtyKg / 1000).toFixed(2)} MT)
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="30000"
                  step="250"
                  value={offeringQtyKg}
                  onChange={(e) => setOfferingQtyKg(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {swapResult && (
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-xs">
                  <span className="text-slate-500">Gross Valuation:</span>
                  <span className="font-mono font-bold text-white text-base tabular-nums">
                    ${swapResult.offering.grossValueUSD.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Middle: Swap Direction Switcher (2 cols) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-2">
              <button
                onClick={handleSwapDirections}
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 flex items-center justify-center transition-all active:scale-95 shadow-lg cursor-pointer"
                title="Switch Offer & Request Direction"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
              {swapResult && (
                <div className="text-[11px] font-mono text-slate-400 text-center tabular-nums">
                  1 kg {swapResult.offering.material.split(' ')[0]} = <br />
                  <span className="text-emerald-400 font-bold">{swapResult.exchangeRatio} kg</span> {swapResult.requested.material.split(' ')[0]}
                </div>
              )}
            </div>

            {/* Right Side: What You Receive (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white uppercase tracking-wider">You Receive (Required Input)</span>
                <span className="font-mono text-teal-400">Direct Delivery</span>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Select Desired Commodity</label>
                <select
                  value={requestingId}
                  onChange={(e) => setRequestingId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-medium text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {indices.map((idx) => (
                    <option key={idx.id} value={idx.id}>
                      {idx.name} (${idx.price.toFixed(2)}/{idx.unit})
                    </option>
                  ))}
                </select>
              </div>

              {swapResult && (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-center">
                  <div className="text-[11px] text-slate-400">Equivalent Yield Lot</div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums my-1">
                    {swapResult.requested.equivalentQtyKg.toLocaleString()} kg
                  </div>
                  <div className="text-xs font-mono text-slate-400 tabular-nums">
                    ({(swapResult.requested.equivalentQtyKg / 1000).toFixed(2)} Metric Tons)
                  </div>
                </div>
              )}

              {swapResult && (
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-xs">
                  <span className="text-slate-500">Target Value:</span>
                  <span className="font-mono font-bold text-white text-base tabular-nums">
                    ${swapResult.requested.grossValueUSD.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Bar: Carbon Savings & Barter Posting Button */}
          {swapResult && (
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>Direct Swaps Eliminate Intermediary Remelting</span>
                    <span className="text-teal-400 font-mono font-bold tabular-nums">
                      -{(swapResult.carbonOffsetCombinedKg / 1000).toFixed(1)} MT CO₂
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Verified green circular routing certificate generated automatically.
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onPostBarterOffer) onPostBarterOffer(swapResult);
                  setIsSuccessModal(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Publish Barter Exchange Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Modal for confirmed barter submission */}
        {isSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white">Barter Match Order Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your offer to exchange <span className="font-semibold text-white font-mono">{offeringQtyKg} kg of {indices.find(i=>i.id===offeringId)?.name}</span> for <span className="font-semibold text-emerald-400 font-mono">{swapResult?.requested.equivalentQtyKg} kg of {indices.find(i=>i.id===requestingId)?.name}</span> has been broadcast to verified circular industrial partners.
              </p>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 text-left">
                <div>Escrow Contract: <span className="text-slate-200">#SCRAP-BARTER-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div>Clearing Standard: <span className="text-emerald-400">ISRI Fair-Value Ratio</span></div>
              </div>

              <button
                onClick={() => setIsSuccessModal(false)}
                className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                Close & View Active Matches
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
