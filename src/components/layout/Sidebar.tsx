
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Home,
  PhoneCall,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/call-history", label: "Call History", icon: PhoneCall },
  { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-16 md:w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold hidden md:block">CallMinder</h2>
      </div>
      <nav className="mt-8 flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  location.pathname === item.href && "bg-sidebar-accent text-primary font-medium"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
