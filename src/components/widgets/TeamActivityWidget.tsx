
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GitCommit, MessageSquare, CheckCircle, GitPullRequest } from "lucide-react";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: 'commit' | 'comment' | 'task' | 'pr';
  description: string;
  timestamp: string;
  project: string;
}

const activities: Activity[] = [
  {
    id: '1',
    user: { name: 'Arsani', avatar: '/placeholder.svg', initials: 'A' },
    action: 'commit',
    description: 'Fixed authentication bug in login component',
    timestamp: '5 minutes ago',
    project: 'Dev Dashboard'
  },
  {
    id: '2',
    user: { name: 'Sarah', avatar: '/placeholder.svg', initials: 'S' },
    action: 'pr',
    description: 'Created PR: Add dark mode toggle',
    timestamp: '12 minutes ago',
    project: 'Mobile App'
  },
  {
    id: '3',
    user: { name: 'Mike', avatar: '/placeholder.svg', initials: 'M' },
    action: 'task',
    description: 'Completed: API rate limiting implementation',
    timestamp: '1 hour ago',
    project: 'API Gateway'
  },
  {
    id: '4',
    user: { name: 'Lisa', avatar: '/placeholder.svg', initials: 'L' },
    action: 'comment',
    description: 'Commented on "Database optimization" task',
    timestamp: '2 hours ago',
    project: 'Dev Dashboard'
  },
  {
    id: '5',
    user: { name: 'Arsani', avatar: '/placeholder.svg', initials: 'A' },
    action: 'commit',
    description: 'Added team management system',
    timestamp: '3 hours ago',
    project: 'Dev Dashboard'
  }
];

const TeamActivityWidget = () => {
  const getActionIcon = (action: Activity['action']) => {
    switch (action) {
      case 'commit': return <GitCommit className="w-4 h-4 text-blue-500" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'task': return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'pr': return <GitPullRequest className="w-4 h-4 text-orange-500" />;
      default: return <GitCommit className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: Activity['action']) => {
    switch (action) {
      case 'commit': return 'bg-blue-500/10 text-blue-500';
      case 'comment': return 'bg-green-500/10 text-green-500';
      case 'task': return 'bg-purple-500/10 text-purple-500';
      case 'pr': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="dev-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Team Activity
          <Badge variant="secondary" className="animate-pulse-glow">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 group">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{activity.user.name}</span>
                  <Badge variant="outline" className={`text-xs ${getActionColor(activity.action)}`}>
                    {getActionIcon(activity.action)}
                    {activity.action}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.timestamp}</span>
                  <span>•</span>
                  <span className="text-primary">{activity.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamActivityWidget;
