
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
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      
      <div className="flex-1 w-full md:w-auto">
        <DashboardLayout>
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, <span className="text-gradient">Arsani</span> 👋
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Badge variant="outline" className="gap-2 text-xs">
                  <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Focus Mode</span>
                  <span className="sm:hidden">Focus</span>
                </Badge>
                <Button className="gap-2 text-xs md:text-sm">
                  <Rocket className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Deploy Project</span>
                  <span className="sm:hidden">Deploy</span>
                </Button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-muted-foreground">Today's Meetings</div>
                      <div className="text-lg md:text-xl font-bold">4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-muted-foreground">Unread Messages</div>
                      <div className="text-lg md:text-xl font-bold">12</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Bell className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-muted-foreground">Pending Reviews</div>
                      <div className="text-lg md:text-xl font-bold">7</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-muted-foreground">API Calls Today</div>
                      <div className="text-lg md:text-xl font-bold">2.4k</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Widgets Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="xl:col-span-2">
              <ProjectWidget />
            </div>
            <div>
              <MetricsWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <TeamActivityWidget />
            <DevToolsWidget />
          </div>

          {/* Quick Actions */}
          <Card className="dev-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Star className="w-4 h-4 md:w-5 md:h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Team Chat</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Run Tests</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Deploy</span>
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
