
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  retellApiKey: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserInfoStepProps {
  onNext: () => void;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({ onNext }) => {
  const { user, setUser } = useApp();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      retellApiKey: user?.retellApiKey || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setUser({
      name: data.name,
      email: data.email,
      retellApiKey: data.retellApiKey,
    });
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
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="retellApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retell API Key (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your Retell API key" {...field} />
              </FormControl>
              <FormDescription>
                You can add this later in settings if you don't have it now.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserInfoStep;
