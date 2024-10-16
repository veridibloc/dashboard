"use client";

import { useEffect, useRef, useState } from 'react';
import { SecureTokenLength } from '@/common/constant';
import { Button } from '@/components/ui/button';
import { FieldLegend } from '@/components/ui/fieldLegend';
import { SingleCharInput } from '@/components/ui/singleCharInput';
import { useSigningKeysContext } from '@/components/hooks/useSigningKeysContext';

export function UnlockForm() {
  const [token, setToken] = useState('');
  const countdownRef = useRef<any>(0)
  const { unlock, isLocked, lock, expiry } = useSigningKeysContext();
  const [timeLeft, setTimeLeft] = useState(0);

  function clearTimer () {
    countdownRef.current && clearInterval(countdownRef.current)
  }

  useEffect(() => {
    if (token.length === SecureTokenLength) {
      unlock(token)
      setToken('')
    }
  }, [token]);

  useEffect(() => {
    setTimeLeft(Math.max(expiry - Date.now(), 0))

    countdownRef.current = setInterval(() => {
      const timeLeft = Math.max(expiry - Date.now(), 0)
      setTimeLeft(timeLeft);
      if(!timeLeft){
        clearTimer()
      }
    }, 1_000);
  }, [expiry]);

  useEffect(() => {
    return clearTimer
  }, []);

  if (!isLocked) {
    return (
      <div className="min-w-[240px] max-w-[400px] flex flex-col justify-center text-center">
        <p>Signing enabled!</p>
        <h2 className="my-2 text-xl text-gray-900">{(timeLeft / 1000).toFixed(0)} s</h2>
        <small>left until locking</small>
        <Button className="mt-8" onClick={lock}>
          Lock
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[400px]">
      <p>
        By entering the Secure Token you enable signing for a given amount of
        time until it locks again.
      </p>
      <fieldset className="mt-4 ">
          <FieldLegend text="Secure Token" tooltip="Enter the Secure Token" />
          <SingleCharInput
            onChange={setToken}
            length={SecureTokenLength}
            value={token}
          />
      </fieldset>
    </div>
  );
}