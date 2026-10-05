import React, { useState } from 'react';
import { X, Sparkles, Upload, Scale, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ScrapCategory, ScrapListing } from '../types/scrap';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (newListing: ScrapListing) => void;
  prefillData?: Partial<ScrapListing>;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
  prefillData,
}) => {
  const [title, setTitle] = useState(prefillData?.title || 'Industrial Copper Scrap Lot');
  const [category, setCategory] = useState<ScrapCategory>(prefillData?.category || 'Non-Ferrous Metals');
  const [gradeStandard, setGradeStandard] = useState(prefillData?.gradeStandard || 'ISRI: BERRY Bare Bright');
  const [purityScore, setPurityScore] = useState(prefillData?.purityScore || 99.2);
  const [quantityKg, setQuantityKg] = useState(prefillData?.quantityKg || 5000);
  const [pricePerKg, setPricePerKg] = useState(prefillData?.pricePerKg || 9.35);
  const [location, setLocation] = useState(prefillData?.location || 'Rotterdam Industrial Terminal, NL');
  const [sellerName, setSellerName] = useState('Apex Circular Operations BV');
  const [tradeType, setTradeType] = useState<'Direct Sale' | 'Material Barter' | 'Urgent Liquidation'>('Direct Sale');
  const [notes, setNotes] = useState(prefillData?.notes || 'Clean scrap, palletized and ready for freight pickup.');
  const [imageUrl, setImageUrl] = useState(prefillData?.imageUrl || '/src/assets/images/scrap_copper_bright_1791195183434.jpg');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedQty = quantityKg >= 1000 ? `${(quantityKg / 1000).toFixed(1)} MT` : `${quantityKg} kg`;
    const carbonSaved = Math.round(quantityKg * 4.4);

    const newLot: ScrapListing = {
      id: `lot-custom-${Date.now()}`,
      title,
      category,
      gradeStandard,
      purityScore,
      quantityKg,
      quantityFormatted: formattedQty,
      pricePerKg,
      totalPriceUSD: Math.round(quantityKg * pricePerKg),
      location,
      sellerName,
      sellerRating: 5.0,
      sellerTradesCount: 1,
      verifiedCertification: true,
      tradeType,
      imageUrl,
      datePosted: 'Just now',
      carbonSavedKg: carbonSaved,
      notes,
    };

    onAddListing(newLot);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">List Industrial Scrap Lot</h3>
            <p className="text-xs text-slate-400">Post verified materials to global smelters and recycling foundries.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Scrap Lot Successfully Listed!</h4>
            <p className="text-xs text-slate-400">Broadcasting assay specifications to verified circular counterparties...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Lot Headline / Material Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Scrap Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Non-Ferrous Metals">Non-Ferrous Metals</option>
                  <option value="Ferrous & Alloys">Ferrous & Alloys</option>
                  <option value="High-Tech E-Waste">High-Tech E-Waste</option>
                  <option value="Battery & Energy">Battery & Energy</option>
                  <option value="Industrial Polymers">Industrial Polymers</option>
                </select>
              </div>
            </div>

            {/* Grade Standard & Purity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">ISRI / Metallurgical Standard</label>
                <input
                  type="text"
                  required
                  value={gradeStandard}
                  onChange={(e) => setGradeStandard(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Estimated Purity Assay (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="50"
                  max="100"
                  value={purityScore}
                  onChange={(e) => setPurityScore(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Total Weight (kg)</label>
                <input
                  type="number"
                  step="50"
                  min="50"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Asking Rate ($/kg)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Trading Mode & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Trading Method</label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value as any)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Direct Sale">Direct Sale (Cash Settlement)</option>
                  <option value="Material Barter">Material Barter (Scrap Swap)</option>
                  <option value="Urgent Liquidation">Urgent Liquidation (Immediate Dispatch)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Terminal / Yard Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-slate-400 mb-1">Packing & Metallurgical Condition</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Summary preview */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Lot Valuation:</span>
              <span className="font-mono text-emerald-400 font-bold text-base tabular-nums">
                ${(quantityKg * pricePerKg).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Submit */}
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
                Publish Lot to Exchange
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
