
import React, { ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: ReactNode;
  requiresAuth?: boolean;
};

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  requiresAuth = true 
}) => {
  const { user, onboardingCompleted } = useApp();
  
  // If authentication is required but user isn't set, redirect to home
  if (requiresAuth && !user) {
    return <Navigate to="/" />;
  }

  // If user is authenticated but hasn't completed onboarding, redirect to onboarding
  if (requiresAuth && user && !onboardingCompleted) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {user && onboardingCompleted && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && <Header />}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
