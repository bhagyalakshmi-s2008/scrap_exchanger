import React from 'react';
import { Plus, Sparkles, Scale, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenListingModal: () => void;
  onJumpToAiInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenListingModal,
  onJumpToAiInspector,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={() => onSelectTab('marketplace')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <Scale className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            Scrap<span className="text-emerald-400 font-extrabold">IQ</span>
          </span>
        </button>

        {/* Zone 2: Clean text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('marketplace')}
            className={`transition-colors cursor-pointer pb-0.5 border-b-2 ${
              activeTab === 'marketplace'
                ? 'text-emerald-400 border-emerald-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onSelectTab('inspector')}
            className={`transition-colors cursor-pointer pb-0.5 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'inspector'
                ? 'text-emerald-400 border-emerald-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            AI Vision Inspector
          </button>
          <button
            onClick={() => onSelectTab('barter')}
            className={`transition-colors cursor-pointer pb-0.5 border-b-2 ${
              activeTab === 'barter'
                ? 'text-emerald-400 border-emerald-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Material Barter
          </button>
          <button
            onClick={() => onSelectTab('ticker')}
            className={`transition-colors cursor-pointer pb-0.5 border-b-2 ${
              activeTab === 'ticker'
                ? 'text-emerald-400 border-emerald-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Spot Ticker
          </button>
          <button
            onClick={() => onSelectTab('esg')}
            className={`transition-colors cursor-pointer pb-0.5 border-b-2 ${
              activeTab === 'esg'
                ? 'text-emerald-400 border-emerald-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            ESG Impact
          </button>
        </nav>

        {/* Zone 3: Primary action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onJumpToAiInspector}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Instant Valuation
          </button>

          <button
            onClick={onOpenListingModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            List Scrap Lot
          </button>
        </div>
      </div>
    </header>
  );
};
