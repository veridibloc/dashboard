import {
  Table,
  TableBody,
  TableCell, TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { StockContractAuthorization } from '@/types/stockContractAuthorization';
import { AuthorizedUserRow } from './authorizedUserRow';

interface Props {
  authorizations: StockContractAuthorization[];
}

export function AuthorizedUsersTable({ authorizations }: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!authorizations.length && <TableRow>
          <TableCell colSpan={4}>
            <div className="text-center text-lg text-gray-400" style={{color: "lightgray"}}>
              No Authorized Users or Partners
            </div>
          </TableCell>
        </TableRow>}
        {authorizations.map(a =>
          <AuthorizedUserRow key={a.accountId} auth={a}/>
        )}
      </TableBody>
    </Table>
  );
}
