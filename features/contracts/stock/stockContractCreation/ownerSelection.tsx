'use client';

import { UserAccount } from '@/types/userAccount';
import { ScrollableTableContainer } from '@/components/ui/scrollableTableContainer';
import { UserAccountTable } from '@/components/ui/userAccountTable';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface Props {
  userAccounts: UserAccount[];
}

export function OwnerSelection({ userAccounts }: Props) {
  const searchParams = useSearchParams();
  const { push } = useEnhancedRouter();

  const filteredUserAccounts = useMemo(() => {
    const queryTerm = searchParams.get('q')?.toLowerCase();
    if (!queryTerm) return userAccounts;

    return userAccounts.filter(
      (u) =>
        u.email?.includes(queryTerm) ||
        u.role?.includes(queryTerm) ||
        u.firstName?.includes(queryTerm) ||
        u.lastName?.includes(queryTerm) ||
        u.accountId?.includes(queryTerm)
    );
  }, [searchParams, userAccounts]);

  const handleRowClick = (userAccount: UserAccount) => {
    if (userAccount.role && userAccount.accountId) {
      push(`./deployment/separator?ownerId=${userAccount.accountId}`);
    }
  };

  return (
    <ScrollableTableContainer>
      <UserAccountTable
        userAccounts={filteredUserAccounts}
        onRowClick={handleRowClick}
      />
    </ScrollableTableContainer>
  );
}
