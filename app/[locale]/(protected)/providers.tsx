'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SigningKeysProvider } from '@/components/contexts/signingKeysProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <TooltipProvider>
        <SigningKeysProvider>{children}</SigningKeysProvider>
      </TooltipProvider>
  );
}
