
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { toast } from "sonner";

const NavBar = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGithubAuth = async () => {
    setIsAuthenticating(true);
    
    try {
      // Redirect to GitHub OAuth flow
      const clientId = "Ov23li0znIUjOjqAVNgn";
      const redirectUri = window.location.origin;
      const scope = "repo,user";
      
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      
      // Redirect to GitHub for authentication
      window.location.href = githubUrl;
    } catch (error) {
      console.error("GitHub authentication error:", error);
      toast.error("Authentication failed", {
        description: "There was an error connecting to GitHub. Please try again."
      });
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="font-bold text-xl text-primary">CodeAtlas</div>
        <span className="bg-secondary px-2 py-0.5 rounded text-xs">BETA</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Reports</Button>
          <Button variant="ghost">Settings</Button>
        </nav>
        
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
      </div>
    </div>
  );
};

export default NavBar;
