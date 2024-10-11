'use server';
import { fetchUserAccountByAccountId } from '@/server/fetchUserAccountByAccountId';
import { UserAccount } from '@/types/userAccount';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { OwnerDetailsTable } from '@/features/contracts/stock/stockContractView/ownerDetails/ownerDetailsTable';
import { Badge } from '@/components/ui/badge';

function NoOwnerDefined() {
  return (
    <div className="text-gray-500 text-lg text-center w-full">
      No Owner Defined
    </div>
  );
}



interface Props {
  ownerId: string;
}

export async function OwnerDetails({ ownerId }: Props) {
  const owner = await fetchUserAccountByAccountId(ownerId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-x-2">Owner
          {owner ? <Badge variant="outline">{owner.role.toUpperCase()}</Badge> : ''}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {owner ? <OwnerDetailsTable owner={owner} /> : <NoOwnerDefined />}
      </CardContent>
    </Card>
  );
}