
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

type AuthRouteProps = {
  children: ReactNode;
  requireOnboarding?: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ 
  children, 
  requireOnboarding = true 
}) => {
  const { authUser, onboardingCompleted } = useApp();
  
  // If user isn't authenticated, redirect to login
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // If onboarding is required but not completed, redirect to onboarding
  if (requireOnboarding && !onboardingCompleted) {
    return <Navigate to="/onboarding" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
