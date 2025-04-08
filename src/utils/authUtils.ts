
import { toast } from "sonner";

// Parse query parameters from URL
export const parseQueryParams = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(queryString);
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return params;
};

// Check if the current URL has an OAuth code from GitHub
export const handleGitHubCallback = async (): Promise<string | null> => {
  const params = parseQueryParams(window.location.search);
  
  if (params.code) {
    try {
      // In a production app, you would send this code to your backend
      // The backend would exchange it for an access token using the client secret
      // For now, we'll simulate a successful authentication
      
      // Remove the code from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Store some indicator that we're authenticated
      localStorage.setItem('github_authenticated', 'true');
      
      toast.success('Successfully connected to GitHub!', {
        description: 'Your GitHub account is now connected to CodeAtlas.'
      });
      
      return params.code;
    } catch (error) {
      console.error('Error during GitHub authentication:', error);
      toast.error('GitHub authentication failed', {
        description: 'Could not complete the authentication process.'
      });
    }
  }
  
  return null;
};

// Check if user is authenticated with GitHub
export const isGitHubAuthenticated = (): boolean => {
  return localStorage.getItem('github_authenticated') === 'true';
};

// Handle logout
export const logout = (): void => {
  localStorage.removeItem('github_authenticated');
  toast.info('Logged out successfully');
};
