"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Contract } from '@signumjs/contracts';
import { contractsProvider } from '@/common/contractsProvider';
import { ExternalLink } from '@/components/ui/externalLink';
import { shortenString } from '@/common/shortenString';
import { Amount } from '@signumjs/util';
import useSWR from 'swr';
import { Spinner } from '@/components/ui/spinner';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import { AddressField } from '@/components/ui/addressField';
import { stockModeText } from '@/common/stockModeText';
import { getStockContractDescriptor } from '@/common/getStockContractDescriptor';

export function StockContractRow({ contract }: { contract: Contract }) {
  const stockContract = contractsProvider.toStockContract(contract);
  const descriptor = getStockContractDescriptor(contract);
  const { ownerId, isHalted, stockMode } = stockContract.getData();
  const {push} = useEnhancedRouter();

  const {data: errors, isLoading} = useSWR(`veridibloc/api/stock/${contract.at}/errors`, () => stockContract.getErrors())

  return (
    <TableRow onClick={() => push(`/contracts/stock/${contract.at}`)}>
      <TableCell>
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/at/${contract.at}`}
          >
            {contract.atRS}
          </ExternalLink>
      </TableCell>
      <TableCell className="font-medium">
        {stockMode && <Badge variant='secondary'>{stockModeText(stockMode)}</Badge> }
      </TableCell>
      <TableCell className="font-medium">{descriptor.material}</TableCell>
      <TableCell className="font-medium">{contract.name}</TableCell>
      <TableCell>
        <AddressField accountId={ownerId} fallbackLabel="Now Owner Defined"/>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {shortenString(contract.machineCodeHashId)}
        </Badge>
      </TableCell>
      <TableCell>
        {isHalted ? (
          <Badge variant="destructive">Paused</Badge>
        ) : (
          <Badge variant="success">Active</Badge>
        )}
      </TableCell>
      <TableCell>{contract.creationBlock}</TableCell>
      <TableCell>{Amount.fromPlanck(contract.balanceNQT).getSigna()}</TableCell>
      <TableCell>
        {isLoading ? <Spinner/> : errors?.length ?? 0}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <h2>Bla</h2>
              {/*<form action={deleteProduct}>*/}
              {/*  <button type="submit">Delete</button>*/}
              {/*</form>*/}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
