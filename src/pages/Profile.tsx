
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, Key, Github, LogOut } from 'lucide-react';
import { useLocalAuth } from '@/utils/authUtils';
import { toast } from "sonner";

const Profile = () => {
  const { user, isLocalAuthenticated, logout } = useLocalAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name || '',
        email: user.email || '',
        avatarUrl: user.avatarUrl || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (!isLocalAuthenticated) {
    return (
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>You need to be logged in to view your profile</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/">Go to Login</a>
                </Button>
              </CardFooter>
            </Card>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <NavBar />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader className="pb-2 text-center">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={userProfile.avatarUrl || "https://github.com/shadcn.png"} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-2">{userProfile.name}</CardTitle>
                  <CardDescription>{userProfile.email}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex-col space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Connect GitHub
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Information</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            placeholder="Your name" 
                            value={userProfile.name} 
                            onChange={handleInputChange}
                            disabled={!isEditing} 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            name="email"
                            placeholder="Your email" 
                            value={userProfile.email} 
                            onChange={handleInputChange}
                            disabled={!isEditing} 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="avatarUrl">Avatar URL</Label>
                          <Input 
                            id="avatarUrl" 
                            name="avatarUrl"
                            placeholder="https://example.com/avatar.png" 
                            value={userProfile.avatarUrl} 
                            onChange={handleInputChange}
                            disabled={!isEditing} 
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {isEditing && (
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your password and security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" disabled={!isEditing} />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" disabled={!isEditing} />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" disabled={!isEditing} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between w-full items-center">
                        <Button variant="outline" className="gap-2">
                          <Key className="h-4 w-4" />
                          Generate API Key
                        </Button>
                        
                        {isEditing && (
                          <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Customize your application experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Preference settings will be available in a future update.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
