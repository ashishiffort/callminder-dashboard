
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
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

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
  const { user, setUser, authUser } = useApp();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || authUser?.email || "",
      retellApiKey: user?.retellApiKey || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!authUser) return;
    
    try {
      // Update the user profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          name: data.name,
          email: data.email,
          retell_api_key: data.retellApiKey || null,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Update local state
      setUser({
        name: data.name,
        email: data.email,
        retellApiKey: data.retellApiKey,
      });
      
      toast({
        title: "Profile updated",
        description: "Your information has been saved successfully.",
      });
      
      onNext();
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    }
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
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  {...field} 
                  disabled={!!authUser?.email}
                />
              </FormControl>
              {authUser?.email && (
                <FormDescription>
                  Email is linked to your account and cannot be changed here.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="retellApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retell API Key</FormLabel>
              <FormControl>
                <Input placeholder="Your Retell API key" {...field} />
              </FormControl>
              <FormDescription>
                Your Retell API key is required for making AI calls to your parents.
                You can add or update this later in settings.
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
