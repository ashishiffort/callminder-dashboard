
import React from "react";
import { useApp } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Clock, BarChart3, CheckCircle2 } from "lucide-react";
import UpcomingCalls from "@/components/dashboard/UpcomingCalls";
import RecentCalls from "@/components/dashboard/RecentCalls";
import InsightsSummary from "@/components/dashboard/InsightsSummary";
import ChatSummary from "@/components/dashboard/ChatSummary";

const Dashboard: React.FC = () => {
  const { balance, calls, parents } = useApp();
  
  // Calculate stats
  const completedCalls = calls.filter(
    (call) => call.status === "completed"
  ).length;
  
  const scheduledCalls = calls.filter(
    (call) => call.status === "scheduled"
  ).length;
  
  const totalCallMinutes = calls
    .filter((call) => call.status === "completed")
    .reduce((total, call) => total + call.duration, 0);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Dashboard</h1>
          <Button>Make a Call Now</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 rounded-full p-2 bg-primary/20">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">{balance}</div>
                <div className="ml-1 text-muted-foreground">credits</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 rounded-full p-2 bg-green-100 dark:bg-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-2xl font-bold">{completedCalls}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Scheduled Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold">{scheduledCalls}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Call Minutes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                  <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl font-bold">{totalCallMinutes}</div>
                <div className="ml-1 text-muted-foreground">min</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingCalls />
          </div>
          <div>
            <RecentCalls />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChatSummary />
          <InsightsSummary />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
