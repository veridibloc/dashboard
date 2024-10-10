'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function RoutingIndicator() {
  const [isRouting, setIsRouting] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const handleRouteStarted = () => {
      setIsRouting(1);
    };

    const handleRouteFinished = () => {
      setIsRouting(0);
    };

    window.addEventListener('routeStarted', handleRouteStarted);
    window.addEventListener('routeFinished', handleRouteFinished);
    return () => {
      window.removeEventListener('routeStarted', handleRouteStarted);
      window.removeEventListener('routeFinished', handleRouteFinished);
    };
  }, []);

  useEffect(() => {
    let timer = 0;
    if (isRouting === 1) {
      // @ts-ignore
      timer = setTimeout(() => {
        setIsVisible(true)
      }, 500);
    }

    if (isRouting === 0 ) {
      clearTimeout(timer);
      setIsVisible(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRouting]);

  return (
    isRouting === 1 && isVisible && (
      <section
        className={cn(
          'absolute top-0 left-0 w-full h-full z-40 bg-black/10 flex items-center justify-center transition-opacity duration-500 delay-500',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <span className="h-8 w-8 animate-ping absolute inline-flex rounded-full bg-veridibloc opacity-75" />
      </section>
    )
  );
}
