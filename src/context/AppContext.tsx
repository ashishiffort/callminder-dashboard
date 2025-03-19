
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

export type FrequencyType = "daily" | "twice_weekly" | "weekly" | "monthly";

export type ParentInfo = {
  name: string;
  description: string;
  phoneNumber: string;
  country: string;
  callTime: string;
  callFrequency: FrequencyType;
};

export type UserInfo = {
  name: string;
  email: string;
  retellApiKey?: string;
};

export type CallData = {
  id: string;
  parentName: string;
  date: string;
  duration: number;
  intents: string[];
  summary: string;
  recordingUrl?: string;
  status: "completed" | "scheduled" | "failed";
};

export type CallSummary = {
  id: string;
  date: string;
  parentName: string;
  status: "pending" | "completed";
  highlights: string[];
  concerns: string[];
  mood: "happy" | "neutral" | "sad";
};

type AppContextType = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  parents: ParentInfo[];
  addParent: (parent: ParentInfo) => void;
  removeParent: (index: number) => void;
  calls: CallData[];
  callSummaries: CallSummary[];
  addCall: (call: CallData) => void;
  balance: number;
  setBalance: (balance: number) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  currentOnboardingStep: number;
  setCurrentOnboardingStep: (step: number) => void;
  authUser: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [parents, setParents] = useState<ParentInfo[]>([]);
  const [calls, setCalls] = useState<CallData[]>([]);
  const [callSummaries, setCallSummaries] = useState<CallSummary[]>([]);
  const [balance, setBalance] = useState<number>(10); // Starting balance in credits
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState<number>(0);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Initialize and set up auth listener
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthUser(session?.user ?? null);
      
      if (session?.user) {
        // If user is authenticated, fetch their profile data
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setAuthUser(session?.user ?? null);
        
        if (session?.user) {
          fetchUserProfile(session.user.id);
        }
      }
    );

    // Sample data for call summaries
    const mockSummaries: CallSummary[] = [
      {
        id: '1',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        parentName: 'Mom',
        status: 'completed',
        highlights: ['Enjoying gardening', 'Had lunch with friends'],
        concerns: ['Slight back pain'],
        mood: 'happy'
      },
      {
        id: '2',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        parentName: 'Dad',
        status: 'completed',
        highlights: ['Doctor appointment went well', 'New book to read'],
        concerns: ['Trouble sleeping'],
        mood: 'neutral'
      }
    ];
    
    setCallSummaries(mockSummaries);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          name: data.name,
          email: data.email,
          retellApiKey: data.retell_api_key
        });
        setOnboardingCompleted(data.onboarding_completed || false);
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
    }
  };

  const addParent = (parent: ParentInfo) => {
    setParents([...parents, parent]);
  };

  const removeParent = (index: number) => {
    const newParents = [...parents];
    newParents.splice(index, 1);
    setParents(newParents);
  };

  const addCall = (call: CallData) => {
    setCalls([call, ...calls]);
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAuthUser(null);
      setSession(null);
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    setUser,
    parents,
    addParent,
    removeParent,
    calls,
    callSummaries,
    addCall,
    balance,
    setBalance,
    onboardingCompleted,
    setOnboardingCompleted,
    currentOnboardingStep,
    setCurrentOnboardingStep,
    authUser,
    session,
    signOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
