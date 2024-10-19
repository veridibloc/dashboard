"use client"
import { Frown, Home, RotateCcw } from 'lucide-react'
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import { Button } from '@/components/ui/button';

export const NotFound = () => {

  const router=useEnhancedRouter()

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-900 p-8 rounded-lg shadow-lg backdrop-blur-sm bg-veridibloc/10">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <Frown className="w-24 h-24 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
          <p className="text-xl mb-8">
            Looks like this page took a vacation without telling us.
            <br />
            Maybe it's sipping cocktails on a digital beach somewhere?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => router.replace("/")}
              variant="secondary"
              className="flex items-center justify-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Button>
            <Button
              onClick={() => router.back()}
              variant="secondary"
              className="flex items-center justify-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Go Back</span>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">
            If you think this is a mistake, just pretend you meant to come here. We won't tell anyone.
          </p>
        </div>
      </div>
    )
};
