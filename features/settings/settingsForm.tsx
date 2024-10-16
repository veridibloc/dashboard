'use client';

import { TextArea } from '@/components/ui/textarea';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { generateMasterKeys } from '@signumjs/crypto';
import { Address } from '@signumjs/core';
import { addressPrefix } from '@/common/addressPrefix';
import { SingleCharInput } from '@/components/ui/singleCharInput';
import { FieldLegend } from '@/components/ui/fieldLegend';
import { useAtom, useSetAtom, useStore } from 'jotai';
import {
  mnemonicAtom,
  mnemonicUnlockAtom,
  mnemonicLockAtom
} from '@/components/states/mnemonicAtom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CircleX, EyeClosed, EyeIcon, KeyRoundIcon } from 'lucide-react';
import { SecureTokenLength } from '@/common/constant';

export function SettingsForm() {
  const [hydrated, setHydrated] = useState(false);
  const [formData, setFormData] = useState({ mnemonic: '', token: '' });
  const lockMnemonic = useSetAtom(mnemonicLockAtom);
  const store = useStore();
  const [encryptedMnemonic, setEncryptedMnemonic] = useAtom(mnemonicAtom);

  const address = useMemo(() => {
    if (!formData.mnemonic) return null;

    const keys = generateMasterKeys(formData.mnemonic);
    return Address.fromPublicKey(keys.publicKey, addressPrefix());
  }, [formData.mnemonic]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const handleOnChange =
    (fieldName: string) =>
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFormData((form) => ({
        ...form,
        [fieldName]: e.target.value
      }));
    };

  const handleSecureMnemonic = async () => {
    await lockMnemonic(formData.token, formData.mnemonic);
    resetForm();
  };

  const handleRevealMnemonic = async () => {
    if (formData.token.length === SecureTokenLength) {
      const mnemonic = await store.get(mnemonicUnlockAtom(formData.token));
      setFormData({ mnemonic, token: '' });
    }
  };

  const handleHideMnemonic =() => {
    setFormData((formData) => ({...formData, mnemonic: ''}))
  }

  const handleResetMnemonic = () => {
    setEncryptedMnemonic('');
    resetForm();
  };

  const resetForm = () => {
    setFormData({ mnemonic: '', token: '' });
  };

  const buttonDisabled = formData.token.length !== SecureTokenLength;
  const isRevealed = formData.mnemonic

  return (
    <div className="w-1/2 md:w-1/3 m-auto">
      <fieldset className="flex flex-col justify-start gap-y-2">
        <div>
          <FieldLegend
            text="Signing Mnemonic"
            tooltip="The Signing Mnemonic is used to sign any of the blockchain transaction. It will be stored encrypted on the local device using the Secure Token. The Secure Token is required to unlock signing."
          />
          <div className="relative flex flex-row justify-center items-center">
            {encryptedMnemonic && !formData.mnemonic ? (
              <>
                <TextArea
                  className="bg-gray-200"
                  key="disabled"
                  rows={4}
                  disabled={true}
                />
                <div className="absolute gap-x-1 text-gray-400 inline-flex"><KeyRoundIcon/>Enter Secure Token to reveal</div>
              </>
            ) : (
              <>
                <TextArea
                  key="enabled"
                  className="font-mono"
                  onChange={handleOnChange('mnemonic')}
                  value={formData.mnemonic}
                  placeholder="Enter secret word phrase..."
                  rows={4}
                />
                {address && (
                  <small className="absolute text-xs text-gray-400 bottom-1 right-2">
                    {address?.getReedSolomonAddress()}
                  </small>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <FieldLegend
            text="Secure Token"
            tooltip="An alphanumeric secret to secure the Signing Mnemonic. To sign transaction the Secure Token is required to unlock the signing keys"
          />
          <span className="flex flex-row justify-between items-center gap-x-2 ">
            <SingleCharInput
              length={SecureTokenLength}
              onChange={(token) => setFormData((form) => ({ ...form, token }))}
              value={formData.token}
            />

            {!encryptedMnemonic && (
              <Button
                key="secure-btn"
                onClick={handleSecureMnemonic}
                disabled={buttonDisabled}
              >
                Secure
              </Button>
            )}
            {encryptedMnemonic && (
              <div className="flex flex-row gap-x-2">
                {isRevealed && (
                  <Button
                    key="hide-btn"
                    variant="destructive"
                    onClick={handleHideMnemonic}
                  >
                    <EyeClosed/>
                    Hide
                  </Button>
                ) }
                {!isRevealed && (
                <Button
                  key="reveal-btn"
                  variant="destructive"
                  onClick={handleRevealMnemonic}
                  disabled={buttonDisabled}
                >
                  <EyeIcon/>
                  Reveal
                </Button>
                )}
                <Button key="reset-btn" onClick={handleResetMnemonic}>
                  <CircleX/>
                  Reset
                </Button>
              </div>
            )}
          </span>
        </div>
      </fieldset>
    </div>
  );
}
