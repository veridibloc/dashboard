'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { contractsProvider } from '@/common/contractsProvider';
import { ExternalLink } from '@/components/ui/externalLink';
import { ChainTime } from '@signumjs/util';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

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
  type: string;
  txId: string;
}

export function StockContractErrorRow({ txId, type }: Props) {
  const { data: tx } = useSWR(
    'signum/api/transaction',
    () => contractsProvider.ledger.transaction.getTransaction(txId),
    { suspense: true }
  );
  const error = getStockContractErrorType(type);

  return (
    <TableRow>
      <TableCell className="font-medium">
        {
          <Badge variant="secondary" title={error.destription}>
            {error.type}
          </Badge>
        }
      </TableCell>
      <TableCell className="font-medium">
        {
          <Suspense fallback={<Spinner />}>
            {ChainTime.fromChainTimestamp(tx.timestamp)
              .getDate()
              .toLocaleString()}
          </Suspense>
        }
      </TableCell>
      <TableCell>
        <div>
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/tx/${txId}`}
          >
            {txId}
          </ExternalLink>
        </div>
      </TableCell>
      <TableCell>
        <Suspense fallback={<Spinner />}>
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/address/${tx.sender}`}
          >
            {tx.senderRS}
          </ExternalLink>
        </Suspense>
      </TableCell>
      {/*add more details*/}
    </TableRow>
  );
}
