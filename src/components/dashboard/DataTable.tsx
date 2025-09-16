import { CustomerData } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: CustomerData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPlanTierVariant = (tier: string) => {
    const variants = {
      Basic: "secondary",
      Pro: "default", 
      Enterprise: "outline"
    };
    return variants[tier as keyof typeof variants] || "secondary";
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.8) return "text-destructive font-semibold";
    if (score >= 0.6) return "text-warning font-semibold";
    if (score >= 0.4) return "text-muted-foreground";
    return "text-success";
  };

  return (
    <Card className="shadow-card">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Data ({data.length} records)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Plan Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Industry</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Seats</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">MRR</th>
                <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Churn</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 50).map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{customer.account_name}</div>
                      <div className="text-sm text-muted-foreground">{customer.id}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getPlanTierVariant(customer.plan_tier) as any}>
                      {customer.plan_tier}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">{customer.industry}</td>
                  <td className="py-3 px-4 text-right font-medium">{customer.seats.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium">{formatCurrency(customer.mrr_amount)}</td>
                  <td className="py-3 px-4 text-center">
                    {customer.churn ? (
                      <Badge variant="destructive">Churned</Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </td>
                  <td className={cn("py-3 px-4 text-right font-medium", getRiskScoreColor(customer.churn_risk_score))}>
                    {(customer.churn_risk_score * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 50 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing first 50 of {data.length} records
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};