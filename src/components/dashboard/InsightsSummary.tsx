
import React from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, AlertCircle, Tag, MessageSquare } from "lucide-react";

const InsightsSummary: React.FC = () => {
  const { calls } = useApp();
  
  // Sample insights data (would come from actual call data in production)
  const insightData = [
    {
      id: "insight-1",
      type: "health",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-100",
      content: "Mentioned having joint pain in the morning",
      priority: "medium",
    },
    {
      id: "insight-2",
      type: "concern",
      icon: AlertCircle,
      color: "text-amber-500",
      bg: "bg-amber-100",
      content: "Expressed feeling lonely on weekends",
      priority: "high",
    },
    {
      id: "insight-3",
      type: "need",
      icon: Tag,
      color: "text-blue-500",
      bg: "bg-blue-100",
      content: "Needs help with grocery shopping this week",
      priority: "medium",
    },
    {
      id: "insight-4",
      type: "interest",
      icon: MessageSquare,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
      content: "Enjoyed watching a documentary about wildlife",
      priority: "low",
    },
  ];
  
  // Get the priority badge based on level
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Medium Priority
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Low Priority
          </Badge>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {calls.length > 0 ? (
          <div className="space-y-4">
            {insightData.map((insight) => (
              <div 
                key={insight.id} 
                className="flex items-start p-3 border rounded-lg"
              >
                <div className={`p-2 rounded-full ${insight.bg} mr-3`}>
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{insight.type}</span>
                    {getPriorityBadge(insight.priority)}
                  </div>
                  <p>{insight.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <MessageSquare className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>Insights from calls will appear here after completing calls.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsSummary;
