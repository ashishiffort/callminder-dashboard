
import React from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CalendarClock, PhoneCall } from "lucide-react";

const UpcomingCalls: React.FC = () => {
  const { calls, parents } = useApp();
  
  // Filter for scheduled calls and sort by date
  const upcomingCalls = calls
    .filter((call) => call.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  // If no upcoming calls, create demo data
  const demoUpcoming = [
    {
      id: "demo-1",
      parentName: parents[0]?.name || "Parent",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: "scheduled",
    },
    {
      id: "demo-2",
      parentName: parents[0]?.name || "Parent",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // In 3 days
      status: "scheduled",
    },
  ];
  
  const displayCalls = upcomingCalls.length > 0 ? upcomingCalls : demoUpcoming;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Upcoming Calls</CardTitle>
        <Button size="sm" variant="ghost" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {displayCalls.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parent</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.parentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(call.date)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="h-8">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No upcoming calls scheduled.
            </p>
            <Button variant="outline" className="mt-4">
              Schedule a Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingCalls;
