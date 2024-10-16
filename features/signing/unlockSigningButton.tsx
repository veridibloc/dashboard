'use client';

import { Button } from '@/components/ui/button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/components/states/modalAtom';
import { LockIcon, LockOpenIcon, SettingsIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import { avoidHydrationIssue } from '@/components/ui/hoc/avoidHydrationIssue';
import { useSigningKeysContext } from '@/components/hooks/useSigningKeysContext';
import { useUnlockModal } from '@/features/signing/hooks/useUnlockModal';

const IconSize = 16;

function _UnlockSigningButton() {
  const { open } = useUnlockModal();
  const { isLocked, lock, hasMnemonic } = useSigningKeysContext();
  const router = useEnhancedRouter();

  const handleOpenModal = async () => {
    if (isLocked) {
      open();
    } else {
      lock();
    }
  };

  if (!hasMnemonic) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => router.push('/settings')}>
            <SettingsIcon width={IconSize} height={IconSize} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Set up Signing Keys</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleOpenModal}
          className={isLocked ? '' : 'bg-veridibloc/80 hover:bg-veridibloc'}
        >
          {isLocked ? (
            <LockIcon height={IconSize} width={IconSize} />
          ) : (
            <LockOpenIcon height={IconSize} width={IconSize} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isLocked ? 'Click to Unlock' : 'Click to lock'}
      </TooltipContent>
    </Tooltip>
  );
}

export const UnlockSigningButton = avoidHydrationIssue(_UnlockSigningButton);
