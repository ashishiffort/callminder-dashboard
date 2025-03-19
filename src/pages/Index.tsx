
import React, { useState, useEffect } from "react";
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
import { PhoneCall, Heart, CalendarClock, ChevronRight, LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { authUser } = useApp();
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

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
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button variant="outline" onClick={() => navigate("/signup")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </div>
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
            
            <div className="pt-4">
              <Button size="lg" onClick={() => navigate("/signup")}>
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1605457867610-e990b283f516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Family connection" 
              className="rounded-lg shadow-lg w-full"
            />
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
