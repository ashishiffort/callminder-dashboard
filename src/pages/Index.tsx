
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneCall, Heart, CalendarClock, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const handleGetStarted = () => {
    if (email && name) {
      setUser({
        name,
        email,
      });
      navigate("/onboarding");
    }
  };

  const features = [
    {
      icon: PhoneCall,
      title: "AI-Powered Calls",
      description: "Connect with your parents through natural, AI-assisted calls that feel personal and caring.",
    },
    {
      icon: Heart,
      title: "Health Insights",
      description: "Track health patterns and well-being through conversation analysis.",
    },
    {
      icon: CalendarClock,
      title: "Flexible Scheduling",
      description: "Set up regular check-ins at times that work best for your parents.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">CallMinder</div>
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          Login
        </Button>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Stay Connected with Your Parents Through AI-Powered Calls
            </h1>
            <p className="text-xl text-muted-foreground">
              CallMinder helps you check in on your parents regularly with AI-assisted calls,
              providing peace of mind and maintaining meaningful connections.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {features.map((feature, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Begin your journey to better parent check-ins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleGetStarted}
                  disabled={!email || !name}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 mt-12 border-t">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CallMinder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
