'use client';

import useSWR from 'swr';
import { contractsProvider } from '@/common/contractsProvider';
import { Spinner } from '@/components/ui/spinner';
import { ChainValue } from '@signumjs/util';

interface Props {
  tokenId: string;
}

export function TokenQuantityCell({ tokenId }: Props) {
  const { data, isLoading } = useSWR('signum/api/asset', () => {
    return contractsProvider.ledger.asset.getAsset({
      assetId: tokenId
    });
  });

  if (isLoading) {
    return <Spinner />;
  }
  return data
    ? ChainValue.create(data?.decimals)
        .setAtomic(data?.quantityCirculatingQNT)
        .getAtomic()
    : 'Loading Failure';
}
