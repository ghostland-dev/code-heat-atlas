
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileMetrics, mockFiles, mockRepoMetrics } from '@/utils/mockData';
import { AlertTriangle, Bug, ShieldAlert, Code, Clock, Users } from 'lucide-react';

interface MetricsPanelProps {
  isLoading?: boolean;
}

const MetricsPanel = ({ isLoading = false }: MetricsPanelProps) => {
  
  const hotspots = [...mockFiles]
    .sort((a, b) => b.complexity - a.complexity)
    .slice(0, 5);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Technical Debt Insights</CardTitle>
        <CardDescription>
          Key metrics and hotspots from your codebase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4">
            {isLoading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-pulse-glow text-primary font-medium">Loading metrics...</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Overall Health</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">{mockRepoMetrics.overallHealth}/100</div>
                    <div className="h-1.5 w-full bg-secondary mt-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${mockRepoMetrics.overallHealth}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      <span>Bugs</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">{
                      mockFiles.reduce((acc, file) => acc + file.bugs, 0)
                    }</div>
                    <div className="text-muted-foreground text-sm mt-2">
                      Across {mockRepoMetrics.totalFiles} files
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>Vulnerabilities</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">{
                      mockFiles.reduce((acc, file) => acc + file.vulnerabilities, 0)
                    }</div>
                    <div className="text-muted-foreground text-sm mt-2">
                      Security issues detected
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-muted-foreground mb-2">Code Distribution</div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(mockRepoMetrics.languages).map(([lang, percentage]) => (
                        <div key={lang} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: 
                                lang === 'JavaScript' ? '#f7df1e' : 
                                lang === 'TypeScript' ? '#3178c6' : 
                                lang === 'CSS' ? '#563d7c' :
                                lang === 'HTML' ? '#e34c26' : '#6e6e6e'
                            }}
                          />
                          <span className="text-sm">{lang} <span className="text-muted-foreground">{percentage}%</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-muted-foreground mb-2">Repository Stats</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span>{mockRepoMetrics.totalLines.toLocaleString()} lines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{mockRepoMetrics.forks} forks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last updated 2d ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>{mockRepoMetrics.issues} open issues</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="hotspots">
            {isLoading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-pulse-glow text-primary font-medium">Loading hotspots...</div>
              </div>
            ) : (
              <div className="space-y-2">
                {hotspots.map((file) => (
                  <div key={file.id} className="border border-border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{file.path.split('/').pop()}</div>
                        <div className="text-sm text-muted-foreground">{file.path}</div>
                      </div>
                      <div className={`
                        px-2 py-0.5 rounded text-xs font-medium
                        ${file.complexity > 80 ? 'bg-red-500/20 text-red-400' :
                          file.complexity > 60 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'}
                      `}>
                        {file.complexity}/100
                      </div>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Lines</div>
                        <div>{file.linesOfCode}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Bugs</div>
                        <div>{file.bugs}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Coverage</div>
                        <div>{file.coverage}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Contributors</div>
                        <div>{file.contributors}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MetricsPanel;
