import { CustomerData } from "@/types/dashboard";

// Load scored customers CSV data
async function loadScoredCustomers(): Promise<CustomerData[]> {
  try {
    const response = await fetch('/src/data/scored_customers.csv');
    const csvText = await response.text();
    return parseScoredCustomersCSV(csvText);
  } catch (error) {
    console.error('Failed to load scored customers CSV:', error);
    return [];
  }
}

function parseScoredCustomersCSV(csvText: string): CustomerData[] {
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

// Embedded CSV data for immediate loading
const scoredCustomersCSVData = `account_id,account_name,industry,country,signup_date,referral_source,plan_tier,seats_x,is_trial,churn_flag_x,mrr_amount,arr_amount,seats_y,upgrade_flag,downgrade_flag,churn_flag_y,billing_frequency,auto_renew_flag,total_usage_count,total_usage_secs,total_errors,beta_feature_ratio,ticket_count,avg_resolution_time,avg_satisfaction,escalation_rate,churn,churn_risk_score
A-2e4581,Company_0,EdTech,US,2024-10-16,partner,Basic,9,False,False,1260.3,15123.6,31.2,0.1,0.0,False,monthly,0.8,535.0,152339.0,38.0,0.0717857142857142,2.0,23.0,3.0,0.0,1,0.5233333333333333
A-43a9e3,Company_1,FinTech,IN,2023-08-17,other,Basic,18,False,True,1250.5,15006.0,22.0,0.375,0.0,False,annual,0.75,355.0,101136.0,14.0,0.0833333333333333,3.0,38.0,4.0,0.0,0,0.18666666666666668
A-0a282f,Company_2,DevTools,US,2024-08-27,organic,Basic,1,False,False,1219.0666666666666,14628.8,18.8,0.0666666666666666,0.0666666666666666,True,monthly,1.0,821.0,251210.0,48.0,0.0495238095238095,3.0,43.66666666666666,4.666666666666667,0.0,1,0.7033333333333334
A-1f0ac7,Company_3,HealthTech,UK,2023-08-27,other,Basic,24,True,False,1325.0,15900.0,29.857142857142858,0.2857142857142857,0.0,False,monthly,0.7142857142857143,382.0,102528.0,21.0,0.1680272108843537,2.0,29.0,0.0,0.0,1,0.41333333333333333
A-ce550d,Company_4,HealthTech,US,2024-10-27,event,Enterprise,35,False,True,5417.888888888889,65014.66666666666,47.11111111111112,0.2222222222222222,0.0,True,annual,0.6666666666666666,579.0,215779.0,31.0,0.0555555555555555,7.0,42.285714285714285,3.8,0.1428571428571428,1,0.8666666666666667
A-1b9609,Company_5,EdTech,IN,2023-10-12,ads,Enterprise,4,False,False,1528.1818181818182,18338.18181818182,19.545454545454547,0.0,0.0,True,annual,0.8181818181818182,457.0,140541.0,21.0,0.109090909090909,4.0,43.0,3.0,0.0,1,0.38666666666666666
A-a0ca4e,Company_6,Cybersecurity,US,2024-03-08,ads,Pro,11,False,False,1848.111111111111,22177.33333333333,19.55555555555556,0.0,0.0,False,annual,0.8888888888888888,373.0,116964.0,14.0,0.08125,6.0,39.16666666666666,3.8,0.5,0,0.16333333333333333
A-e5d6ab,Company_7,EdTech,US,2023-04-15,partner,Pro,3,False,False,1304.8,15657.6,18.9,0.0,0.0,True,annual,0.9,382.0,111506.0,23.0,0.1259523809523809,3.0,42.66666666666666,0.0,0.0,1,0.7833333333333333`;

// Parse the embedded CSV data for immediate use
export const allCustomerData: CustomerData[] = parseScoredCustomersCSV(scoredCustomersCSVData);

// High-risk customers (churn_risk_score >= 0.7) for focused analysis
export const highRiskCustomers: CustomerData[] = allCustomerData
  .filter(customer => customer.churn_risk_score >= 0.7)
  .sort((a, b) => b.churn_risk_score - a.churn_risk_score)
  .slice(0, 50);