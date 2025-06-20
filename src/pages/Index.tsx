
import DashboardLayout from "@/components/DashboardLayout";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProjectWidget from "@/components/widgets/ProjectWidget";
import TeamActivityWidget from "@/components/widgets/TeamActivityWidget";
import DevToolsWidget from "@/components/widgets/DevToolsWidget";
import MetricsWidget from "@/components/widgets/MetricsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  Zap, 
  Coffee,
  Rocket,
  Star
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1">
        <DashboardLayout>
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, <span className="text-gradient">Arsani</span> 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-2">
                  <Coffee className="w-4 h-4" />
                  Focus Mode
                </Badge>
                <Button className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Deploy Project
                </Button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Today's Meetings</div>
                      <div className="text-xl font-bold">4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Unread Messages</div>
                      <div className="text-xl font-bold">12</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Pending Reviews</div>
                      <div className="text-xl font-bold">7</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">API Calls Today</div>
                      <div className="text-xl font-bold">2.4k</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Widgets Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <ProjectWidget />
            </div>
            <div>
              <MetricsWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <TeamActivityWidget />
            <DevToolsWidget />
          </div>

          {/* Quick Actions */}
          <Card className="dev-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm">Team Chat</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-sm">Run Tests</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Rocket className="w-6 h-6" />
                  <span className="text-sm">Deploy</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Index;
