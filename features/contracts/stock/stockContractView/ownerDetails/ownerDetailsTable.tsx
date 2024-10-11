import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { UserAccount } from '@/types/userAccount';
import { AddressField } from '@/components/ui/addressField';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
  owner: UserAccount;
}

export function OwnerDetailsTable({ owner }: Props) {
  return (
    <Table>
      <TableHeader />
      <TableBody>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>
            {owner.isActive ? (
              <Badge variant="success">ACTIVE</Badge>
            ) : (
              <Badge variant="destructive">BLOCKED</Badge>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Owner</TableCell>
          <TableCell>
            <AddressField
              accountId={owner.accountId}
              fallbackLabel="No Owner Defined"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Owner Email</TableCell>
          <TableCell>{owner.email ?? 'Now Owner Defined'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Stock Contracts</TableCell>
          <TableCell>
            <div className="flex flex-row gap-2">
              {owner.stockContracts.map(({ id, label }) => {
                return (
                  <Link key={id} href={`/contracts/stock/${id}`}>
                    <Badge variant="outline">{label.toUpperCase()}</Badge>
                  </Link>
                );
              })}
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Collectibles</TableCell>
          <TableCell>
            <div className="flex flex-row gap-2">
              {!owner.collectible.length ? '-' : owner.collectible.map(({ id, label }) => <Badge variant="outline">{label.toUpperCase()}</Badge> )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
