
import React, { useState, useEffect, useRef } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const repoListRef = useRef<HTMLDivElement>(null);
  
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

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredRepos.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev === null ? 0 : Math.min(prev + 1, filteredRepos.length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev === null ? filteredRepos.length - 1 : Math.max(prev - 1, 0)
        );
        break;
      case 'Enter':
        if (focusedIndex !== null) {
          handleSelectRepo(filteredRepos[focusedIndex].id);
        } else if (selectedRepo) {
          handleAnalyzeClick();
        }
        break;
      case 'Escape':
        setSearchTerm('');
        setFocusedIndex(null);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        break;
    }
  };
  
  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex !== null && repoListRef.current) {
      const focusedElement = repoListRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex]);
  
  return (
    <Card className="w-full max-w-3xl transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Select a repository to analyze</CardTitle>
      </CardHeader>
      <CardContent onKeyDown={handleKeyDown}>
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFocusedIndex(null);
              }}
              className="pl-8"
              aria-label="Search repositories"
            />
          </div>
          <Button 
            onClick={handleAnalyzeClick} 
            disabled={!selectedRepo} 
            className="gap-2 transition-all duration-300"
            aria-label="Analyze selected repository"
          >
            Analyze <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div 
          ref={repoListRef}
          className="space-y-2 max-h-96 overflow-y-auto scroll-smooth"
          role="listbox"
          aria-label="Repository list"
        >
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, index) => (
              <div
                key={repo.id}
                onClick={() => handleSelectRepo(repo.id)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                  selectedRepo === repo.id 
                    ? 'bg-secondary border border-primary' 
                    : focusedIndex === index
                    ? 'bg-secondary/50 border border-border'
                    : 'border border-border hover:bg-secondary/30'
                }`}
                role="option"
                aria-selected={selectedRepo === repo.id}
                tabIndex={0}
              >
                <div className="flex-1">
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-sm text-muted-foreground">{repo.owner}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    repo.language === 'TypeScript' ? 'bg-blue-500/20 text-blue-400' :
                    repo.language === 'JavaScript' ? 'bg-yellow-500/20 text-yellow-400' :
                    repo.language === 'Python' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {repo.language}
                  </span>
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
