
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { isGitHubAuthenticated, logout, useLocalAuth } from '@/utils/authUtils';
import { Link } from "react-router-dom";
import { toast } from 'sonner';

const UserProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isGitHubAuthenticated());
  const { login, user, isLocalAuthenticated, logout: localLogout } = useLocalAuth();
  
  const handleLogout = () => {
    logout();
    localLogout();
    setIsAuthenticated(false);
  };
  
  const handleAuth = () => {
    try {
      // Try GitHub auth first
      const clientId = "Ov23li0znIUjOjqAVNgn";
      const redirectUri = window.location.origin;
      const scope = "repo,user";
      
      fetch('https://github.com', { 
        method: 'HEAD', 
        mode: 'no-cors',
        cache: 'no-cache',
      })
      .then(() => {
        const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = githubUrl;
      })
      .catch(() => {
        // GitHub is unavailable, use local auth
        login("demo@example.com", "DemoUser");
        toast.success("Signed in with local credentials", {
          description: "Using demo mode since GitHub is unavailable"
        });
      });
    } catch (e) {
      // Fallback to local auth
      login("demo@example.com", "DemoUser");
      toast.success("Signed in with local credentials");
    }
  };

  if (!isAuthenticated && !isLocalAuthenticated) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={handleAuth}
      >
        <User className="h-4 w-4" />
        <span>Sign In</span>
      </Button>
    );
  }

  const userName = user?.name || "GitHub User";
  const userEmail = user?.email || "user@example.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard">
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
