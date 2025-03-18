
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Clock, Download, Info, Play, Search, XCircle } from "lucide-react";

const CallHistory: React.FC = () => {
  const { calls } = useApp();
  const [selectedCall, setSelectedCall] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Demo call data if no real calls exist
  const demoCalls = [
    {
      id: "call-1",
      parentName: "Mom",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 8,
      status: "completed",
      intents: ["Check wellbeing", "Medication reminder", "Family updates"],
      summary: "Mom mentioned she's been feeling well this week. She's taking her medications regularly and enjoyed talking about the family photos you sent. She asked about your upcoming visit.",
      recordingUrl: "#",
    },
    {
      id: "call-2",
      parentName: "Dad",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 6,
      status: "completed",
      intents: ["Check wellbeing", "Doctor appointment reminder"],
      summary: "Dad is doing well. He confirmed his doctor's appointment for next Wednesday. He mentioned having some trouble sleeping but otherwise feels fine.",
      recordingUrl: "#",
    },
    {
      id: "call-3",
      parentName: "Mom",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      intents: [],
      summary: "",
    },
    {
      id: "call-4",
      parentName: "Dad",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "failed",
      intents: [],
      summary: "Call failed due to no answer.",
    },
  ];
  
  const displayCalls = calls.length > 0 ? calls : demoCalls;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
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
  
  // Filter calls based on search term and status
  const filteredCalls = displayCalls.filter((call) => {
    const matchesSearch = call.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Call History</h1>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Call Records</CardTitle>
                <CardDescription>
                  View and manage all your parent check-in calls
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Calls</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parent</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.parentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {formatDate(call.date)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(call.status)}</TableCell>
                    <TableCell>
                      {call.duration ? `${call.duration} min` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {call.status === "completed" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setSelectedCall(call)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {call.status === "scheduled" && (
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        )}
                        {call.status === "failed" && (
                          <Button size="sm" variant="outline">
                            Retry
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredCalls.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No calls found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Call Details Dialog */}
      <Dialog 
        open={!!selectedCall} 
        onOpenChange={(open) => !open && setSelectedCall(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
            <DialogDescription>
              Call with {selectedCall?.parentName} on {selectedCall && formatDate(selectedCall.date)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCall && (
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="text-sm font-medium mb-1">Summary</h4>
                <p className="text-sm">{selectedCall.summary}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Intents</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCall.intents?.map((intent: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {intent}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <Play className="mr-2 h-4 w-4" />
                  Play Recording
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default CallHistory;
