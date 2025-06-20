
import { 
  Calendar, 
  MessageCircle, 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Wrench, 
  Bell
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderOpen, label: "Projects", href: "/projects" },
  { icon: Users, label: "Teams", href: "/teams" },
  { icon: MessageCircle, label: "Chat", href: "/chat", badge: 3 },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Wrench, label: "Dev Tools", href: "/tools" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 5 },
];

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className }: DashboardSidebarProps) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "w-64 md:w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full",
      className
    )}>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-gradient rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-base">M7</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground text-sm md:text-base">Madi7i Dev</h2>
            <p className="text-xs text-sidebar-foreground/60">Core Team</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 md:px-4">
        <ul className="space-y-1 md:space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "nav-item text-sm md:text-base",
                    isActive && "active"
                  )}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 md:px-2 py-0.5 rounded-full min-w-[1rem] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 md:p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-1">
            Pro Feature
          </h3>
          <p className="text-xs text-sidebar-foreground/70 mb-2">
            Unlock AI-powered code reviews and smart task breakdown
          </p>
          <button className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-md hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
