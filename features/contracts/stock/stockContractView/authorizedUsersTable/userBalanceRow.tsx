'use client';

import useSWR from 'swr';
import { contractsProvider } from '@/common/contractsProvider';
import { AmountField } from '@/components/ui/amountField';
import { LoadableComponent } from '@/components/ui/loabableComponent';

interface Props {
  accountId: string;
}

export function UserBalanceRow({ accountId }: Props) {
  const {
    isLoading,
    data: balance
  } = useSWR(`signum/api/account/${accountId}`, () => contractsProvider.ledger.account.getAccountBalance(accountId));

  return (
    <LoadableComponent isLoading={isLoading}>
      <AmountField planck={balance?.balanceNQT ?? "0"} />
    </LoadableComponent>
  );
}