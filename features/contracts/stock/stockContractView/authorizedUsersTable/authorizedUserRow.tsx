
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { StockContractAuthorization } from '@/types/stockContractAuthorization';
import { AddressField } from '@/components/ui/addressField';
import { UserBalanceRow } from './userBalanceRow';

function getLevelType(auth: StockContractAuthorization) {
  if(auth.type === 'partner'){
    return {
      0: "Unauthorized",
      1: "Authorized"
    }[auth.level] ?? 'Unknown'
  }

  if(auth.type === 'user'){
    return {
      0: "Unauthorized",
      1: "Normal",
      2: "Admin"
    }[auth.level] ?? 'Unknown'
  }
  
  return "Unknown"
}

interface Props {
  auth: StockContractAuthorization;
}

export function AuthorizedUserRow({ auth }: Props) {

  return (
    <TableRow>
      <TableCell>
        <AddressField accountId={auth.accountId} />
      </TableCell>
      <TableCell>
        <Badge variant={auth.type === 'partner' ? 'outline' : 'secondary'}>
          {auth.type.toUpperCase()}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={auth.level === 0 ? 'destructive' : 'outline'}>{getLevelType(auth)}</Badge>
      </TableCell>
      <TableCell>
        {auth.email}
      </TableCell>
      <TableCell>
        <UserBalanceRow accountId={auth.accountId} />
      </TableCell>
    </TableRow>
  );
}
