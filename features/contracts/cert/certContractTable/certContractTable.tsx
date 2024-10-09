"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Contract } from '@signumjs/contracts';
import { CertContractRow } from './certContractRow';

interface Props {
  contracts: Contract[];
}

export function CertContractTable({ contracts }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Contract Name</TableHead>
          <TableHead>Token Name</TableHead>
          <TableHead>Issued Quantity</TableHead>
          <TableHead>Contract Code</TableHead>
          <TableHead>Creation Block</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
          {contracts.map((contract) => (
            <CertContractRow key={contract.at} contract={contract} />
          ))}
      </TableBody>
    </Table>
  );
}
