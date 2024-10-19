"use client"

import { AlertTriangle, HomeIcon, RefreshCcw, StepBackIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';


interface ErrorScreenProps {
  error: Error | null;
  onReset: () => void;
}

export function ErrorScreen({ error, onReset }: ErrorScreenProps) {

  const router = useEnhancedRouter()

  const handleGoHome = () => {
    router.push("/contracts")
    onReset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We're sorry, but an unexpected error occurred. Try again or go back to previous page.
        </p>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
            <p className="text-red-700 text-sm font-medium">Error details:</p>
            <p className="text-red-600 text-sm mt-1">{error.message}</p>
          </div>
        )}
        <div className="flex justify-center gap-x-2">
          <Button onClick={onReset} className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button onClick={handleGoHome} className="flex items-center">
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}