
import React from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const RecentCalls: React.FC = () => {
  const { calls, parents } = useApp();
  
  // Get recent calls sorted by date
  const recentCalls = calls
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // If no recent calls, create demo data
  const demoRecent = [
    {
      id: "demo-3",
      parentName: parents[0]?.name || "Parent",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      duration: 8,
      status: "completed",
    },
    {
      id: "demo-4",
      parentName: parents[0]?.name || "Parent",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      duration: 6,
      status: "completed",
    },
  ];
  
  const displayCalls = recentCalls.length > 0 ? recentCalls : demoRecent;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Calls</CardTitle>
        <Button size="sm" variant="ghost" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayCalls.map((call) => (
            <div 
              key={call.id} 
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <div className="font-medium">{call.parentName}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDate(call.date)}
                  {call.duration && (
                    <span className="ml-2">({call.duration} min)</span>
                  )}
                </div>
              </div>
              <div>{getStatusBadge(call.status)}</div>
            </div>
          ))}
          
          {displayCalls.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No recent calls.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCalls;
