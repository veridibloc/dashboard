"use client"

import { UserAccount } from '@/types/userAccount';
import { ScrollableTableContainer } from '@/components/ui/scrollableTableContainer';
import { UserAccountTable } from '@/components/ui/userAccountTable';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';

interface Props {
  userAccounts: UserAccount[]
}

export function OwnerSelection({userAccounts}: Props) {

  const {push} = useEnhancedRouter()

  const handleRowClick = (userAccount: UserAccount) => {
    if(userAccount.role && userAccount.accountId){
      push(`/separator?id=${userAccount.accountId}`)
    }
  }

  return <ScrollableTableContainer>
    <UserAccountTable userAccounts={userAccounts} onRowClick={handleRowClick}/>
  </ScrollableTableContainer>
}