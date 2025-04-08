
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <NavBar />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
