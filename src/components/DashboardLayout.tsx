import { ReactNode } from "react";
import {
  Home,
  User,
  Compass,
  Users,
  MessageSquare,
  Award,
  LogOut,
  Calendar,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { logout } from "@/api/auth";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "mentor";
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const location = useLocation();
  const basePath = `/${userType}-dashboard`;

  const studentNavItems = [
    { icon: Home, label: "Dashboard", path: basePath },
    { icon: User, label: "Profile", path: `${basePath}/profile` },
    { icon: Compass, label: "Explore Posts", path: `${basePath}/explore` },
    { icon: Users, label: "Find My Mentor", path: `${basePath}/find-mentor` },
    { icon: MessageSquare, label: "Chats", path: `${basePath}/chats` },
    { icon: Award, label: "Rewards", path: `${basePath}/rewards` },
  ];

  const mentorNavItems = [
    { icon: Home, label: "Dashboard", path: basePath },
    { icon: User, label: "Profile", path: `${basePath}/profile` },
    { icon: Calendar, label: "My Sessions", path: `${basePath}/sessions` },
    { icon: MessageSquare, label: "Chats", path: `${basePath}/chats` },
  ];

  const navItems = userType === "student" ? studentNavItems : mentorNavItems;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">MentorHub</h2>
          <p className="text-sm text-muted-foreground capitalize">{userType}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
