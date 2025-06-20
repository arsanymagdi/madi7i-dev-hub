
import { useState } from "react";
import { Bell, Plus, Settings, Search, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, userData, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">M7</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <DashboardSidebar className="border-none" />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M7</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Madi7i Dev Pro</h1>
                <p className="text-xs text-muted-foreground">Developer Dashboard</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              <Badge variant="outline" className="text-xs text-green-500 border-green-500/20">
                Online
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search projects, tasks..." 
                className="w-48 xl:w-64 pl-10 bg-muted/50"
              />
            </div>
            
            <Button size="sm" className="gap-2 hidden sm:flex">
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">New</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Plus className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData?.photoURL} alt={userData?.displayName} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userData?.displayName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        {children}
      </main>

      {/* Status Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Connected to Firebase</span>
              <span className="sm:hidden">Firebase</span>
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Realtime Database</span>
              <span className="sm:hidden">Database</span>
            </span>
          </div>
          <div className="hidden lg:block whitespace-nowrap">
            Last updated: just now
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
