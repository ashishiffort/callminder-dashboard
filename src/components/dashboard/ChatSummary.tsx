
import React from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, AlertTriangle, CheckCircle2, SmilePlus, Frown, Meh } from "lucide-react";

const ChatSummary: React.FC = () => {
  const { callSummaries } = useApp();
  
  if (callSummaries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Parent Chat Summaries</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6">
          <MessageCircle className="mx-auto h-12 w-12 opacity-20 mb-3" />
          <p className="text-muted-foreground">No chat summaries available yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Summaries will appear here after AI calls with parents.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const getMoodIcon = (mood: string) => {
    switch(mood) {
      case 'happy':
        return <SmilePlus className="h-5 w-5 text-green-500" />;
      case 'sad':
        return <Frown className="h-5 w-5 text-red-500" />;
      default:
        return <Meh className="h-5 w-5 text-amber-500" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Parent Chat Summaries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {callSummaries.map((summary) => (
            <div key={summary.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{summary.parentName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(summary.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  {getMoodIcon(summary.mood)}
                  <span className="ml-1 text-sm capitalize">{summary.mood} mood</span>
                </div>
              </div>
              
              {summary.highlights.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                    Highlights
                  </h4>
                  <ul className="pl-6 list-disc space-y-1">
                    {summary.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {summary.concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <AlertTriangle className="mr-1 h-4 w-4 text-amber-500" />
                    Concerns
                  </h4>
                  <ul className="pl-6 list-disc space-y-1">
                    {summary.concerns.map((concern, i) => (
                      <li key={i} className="text-sm">{concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSummary;
