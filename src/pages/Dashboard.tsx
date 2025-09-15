import { useState, useMemo } from "react";
import { mockCustomerData } from "@/data/mockData";
import { CustomerData, FilterState } from "@/types/dashboard";
import { DataTable } from "@/components/dashboard/DataTable";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { ChartComponents } from "@/components/dashboard/ChartComponents";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    churn_risk_threshold: 0,
    selected_plan_tier: "",
    selected_industry: "",
  });

  // Apply filters to data
  const filteredData = useMemo(() => {
    return mockCustomerData.filter((customer) => {
      if (filters.churn_risk_threshold > 0 && customer.churn_risk_score < filters.churn_risk_threshold) {
        return false;
      }
      if (filters.selected_plan_tier && customer.plan_tier !== filters.selected_plan_tier) {
        return false;
      }
      if (filters.selected_industry && customer.industry !== filters.selected_industry) {
        return false;
      }
      return true;
    });
  }, [filters]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalCustomers = filteredData.length;
    const totalMRR = filteredData.reduce((sum, customer) => sum + customer.mrr_amount, 0);
    const avgRiskScore = totalCustomers > 0 
      ? filteredData.reduce((sum, customer) => sum + customer.churn_risk_score, 0) / totalCustomers 
      : 0;
    const highRiskCustomers = filteredData.filter(customer => customer.churn_risk_score >= 0.7).length;
    
    return {
      totalCustomers,
      totalMRR,
      avgRiskScore: avgRiskScore * 100,
      highRiskCustomers,
    };
  }, [filteredData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Customer Churn Analytics</h1>
          <p className="text-muted-foreground">
            Monitor customer health and identify churn risks across your customer base
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="shadow-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total MRR</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalMRR)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </div>
          </Card>

          <Card className="shadow-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Risk Score</p>
                  <p className="text-2xl font-bold">{stats.avgRiskScore.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="shadow-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stats.highRiskCustomers}</p>
                    <Badge variant="destructive" className="text-xs">
                      ≥70%
                    </Badge>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterControls filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <DataTable data={filteredData} />
          </div>
        </div>

        {/* Charts */}
        <ChartComponents data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;