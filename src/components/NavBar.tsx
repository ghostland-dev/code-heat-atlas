
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const NavBar = () => {
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
        
        <Button variant="outline" size="sm" className="gap-2">
          <Github className="h-4 w-4" />
          <span>Connect GitHub</span>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
