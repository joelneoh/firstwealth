export type ThesisStatus = "Strengthening" | "Stable" | "Weakening" | "Broken" | "Review" | "Not reviewed";
export type Decision = "Hold" | "Add" | "Sell" | "Unsure" | "Review";
export type Agreement = "Agree" | "Disagree" | "Not sure";
export type AssumptionStatus = "Strong" | "Neutral" | "Weakening" | "Broken";

export type User = { id: string; name: string; email: string };
export type Portfolio = { id: string; user_id: string; created_at: string };

export type Holding = {
  id: string;
  portfolio_id: string;
  name: string;
  ticker: string;
  quantity?: number;
  current_value?: number;
  cost_basis?: number;
  allocation?: number;
  status: ThesisStatus;
  created_at: string;
};

export type Conviction = {
  id: string;
  holding_id: string;
  original_text: string;
  structured_thesis: string[];
  key_assumptions: { text: string; status: AssumptionStatus }[];
  sell_criteria: string[];
  risks: string[];
  confidence_score: number;
  time_horizon: string;
  current_decision: Decision;
  created_at: string;
};

export type Review = {
  id: string;
  holding_id: string;
  previous_score: number;
  updated_score: number;
  status: ThesisStatus;
  ai_summary: string;
  user_agreement: Agreement;
  user_decision: Decision;
  user_reason: string;
  created_at: string;
};

export type Alert = {
  id: string;
  holding_id: string;
  alert_type: string;
  message: string;
  severity: "info" | "warning" | "success" | "danger";
  created_at: string;
  read: boolean;
};

export type AppData = {
  user: User;
  portfolio: Portfolio;
  holdings: Holding[];
  convictions: Conviction[];
  reviews: Review[];
  alerts: Alert[];
};

export type ExtractedHolding = Pick<Holding, "name" | "ticker" | "quantity" | "current_value" | "cost_basis" | "allocation">;
