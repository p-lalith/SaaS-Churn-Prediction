import { CustomerData, ChartData } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ChartComponentsProps {
  data: CustomerData[];
}

export const ChartComponents = ({ data }: ChartComponentsProps) => {
  // Calculate average churn risk by plan tier
  const planTierData: ChartData[] = ["Starter", "Professional", "Enterprise", "Premium"].map((tier) => {
    const tierData = data.filter(d => d.plan_tier === tier);
    const avgRisk = tierData.length > 0 
      ? tierData.reduce((sum, d) => sum + d.churn_risk_score, 0) / tierData.length 
      : 0;
    return {
      name: tier,
      value: Number((avgRisk * 100).toFixed(1)),
      count: tierData.length
    };
  });

  // Calculate average churn risk by industry
  const industryData: ChartData[] = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education"].map((industry) => {
    const industryFiltered = data.filter(d => d.industry === industry);
    const avgRisk = industryFiltered.length > 0 
      ? industryFiltered.reduce((sum, d) => sum + d.churn_risk_score, 0) / industryFiltered.length 
      : 0;
    return {
      name: industry,
      value: Number((avgRisk * 100).toFixed(1)),
      count: industryFiltered.length
    };
  });

  // Create histogram data for churn risk distribution
  const histogramData: ChartData[] = [];
  for (let i = 0; i < 10; i++) {
    const min = i * 0.1;
    const max = (i + 1) * 0.1;
    const count = data.filter(d => d.churn_risk_score >= min && d.churn_risk_score < max).length;
    histogramData.push({
      name: `${(min * 100).toFixed(0)}-${(max * 100).toFixed(0)}%`,
      value: count,
    });
  }

  const chartColors = {
    primary: "hsl(235 69% 61%)",
    secondary: "hsl(235 69% 71%)",
    success: "hsl(142 71% 45%)",
    warning: "hsl(38 92% 50%)",
    destructive: "hsl(0 84% 60%)",
  };

  const getBarColor = (value: number, isRiskScore: boolean = true) => {
    if (!isRiskScore) return chartColors.primary;
    if (value >= 80) return chartColors.destructive;
    if (value >= 60) return chartColors.warning;
    if (value >= 40) return chartColors.secondary;
    return chartColors.success;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Value: </span>
            <span className="font-medium" style={{ color: payload[0].color }}>
              {payload[0].name === "Count" ? payload[0].value : `${payload[0].value}%`}
            </span>
          </p>
          {data.count && (
            <p className="text-sm">
              <span className="text-muted-foreground">Count: </span>
              <span className="font-medium">{data.count}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Plan Tier Chart */}
      <Card className="shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Average Churn Risk by Plan Tier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planTierData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: 'Risk Score (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {planTierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Industry Chart */}
      <Card className="shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Average Churn Risk by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: 'Risk Score (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Histogram */}
      <Card className="shadow-card xl:col-span-2">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Risk Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Count: </span>
                          <span className="font-medium" style={{ color: payload[0].color }}>
                            {payload[0].value}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};