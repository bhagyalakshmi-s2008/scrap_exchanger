export type ScrapCategory =
  | 'All'
  | 'Non-Ferrous Metals'
  | 'Ferrous & Alloys'
  | 'High-Tech E-Waste'
  | 'Battery & Energy'
  | 'Industrial Polymers';

export type TradeMode = 'All' | 'Direct Sale' | 'Material Barter' | 'Urgent Liquidation';

export interface AlloyElement {
  element: string;
  percentage: number;
  note?: string;
}

export interface MatchedBuyer {
  name: string;
  distanceKm: number;
  offeredRatePerKg: number;
  verified: boolean;
}

export interface AiGradingReport {
  materialName: string;
  primaryCategory: string;
  gradeStandard: string;
  estimatedPurityPercentage: number;
  contaminationLevel: string;
  formFactor: string;
  spotPricePerKg: number;
  estimatedPricePerKgRange: {
    min: number;
    max: number;
  };
  totalValuation: number;
  confidenceScore: number;
  alloyComposition: AlloyElement[];
  processingRecommendation: string;
  co2OffsetTotalKg: number;
  energySavingsMwh: number;
  matchingBuyersCount: number;
  topMatchedBuyers: MatchedBuyer[];
  aiInspectionNotes: string;
}

export interface ScrapListing {
  id: string;
  title: string;
  category: ScrapCategory;
  gradeStandard: string;
  purityScore: number; // e.g. 99.4%
  quantityKg: number;
  quantityFormatted: string; // e.g. "12.5 MT" or "4,500 kg"
  pricePerKg: number;
  totalPriceUSD: number;
  location: string;
  sellerName: string;
  sellerRating: number;
  sellerTradesCount: number;
  verifiedCertification: boolean;
  tradeType: 'Direct Sale' | 'Material Barter' | 'Urgent Liquidation';
  imageUrl: string;
  datePosted: string;
  carbonSavedKg: number;
  isFeatured?: boolean;
  notes?: string;
}

export interface ScrapIndex {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  change24h: number;
  code: string;
  benchmark: string;
  co2OffsetPerUnitKg: number;
}

export interface SwapResult {
  offering: {
    material: string;
    qtyKg: number;
    ratePerKg: number;
    grossValueUSD: number;
  };
  requested: {
    material: string;
    equivalentQtyKg: number;
    ratePerKg: number;
    grossValueUSD: number;
  };
  exchangeRatio: number;
  netCashAdjustmentUSD: number;
  carbonOffsetCombinedKg: number;
}
