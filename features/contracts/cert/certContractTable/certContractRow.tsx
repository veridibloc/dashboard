'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Contract } from '@signumjs/contracts';
import { contractsProvider } from '@/common/contractsProvider';
import { ExternalLink } from '@/components/ui/externalLink';
import { shortenString } from '@/common/shortenString';
import { Amount } from '@signumjs/util';
import { useRouter } from 'next/navigation';
import { TokenQuantityCell } from './tokenQuantityCell';
import { ErrorCountCell } from './errorCountCell';

export function CertContractRow({ contract }: { contract: Contract }) {
  const certContract = contractsProvider.toCertContract(contract);
  const { tokenId, tokenName } = certContract.getData();
  const { push } = useRouter();

  return (
    <TableRow onClick={() => push(`/contracts/cert/${contract.at}`)}>
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
      <TableCell className="font-medium">
        {tokenName ? (
          <ExternalLink
            href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/asset/${tokenId}`}
          >
            {tokenName.toUpperCase()}
          </ExternalLink>
        ) : (
          'Not Available'
        )}
      </TableCell>
      <TableCell>
          <TokenQuantityCell tokenId={tokenId} />
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {shortenString(contract.machineCodeHashId)}
        </Badge>
      </TableCell>
      <TableCell>{contract.creationBlock}</TableCell>
      <TableCell>{Amount.fromPlanck(contract.balanceNQT).getSigna()}</TableCell>
      <TableCell>
        <ErrorCountCell contract={contract}/>
      </TableCell>
    </TableRow>
  );
}
