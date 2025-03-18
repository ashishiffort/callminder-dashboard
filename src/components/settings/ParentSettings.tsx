
import React from "react";
import { useApp } from "@/context/AppContext";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FrequencyType } from "@/context/AppContext";

export const ParentSettings: React.FC = () => {
  const { parents } = useApp();
  
  const frequencyOptions = [
    { value: "daily", label: "Everyday" },
    { value: "twice_weekly", label: "Twice a week" },
    { value: "weekly", label: "Once a week" },
    { value: "monthly", label: "Once a month" },
  ];
  
  const parent = parents[0]; // For first version, we just show the first parent
  
  if (!parent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Parent Information</CardTitle>
          <CardDescription>
            No parents added yet. Please complete the onboarding.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parent Information</CardTitle>
        <CardDescription>
          Update your parent's details and call preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={parent.name} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" defaultValue={parent.phoneNumber} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Details about your parent</Label>
          <Textarea 
            id="description" 
            defaultValue={parent.description}
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground">
            These details help our AI communicate better with your parent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select defaultValue={parent.country}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="callTime">Preferred Call Time (IST)</Label>
            <Input 
              id="callTime" 
              type="time"
              defaultValue={parent.callTime}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frequency">Call Frequency</Label>
          <Select defaultValue={parent.callFrequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {frequencyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">
          Delete Parent
        </Button>
        <Button>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
