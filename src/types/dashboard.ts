export interface CustomerData {
  id: string;
  plan_tier: "Starter" | "Professional" | "Enterprise" | "Premium";
  industry: "Technology" | "Healthcare" | "Finance" | "Retail" | "Manufacturing" | "Education";
  seats: number;
  mrr_amount: number;
  churn: boolean;
  churn_risk_score: number;
  company_name: string;
  created_date: string;
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