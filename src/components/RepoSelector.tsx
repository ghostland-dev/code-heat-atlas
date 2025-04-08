
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';
import { mockRepos } from '@/utils/mockData';

interface RepoSelectorProps {
  onSelectRepo: (repoId: string) => void;
}

const RepoSelector = ({ onSelectRepo }: RepoSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  
  const filteredRepos = mockRepos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectRepo = (repoId: string) => {
    setSelectedRepo(repoId);
  };
  
  const handleAnalyzeClick = () => {
    if (selectedRepo) {
      onSelectRepo(selectedRepo);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Select a repository to analyze</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={handleAnalyzeClick} disabled={!selectedRepo} className="gap-2">
            Analyze <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredRepos.length > 0 ? (
            filteredRepos.map(repo => (
              <div
                key={repo.id}
                onClick={() => handleSelectRepo(repo.id)}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-colors hover:bg-secondary ${
                  selectedRepo === repo.id ? 'bg-secondary border border-primary' : 'border border-border'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-sm text-muted-foreground">{repo.owner}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No repositories found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoSelector;
