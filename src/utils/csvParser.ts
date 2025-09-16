import { CustomerData } from "@/types/dashboard";

export function parseCSVData(csvText: string): CustomerData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',');
    const row: { [key: string]: string } = {};
    
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    
    return {
      id: row.account_id,
      account_name: row.account_name,
      plan_tier: row.plan_tier as 'Basic' | 'Pro' | 'Enterprise',
      industry: row.industry as 'FinTech' | 'HealthTech' | 'EdTech' | 'DevTools' | 'Cybersecurity',
      seats: parseInt(row.seats_y) || parseInt(row.seats_x) || 0,
      mrr_amount: parseFloat(row.mrr_amount),
      churn: parseInt(row.churn) === 1,
      churn_risk_score: parseFloat(row.churn_risk_score),
    };
  });
}