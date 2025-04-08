
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Download, FileText, Filter } from "lucide-react";
import { mockRepoMetrics, mockFiles } from "@/utils/mockData";

// Transform data for charts
const complexityData = mockFiles
  .sort((a, b) => b.complexity - a.complexity)
  .slice(0, 10)
  .map(file => ({
    name: file.path.split('/').pop() || file.path,
    value: file.complexity
  }));

const coverageData = mockFiles
  .sort((a, b) => a.coverage - b.coverage)
  .slice(0, 10)
  .map(file => ({
    name: file.path.split('/').pop() || file.path,
    value: file.coverage
  }));

const Reports = () => {
  const [timeframe, setTimeframe] = useState("30days");
  const [currentRepo, setCurrentRepo] = useState("all");
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">Analytics and insights about your codebase</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Technical Debt Overview</CardTitle>
                <CardDescription>
                  Summary of technical debt and code health metrics
                </CardDescription>
              </div>
              
              <div className="flex gap-4">
                <Select value={currentRepo} onValueChange={setCurrentRepo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select repository" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All repositories</SelectItem>
                    <SelectItem value="repo1">Repository 1</SelectItem>
                    <SelectItem value="repo2">Repository 2</SelectItem>
                    <SelectItem value="repo3">Repository 3</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-1">Overall Health</h3>
                  <div className="text-3xl font-bold">{mockRepoMetrics.overallHealth}/100</div>
                  <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${mockRepoMetrics.overallHealth}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {mockRepoMetrics.overallHealth >= 80 
                      ? 'Good health score' 
                      : 'Needs improvement'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-1">Technical Debt</h3>
                  <div className="text-3xl font-bold">
                    {mockRepoMetrics.technicalDebt || '24'} days
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Estimated time to address all issues
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-1">Critical Issues</h3>
                  <div className="text-3xl font-bold text-red-500">
                    {mockRepoMetrics.criticalIssues || '8'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    High-priority items needing attention
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="complexity">
              <TabsList className="mb-4">
                <TabsTrigger value="complexity">Complexity</TabsTrigger>
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="complexity">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Top 10 Complex Files</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={complexityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          width={150}
                        />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="coverage">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Test Coverage by File</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={coverageData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          width={150}
                        />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <div className="flex items-center justify-center p-12 text-center bg-muted rounded-lg">
                  <div className="max-w-md">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Trend data not available</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Historical data is required to generate trend reports. Analyze your repositories regularly to build trend data.
                    </p>
                    <Button>Schedule Regular Analysis</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>
              Your saved and automated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {i === 0 ? 'Monthly Code Health Report' : 
                         i === 1 ? 'Security Vulnerabilities Summary' : 
                         'Performance Bottlenecks Analysis'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Generated {i === 0 ? 'Today' : `${i * 5 + 2} days ago`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
