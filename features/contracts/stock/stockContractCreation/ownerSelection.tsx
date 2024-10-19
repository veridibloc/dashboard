"use client"

import { UserAccount } from '@/types/userAccount';
import { ScrollableTableContainer } from '@/components/ui/scrollableTableContainer';
import { UserAccountTable } from '@/components/ui/userAccountTable';

interface Props {
  userAccounts: UserAccount[]
}

export function OwnerSelection({userAccounts}: Props) {

  const handleRowClick = (userAccount: UserAccount) => {
    console.log(userAccount);
  }

  return <ScrollableTableContainer>
    <UserAccountTable userAccounts={userAccounts} onRowClick={handleRowClick}/>
  </ScrollableTableContainer>
}