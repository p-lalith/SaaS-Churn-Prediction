import { CustomerData } from "@/types/dashboard";
import { allCustomerData, highRiskCustomers } from "@/data/loadCustomerData";

// Export both datasets for use in the dashboard
export const mockCustomerData: CustomerData[] = allCustomerData;
export const topHighRiskCustomers: CustomerData[] = highRiskCustomers;