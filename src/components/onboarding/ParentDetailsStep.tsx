
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  description: z.string().min(10, "Please provide at least a brief description"),
  country: z.string().min(1, "Please select a country"),
});

type FormValues = z.infer<typeof formSchema>;

interface ParentDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const countries = [
  { value: "india", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];

const ParentDetailsStep: React.FC<ParentDetailsStepProps> = ({ onNext, onBack }) => {
  const { parents, addParent } = useApp();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: parents[0]?.description || "",
      country: parents[0]?.country || "india",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Update parent with additional details
    const updatedParent = {
      ...parents[0],
      description: data.description,
      country: data.country,
    };
    
    // Remove old parent and add updated one
    addParent(updatedParent);
    
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your parent</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share some details that would help our AI make better conversations (interests, health conditions, preferences, etc.)" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
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

export default ParentDetailsStep;
