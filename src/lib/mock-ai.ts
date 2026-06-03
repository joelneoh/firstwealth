import { seedData } from "@/lib/seed";
import type { Conviction, ExtractedHolding, Holding, Review, ThesisStatus } from "@/types/domain";

const templates = new Map(seedData.convictions.map((conviction) => [
  seedData.holdings.find((holding) => holding.id === conviction.holding_id)?.ticker,
  conviction,
]));

export async function extractHoldingsFromImage(): Promise<ExtractedHolding[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return seedData.holdings.map(({ name, ticker, quantity, current_value, cost_basis, allocation }) => ({
    name,
    ticker,
    quantity,
    current_value,
    cost_basis,
    allocation,
  }));
}

export function structureThesis(holding: Pick<Holding, "id" | "name" | "ticker">, originalText: string, sellText: string, confidence: number): Conviction {
  const template = templates.get(holding.ticker.toUpperCase());
  const thesisParts = originalText
    .split(/[,.]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3);
  const sellParts = sellText
    .split(/[,.]/)
    .map((part) => part.replace(/^I would sell if/i, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return {
    id: `conviction_${holding.id}_${Date.now()}`,
    holding_id: holding.id,
    original_text: originalText,
    structured_thesis: thesisParts.length ? thesisParts : template?.structured_thesis ?? [`Clear reason for owning ${holding.name}`, "Durable competitive position", "Long-term compounding potential"],
    key_assumptions: template?.key_assumptions ?? [
      { text: `${holding.name}'s core market keeps growing`, status: "Neutral" },
      { text: "Competitive position remains defensible", status: "Neutral" },
      { text: "Management keeps executing", status: "Neutral" },
    ],
    sell_criteria: sellParts.length ? sellParts : template?.sell_criteria ?? ["Original thesis breaks", "Competitive position weakens", "Execution deteriorates"],
    risks: template?.risks ?? ["Valuation expectations", "Execution risk"],
    confidence_score: confidence,
    time_horizon: "3-5 years",
    current_decision: "Hold",
    created_at: new Date().toISOString(),
  };
}

export function generateWeeklyUpdate(holding: Holding, conviction?: Conviction): Review {
  const score = conviction?.confidence_score ?? 5;
  const ticker = holding.ticker.toUpperCase();
  const profiles: Record<string, { status: ThesisStatus; delta: number; summary: string; action: Review["user_decision"] }> = {
    NVDA: { status: "Strengthening", delta: 0.5, summary: "AI infrastructure demand remains strong, data center growth continues, and the competitive position remains strong. No sell criteria appear triggered.", action: "Hold" },
    TSLA: { status: "Weakening", delta: -1.8, summary: "Robotaxi timeline uncertainty increased and EV margin pressure remains relevant. One sell criterion may be at risk, so this position deserves review.", action: "Review" },
    PLTR: { status: "Stable", delta: 0.2, summary: "AIP adoption appears supportive and government relationships remain sticky. Expectations are high, but no sell criteria appear triggered.", action: "Hold" },
    SE: { status: "Review", delta: -0.4, summary: "E-commerce growth remains attractive, but competitive intensity and profitability assumptions deserve closer review.", action: "Review" },
    BTC: { status: "Stable", delta: 0.1, summary: "Digital scarcity and institutional adoption assumptions remain intact. Volatility is price movement, not necessarily thesis movement.", action: "Hold" },
  };
  const profile = profiles[ticker] ?? { status: holding.status, delta: 0, summary: `${holding.name}'s thesis appears generally stable. Review whether new evidence changes your original reasons for owning it.`, action: "Review" as const };
  const updated = Math.max(1, Math.min(10, Number((score + profile.delta).toFixed(1))));
  return {
    id: `review_${holding.id}_${Date.now()}`,
    holding_id: holding.id,
    previous_score: score,
    updated_score: updated,
    status: profile.status,
    ai_summary: profile.summary,
    user_agreement: "Not sure",
    user_decision: profile.action,
    user_reason: "",
    created_at: new Date().toISOString(),
  };
}

export function calculatePortfolioUnderstandingScore(data: { holdings: Holding[]; convictions: Conviction[]; reviews: Review[] }) {
  const total = data.holdings.length || 1;
  const convictionHoldingIds = new Set(data.convictions.map((conviction) => conviction.holding_id));
  const sellCriteriaIds = new Set(data.convictions.filter((conviction) => conviction.sell_criteria.length > 0).map((conviction) => conviction.holding_id));
  const scoreIds = new Set(data.convictions.filter((conviction) => conviction.confidence_score > 0).map((conviction) => conviction.holding_id));
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentReviewIds = new Set(data.reviews.filter((review) => new Date(review.created_at).getTime() >= cutoff).map((review) => review.holding_id));
  const score = Math.round(
    25 * Math.min(data.holdings.length / 5, 1) +
    25 * (convictionHoldingIds.size / total) +
    25 * (sellCriteriaIds.size / total) +
    25 * (recentReviewIds.size / total || scoreIds.size / total / 2)
  );
  return {
    score,
    lines: [
      `${data.holdings.length} holdings imported.`,
      `${convictionHoldingIds.size} holdings have documented theses.`,
      `${sellCriteriaIds.size} holdings have sell criteria.`,
      `${Math.max(0, total - recentReviewIds.size)} holdings have not been reviewed in 30 days.`,
    ],
  };
}
