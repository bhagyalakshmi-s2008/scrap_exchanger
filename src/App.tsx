import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SpotTickerBar } from './components/SpotTickerBar';
import { HeroSection } from './components/HeroSection';
import { AiVisionInspector } from './components/AiVisionInspector';
import { ScrapMarketplace } from './components/ScrapMarketplace';
import { SwapCalculator } from './components/SwapCalculator';
import { EsgCarbonDashboard } from './components/EsgCarbonDashboard';
import { ListingModal } from './components/ListingModal';
import { TradeModal } from './components/TradeModal';
import { Footer } from './components/Footer';
import { INITIAL_SCRAP_INDICES, INITIAL_SCRAP_LISTINGS } from './data/mockScrapData';
import { ScrapListing, ScrapIndex, AiGradingReport, SwapResult } from './types/scrap';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [indices, setIndices] = useState<ScrapIndex[]>(INITIAL_SCRAP_INDICES);
  const [listings, setListings] = useState<ScrapListing[]>(INITIAL_SCRAP_LISTINGS);

  // Modals state
  const [isListingModalOpen, setIsListingModalOpen] = useState<boolean>(false);
  const [listingPrefill, setListingPrefill] = useState<Partial<ScrapListing> | undefined>(undefined);
  const [selectedTradeListing, setSelectedTradeListing] = useState<ScrapListing | null>(null);

  // Barter prefill state
  const [barterOfferingMatId, setBarterOfferingMatId] = useState<string>('al-extrusion');
  const [barterOfferingQty, setBarterOfferingQty] = useState<number>(5000);

  // Load latest spot prices if available
  useEffect(() => {
    fetch('/api/scrap-market-prices')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data.indices && Array.isArray(data.indices)) {
          setIndices(data.indices);
        }
      })
      .catch((err) => {
        // Safe fallback already in state
        console.log('Using baseline spot indices:', err?.message);
      });
  }, []);

  // Handler: From AI Inspector -> List to Marketplace
  const handleListGradedLot = (report: AiGradingReport, image: string, weightKg: number) => {
    setListingPrefill({
      title: report.materialName,
      category: report.primaryCategory as any,
      gradeStandard: report.gradeStandard,
      purityScore: report.estimatedPurityPercentage,
      quantityKg: weightKg,
      pricePerKg: report.spotPricePerKg,
      imageUrl: image,
      notes: `${report.aiInspectionNotes} Recommended route: ${report.processingRecommendation}`,
    });
    setIsListingModalOpen(true);
  };

  // Handler: From AI Inspector -> Barter
  const handleInitiateSwapWithGradedLot = (report: AiGradingReport, weightKg: number) => {
    const matchedIdx = indices.find(
      (i) => i.name.toLowerCase().includes(report.materialName.split(' ')[0].toLowerCase())
    ) || indices[0];

    setBarterOfferingMatId(matchedIdx.id);
    setBarterOfferingQty(weightKg);
    setActiveTab('barter');

    // Scroll to barter section smoothly
    const elem = document.getElementById('material-barter');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler: From Marketplace -> Barter
  const handleOpenSwapWithListing = (listing: ScrapListing) => {
    const matchedIdx = indices.find(
      (i) => i.name.toLowerCase().includes(listing.title.split(' ')[0].toLowerCase())
    ) || indices[2];

    setBarterOfferingMatId(matchedIdx.id);
    setBarterOfferingQty(listing.quantityKg);
    setActiveTab('barter');

    const elem = document.getElementById('material-barter');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler: Add new listing
  const handleAddListing = (newListing: ScrapListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  // Handler: Barter post offer creates a barter listing in marketplace
  const handlePostBarterOffer = (result: SwapResult) => {
    const newBarterLot: ScrapListing = {
      id: `lot-barter-${Date.now()}`,
      title: `${result.offering.qtyKg.toLocaleString()}kg ${result.offering.material} (Seeking ${result.requested.material})`,
      category: 'Non-Ferrous Metals',
      gradeStandard: 'ISRI Barter Spec',
      purityScore: 98.5,
      quantityKg: result.offering.qtyKg,
      quantityFormatted: result.offering.qtyKg >= 1000 ? `${(result.offering.qtyKg / 1000).toFixed(1)} MT` : `${result.offering.qtyKg} kg`,
      pricePerKg: result.offering.ratePerKg,
      totalPriceUSD: result.offering.grossValueUSD,
      location: 'Rotterdam Circular Exchange Port, NL',
      sellerName: 'Direct Barter Partner',
      sellerRating: 4.95,
      sellerTradesCount: 34,
      verifiedCertification: true,
      tradeType: 'Material Barter',
      imageUrl: '/src/assets/images/hero_scrap_exchanger_1791195166183.jpg',
      datePosted: 'Just now',
      carbonSavedKg: result.carbonOffsetCombinedKg,
      notes: `Active barter proposal: Exchanging for ${result.requested.equivalentQtyKg}kg ${result.requested.material}.`,
    };
    setListings((prev) => [newBarterLot, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 3-Zone Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'inspector') {
            document.getElementById('ai-vision-inspector')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'barter') {
            document.getElementById('material-barter')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'marketplace') {
            document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'esg') {
            document.getElementById('esg-impact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenListingModal={() => {
          setListingPrefill(undefined);
          setIsListingModalOpen(true);
        }}
        onJumpToAiInspector={() => {
          setActiveTab('inspector');
          document.getElementById('ai-vision-inspector')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Spot Commodities Ticker */}
      <SpotTickerBar
        indices={indices}
        onSelectIndex={(index) => {
          setBarterOfferingMatId(index.id);
          document.getElementById('ai-vision-inspector')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onOpenInspector={() => {
            setActiveTab('inspector');
            document.getElementById('ai-vision-inspector')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreMarketplace={() => {
            setActiveTab('marketplace');
            document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenListingModal={() => {
            setListingPrefill(undefined);
            setIsListingModalOpen(true);
          }}
        />

        {/* Flagship: AI Vision Metallurgical Inspector */}
        <AiVisionInspector
          onListGradedLot={handleListGradedLot}
          onInitiateSwapWithGradedLot={handleInitiateSwapWithGradedLot}
        />

        {/* Scrap Marketplace & Exchange Directory */}
        <ScrapMarketplace
          listings={listings}
          onOpenTradeModal={(listing) => setSelectedTradeListing(listing)}
          onOpenSwapWithListing={handleOpenSwapWithListing}
        />

        {/* Material Barter & Smart Swap Engine */}
        <SwapCalculator
          indices={indices}
          initialOfferingMaterialId={barterOfferingMatId}
          initialOfferingQtyKg={barterOfferingQty}
          onPostBarterOffer={handlePostBarterOffer}
        />

        {/* ESG & Carbon Offset Dashboard */}
        <EsgCarbonDashboard />

      </main>

      {/* Footer */}
      <Footer />

      {/* Listing Modal */}
      <ListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        onAddListing={handleAddListing}
        prefillData={listingPrefill}
      />

      {/* Trade & Order Modal */}
      <TradeModal
        listing={selectedTradeListing}
        isOpen={!!selectedTradeListing}
        onClose={() => setSelectedTradeListing(null)}
      />

    </div>
  );
}
