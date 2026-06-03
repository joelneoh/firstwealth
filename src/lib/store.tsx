"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedData } from "@/lib/seed";
import type { AppData, Conviction, ExtractedHolding, Holding, Review } from "@/types/domain";

const STORAGE_KEY = "first-wealth-local-db-v1";

type StoreContextValue = {
  data: AppData;
  resetData: () => void;
  importHoldings: (holdings: ExtractedHolding[]) => void;
  upsertConviction: (conviction: Conviction) => void;
  saveReview: (review: Review) => void;
  updateHolding: (holding: Holding) => void;
  addHolding: (holding: ExtractedHolding) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function normalizeTicker(ticker: string, name: string) {
  return (ticker || name).trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || `ASSET${Date.now()}`;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(seedData);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) setData(JSON.parse(raw) as AppData);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const value = useMemo<StoreContextValue>(() => ({
    data,
    resetData: () => setData(seedData),
    importHoldings: (holdings) => setData((current) => {
      const imported: Holding[] = holdings.map((item, index) => ({
        id: `${normalizeTicker(item.ticker, item.name).toLowerCase()}_${Date.now()}_${index}`,
        portfolio_id: current.portfolio.id,
        name: item.name.trim(),
        ticker: normalizeTicker(item.ticker, item.name),
        quantity: item.quantity,
        current_value: item.current_value,
        cost_basis: item.cost_basis,
        allocation: item.allocation,
        status: "Not reviewed",
        created_at: new Date().toISOString(),
      }));
      return { ...current, holdings: imported, convictions: [], reviews: [], alerts: [] };
    }),
    upsertConviction: (conviction) => setData((current) => ({
      ...current,
      convictions: [...current.convictions.filter((item) => item.holding_id !== conviction.holding_id), conviction],
    })),
    saveReview: (review) => setData((current) => ({
      ...current,
      reviews: [review, ...current.reviews.filter((item) => item.id !== review.id)],
      holdings: current.holdings.map((holding) => holding.id === review.holding_id ? { ...holding, status: review.status } : holding),
      convictions: current.convictions.map((conviction) => conviction.holding_id === review.holding_id ? { ...conviction, confidence_score: review.updated_score, current_decision: review.user_decision } : conviction),
    })),
    updateHolding: (holding) => setData((current) => ({ ...current, holdings: current.holdings.map((item) => item.id === holding.id ? holding : item) })),
    addHolding: (item) => setData((current) => ({
      ...current,
      holdings: [...current.holdings, {
        id: `${normalizeTicker(item.ticker, item.name).toLowerCase()}_${Date.now()}`,
        portfolio_id: current.portfolio.id,
        name: item.name.trim(),
        ticker: normalizeTicker(item.ticker, item.name),
        quantity: item.quantity,
        current_value: item.current_value,
        cost_basis: item.cost_basis,
        allocation: item.allocation,
        status: "Not reviewed",
        created_at: new Date().toISOString(),
      }],
    })),
  }), [data]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
