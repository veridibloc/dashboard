import { useRef } from 'react';
import { mnemonicUnlockAtom } from '@/components/states/mnemonicAtom';
import { useStore } from 'jotai';
import { generateMasterKeys, Keys } from '@signumjs/crypto';
import { useMountedState } from './useMountedState';

const Second = 1000;
const Minute = 60 * Second;
const DefaultTimeout = 5 * Minute;

export function useSigningKeys() {
  const lockTimeoutRef = useRef<any>();
  const countdownIntervalRef = useRef<any>();
  const keysRef = useRef<Keys | null>(null);
  const timeoutRef = useRef<number>(0);
  const store = useStore();
  const [secondsLeft, setSecondsLeft] = useMountedState(0);

  const resetTimeout = () => {
    lockTimeoutRef.current && clearTimeout(lockTimeoutRef.current);
    countdownIntervalRef.current && clearInterval(countdownIntervalRef.current);
    timeoutRef.current = 0;
    setSecondsLeft(0);
  };

  const unlock = async (secureToken: string, timeout = DefaultTimeout) => {
    resetTimeout();
    const mnemonic = await store.get(mnemonicUnlockAtom(secureToken));
    if (!mnemonic) {
      console.warn('Unlock failed - Invalid Secure Token');
      keysRef.current = null;
      return null;
    }

    keysRef.current = generateMasterKeys(mnemonic);

    // start timeout
    lockTimeoutRef.current = setTimeout(lock, timeout);
    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1_000);
    timeoutRef.current = timeout / 1000;

    return keysRef.current;
  };

  const lock = () => {
    resetTimeout();
    keysRef.current = null;
  };

  return {
    unlock,
    lock,
    keys: keysRef.current,
    timeoutSeconds: timeoutRef.current,
    secondsLeft
  };
}
