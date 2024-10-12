import { atom } from 'jotai';
import { ReactNode } from 'react';

interface ModalState {
  open: boolean;
  title: string | ReactNode;
  content: ReactNode | null;
}

export const modalAtom = atom<ModalState>({
  open: false,
  content: null,
  title: ""
});
