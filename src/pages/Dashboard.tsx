
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Code, GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isGitHubAuthenticated } from "@/utils/authUtils";
import { mockRepos, Repository } from "@/utils/mockData";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isAuthenticated = isGitHubAuthenticated();

  // Get recent repositories (would fetch from GitHub API in a real app)
  const recentRepos: Repository[] = mockRepos.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track and manage your codebase health</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button asChild className="gap-2 transition-all duration-300 hover:scale-105">
            <Link to="/">
              <Activity className="h-4 w-4" />
              New Analysis
            </Link>
          </Button>
        </div>
      </div>
      
      {!isAuthenticated ? (
        <Card className="mb-8 overflow-hidden">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Connect your GitHub account to view your dashboard</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Link your GitHub account to track repositories and analyze your codebase.
                Get insights into code quality, technical debt, and more.
              </p>
              <Button size="lg" className="transition-all duration-300 hover:bg-primary/90">Connect GitHub</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Repositories</p>
                    <h3 className="text-2xl font-bold">12</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Pull Requests</p>
                    <h3 className="text-2xl font-bold">24</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Commits</p>
                    <h3 className="text-2xl font-bold">345</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitCommit className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Health Score</p>
                    <h3 className="text-2xl font-bold">84/100</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Repositories</CardTitle>
                  <CardDescription>
                    Your recently analyzed repositories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRepos.map(repo => (
                      <div key={repo.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-col mb-2 sm:mb-0">
                          <div className="flex items-center gap-2 mb-1">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{repo.name}</span>
                            <Badge variant="outline" className="text-xs">{repo.language}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{repo.owner}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {repo.stars}
                          </div>
                          <Button size="sm" asChild className="transition-all duration-300 hover:scale-105">
                            <Link to={`/analyze/${repo.id}`}>
                              View Analysis
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your repository activity over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="bg-muted rounded-full p-2">
                          <GitCommit className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Repository {i+1} was analyzed</p>
                          <p className="text-sm text-muted-foreground">
                            {i === 0 ? 'Today' : `${i} day${i > 1 ? 's' : ''} ago`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Code Insights</CardTitle>
                  <CardDescription>
                    Trends and patterns across your repositories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4 transition-all duration-300 hover:bg-muted/70">
                      <h4 className="font-medium mb-2">Top Issues</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Unused dependencies across projects</li>
                        <li>Code duplication in UI components</li>
                        <li>Missing error handling in API calls</li>
                        <li>Inconsistent styling patterns</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-4 transition-all duration-300 hover:bg-muted/70">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Implement consistent error handling strategy</li>
                        <li>Refactor duplicated utility functions</li>
                        <li>Update dependencies in Repository 2</li>
                        <li>Improve test coverage in critical modules</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
