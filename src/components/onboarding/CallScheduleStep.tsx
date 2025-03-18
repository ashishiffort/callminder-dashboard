
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FrequencyType } from "@/context/AppContext";

const formSchema = z.object({
  callTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time in 24-hour format (HH:MM)"),
  callFrequency: z.enum(["daily", "twice_weekly", "weekly", "monthly"] as const),
});

type FormValues = z.infer<typeof formSchema>;

interface CallScheduleStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CallScheduleStep: React.FC<CallScheduleStepProps> = ({ onNext, onBack }) => {
  const { parents, addParent } = useApp();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      callTime: parents[0]?.callTime || "09:00",
      callFrequency: parents[0]?.callFrequency || "weekly",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Update parent with call schedule details
    const updatedParent = {
      ...parents[0],
      callTime: data.callTime,
      callFrequency: data.callFrequency,
    };
    
    // Remove old parent and add updated one
    addParent(updatedParent);
    
    onNext();
  };

  const frequencyOptions = [
    { value: "daily", label: "Everyday" },
    { value: "twice_weekly", label: "Twice a week" },
    { value: "weekly", label: "Once a week" },
    { value: "monthly", label: "Once a month" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="callTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Call Time (IST)</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormDescription>
                Enter the time in 24-hour format (e.g., 14:30 for 2:30 PM)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="callFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call Frequency</FormLabel>
              <Select 
                onValueChange={field.onChange as (value: string) => void} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {frequencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default CallScheduleStep;
