
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  BarChart2, 
  Code, 
  FileText, 
  Home, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Reports', path: '/reports', icon: BarChart2 },
    { name: 'Projects', path: '/projects', icon: Code },
    { name: 'Documentation', path: '/docs', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "min-h-screen border-r border-border bg-card transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="font-bold text-xl text-primary">CodeAtlas</div>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="flex items-center justify-center w-full">
            <div className="font-bold text-xl text-primary">CA</div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full flex items-center justify-center"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
