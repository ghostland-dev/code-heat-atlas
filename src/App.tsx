
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Documentation from "./pages/Documentation";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { handleGitHubCallback, LocalAuthProvider } from "./utils/authUtils";

// Component to handle GitHub OAuth callback
const GitHubCallbackHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.search.includes('code=')) {
      handleGitHubCallback();
    }
  }, [location]);
  
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <GitHubCallbackHandler />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalAuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <AppRoutes />
            <SonnerToaster />
          </TooltipProvider>
        </BrowserRouter>
      </LocalAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
