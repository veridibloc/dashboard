'use client';

import { Button } from '@/components/ui/button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/components/states/modalAtom';

export function UnlockSigningTrigger() {
  const setModalState = useSetAtom(modalAtom);

  const handleOpenModal = async () => {
    setModalState({
      open: true,
      content: <h2>Hello</h2>,
      title: 'Unlock Vault'
    })
  };

  return (
    <Button
      onClick={handleOpenModal}
    >
      Open Dialog
    </Button>
  );
}
