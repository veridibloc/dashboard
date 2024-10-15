'use client';

import useSWR from 'swr';
import { contractsProvider } from '@/common/contractsProvider';
import { Spinner } from '@/components/ui/spinner';
import { ChainValue } from '@signumjs/util';

interface Props {
  tokenId: string;
}

export function TokenQuantityCell({ tokenId }: Props) {
  const { data, isLoading } = useSWR(tokenId && tokenId !== "0" ? `signum/api/asset/${tokenId}` : null, () => {
    return contractsProvider.ledger.asset.getAsset({
      assetId: tokenId
    });
  });

  if(tokenId === "0"){
    return "Not Available"
  }

  if (isLoading) {
    return <Spinner />;
  }
  return data
    ? ChainValue.create(data?.decimals)
        .setAtomic(data?.quantityCirculatingQNT)
        .getCompound()
    : 'Loading Failure';
}
