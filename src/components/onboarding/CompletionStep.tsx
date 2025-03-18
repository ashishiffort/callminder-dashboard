
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CompletionStepProps {
  onComplete: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onComplete }) => {
  const { parents } = useApp();
  
  return (
    <div className="flex flex-col items-center py-6">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
        <Check className="h-10 w-10 text-primary" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold">All Set Up!</h3>
      
      <p className="mb-6 text-center text-muted-foreground">
        You've successfully set up CallMinder to check in on {parents[0]?.name}. 
        We'll use the information you've provided to make personalized calls.
      </p>
      
      <div className="mb-6 w-full space-y-3 rounded-lg border border-border p-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Parent:</span>
          <span className="text-sm">{parents[0]?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Phone:</span>
          <span className="text-sm">{parents[0]?.phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Call Time:</span>
          <span className="text-sm">{parents[0]?.callTime} IST</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Frequency:</span>
          <span className="text-sm capitalize">
            {parents[0]?.callFrequency.replace("_", " ")}
          </span>
        </div>
      </div>
      
      <Button onClick={onComplete} className="w-full">
        Go to Dashboard
      </Button>
    </div>
  );
};

export default CompletionStep;
