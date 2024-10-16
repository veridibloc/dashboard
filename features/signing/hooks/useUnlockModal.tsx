import { useSetAtom } from 'jotai/index';
import { modalAtom } from '@/components/states/modalAtom';
import { UnlockForm } from '@/features/signing/unlockForm';

export function useUnlockModal() {
  const setModalState = useSetAtom(modalAtom);

  const open = () => {
      setModalState({
        open: true,
        content: <UnlockForm />,
        title: 'Unlock'
      });
  };

  return {
    open
  }

}