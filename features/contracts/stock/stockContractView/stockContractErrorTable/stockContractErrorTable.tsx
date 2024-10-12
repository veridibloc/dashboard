'use client';

import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { StockContractErrorRow } from './stockContractErrorRow';

interface Props {
  errors: { txId: string, code: string }[];
}

export function StockContractErrorTable({ errors }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Occurred</TableHead>
          <TableHead>Transaction Id</TableHead>
          <TableHead>Sender</TableHead>
          {/*<TableHead>Detail</TableHead>*/}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!errors.length && <TableRow>
          <TableCell colSpan={4}>
            <div className="text-center text-lg text-gray-400" style={{color: "lightgray"}}>
              No Errors
            </div>
          </TableCell>
        </TableRow>}
        {errors.map(({ txId, code }) => (
          <StockContractErrorRow key={txId} type={code} txId={txId} />
        ))}
      </TableBody>
    </Table>
  );
}