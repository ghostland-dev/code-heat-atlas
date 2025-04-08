
export interface FileMetrics {
  id: string;
  path: string;
  language: string;
  linesOfCode: number;
  complexity: number; // 0-100
  coverage: number; // 0-100
  duplications: number; // percentage
  bugs: number;
  vulnerabilities: number;
  lastModified: string; // ISO date string
  contributors: number;
}

export interface DirectoryMetrics {
  id: string;
  name: string;
  path: string;
  complexity: number; // 0-100
  linesOfCode: number;
  files: number;
  bugsCount: number;
  vulnerabilitiesCount: number;
}

export interface RepoMetrics {
  name: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  totalFiles: number;
  totalLines: number;
  languages: { [key: string]: number };
  overallHealth: number; // 0-100
}

// Sample repository data
export const mockRepos = [
  { id: "1", name: "frontend-app", owner: "acme-corp" },
  { id: "2", name: "backend-api", owner: "acme-corp" },
  { id: "3", name: "data-processing", owner: "acme-corp" }
];

// Sample repository metrics
export const mockRepoMetrics: RepoMetrics = {
  name: "frontend-app",
  stars: 124,
  forks: 45,
  issues: 23,
  pullRequests: 7,
  totalFiles: 782,
  totalLines: 104532,
  languages: {
    JavaScript: 45,
    TypeScript: 30,
    CSS: 15,
    HTML: 10
  },
  overallHealth: 78
};

// Sample directories with metrics
export const mockDirectories: DirectoryMetrics[] = [
  {
    id: "d1",
    name: "src/components",
    path: "src/components",
    complexity: 68,
    linesOfCode: 23455,
    files: 46,
    bugsCount: 15,
    vulnerabilitiesCount: 3
  },
  {
    id: "d2",
    name: "src/services",
    path: "src/services",
    complexity: 85,
    linesOfCode: 8234,
    files: 12,
    bugsCount: 23,
    vulnerabilitiesCount: 7
  },
  {
    id: "d3",
    name: "src/utils",
    path: "src/utils",
    complexity: 42,
    linesOfCode: 3427,
    files: 8,
    bugsCount: 6,
    vulnerabilitiesCount: 1
  },
  {
    id: "d4",
    name: "src/pages",
    path: "src/pages",
    complexity: 59,
    linesOfCode: 12456,
    files: 24,
    bugsCount: 18,
    vulnerabilitiesCount: 4
  },
  {
    id: "d5",
    name: "tests",
    path: "tests",
    complexity: 28,
    linesOfCode: 5670,
    files: 32,
    bugsCount: 3,
    vulnerabilitiesCount: 0
  }
];

// Sample files with metrics
export const mockFiles: FileMetrics[] = [
  {
    id: "f1",
    path: "src/components/DataTable.tsx",
    language: "TypeScript",
    linesOfCode: 457,
    complexity: 82,
    coverage: 35,
    duplications: 12,
    bugs: 8,
    vulnerabilities: 2,
    lastModified: "2025-03-12T09:23:45Z",
    contributors: 5
  },
  {
    id: "f2",
    path: "src/components/AuthProvider.tsx",
    language: "TypeScript",
    linesOfCode: 285,
    complexity: 76,
    coverage: 42,
    duplications: 5,
    bugs: 4,
    vulnerabilities: 3,
    lastModified: "2025-03-30T14:17:23Z",
    contributors: 3
  },
  {
    id: "f3",
    path: "src/services/api.ts",
    language: "TypeScript",
    linesOfCode: 623,
    complexity: 91,
    coverage: 28,
    duplications: 18,
    bugs: 12,
    vulnerabilities: 4,
    lastModified: "2025-04-02T11:45:30Z",
    contributors: 7
  },
  {
    id: "f4",
    path: "src/utils/formatting.ts",
    language: "TypeScript",
    linesOfCode: 124,
    complexity: 45,
    coverage: 78,
    duplications: 2,
    bugs: 1,
    vulnerabilities: 0,
    lastModified: "2025-03-18T08:12:55Z",
    contributors: 2
  },
  {
    id: "f5",
    path: "src/pages/Dashboard.tsx",
    language: "TypeScript",
    linesOfCode: 342,
    complexity: 64,
    coverage: 45,
    duplications: 8,
    bugs: 6,
    vulnerabilities: 1,
    lastModified: "2025-04-05T17:34:22Z",
    contributors: 4
  }
];
