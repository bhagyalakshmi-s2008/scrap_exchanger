import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Scale,
  Sparkles,
  MapPin,
  Leaf,
  ArrowUpDown,
  CheckCircle,
} from 'lucide-react';
import { ScrapListing, ScrapCategory, TradeMode } from '../types/scrap';

interface ScrapMarketplaceProps {
  listings: ScrapListing[];
  onOpenTradeModal: (listing: ScrapListing) => void;
  onOpenSwapWithListing: (listing: ScrapListing) => void;
}

const CATEGORIES: ScrapCategory[] = [
  'All',
  'Non-Ferrous Metals',
  'Ferrous & Alloys',
  'High-Tech E-Waste',
  'Battery & Energy',
  'Industrial Polymers',
];

const TRADE_MODES: TradeMode[] = [
  'All',
  'Direct Sale',
  'Material Barter',
  'Urgent Liquidation',
];

export const ScrapMarketplace: React.FC<ScrapMarketplaceProps> = ({
  listings,
  onOpenTradeModal,
  onOpenSwapWithListing,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ScrapCategory>('All');
  const [selectedTradeMode, setSelectedTradeMode] = useState<TradeMode>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'priceAsc' | 'priceDesc' | 'purity' | 'quantity'>('newest');

  // Filter & sort logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesTrade = selectedTradeMode === 'All' || item.tradeType === selectedTradeMode;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.gradeStandard.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.sellerName.toLowerCase().includes(q);

        return matchesCategory && matchesTrade && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.pricePerKg - b.pricePerKg;
        if (sortBy === 'priceDesc') return b.pricePerKg - a.pricePerKg;
        if (sortBy === 'purity') return b.purityScore - a.purityScore;
        if (sortBy === 'quantity') return b.quantityKg - a.quantityKg;
        return 0; // default order
      });
  }, [listings, selectedCategory, selectedTradeMode, searchQuery, sortBy]);

  return (
    <section id="marketplace" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <Scale className="w-4 h-4" />
              <span>CIRCULAR COMMODITIES BOARD</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Verified Industrial Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scrap Material Exchange Directory
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Live industrial scrap lots with certified assay reports, transparent spot indices, and instant freight routing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search copper, PCB, Rotterdam..."
                className="pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors w-56 sm:w-64"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 rounded-lg">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort listings by"
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-slate-900">Newest Lots</option>
                <option value="priceAsc" className="bg-slate-900">Price: Low to High</option>
                <option value="priceDesc" className="bg-slate-900">Price: High to Low</option>
                <option value="purity" className="bg-slate-900">Highest Purity Assay</option>
                <option value="quantity" className="bg-slate-900">Largest Volume (MT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tabs - Interactive Button Segment Controls (Compliant with Zero-Pill rule) */}
        <div className="space-y-3 mb-8">
          
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-slate-950 font-bold'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Trade Type Filter Tabs */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium shrink-0">Trading Method:</span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {TRADE_MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedTradeMode(mode)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    selectedTradeMode === mode
                      ? 'bg-slate-800 text-emerald-400 font-semibold border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden flex flex-col group hover:border-slate-700 transition-all hover:shadow-xl shadow-black/40"
              >
                {/* Photo & Image Container */}
                <div className="relative aspect-16/10 bg-slate-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Trade Mode Tag (Single clean affordance) */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                    {item.tradeType}
                  </div>

                  {/* Quantity Indicator */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-sm tabular-nums">
                    {item.quantityFormatted}
                  </div>

                  {/* Carbon Offset badge */}
                  <div className="absolute bottom-2.5 right-2.5 text-[11px] font-mono text-teal-300 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm tabular-nums">
                    <Leaf className="w-3 h-3 text-teal-400" />
                    <span>-{(item.carbonSavedKg / 1000).toFixed(1)} MT CO₂</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Title and Unboxed Metadata */}
                  <div>
                    {/* Unboxed metadata row - Zero Pill Rule */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1">
                      <span>{item.category}</span>
                      <span className="text-slate-600" aria-hidden="true">·</span>
                      <span className="font-mono text-emerald-400">{item.purityScore}% Pure</span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      {item.gradeStandard}
                    </div>
                  </div>

                  {/* Price & Location Details */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    
                    {/* Pricing */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-400">Rate: </span>
                        <span className="font-mono font-bold text-white text-base tabular-nums">
                          ${item.pricePerKg.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-slate-500">/kg</span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                          ${item.totalPriceUSD.toLocaleString()}
                        </span>
                        <div className="text-[10px] text-slate-500">Total Lot Est.</div>
                      </div>
                    </div>

                    {/* Location & Seller */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <div className="flex items-center gap-1 truncate max-w-[170px]" title={item.location}>
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-300 shrink-0 font-medium">
                        <span>★ {item.sellerRating.toFixed(2)}</span>
                        {item.verifiedCertification && (
                          <span title="ISRI Certified Recycler">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => onOpenTradeModal(item)}
                      className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-sm cursor-pointer"
                    >
                      Make Offer / Buy
                    </button>

                    <button
                      onClick={() => onOpenSwapWithListing(item)}
                      className="py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Propose Material Barter"
                    >
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Barter</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-slate-800 rounded-xl bg-slate-900/40 p-8">
            <Scale className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No scrap lots matched your criteria</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, trade mode, or material category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTradeMode('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 border border-slate-700 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
