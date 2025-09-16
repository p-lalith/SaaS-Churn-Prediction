export interface CustomerData {
  id: string;
  plan_tier: "Basic" | "Pro" | "Enterprise";
  industry: "FinTech" | "HealthTech" | "EdTech" | "DevTools" | "Cybersecurity";
  seats: number;
  mrr_amount: number;
  churn: boolean;
  churn_risk_score: number;
  account_name: string;
}

export interface FilterState {
  churn_risk_threshold: number;
  selected_plan_tier: string;
  selected_industry: string;
}

export interface ChartData {
  name: string;
  value: number;
  count?: number;
}