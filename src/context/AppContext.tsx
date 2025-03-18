
import React, { createContext, useContext, useState, ReactNode } from "react";

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

type AppContextType = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  parents: ParentInfo[];
  addParent: (parent: ParentInfo) => void;
  removeParent: (index: number) => void;
  calls: CallData[];
  addCall: (call: CallData) => void;
  balance: number;
  setBalance: (balance: number) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  currentOnboardingStep: number;
  setCurrentOnboardingStep: (step: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [parents, setParents] = useState<ParentInfo[]>([]);
  const [calls, setCalls] = useState<CallData[]>([]);
  const [balance, setBalance] = useState<number>(10); // Starting balance in credits
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState<number>(0);

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

  const value = {
    user,
    setUser,
    parents,
    addParent,
    removeParent,
    calls,
    addCall,
    balance,
    setBalance,
    onboardingCompleted,
    setOnboardingCompleted,
    currentOnboardingStep,
    setCurrentOnboardingStep,
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
