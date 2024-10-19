"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { UserAccount } from '@/types/userAccount';
import { UserAccountTableRow } from './userAccountTableRow';

interface Props {
  userAccounts: UserAccount[];
  onRowClick: (userAccount: UserAccount) => void;
}

export function UserAccountTable({ userAccounts, onRowClick }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Collectibles</TableHead>
          <TableHead>StockContracts</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userAccounts.map((userAccount) => (
          <UserAccountTableRow
            key={userAccount.accountId}
            userAccount={userAccount}
            onClick={onRowClick}
          />
        ))}
      </TableBody>
    </Table>
  );
}
