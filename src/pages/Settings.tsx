
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bell, Key, Lock, Mail, Save, User } from "lucide-react";
import { isGitHubAuthenticated, logout } from '@/utils/authUtils';
import { toast } from 'sonner';

const Settings = () => {
  const [isAuthenticated] = useState(isGitHubAuthenticated);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully');
    }, 800);
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="md:row-span-2">
          <CardContent className="p-4">
            <Tabs defaultValue="account" orientation="vertical" className="w-full">
              <TabsList className="flex flex-col items-stretch h-full space-y-1 bg-transparent">
                <TabsTrigger value="account" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="api" className="justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  API Keys
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <Tabs defaultValue="account">
            <TabsContent value="account">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and connected accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input id="company" defaultValue="" placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Position</Label>
                      <Input id="role" defaultValue="" placeholder="Enter your role" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-4">Connected Accounts</h3>
                  <div className="flex items-center justify-between py-3 px-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-zinc-900 text-white p-2 rounded-md">
                        <Github className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">
                          {isAuthenticated ? 'Connected' : 'Not connected'}
                        </div>
                      </div>
                    </div>
                    
                    {isAuthenticated ? (
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        Disconnect
                      </Button>
                    ) : (
                      <Button size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    className="gap-2"
                    onClick={handleSaveSettings}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="notifications">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about security vulnerabilities
                      </p>
                    </div>
                    <Switch
                      id="security-alerts"
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reports">Weekly Report Summary</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly code health reports
                      </p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={weeklyReports}
                      onCheckedChange={setWeeklyReports}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    className="gap-2"
                    onClick={handleSaveSettings}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="security">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Password Management</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <div className="bg-muted rounded-lg p-4 flex gap-4">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Two-factor authentication is not enabled</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button className="mt-3" variant="secondary">Enable 2FA</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Sessions</h3>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-border">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-muted-foreground">
                            Started 2 hours ago · Chrome on macOS
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <div className="font-medium">Previous Session</div>
                          <div className="text-sm text-muted-foreground">
                            2 days ago · Firefox on Windows
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Sign Out</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    className="gap-2"
                    onClick={handleSaveSettings}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="api">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for programmatic access to CodeAtlas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Your API Keys</h3>
                    <Button size="sm">Generate New Key</Button>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <Key className="h-12 w-12 text-muted-foreground mb-4" />
                    <h4 className="font-medium">No API Keys Yet</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
                      Generate your first API key to integrate CodeAtlas with your development workflow and tools.
                    </p>
                    <Button>Generate API Key</Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

// Import this at the top when using this component
const Github = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default Settings;
