import React from 'react';
import { ScrapIndex } from '../types/scrap';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface SpotTickerBarProps {
  indices: ScrapIndex[];
  onSelectIndex?: (index: ScrapIndex) => void;
  lastUpdated?: string;
}

export const SpotTickerBar: React.FC<SpotTickerBarProps> = ({
  indices,
  onSelectIndex,
  lastUpdated = 'Live LME / COMEX Feeds',
}) => {
  return (
    <section aria-label="Commodity Spot Ticker" className="w-full border-b border-slate-800/80 bg-slate-900/60 overflow-hidden text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        {/* Label indicator */}
        <div className="flex items-center gap-2 shrink-0 text-slate-400 font-medium border-r border-slate-800 pr-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-300">SCRAP SPOT</span>
          <span className="hidden xl:inline text-slate-500 font-normal">· {lastUpdated}</span>
        </div>

        {/* Ticker items scroll */}
        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {indices.map((item) => {
            const isPositive = item.change24h >= 0;
            return (
              <button
                key={item.id}
                onClick={() => onSelectIndex && onSelectIndex(item)}
                className="flex items-center gap-2 hover:bg-slate-800/60 px-2 py-1 rounded transition-colors cursor-pointer shrink-0 text-left focus:outline-none"
                title={`${item.benchmark} · Click to evaluate`}
              >
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  ${item.price.toFixed(item.unit === 'MT' ? 0 : 2)}
                  <span className="text-slate-500 font-normal text-[10px]">/{item.unit}</span>
                </span>
                <span
                  className={`flex items-center text-[11px] font-mono font-medium tabular-nums ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? `+${item.change24h}%` : `${item.change24h}%`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status link */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 text-slate-400 text-[11px]">
          <RefreshCw className="w-3 h-3 text-slate-500" />
          <span>Physical Settlement</span>
        </div>
      </div>
    </section>
  );
};
