'use client';

import { useAuth, SignIn as ClerkSignIn } from '@clerk/nextjs';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

function disableSignUp() {
  if (!document) return;
    const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const footer = document.getElementsByClassName('cl-footer');
        let disconnect = false;
        for (let e of footer) {
          e.remove();
          disconnect = true;
        }
        if (disconnect) {
          observer.disconnect();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export const SignIn = () => {
  const { isLoaded } = useAuth();

  useEffect(() => {
    disableSignUp();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen overflow-x-hidden bg-cover bg-center bg-fixed bg-no-repeat"
             style={ {backgroundImage: 'url(/assets/login_bg.webp)'}}
    >
      <div className="drop-shadow">
      {isLoaded ? <ClerkSignIn /> : <Spinner />}
      </div>
    </section>
  );
};
