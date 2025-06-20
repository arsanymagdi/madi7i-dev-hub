import { 
  Calendar, 
  MessageCircle, 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Wrench, 
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FolderOpen, label: "Projects", href: "/projects" },
  { icon: Users, label: "Teams", href: "/teams" },
  { icon: MessageCircle, label: "Chat", href: "/chat", badge: 3 },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Wrench, label: "Dev Tools", href: "/tools" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 5 },
];

interface DashboardSidebarProps {
  className?: string;
  currentPath?: string;
}

const DashboardSidebar = ({ className, currentPath = "/" }: DashboardSidebarProps) => {
  return (
    <aside className={cn(
      "w-64 bg-sidebar border-r border-sidebar-border flex flex-col",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-gradient rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">M7</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Madi7i Dev</h2>
            <p className="text-xs text-sidebar-foreground/60">Core Team</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "nav-item",
                    isActive && "active"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
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
