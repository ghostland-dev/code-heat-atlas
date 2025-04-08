
import React from 'react';
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { Search, FileText, Book, Info } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Documentation = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <NavBar />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Documentation</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Contents</CardTitle>
                    <CardDescription>Navigate the documentation</CardDescription>
                    
                    <div className="relative mt-2">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search documentation..." className="pl-8" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-1">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <a href="#getting-started">
                          <Book className="mr-2 h-4 w-4" />
                          Getting Started
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <a href="#api-reference">
                          <Code className="mr-2 h-4 w-4" />
                          API Reference
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <a href="#examples">
                          <FileText className="mr-2 h-4 w-4" />
                          Examples
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <a href="#faq">
                          <Info className="mr-2 h-4 w-4" />
                          FAQ
                        </a>
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <section id="getting-started" className="mb-10">
                <h2 className="text-xl font-bold mb-4">Getting Started</h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">
                      CodeAtlas helps you analyze and visualize code complexity in your repositories, 
                      enabling you to identify technical debt and improve code quality.
                    </p>
                    
                    <h3 className="text-lg font-medium mb-2">Quick Start</h3>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                      <li>Connect your GitHub repository</li>
                      <li>Select the repository you want to analyze</li>
                      <li>View the visualization and metrics</li>
                      <li>Generate reports and share with your team</li>
                    </ol>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm">
                        <strong>Note:</strong> You need to authenticate with GitHub to access private repositories.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              <section id="api-reference" className="mb-10">
                <h2 className="text-xl font-bold mb-4">API Reference</h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">
                      Our API allows you to integrate CodeAtlas's analysis capabilities into your own tools and workflows.
                    </p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="authentication">
                        <AccordionTrigger>Authentication</AccordionTrigger>
                        <AccordionContent>
                          <p className="mb-2">All API requests require authentication using a token.</p>
                          <pre className="bg-muted p-3 rounded-md overflow-x-auto">
                            <code>
                              Authorization: Bearer YOUR_API_TOKEN
                            </code>
                          </pre>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="endpoints">
                        <AccordionTrigger>Endpoints</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            <li><code>/api/repos</code> - List repositories</li>
                            <li><code>/api/repos/:id/analysis</code> - Get analysis for a repository</li>
                            <li><code>/api/reports</code> - Generate and list reports</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
              
              <section id="examples" className="mb-10">
                <h2 className="text-xl font-bold mb-4">Examples</h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">
                      Here are some examples of how to use CodeAtlas in different scenarios.
                    </p>
                    
                    <h3 className="text-lg font-medium mb-2">Code Complexity Analysis</h3>
                    <p className="mb-4">
                      Identify complex code that might need refactoring by exploring the 3D visualization.
                      Larger nodes represent files with higher complexity.
                    </p>
                    
                    <h3 className="text-lg font-medium mb-2">Technical Debt Tracking</h3>
                    <p className="mb-4">
                      Track technical debt over time and see how code quality evolves with each commit.
                      Use the metrics panel to get detailed information about specific files and packages.
                    </p>
                  </CardContent>
                </Card>
              </section>
              
              <section id="faq" className="mb-10">
                <h2 className="text-xl font-bold mb-4">FAQ</h2>
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1">
                        <AccordionTrigger>How is code complexity calculated?</AccordionTrigger>
                        <AccordionContent>
                          Code complexity is calculated using a combination of metrics including cyclomatic complexity, 
                          lines of code, number of dependencies, and other factors that contribute to the overall 
                          complexity of the codebase.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-2">
                        <AccordionTrigger>Can I analyze private repositories?</AccordionTrigger>
                        <AccordionContent>
                          Yes, you can analyze private repositories by connecting your GitHub account and 
                          granting the necessary permissions to access your private repositories.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-3">
                        <AccordionTrigger>How frequently is the analysis updated?</AccordionTrigger>
                        <AccordionContent>
                          The analysis is updated each time you run it manually. You can also set up 
                          automatic analysis on a schedule or triggered by new commits.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Documentation;
