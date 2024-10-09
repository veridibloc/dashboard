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
import { Address } from '@signumjs/core';
import { accountPrefix } from '@/common/accountPrefix';
import { Amount } from '@signumjs/util';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export function StockContractRow({ contract }: { contract: Contract }) {
  const stockContract = contractsProvider.toStockContract(contract);
  const { ownerId, isHalted } = stockContract.getData();
  const {push} = useRouter();

  const {data: errors} = useSWR(`veridibloc/api/stock/${contract.at}/errors`, () => stockContract.getErrors(), {suspense: true})

  return (
    <TableRow onClick={() => push(`/contracts/stock/${contract.at}`)}>
      <TableCell>
        <div className="flex flex-col justify-start items-center">
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/at/${contract.at}`}
          >
            {contract.atRS}
          </ExternalLink>
        </div>
      </TableCell>
      <TableCell className="font-medium">{contract.name}</TableCell>
      <TableCell>
        {ownerId !== '0' ? (
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/address/${ownerId}`}
          >
            {Address.fromNumericId(
              ownerId,
              accountPrefix()
            ).getReedSolomonAddress()}
          </ExternalLink>
        ) : (
          'No Owner Defined'
        )}
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
          <Badge variant="accent">Active</Badge>
        )}
      </TableCell>
      <TableCell>{contract.creationBlock}</TableCell>
      <TableCell>{Amount.fromPlanck(contract.balanceNQT).getSigna()}</TableCell>
      <TableCell>
        <Suspense fallback={<Spinner/>}>
          {errors.length}
        </Suspense>
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
