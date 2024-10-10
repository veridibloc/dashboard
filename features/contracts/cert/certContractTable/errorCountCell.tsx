'use client';

import useSWR from 'swr';
import { contractsProvider } from '@/common/contractsProvider';
import { Spinner } from '@/components/ui/spinner';
import { ChainValue } from '@signumjs/util';
import { Contract } from '@signumjs/contracts';

interface Props {
  contract: Contract;
}

export function ErrorCountCell({ contract }: Props) {
  const certContract = contractsProvider.toCertContract(contract)
  const {data: errors, isLoading} = useSWR(`veridibloc/api/cert/${contract.at}/errors`, () => certContract.getErrors())

  if (isLoading) {
    return <Spinner />;
  }
  return errors?.length.toString() ?? "0"
}
