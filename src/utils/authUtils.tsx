
import { toast } from "sonner";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Parse query parameters from URL
export const parseQueryParams = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(queryString);
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return params;
};

interface User {
  email: string;
  name: string;
  avatarUrl?: string;
}

interface LocalAuthContextProps {
  user: User | null;
  isLocalAuthenticated: boolean;
  login: (email: string, name: string, avatarUrl?: string) => void;
  logout: () => void;
}

const LocalAuthContext = createContext<LocalAuthContextProps>({
  user: null,
  isLocalAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const LocalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check local storage for user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  const login = (email: string, name: string, avatarUrl?: string) => {
    const user = { email, name, avatarUrl };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authenticated', 'true');
  };
  
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('github_authenticated');
  };
  
  return (
    <LocalAuthContext.Provider
      value={{
        user,
        isLocalAuthenticated: Boolean(user),
        login,
        logout: logoutUser
      }}
    >
      {children}
    </LocalAuthContext.Provider>
  );
};

export const useLocalAuth = () => useContext(LocalAuthContext);

// Check if the current URL has an OAuth code from GitHub
export const handleGitHubCallback = async (): Promise<string | null> => {
  const params = parseQueryParams(window.location.search);
  
  if (params.code) {
    try {
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

// Handle logout from the app
export const logout = (): void => {
  localStorage.removeItem('github_authenticated');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('user');
  toast.info('Logged out successfully');
};
