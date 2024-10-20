import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { fetchUserAccountByAccountId } from '@/server/fetchUserAccounts';
import { PageProps } from '@/types/pageProps';
import { StockContractCreationFormSeparator } from '@/features/contracts/stock/stockContractCreation';
import { notFound } from 'next/navigation';
import { AddressField } from '@/components/ui/addressField';

/*
 * 1. instantiate contract -> charges with 1 SIGNA also
 * 2. [if separator] register certification contract
 * 3. [if separator && !intermediate] register at collector token contract
 * 4. register business partner
 * 5. [optional] authorize additional user
 */

interface Props extends PageProps<{}, { ownerId: string }>{}

export default async function NewContractPage({searchParams: {ownerId}}: Props) {

  if(!ownerId){
    throw new Error("ownerId must be provided");
  }

  const owner = await fetchUserAccountByAccountId(ownerId);

  if(!owner){
    return notFound()
  }

  return (
    <Card className="bg-card/25">
      <CardHeader>
        <div className="flex flex-row justify-between items-start w-full">
          <div>
            <CardTitle>New Separator Contract</CardTitle>
            <CardDescription>Owner: {owner.email} - Address: <AddressField accountId={ownerId}/> </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <StockContractCreationFormSeparator owner={owner}/>
      </CardContent>
    </Card>
  );
}
