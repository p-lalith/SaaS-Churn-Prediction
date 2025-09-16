import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface DatasetSelectorProps {
  selectedDataset: 'all' | 'high-risk';
  onDatasetChange: (dataset: 'all' | 'high-risk') => void;
  totalCount: number;
  highRiskCount: number;
}

export const DatasetSelector = ({ 
  selectedDataset, 
  onDatasetChange, 
  totalCount, 
  highRiskCount 
}: DatasetSelectorProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground">Dataset</h3>
        <Select value={selectedDataset} onValueChange={onDatasetChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All Customers ({totalCount.toLocaleString()})
            </SelectItem>
            <SelectItem value="high-risk">
              High Risk Only ({highRiskCount.toLocaleString()})
            </SelectItem>
          </SelectContent>
        </Select>
        
        <div className="text-xs text-muted-foreground">
          {selectedDataset === 'all' 
            ? `Viewing complete customer dataset with ${totalCount} records`
            : `Viewing top ${highRiskCount} highest risk customers (≥70% risk score)`
          }
        </div>
      </div>
    </Card>
  );
};