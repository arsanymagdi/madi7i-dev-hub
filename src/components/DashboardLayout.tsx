
import { Bell, Plus, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-dev-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M7</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gradient">Madi7i Dev Pro</h1>
                <p className="text-xs text-muted-foreground">Developer Dashboard</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">v2.1.0</Badge>
              <Badge variant="outline" className="text-xs text-green-500 border-green-500/20">
                Online
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search projects, tasks..." 
                className="w-64 pl-10 bg-muted/50"
              />
            </div>
            
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              New
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>

      {/* Status Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected to Firebase
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              GitHub Synced
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Google Calendar
            </span>
          </div>
          <div className="hidden md:block">
            Last updated: 2 minutes ago
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
