import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { StockContractLotRow } from './stockContractLotRow';
import { Contract } from '@signumjs/contracts';

interface Props {
  lotIds: { lotId: string, sold: boolean }[];
  contract: Contract;
}

export function StockContractLotsTable({ lotIds, contract }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Creation Date</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Composition</TableHead>
          <TableHead>Sold</TableHead>
          <TableHead>Sold Date</TableHead>
          <TableHead>Confirmed Quantity</TableHead>
          <TableHead>Receipt Id</TableHead>
          <TableHead>Buyer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!lotIds.length && <TableRow>
          <TableCell colSpan={9}>
            <div className="text-center text-lg text-gray-400" style={{color: "lightgray"}}>
              No Lots
            </div>
          </TableCell>
        </TableRow>}
        {lotIds.map(({ lotId, sold }) => (
          <StockContractLotRow key={lotId}  lotId={lotId} sold={sold} contract={contract}/>
        ))}
      </TableBody>
    </Table>
  );
}