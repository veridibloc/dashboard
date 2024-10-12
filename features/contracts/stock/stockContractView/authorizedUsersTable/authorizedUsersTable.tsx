import {
  Table,
  TableBody,
  TableCell, TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { UserAccount } from '@/types/userAccount';
import { AddressField } from '@/components/ui/addressField';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { StockContractAuthorization } from '@/types/stockContractAuthorization';
import { AuthorizedUserRow } from '@/features/contracts/stock/stockContractView/authorizedUsersTable/authorizedUserRow';

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
        {authorizations.map(a =>
          <AuthorizedUserRow key={a.accountId} auth={a}/>
        )}
      </TableBody>
    </Table>
  );
}
