import React, { useState } from 'react';
import { X, ShieldCheck, Scale, MapPin, Truck, CheckCircle2, Lock } from 'lucide-react';
import { ScrapListing } from '../types/scrap';

interface TradeModalProps {
  listing: ScrapListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ listing, isOpen, onClose }) => {
  if (!isOpen || !listing) return null;

  const [bidRatePerKg, setBidRatePerKg] = useState<number>(listing.pricePerKg);
  const [purchaseWeightKg, setPurchaseWeightKg] = useState<number>(listing.quantityKg);
  const [freightOption, setFreightOption] = useState<'FOB' | 'CIF'>('FOB');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const totalBidAmount = Math.round(purchaseWeightKg * bidRatePerKg * 100) / 100;
  const freightEstimate = freightOption === 'CIF' ? Math.round(purchaseWeightKg * 0.08) : 0;
  const finalTotal = totalBidAmount + freightEstimate;

  const handleConfirmTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
              {listing.tradeType} Contract Order
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[360px]">
              {listing.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Trade Offer Successfully Dispatched!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your binding purchase order for <span className="text-white font-mono font-semibold">{purchaseWeightKg.toLocaleString()} kg</span> at <span className="text-emerald-400 font-mono font-semibold">${bidRatePerKg.toFixed(2)}/kg</span> has been placed into Escrow Clearing.
            </p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 text-left space-y-1">
              <div>Contract ID: <span className="text-slate-200">#SCRAP-CLEAR-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div>Seller: <span className="text-slate-200">{listing.sellerName}</span></div>
              <div>Assay Standard: <span className="text-emerald-400">{listing.gradeStandard}</span></div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors cursor-pointer"
            >
              Done & Return to Exchange
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmTrade} className="space-y-4 text-xs">
            
            {/* Lot Summary Snapshot */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{listing.title}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Assay Purity: <span className="text-emerald-400 font-bold">{listing.purityScore}%</span> · {listing.gradeStandard}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span className="truncate">{listing.location}</span>
                </div>
              </div>
            </div>

            {/* Weight to purchase */}
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Lot Volume to Purchase (kg)</span>
                <span className="font-mono text-white font-bold tabular-nums">
                  Max: {listing.quantityKg.toLocaleString()} kg
                </span>
              </div>
              <input
                type="number"
                min="100"
                max={listing.quantityKg}
                step="50"
                value={purchaseWeightKg}
                onChange={(e) => setPurchaseWeightKg(Number(e.target.value))}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Offer Rate */}
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Offer Rate ($/kg)</span>
                <span className="font-mono text-emerald-400 tabular-nums">
                  Seller Asking: ${listing.pricePerKg.toFixed(2)}/kg
                </span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={bidRatePerKg}
                onChange={(e) => setBidRatePerKg(Number(e.target.value))}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Freight Options */}
            <div>
              <label className="block text-slate-400 mb-1">Logistics & Freight Protocol</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFreightOption('FOB')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                    freightOption === 'FOB'
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FOB (Buyer Pickup)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Collect at seller yard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightOption('CIF')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                    freightOption === 'CIF'
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-teal-400" />
                    <span>CIF (Delivered)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Freight insured (+~$0.08/kg)</div>
                </button>
              </div>
            </div>

            {/* Escrow Guarantee Notice */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Funds held in smart escrow until third-party metallurgical spectro-assay confirms purity at weigh-bridge.</span>
            </div>

            {/* Cost breakdown */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Material Cost ({purchaseWeightKg} kg × ${bidRatePerKg.toFixed(2)}):</span>
                <span className="text-white tabular-nums">${totalBidAmount.toLocaleString()}</span>
              </div>
              {freightEstimate > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Logistics & Freight CIF:</span>
                  <span className="text-white tabular-nums">${freightEstimate.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-800">
                <span className="text-white">Total Order Value:</span>
                <span className="text-emerald-400 text-sm tabular-nums">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold shadow-md cursor-pointer transition-colors"
              >
                Place Binding Escrow Bid
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
