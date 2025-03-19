
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <div className="text-2xl font-bold text-primary">CallMinder</div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
          <AuthForm mode="login" />
        </div>
      </main>
    </div>
  );
};

export default Login;
