import type { AppData, Conviction, Holding, Review } from "@/types/domain";

const now = "2026-06-03T09:00:00.000Z";
const portfolioId = "portfolio_demo";

const baseHoldings: Holding[] = [
  { id: "nvda", portfolio_id: portfolioId, name: "Nvidia", ticker: "NVDA", quantity: 24, current_value: 28800, cost_basis: 15400, allocation: 32, status: "Strengthening", created_at: now },
  { id: "tsla", portfolio_id: portfolioId, name: "Tesla", ticker: "TSLA", quantity: 38, current_value: 8200, cost_basis: 11300, allocation: 14, status: "Weakening", created_at: now },
  { id: "pltr", portfolio_id: portfolioId, name: "Palantir", ticker: "PLTR", quantity: 310, current_value: 16400, cost_basis: 7200, allocation: 21, status: "Stable", created_at: now },
  { id: "se", portfolio_id: portfolioId, name: "Sea Limited", ticker: "SE", quantity: 80, current_value: 7600, cost_basis: 9600, allocation: 12, status: "Review", created_at: now },
  { id: "btc", portfolio_id: portfolioId, name: "Bitcoin", ticker: "BTC", quantity: 0.42, current_value: 45400, cost_basis: 26500, allocation: 21, status: "Stable", created_at: now },
];

const convictionByTicker: Record<string, Omit<Conviction, "id" | "holding_id" | "created_at">> = {
  NVDA: {
    original_text: "I own Nvidia because AI infrastructure demand should continue growing, CUDA remains a powerful developer moat, and Jensen Huang keeps executing with founder-led intensity.",
    structured_thesis: ["AI infrastructure demand", "CUDA moat", "Jensen leadership"],
    key_assumptions: [
      { text: "Hyperscalers continue investing in accelerated compute", status: "Strong" },
      { text: "CUDA remains the default AI developer platform", status: "Strong" },
      { text: "Data center margins remain attractive", status: "Neutral" },
    ],
    sell_criteria: ["AI capex slowdown", "CUDA disruption", "Margin collapse"],
    risks: ["Customer concentration", "Export restrictions"],
    confidence_score: 8.7,
    time_horizon: "3-5 years",
    current_decision: "Hold",
  },
  TSLA: {
    original_text: "I own Tesla for robotaxi optionality, FSD adoption, and energy storage growth, but execution timelines matter.",
    structured_thesis: ["Robotaxi rollout", "FSD adoption", "Energy storage growth"],
    key_assumptions: [
      { text: "Autonomy progress converts into commercial products", status: "Weakening" },
      { text: "EV margins stabilize", status: "Weakening" },
      { text: "Energy storage continues compounding", status: "Strong" },
    ],
    sell_criteria: ["Regulatory delays", "FSD adoption stalls", "EV margin collapse"],
    risks: ["Intensifying EV competition", "Timeline slippage"],
    confidence_score: 5.4,
    time_horizon: "3-5 years",
    current_decision: "Review",
  },
  PLTR: {
    original_text: "I own Palantir because AI software adoption can expand enterprise demand while government relationships and margins remain durable.",
    structured_thesis: ["AI software adoption", "Government relationships", "Enterprise expansion"],
    key_assumptions: [
      { text: "AIP converts pilots into production contracts", status: "Strong" },
      { text: "Government relationships stay sticky", status: "Strong" },
      { text: "Margins stay disciplined while growth accelerates", status: "Neutral" },
    ],
    sell_criteria: ["Revenue growth slowdown", "Margin deterioration", "AI platform commoditization"],
    risks: ["High expectations", "Procurement cycles"],
    confidence_score: 8,
    time_horizon: "3-5 years",
    current_decision: "Hold",
  },
  SE: {
    original_text: "I own Sea Limited for Southeast Asia e-commerce growth, fintech expansion, and the long-term consumer internet opportunity.",
    structured_thesis: ["E-commerce growth", "Fintech expansion", "Southeast Asia consumer internet"],
    key_assumptions: [
      { text: "Shopee maintains category leadership", status: "Neutral" },
      { text: "Fintech losses remain controlled", status: "Neutral" },
      { text: "Competition does not reset profitability", status: "Weakening" },
    ],
    sell_criteria: ["Shopee market share loss", "Profitability deterioration", "Competition intensifies"],
    risks: ["Subsidy wars", "Currency volatility"],
    confidence_score: 6.9,
    time_horizon: "5+ years",
    current_decision: "Review",
  },
  BTC: {
    original_text: "I own Bitcoin for digital scarcity, institutional adoption, and as a hedge against monetary debasement.",
    structured_thesis: ["Digital scarcity", "Institutional adoption", "Monetary debasement hedge"],
    key_assumptions: [
      { text: "Network security remains robust", status: "Strong" },
      { text: "Institutional adoption persists", status: "Neutral" },
      { text: "Regulatory pathway remains investable", status: "Neutral" },
    ],
    sell_criteria: ["Regulatory ban", "Failed institutional adoption", "Security failure"],
    risks: ["Volatility", "Policy pressure"],
    confidence_score: 6.2,
    time_horizon: "5+ years",
    current_decision: "Hold",
  },
};

const convictions: Conviction[] = baseHoldings.map((holding) => ({
  id: `conviction_${holding.id}`,
  holding_id: holding.id,
  created_at: now,
  ...convictionByTicker[holding.ticker],
}));

const reviews: Review[] = [
  { id: "review_nvda_1", holding_id: "nvda", previous_score: 8.2, updated_score: 8.7, status: "Strengthening", ai_summary: "AI infrastructure demand remains strong. No sell criteria appear triggered.", user_agreement: "Agree", user_decision: "Hold", user_reason: "The original reasons remain intact.", created_at: "2026-05-29T09:00:00.000Z" },
  { id: "review_tsla_1", holding_id: "tsla", previous_score: 7.8, updated_score: 5.4, status: "Weakening", ai_summary: "Robotaxi timeline uncertainty increased. One sell criterion may be at risk.", user_agreement: "Not sure", user_decision: "Review", user_reason: "Need to separate hope from evidence.", created_at: "2026-05-28T09:00:00.000Z" },
  { id: "review_pltr_1", holding_id: "pltr", previous_score: 7.6, updated_score: 8, status: "Stable", ai_summary: "Enterprise AI adoption remains supportive while expectations are elevated.", user_agreement: "Agree", user_decision: "Hold", user_reason: "Thesis remains intact.", created_at: "2026-05-27T09:00:00.000Z" },
];

export const seedData: AppData = {
  user: { id: "user_demo", name: "Alex Morgan", email: "alex@example.com" },
  portfolio: { id: portfolioId, user_id: "user_demo", created_at: now },
  holdings: baseHoldings,
  convictions,
  reviews,
  alerts: [
    { id: "alert_tsla", holding_id: "tsla", alert_type: "sell_criterion", message: "One sell criterion may be at risk: FSD adoption stalls.", severity: "warning", created_at: "2026-06-01T09:00:00.000Z", read: false },
    { id: "alert_pltr", holding_id: "pltr", alert_type: "conviction", message: "Conviction increased after latest enterprise AI commentary.", severity: "success", created_at: "2026-05-31T09:00:00.000Z", read: false },
  ],
};
