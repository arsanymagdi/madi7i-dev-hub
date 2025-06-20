
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, GitBranch } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: 'active' | 'review' | 'completed';
  members: number;
  tasksCompleted: number;
  totalTasks: number;
  lastActivity: string;
  branch: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Dev Dashboard v2',
    status: 'active',
    members: 4,
    tasksCompleted: 12,
    totalTasks: 18,
    lastActivity: '2 hours ago',
    branch: 'feature/dashboard-widgets'
  },
  {
    id: '2',
    name: 'API Gateway',
    status: 'review',
    members: 2,
    tasksCompleted: 8,
    totalTasks: 10,
    lastActivity: '1 day ago',
    branch: 'main'
  },
  {
    id: '3',
    name: 'Mobile App',
    status: 'active',
    members: 6,
    tasksCompleted: 24,
    totalTasks: 32,
    lastActivity: '30 minutes ago',
    branch: 'develop'
  }
];

const ProjectWidget = () => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="dev-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          Active Projects
          <Badge variant="secondary">{projects.length}</Badge>
        </CardTitle>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-muted/30 rounded-lg p-4 hover-lift cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                <h4 className="font-medium">{project.name}</h4>
              </div>
              <Badge variant="outline" className="text-xs">
                {project.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {project.members} members
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {project.lastActivity}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <GitBranch className="w-4 h-4" />
                <code className="bg-muted px-2 py-1 rounded text-xs">{project.branch}</code>
              </div>
              <div className="text-sm text-muted-foreground">
                {project.tasksCompleted}/{project.totalTasks} tasks
              </div>
            </div>

            <div className="mt-3 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(project.tasksCompleted / project.totalTasks) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectWidget;
