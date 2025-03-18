
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UserInfoStep from "@/components/onboarding/UserInfoStep";
import ParentInfoStep from "@/components/onboarding/ParentInfoStep";
import ParentDetailsStep from "@/components/onboarding/ParentDetailsStep";
import CallScheduleStep from "@/components/onboarding/CallScheduleStep";
import CompletionStep from "@/components/onboarding/CompletionStep";

const steps = [
  {
    id: "user-info",
    title: "Your Information",
    description: "Let's start with your basic details",
  },
  {
    id: "parent-info",
    title: "Parent Information",
    description: "Tell us about your parent",
  },
  {
    id: "parent-details",
    title: "Parent Details",
    description: "Share more about your parent",
  },
  {
    id: "call-schedule",
    title: "Call Schedule",
    description: "Set up when you'd like calls to happen",
  },
  {
    id: "completion",
    title: "All Set!",
    description: "You're ready to start using CallMinder",
  },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentOnboardingStep, 
    setCurrentOnboardingStep, 
    setOnboardingCompleted 
  } = useApp();
  
  const progress = ((currentOnboardingStep + 1) / steps.length) * 100;
  
  const currentStep = steps[currentOnboardingStep];

  const nextStep = () => {
    if (currentOnboardingStep < steps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1);
    }
  };

  const prevStep = () => {
    if (currentOnboardingStep > 0) {
      setCurrentOnboardingStep(currentOnboardingStep - 1);
    }
  };

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "user-info":
        return <UserInfoStep onNext={nextStep} />;
      case "parent-info":
        return <ParentInfoStep onNext={nextStep} onBack={prevStep} />;
      case "parent-details":
        return <ParentDetailsStep onNext={nextStep} onBack={prevStep} />;
      case "call-schedule":
        return <CallScheduleStep onNext={nextStep} onBack={prevStep} />;
      case "completion":
        return <CompletionStep onComplete={completeOnboarding} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
          <Progress className="mt-2" value={progress} />
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
