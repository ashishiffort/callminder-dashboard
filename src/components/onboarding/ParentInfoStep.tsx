
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

type FormValues = z.infer<typeof formSchema>;

interface ParentInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ParentInfoStep: React.FC<ParentInfoStepProps> = ({ onNext, onBack }) => {
  const { parents, addParent } = useApp();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: parents[0]?.name || "",
      phoneNumber: parents[0]?.phoneNumber || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Create parent with initial data, we'll add more in the next steps
    if (parents.length === 0) {
      addParent({
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: "",
        country: "India", // Default, will be editable in next step
        callTime: "09:00", // Default, will be editable in next step
        callFrequency: "weekly", // Default, will be editable in next step
      });
    } else {
      // Update existing parent if editing
      const updatedParent = {
        ...parents[0],
        name: data.name,
        phoneNumber: data.phoneNumber,
      };
      // Remove old parent and add updated one
      addParent(updatedParent);
    }
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent's Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" {...field} />
              </FormControl>
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

export default ParentInfoStep;
