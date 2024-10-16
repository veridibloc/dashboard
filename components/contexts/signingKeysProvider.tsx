"use client";

import React, { createContext, ReactNode } from 'react';
import { mnemonicAtom, mnemonicUnlockAtom } from '@/components/states/mnemonicAtom';
import { useAtomValue, useStore } from 'jotai';
import { generateMasterKeys, Keys } from '@signumjs/crypto';
import { useRef } from 'react';
import { useMountedState } from '@/components/hooks/useMountedState';

const Second = 1000;
const Minute = 60 * Second;
const DefaultTimeout = 5 * Minute;

interface SigningKeysContextType {
  unlock: (secureToken: string, timeout?: number) => Promise<Keys | null>;
  lock: () => void;
  isLocked: boolean;
  hasMnemonic: boolean;
  keys: Keys | null;
  expiry: number;
}

export const SigningKeysContext = createContext<SigningKeysContextType | undefined>(undefined);

export function SigningKeysProvider({ children }: { children: ReactNode }) {
  const keysRef = useRef<Keys | null>(null);
  const timeoutRef = useRef<any>(0);
  const store = useStore();
  const encryptedMnemonic = useAtomValue(mnemonicAtom);
  const [expiry, setExpiry] = useMountedState(0);
  const [isLocked, setIsLocked] = useMountedState(true);

  const resetTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setExpiry(0);
  };

  const unlock = async (secureToken: string, timeout = DefaultTimeout) => {
    resetTimeout();
    setIsLocked(true);
    const mnemonic = await store.get(mnemonicUnlockAtom(secureToken));
    if (!mnemonic) {
      console.warn('Unlock failed - Invalid Secure Token');
      keysRef.current = null;
      return null;
    }

    keysRef.current = generateMasterKeys(mnemonic);
    timeoutRef.current = setTimeout(lock, timeout);
    setExpiry(Date.now() + timeout);
    setIsLocked(false);
    return keysRef.current;
  };

  const lock = () => {
    resetTimeout();
    setIsLocked(true);
    keysRef.current = null;
  };

  const value = {
    unlock,
    lock,
    isLocked,
    hasMnemonic: !!encryptedMnemonic,
    keys: keysRef.current,
    expiry,
  };

  return (
    <SigningKeysContext.Provider value={value}>
      {children}
    </SigningKeysContext.Provider>
  );
}
