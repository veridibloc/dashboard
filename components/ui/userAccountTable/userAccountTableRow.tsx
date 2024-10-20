'use client';

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
import { AddressField } from '@/components/ui/addressField';
import { UserAccount } from '@/types/userAccount';
import Link from 'next/link';

interface Props {
  onClick: (userAccount: UserAccount) => void;
  userAccount: UserAccount;
}

export function UserAccountTableRow({ userAccount, onClick }: Props) {
  return (
    <TableRow onClick={() => onClick(userAccount)}>
      <TableCell>
        <div className="flex flex-col justify-center">
          <div>
            <Badge
              variant={userAccount.isIntermediate ? 'secondary' : 'outline'}
            >
              {userAccount.role?.toUpperCase() ?? ''}
            </Badge>
          </div>
          {userAccount.isIntermediate && (
            <small className="text-xs text-gray-500">(intermediate)</small>
          )}
        </div>
      </TableCell>
      <TableCell>{`${userAccount.firstName} ${userAccount.lastName}`}</TableCell>
      <TableCell>{userAccount.email}</TableCell>
      <TableCell>
        <AddressField accountId={userAccount.accountId} />
      </TableCell>
      <TableCell>
        {userAccount.isActive ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="destructive">InActive</Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-x-1">
          {userAccount.collectible?.map(({ id, label }, index) => (
            <Badge key={`collectible-${id}-${index}`} variant="outline">
              {label}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-x-1 w-[200px] flex-wrap">
          {userAccount.stockContracts?.map(({ id, label }, index) => (
            <Link key={`contract-${id}-${index}`} href={`/contracts/stock/${id}`}>
              <Badge variant="outline">{label}</Badge>
            </Link>
          ))}
        </div>
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
