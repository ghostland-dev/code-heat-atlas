
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { toast } from "sonner";
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { useLocalAuth } from '@/utils/authUtils';

const NavBar = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useLocalAuth();

  const handleGithubAuth = async () => {
    setIsAuthenticating(true);
    
    try {
      // Try to connect to GitHub
      const clientId = "Ov23li0znIUjOjqAVNgn";
      const redirectUri = window.location.origin;
      const scope = "repo,user";
      
      try {
        // Check if GitHub is accessible first
        const response = await fetch('https://github.com', { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
        });
        
        // If we get here, GitHub might be accessible
        const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = githubUrl;
      } catch (e) {
        // GitHub is likely blocked, use local auth instead
        console.error("GitHub connection failed, using local auth instead");
        login("demo@example.com", "DemoUser");
        toast.success("Signed in with local credentials", {
          description: "Using demo mode since GitHub is unavailable"
        });
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed", {
        description: "There was an error connecting. Please try again or use local sign in."
      });
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold text-xl text-primary">CodeAtlas</Link>
        <span className="bg-secondary px-2 py-0.5 rounded text-xs">BETA</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/reports">Reports</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings">Settings</Link>
          </Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleGithubAuth}
            disabled={isAuthenticating}
          >
            <Github className="h-4 w-4" />
            <span>{isAuthenticating ? "Connecting..." : "Connect GitHub"}</span>
          </Button>
          
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
