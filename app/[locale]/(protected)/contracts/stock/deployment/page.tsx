import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { fetchAllUserAccounts } from '@/server/fetchUserAccounts';
import { OwnerSelection } from '@/features/contracts/stock/stockContractCreation/ownerSelection';
import { SearchInput } from '@/components/ui/search';

/*
 * 1. instantiate contract -> charges with 1 SIGNA also
 * 2. [if separator] register certification contract
 * 3. [if separator && !intermediate] register at collector token contract
 * 4. register business partner
 * 5. [optional] authorize additional user
 */

export default async function NewContractPage() {
  const userAccounts = await fetchAllUserAccounts({ onlyActive: true });
  return (
    <Card className="bg-card/25">
      <CardHeader>
        <div className="flex flex-row justify-between items-start w-full">
          <div>
            <CardTitle>New Separator Contract</CardTitle>
            <CardDescription>
              Select the owner of the new contract
            </CardDescription>
          </div>
          <div className="flex-shrink">
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <OwnerSelection userAccounts={userAccounts} />
      </CardContent>
    </Card>
  );
}
