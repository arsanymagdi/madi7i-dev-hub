
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  GitCommit, 
  Users, 
  CheckCircle, 
  Clock 
} from "lucide-react";

interface Metric {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

const metrics: Metric[] = [
  {
    id: '1',
    label: 'Commits Today',
    value: '23',
    change: 15.3,
    icon: GitCommit,
    color: 'text-blue-500'
  },
  {
    id: '2',
    label: 'Active Devs',
    value: '8',
    change: -2.1,
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: '3',
    label: 'Tasks Done',
    value: '47',
    change: 28.7,
    icon: CheckCircle,
    color: 'text-purple-500'
  },
  {
    id: '4',
    label: 'Avg Response',
    value: '2.4h',
    change: -12.5,
    icon: Clock,
    color: 'text-orange-500'
  }
];

const MetricsWidget = () => {
  return (
    <Card className="dev-card">
      <CardHeader>
        <CardTitle>Team Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            const isPositive = metric.change > 0;
            const TrendIcon = isPositive ? TrendingUp : TrendingDown;
            
            return (
              <div key={metric.id} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  <Badge 
                    variant={isPositive ? "default" : "destructive"}
                    className="text-xs gap-1"
                  >
                    <TrendIcon className="w-3 h-3" />
                    {Math.abs(metric.change)}%
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Productivity Score</h4>
                <p className="text-xs text-muted-foreground">Based on team activity</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gradient">94%</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.2%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsWidget;
