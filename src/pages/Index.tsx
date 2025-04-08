
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import RepoSelector from '@/components/RepoSelector';
import CodeVisualization from '@/components/CodeVisualization';
import MetricsPanel from '@/components/MetricsPanel';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Index = () => {
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectRepo = (repoId: string) => {
    setIsAnalyzing(true);
    setSelectedRepoId(repoId);
    
    // Simulate loading
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('Repository analysis complete!', {
        description: 'Technical debt visualization is ready to explore.'
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          {!selectedRepoId ? (
            <>
              <h1 className="text-4xl font-bold text-center mt-10 mb-4">Code Complexity Atlas</h1>
              <p className="text-center text-muted-foreground max-w-2xl mb-10">
                Visualize your code's complexity and identify technical debt hotspots with 
                our powerful 3D visualization. Connect your GitHub repository to get started.
              </p>
              <div className="w-full flex justify-center mb-10">
                <RepoSelector onSelectRepo={handleSelectRepo} />
              </div>
            </>
          ) : (
            <>
              <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">Technical Debt Analysis</h1>
                <p className="text-muted-foreground mt-1">
                  Exploring complexity patterns and potential issues across your codebase
                </p>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                <div className="xl:col-span-2">
                  <CodeVisualization isLoading={isAnalyzing} />
                </div>
                <div>
                  <MetricsPanel isLoading={isAnalyzing} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
