"use client"

import { TextArea } from '@/components/ui/textarea';
import { useMemo, useState } from 'react';
import { generateMasterKeys } from '@signumjs/crypto';
import { Address } from '@signumjs/core';
import { addressPrefix } from '@/common/addressPrefix';
import { SingleCharInput } from '@/components/ui/singleCharInput';

export function SettingsForm() {
  const [formData, setFormData] = useState({ mnemonic: '', token: '' });

  const handleOnChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFormData((form) => ({
        ...form,
        [fieldName]: e.target.value
      }));
    };

  const address = useMemo(() => {
    if(!formData.mnemonic) return null

    const keys = generateMasterKeys(formData.mnemonic);
    return Address.fromPublicKey(keys.publicKey, addressPrefix());

  }, [formData.mnemonic])

  return (
    <div className="w-1/3">
      <fieldset className="flex flex-col justify-start gap-y-2">
        <legend>Signing Key</legend>
        <TextArea onChange={handleOnChange('mnemonic')} rows={4} />
        <legend>Secure Token</legend>
        <SingleCharInput length={6} onChange={(pin) => setFormData(form => ({...form, pin})) } />
      </fieldset>
    </div>
  );
}
