import { CustomerData } from "@/types/dashboard";

const companies = [
  "TechFlow Inc", "DataStream Corp", "CloudVision Ltd", "InnovateLab",
  "SecureNet Systems", "HealthTech Solutions", "FinanceForward", "RetailPro",
  "ManufacturingEdge", "EduConnect", "SmartAnalytics", "GrowthHacker Co",
  "NextGen Software", "Digital Dynamics", "MarketLeader Inc", "ScaleTech",
  "Innovation Hub", "DataDriven LLC", "TechSavvy Solutions", "FutureForward"
];

const planTiers = ["Starter", "Professional", "Enterprise", "Premium"] as const;
const industries = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education"] as const;

export const generateMockData = (count: number = 100): CustomerData[] => {
  const data: CustomerData[] = [];

  for (let i = 0; i < count; i++) {
    const planTier = planTiers[Math.floor(Math.random() * planTiers.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    
    // Generate churn risk score with some correlation to plan tier
    let baseRiskScore = Math.random();
    if (planTier === "Starter") baseRiskScore += 0.2;
    if (planTier === "Premium") baseRiskScore -= 0.1;
    
    const churnRiskScore = Math.min(Math.max(baseRiskScore + (Math.random() - 0.5) * 0.4, 0), 1);
    
    const seats = planTier === "Starter" ? Math.floor(Math.random() * 10) + 1 :
                  planTier === "Professional" ? Math.floor(Math.random() * 50) + 5 :
                  planTier === "Enterprise" ? Math.floor(Math.random() * 200) + 25 :
                  Math.floor(Math.random() * 500) + 100;
    
    const baseMrr = planTier === "Starter" ? 49 :
                   planTier === "Professional" ? 199 :
                   planTier === "Enterprise" ? 499 :
                   999;
    
    const mrrAmount = baseMrr * seats + Math.floor(Math.random() * baseMrr * 0.5);
    
    data.push({
      id: `cust-${i + 1}`,
      plan_tier: planTier,
      industry,
      seats,
      mrr_amount: mrrAmount,
      churn: churnRiskScore > 0.75 && Math.random() > 0.7,
      churn_risk_score: Number(churnRiskScore.toFixed(2)),
      company_name: companies[Math.floor(Math.random() * companies.length)],
      created_date: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    });
  }

  return data;
};

export const mockCustomerData = generateMockData(150);