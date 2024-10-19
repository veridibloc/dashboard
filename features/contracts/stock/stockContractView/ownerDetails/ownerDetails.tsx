'use server';
import { fetchUserAccountByAccountId } from '@/server/fetchUserAccounts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OwnerDetailsTable } from './ownerDetailsTable';

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
        <CardTitle className="flex flex-row items-center gap-x-2">
          Owner
          {owner ? (
            <Badge variant="outline">{owner.role?.toUpperCase()}</Badge>
          ) : (
            ''
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {owner ? <OwnerDetailsTable owner={owner} /> : <NoOwnerDefined />}
      </CardContent>
    </Card>
  );
}
