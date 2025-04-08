
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from "lucide-react";
import { toast } from "sonner";
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { useLocalAuth, initiateGitHubAuth } from '@/utils/authUtils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login } = useLocalAuth();

  const handleGithubAuth = async () => {
    setIsAuthenticating(true);
    
    try {
      // Try to connect to GitHub
      initiateGitHubAuth();
    } catch (error) {
      // GitHub is likely blocked, use local auth instead
      console.error("GitHub connection failed, using local auth instead");
      login("demo@example.com", "DemoUser");
      toast.success("Signed in with local credentials", {
        description: "Using demo mode since GitHub is unavailable"
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/reports', label: 'Reports' },
    { path: '/projects', label: 'Projects' },
    { path: '/docs', label: 'Documentation' },
  ];

  return (
    <div className="w-full flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold text-xl text-primary">CodeAtlas</Link>
        <span className="bg-secondary px-2 py-0.5 rounded text-xs">BETA</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <nav className="flex space-x-1">
          {navItems.map((item) => (
            <Button key={item.path} variant="ghost" asChild>
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
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

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between pb-4 border-b">
                <span className="font-bold text-xl text-primary">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-1 py-4">
                {navItems.map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="justify-start" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to="/settings">Settings</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start" 
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to="/profile">Profile</Link>
                </Button>
              </nav>
              
              <div className="mt-auto pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleGithubAuth}
                  disabled={isAuthenticating}
                >
                  <Github className="h-4 w-4" />
                  <span>{isAuthenticating ? "Connecting..." : "Connect GitHub"}</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <UserProfile />
      </div>
    </div>
  );
};

export default NavBar;
