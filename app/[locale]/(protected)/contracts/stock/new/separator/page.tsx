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

interface Props extends PageProps<{}, { r: string, id: string }>{}

export default async function NewContractPage({searchParams: {r, id}}: Props) {
  const owner = await fetchUserAccountByAccountId(id);

  if(!owner){
    return notFound()
  }

  return (
    <Card className="bg-card/25">
      <CardHeader>
        <div className="flex flex-row justify-between items-start w-full">
          <div>
            <CardTitle>New Separator Contract</CardTitle>
            <CardDescription>Owner: {owner?.email} - Address: <AddressField accountId={id}/> </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <StockContractCreationFormSeparator/>
      </CardContent>
    </Card>
  );
}
