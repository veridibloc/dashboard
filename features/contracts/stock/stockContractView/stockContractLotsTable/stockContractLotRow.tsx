'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { contractsProvider } from '@/common/contractsProvider';
import { ExternalLink } from '@/components/ui/externalLink';
import useSWR from 'swr';
import { LoadableComponent } from '@/components/ui/loabableComponent';
import { Contract } from '@signumjs/contracts';
import { shortenString } from '@/common/shortenString';
import { AddressField } from '@/components/ui/addressField';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function getStockContractErrorType(type: string) {
  const ErrorMap = {
    '1': {
      type: 'No Stock',
      description: 'Insufficient Stock'
    },
    '2': {
      type: 'No Stock',
      description: 'Insufficient Stock'
    },
    '3': {
      type: 'No Permission',
      description: 'Operation not allowed'
    },
    '4': {
      type: 'Duplicate Material',
      description: 'Material Received Already'
    },
    '5': {
      type: 'Low Fee',
      description: 'Usage Fee too low'
    },
    '6': {
      type: 'Wrong Stock Mode',
      description: 'Called wrong outgoing method'
    }
  };
  return (
    // @ts-ignore
    ErrorMap[type] || {
      type: 'unknown',
      description: `Unknown error (code: ${type})`
    }
  );
}

interface Props {
  contract: Contract;
  lotId: string;
  sold: boolean;
}

export function StockContractLotRow({ contract, lotId, sold }: Props) {
  const { data: lot, isLoading } = useSWR(`veridibloc/api/lot/${lotId}`, () => {
    const stockContract = contractsProvider.toStockContract(contract);
    return stockContract.getLotData(lotId);
  });

  const { data: lotReceipt, isLoading: isLoadingReceipt } = useSWR(
    sold ? `veridibloc/api/lot-receipt/${lotId}` : null,
    async () => {
      const stockContract = contractsProvider.toStockContract(contract);
      const lotReceipt = await stockContract.getSingleLotReceipt(lotId);
      const receiptTx = await contractsProvider.ledger.transaction.getTransaction(lotReceipt!.receiptId)
      return {
        ...lotReceipt!,
        partnerId: receiptTx.sender
      }
    }
  );

  const lotQntDelta =
    lot && lotReceipt ? lot.totalQuantity - lotReceipt.confirmedQuantity : null;
  const isBigDelta =
    lotQntDelta !== null && lot && lot.totalQuantity > 0
      ? lotQntDelta / lot.totalQuantity > 0.1
      : false;

  return (
    <TableRow>
      <TableCell>
        <ExternalLink
          href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/tx/${lotId}`}
        >
          <Badge variant="outline">
            {shortenString(lotId)}
          </Badge>
        </ExternalLink>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoading}>
          {lot?.date.toLocaleString()}
        </LoadableComponent>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoading}>
          {lot?.totalQuantity}
        </LoadableComponent>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoading}>
          {/*TODO: make lot linkable to lot details page -> allow tracing*/}
          {lot?.lotParts.map(({ tx, quantity }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary">{quantity} kg</Badge>
              </TooltipTrigger>
              <TooltipContent>Id: {tx}</TooltipContent>
            </Tooltip>
          ))}
        </LoadableComponent>
      </TableCell>
      <TableCell>
        {sold ? <Badge variant="outline">Sold</Badge> : null}
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoadingReceipt}>
          {lotReceipt?.date.toLocaleString()}
        </LoadableComponent>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoadingReceipt}>
          <div className="w-[100px] flex flex-row justify-between">
            {lotReceipt?.confirmedQuantity}
            {lotQntDelta !== null && (
              <Badge
                className="ml-2"
                variant={isBigDelta ? 'destructive' : 'outline'}
              >
                {-lotQntDelta}
              </Badge>
            )}
          </div>
        </LoadableComponent>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoadingReceipt}>
          {lotReceipt && (
            <ExternalLink
              href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/tx/${lotReceipt.receiptId}`}
            >
              <Badge variant="outline">
                {shortenString(lotReceipt.receiptId)}
              </Badge>
            </ExternalLink>
          )}
        </LoadableComponent>
      </TableCell>
      <TableCell>
        <LoadableComponent isLoading={isLoadingReceipt}>
          {lotReceipt && <AddressField accountId={lotReceipt.partnerId}/>}
        </LoadableComponent>
      </TableCell>
    </TableRow>
  );
}
