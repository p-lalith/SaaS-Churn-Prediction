import { CustomerData } from "@/types/dashboard";

// Sample of 50 customers from the scored customers dataset for immediate loading
const sampleCustomerData: CustomerData[] = [
  { id: "A-2e4581", account_name: "Company_0", plan_tier: "Basic", industry: "EdTech", seats: 31, mrr_amount: 1260.3, churn: true, churn_risk_score: 0.5233333333333333 },
  { id: "A-43a9e3", account_name: "Company_1", plan_tier: "Basic", industry: "FinTech", seats: 22, mrr_amount: 1250.5, churn: false, churn_risk_score: 0.18666666666666668 },
  { id: "A-0a282f", account_name: "Company_2", plan_tier: "Basic", industry: "DevTools", seats: 19, mrr_amount: 1219.0666666666666, churn: true, churn_risk_score: 0.7033333333333334 },
  { id: "A-1f0ac7", account_name: "Company_3", plan_tier: "Basic", industry: "HealthTech", seats: 30, mrr_amount: 1325.0, churn: true, churn_risk_score: 0.41333333333333333 },
  { id: "A-ce550d", account_name: "Company_4", plan_tier: "Enterprise", industry: "HealthTech", seats: 47, mrr_amount: 5417.888888888889, churn: true, churn_risk_score: 0.8666666666666667 },
  { id: "A-1b9609", account_name: "Company_5", plan_tier: "Enterprise", industry: "EdTech", seats: 20, mrr_amount: 1528.1818181818182, churn: true, churn_risk_score: 0.38666666666666666 },
  { id: "A-a0ca4e", account_name: "Company_6", plan_tier: "Pro", industry: "Cybersecurity", seats: 20, mrr_amount: 1848.111111111111, churn: false, churn_risk_score: 0.16333333333333333 },
  { id: "A-e5d6ab", account_name: "Company_7", plan_tier: "Pro", industry: "EdTech", seats: 19, mrr_amount: 1304.8, churn: true, churn_risk_score: 0.7833333333333333 },
  { id: "A-7dacce", account_name: "Company_8", plan_tier: "Enterprise", industry: "Cybersecurity", seats: 22, mrr_amount: 2305.7, churn: true, churn_risk_score: 0.7566666666666667 },
  { id: "A-10b8da", account_name: "Company_9", plan_tier: "Enterprise", industry: "DevTools", seats: 19, mrr_amount: 1464.5, churn: false, churn_risk_score: 0.20666666666666667 },
  { id: "A-592832", account_name: "Company_10", plan_tier: "Basic", industry: "Cybersecurity", seats: 28, mrr_amount: 1714.2631578947369, churn: true, churn_risk_score: 0.8133333333333334 },
  { id: "A-d40bf7", account_name: "Company_11", plan_tier: "Basic", industry: "FinTech", seats: 59, mrr_amount: 4324.7, churn: false, churn_risk_score: 0.25 },
  { id: "A-6c093d", account_name: "Company_12", plan_tier: "Basic", industry: "DevTools", seats: 20, mrr_amount: 1353.5, churn: false, churn_risk_score: 0.25666666666666665 },
  { id: "A-462d45", account_name: "Company_13", plan_tier: "Enterprise", industry: "Cybersecurity", seats: 37, mrr_amount: 1952.6666666666667, churn: true, churn_risk_score: 0.47333333333333333 },
  { id: "A-956988", account_name: "Company_14", plan_tier: "Enterprise", industry: "EdTech", seats: 30, mrr_amount: 2262.076923076923, churn: true, churn_risk_score: 0.79 },
  { id: "A-ac14bb", account_name: "Company_15", plan_tier: "Enterprise", industry: "FinTech", seats: 31, mrr_amount: 3468.25, churn: true, churn_risk_score: 0.8733333333333333 },
  { id: "A-463db0", account_name: "Company_16", plan_tier: "Basic", industry: "HealthTech", seats: 25, mrr_amount: 1895.142857142857, churn: true, churn_risk_score: 0.4 },
  { id: "A-ce66f8", account_name: "Company_17", plan_tier: "Pro", industry: "EdTech", seats: 30, mrr_amount: 1976.3333333333333, churn: false, churn_risk_score: 0.13666666666666666 },
  { id: "A-c4ea60", account_name: "Company_18", plan_tier: "Enterprise", industry: "FinTech", seats: 26, mrr_amount: 1627.3333333333333, churn: false, churn_risk_score: 0.11333333333333333 },
  { id: "A-832ec2", account_name: "Company_19", plan_tier: "Enterprise", industry: "FinTech", seats: 17, mrr_amount: 1162.375, churn: true, churn_risk_score: 0.4633333333333333 },
  { id: "A-684255", account_name: "Company_20", plan_tier: "Enterprise", industry: "FinTech", seats: 15, mrr_amount: 846.0, churn: true, churn_risk_score: 0.47333333333333333 },
  { id: "A-c42f1f", account_name: "Company_21", plan_tier: "Pro", industry: "HealthTech", seats: 13, mrr_amount: 646.875, churn: false, churn_risk_score: 0.17333333333333334 },
  { id: "A-4e44e8", account_name: "Company_22", plan_tier: "Enterprise", industry: "DevTools", seats: 25, mrr_amount: 2603.214285714286, churn: true, churn_risk_score: 0.6233333333333333 },
  { id: "A-30b4ca", account_name: "Company_23", plan_tier: "Basic", industry: "EdTech", seats: 86, mrr_amount: 9492.25, churn: true, churn_risk_score: 0.8066666666666666 },
  { id: "A-9f2731", account_name: "Company_24", plan_tier: "Enterprise", industry: "FinTech", seats: 24, mrr_amount: 516.1428571428571, churn: true, churn_risk_score: 0.7466666666666667 },
  { id: "A-32fb14", account_name: "Company_25", plan_tier: "Enterprise", industry: "DevTools", seats: 29, mrr_amount: 1129.111111111111, churn: true, churn_risk_score: 0.8233333333333334 },
  { id: "A-00cac8", account_name: "Company_26", plan_tier: "Enterprise", industry: "HealthTech", seats: 15, mrr_amount: 1569.0, churn: false, churn_risk_score: 0.14333333333333334 },
  { id: "A-35083d", account_name: "Company_27", plan_tier: "Basic", industry: "HealthTech", seats: 26, mrr_amount: 2027.0625, churn: false, churn_risk_score: 0.23 },
  { id: "A-eb7fac", account_name: "Company_28", plan_tier: "Enterprise", industry: "DevTools", seats: 32, mrr_amount: 4209.6, churn: true, churn_risk_score: 0.87 },
  { id: "A-b20d99", account_name: "Company_29", plan_tier: "Basic", industry: "HealthTech", seats: 23, mrr_amount: 1581.2857142857142, churn: true, churn_risk_score: 0.76 },
  { id: "A-396e5f", account_name: "Company_30", plan_tier: "Enterprise", industry: "Cybersecurity", seats: 18, mrr_amount: 1023.6, churn: true, churn_risk_score: 0.44333333333333336 },
  { id: "A-45ce7a", account_name: "Company_31", plan_tier: "Enterprise", industry: "FinTech", seats: 17, mrr_amount: 1173.7142857142858, churn: false, churn_risk_score: 0.24666666666666667 },
  { id: "A-08e34e", account_name: "Company_32", plan_tier: "Basic", industry: "EdTech", seats: 31, mrr_amount: 1983.7272727272727, churn: true, churn_risk_score: 0.3466666666666667 },
  { id: "A-8145a0", account_name: "Company_33", plan_tier: "Basic", industry: "Cybersecurity", seats: 16, mrr_amount: 1438.3333333333333, churn: true, churn_risk_score: 0.7966666666666666 },
  { id: "A-bad8c1", account_name: "Company_34", plan_tier: "Basic", industry: "FinTech", seats: 32, mrr_amount: 1113.857142857143, churn: true, churn_risk_score: 0.35 },
  { id: "A-44dc83", account_name: "Company_35", plan_tier: "Basic", industry: "EdTech", seats: 23, mrr_amount: 114.0, churn: true, churn_risk_score: 0.7933333333333333 },
  { id: "A-f446b6", account_name: "Company_36", plan_tier: "Pro", industry: "DevTools", seats: 16, mrr_amount: 1265.7777777777778, churn: false, churn_risk_score: 0.17666666666666667 },
  { id: "A-a45270", account_name: "Company_37", plan_tier: "Enterprise", industry: "HealthTech", seats: 23, mrr_amount: 1677.5833333333333, churn: true, churn_risk_score: 0.8533333333333334 },
  { id: "A-854864", account_name: "Company_38", plan_tier: "Enterprise", industry: "FinTech", seats: 32, mrr_amount: 2459.833333333333, churn: true, churn_risk_score: 0.5333333333333333 },
  { id: "A-1b7577", account_name: "Company_39", plan_tier: "Pro", industry: "Cybersecurity", seats: 18, mrr_amount: 797.3636363636364, churn: false, churn_risk_score: 0.25 },
  { id: "A-05f0e5", account_name: "Company_40", plan_tier: "Basic", industry: "FinTech", seats: 45, mrr_amount: 4259.083333333333, churn: true, churn_risk_score: 0.53 },
  { id: "A-9077b0", account_name: "Company_41", plan_tier: "Basic", industry: "HealthTech", seats: 17, mrr_amount: 509.2857142857143, churn: false, churn_risk_score: 0.21666666666666667 },
  { id: "A-7f8241", account_name: "Company_42", plan_tier: "Pro", industry: "EdTech", seats: 36, mrr_amount: 2634.4, churn: false, churn_risk_score: 0.17666666666666667 },
  { id: "A-2bc93d", account_name: "Company_43", plan_tier: "Basic", industry: "HealthTech", seats: 29, mrr_amount: 2491.846153846154, churn: true, churn_risk_score: 0.66 },
  { id: "A-f3ff05", account_name: "Company_44", plan_tier: "Enterprise", industry: "FinTech", seats: 16, mrr_amount: 1497.3076923076924, churn: true, churn_risk_score: 0.51 },
  { id: "A-2d4502", account_name: "Company_45", plan_tier: "Basic", industry: "FinTech", seats: 30, mrr_amount: 2907.1, churn: true, churn_risk_score: 0.7433333333333333 },
  { id: "A-6a4e2d", account_name: "Company_46", plan_tier: "Pro", industry: "EdTech", seats: 24, mrr_amount: 944.9090909090908, churn: true, churn_risk_score: 0.87 },
  { id: "A-eb7c38", account_name: "Company_47", plan_tier: "Enterprise", industry: "DevTools", seats: 29, mrr_amount: 2547.333333333333, churn: true, churn_risk_score: 0.58 },
  { id: "A-c37601", account_name: "Company_48", plan_tier: "Basic", industry: "EdTech", seats: 16, mrr_amount: 1706.25, churn: true, churn_risk_score: 0.7366666666666667 },
  { id: "A-3b5cd1", account_name: "Company_49", plan_tier: "Basic", industry: "FinTech", seats: 21, mrr_amount: 1821.2307692307693, churn: true, churn_risk_score: 0.35333333333333333 },
  { id: "A-b2225d", account_name: "Company_50", plan_tier: "Basic", industry: "FinTech", seats: 47, mrr_amount: 1590.6666666666667, churn: true, churn_risk_score: 0.44 }
];

// Export the sample data as the main dataset
export const allCustomerData: CustomerData[] = sampleCustomerData;

// High-risk customers (churn_risk_score >= 0.7) for focused analysis
export const highRiskCustomers: CustomerData[] = allCustomerData
  .filter(customer => customer.churn_risk_score >= 0.7)
  .sort((a, b) => b.churn_risk_score - a.churn_risk_score);