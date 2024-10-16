import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Contract } from '@signumjs/contracts';
import { StockContractRow } from '@/features/contracts/stock/stockContractTable/stockContractRow';

interface Props {
  contracts: Contract[];
}

export function StockContractTable({ contracts }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Contract Code</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Creation Block</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Errors</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
          {contracts.map((contract) => (
            <StockContractRow key={contract.at} contract={contract} />
          ))}
      </TableBody>
    </Table>
  );
}
