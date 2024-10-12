'use client';

import { useAtom } from 'jotai';
import { modalAtom } from '../states/modalAtom';
import {
  Dialog, DialogContent, DialogTitle
} from '@/components/ui/dialog';
import * as React from 'react';

export const Modal = () => {
  const [dialogState, setDialogState] = useAtom(modalAtom);

  return (
    <Dialog
      open={dialogState.open}
      onOpenChange={(open) => setDialogState({ ...dialogState, open })}
    >
      <DialogContent>
        <DialogTitle>{dialogState.title}</DialogTitle>
        {dialogState.content}
      </DialogContent>
    </Dialog>
  );
};
