
import React from "react";
import { useApp } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ParentSettings } from "@/components/settings/ParentSettings";
import { Badge } from "@/components/ui/badge";

const Settings: React.FC = () => {
  const { user, balance } = useApp();
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Settings</h1>
        </div>
        
        <Tabs defaultValue="account">
          <TabsList className="mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="parents">
            <ParentSettings />
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Retell API Integration</CardTitle>
                <CardDescription>
                  Configure your Retell AI integration for automated calls.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Retell API Key</Label>
                  <Input 
                    id="apiKey" 
                    type="password" 
                    defaultValue={user?.retellApiKey} 
                    placeholder="Enter your Retell API Key" 
                  />
                  <p className="text-sm text-muted-foreground">
                    You can find your API key in your Retell dashboard.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="agentOptions">Agent Configuration</Label>
                  <Textarea 
                    id="agentOptions" 
                    placeholder='{"voice_id": "eleven-labs-voice", "llm_model": "gpt-4", ...}'
                    className="font-mono text-sm h-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Optional: Configure advanced agent options in JSON format.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save API Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Current Balance</span>
                    <span>{balance} credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Plan</span>
                    <Badge>Free Trial</Badge>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Purchase Credits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">50</div>
                        <div className="text-muted-foreground mb-2">credits</div>
                        <div className="font-medium mb-4">$9.99</div>
                        <Button variant="outline" className="w-full">Buy</Button>
                      </div>
                    </Card>
                    <Card className="p-4 border-primary">
                      <div className="text-center">
                        <div className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full inline-block mb-2">Popular</div>
                        <div className="text-2xl font-bold">200</div>
                        <div className="text-muted-foreground mb-2">credits</div>
                        <div className="font-medium mb-4">$29.99</div>
                        <Button className="w-full">Buy</Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">500</div>
                        <div className="text-muted-foreground mb-2">credits</div>
                        <div className="font-medium mb-4">$59.99</div>
                        <Button variant="outline" className="w-full">Buy</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
