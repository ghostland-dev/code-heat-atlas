
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, GitBranch, Star, Check, Plus } from 'lucide-react';

const mockProjects = [
  {
    id: "proj-1",
    name: "Frontend Redesign",
    description: "Complete UI/UX overhaul of the customer dashboard",
    language: "TypeScript",
    stars: 12,
    status: "in-progress",
    branches: 4,
    lastUpdated: "2 days ago",
    progress: 65,
  },
  {
    id: "proj-2",
    name: "API Integration",
    description: "Connect to third-party payment gateways and analytics APIs",
    language: "JavaScript",
    stars: 8,
    status: "completed",
    branches: 2,
    lastUpdated: "1 week ago",
    progress: 100,
  },
  {
    id: "proj-3",
    name: "Backend Optimization",
    description: "Improve database queries and server response time",
    language: "Python",
    stars: 15,
    status: "planning",
    branches: 1,
    lastUpdated: "3 days ago",
    progress: 20,
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <NavBar />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Projects</TabsTrigger>
              <TabsTrigger value="in-progress" onClick={() => setActiveTab("in-progress")}>In Progress</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed</TabsTrigger>
              <TabsTrigger value="planning" onClick={() => setActiveTab("planning")}>Planning</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects
              .filter(project => activeTab === "all" || project.status === activeTab)
              .map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        <span>{project.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-4 w-4" />
                        <span>{project.branches}</span>
                      </div>
                    </div>
                    
                    <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full ${
                          project.status === "completed" ? "bg-green-500" : "bg-primary"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <Badge variant={
                      project.status === "completed" ? "default" :
                      project.status === "in-progress" ? "secondary" : "outline"
                    }>
                      {project.status === "in-progress" ? "In Progress" :
                       project.status === "completed" ? 
                       <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Complete</span> : 
                       "Planning"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Updated {project.lastUpdated}</span>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Projects;
