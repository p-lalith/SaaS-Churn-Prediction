import { FilterState } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterControls = ({ filters, onFiltersChange }: FilterControlsProps) => {
  const handleRiskThresholdChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      churn_risk_threshold: value[0] / 100,
    });
  };

  const handlePlanTierChange = (value: string) => {
    onFiltersChange({
      ...filters,
      selected_plan_tier: value === "all" ? "" : value,
    });
  };

  const handleIndustryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      selected_industry: value === "all" ? "" : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      churn_risk_threshold: 0,
      selected_plan_tier: "",
      selected_industry: "",
    });
  };

  const hasActiveFilters = filters.churn_risk_threshold > 0 || filters.selected_plan_tier || filters.selected_industry;

  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Risk Score Threshold */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Churn Risk Score Threshold</Label>
              <Badge variant="outline" className="text-xs">
                ≥ {(filters.churn_risk_threshold * 100).toFixed(0)}%
              </Badge>
            </div>
            <Slider
              value={[filters.churn_risk_threshold * 100]}
              onValueChange={handleRiskThresholdChange}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Plan Tier Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Plan Tier</Label>
            <Select value={filters.selected_plan_tier || "all"} onValueChange={handlePlanTierChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Plan Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plan Tiers</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Industry Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Industry</Label>
            <Select value={filters.selected_industry || "all"} onValueChange={handleIndustryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};