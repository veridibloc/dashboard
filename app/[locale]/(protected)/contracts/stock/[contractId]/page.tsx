import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PageProps } from '@/types/pageProps';
import {
  StockContractStats,
  OwnerDetails,
  StockContractDetails,
  AuthorizedUsersTable
} from '@/features/contracts/stock/stockContractView';
import { notFound } from 'next/navigation';
import {
  fetchSingleContract, fetchStockContractAuthorizedUsers,
  fetchStockContractErrors,
  fetchStockContractLotsIds
} from '../../server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Marker } from '@/components/ui/marker';
import { contractsProvider } from '@/common/contractsProvider';
import { Button } from '@/components/ui/button';
import { Cpu, LinkIcon } from 'lucide-react';
import { ExternalLink } from '@/components/ui/externalLink';
import { Badge } from '@/components/ui/badge';
import { stockModeText } from '@/common/stockModeText';
import { StockContractErrorTable } from '@/features/contracts/stock/stockContractView/stockContractErrorTable';
import { getStockContractDescriptor } from '@/common/getStockContractDescriptor';
import { StockContractLotsTable } from '@/features/contracts/stock/stockContractView/stockContractLotsTable';

interface Props extends PageProps<{ contractId: string }> {}

function getInspectorUrl(contractId: string): string {
  return `${process.env.NEXT_PUBLIC_LEDGER_INSPECTOR_URL}?node=${process.env.NEXT_PUBLIC_LEDGER_HOST_URLS}&address=${contractId}`;
}

function getExplorerUrl(contractId: string): string {
  return `${process.env.NEXT_PUBLIC_EXPLORER_INSPECTOR_URL}/at/${contractId}`;
}

export default async function ContractPage({ params: { contractId } }: Props) {
  const [contract, errors, lotIds, authorizations] = await Promise.all([
    fetchSingleContract(contractId),
    fetchStockContractErrors(contractId),
    fetchStockContractLotsIds(contractId),
    fetchStockContractAuthorizedUsers(contractId)
  ]);
  if (!contract) {
    notFound();
  }
  const stockContract = contractsProvider.toStockContract(contract);
  const descriptor = getStockContractDescriptor(contract);
  const data = stockContract.getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Contract - {contract.atRS} </CardTitle>
        <CardDescription>
          <Badge variant="outline">
            {stockModeText(data.stockMode).toUpperCase()}
          </Badge>
          &nbsp;
          {descriptor.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="details">Overview</TabsTrigger>
              <TabsTrigger value="lots">Lots</TabsTrigger>
              <TabsTrigger value="auth">Authorizations</TabsTrigger>
              <Marker
                variant="error"
                text={errors.length > 9 ? '9+' : errors.length.toString()}
                visible={!!errors.length}
              >
                <TabsTrigger value="errors">Errors</TabsTrigger>
              </Marker>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <ExternalLink href={getInspectorUrl(contractId)}>
                <Button size="sm" variant="secondary" className="h-8 gap-1">
                  <Cpu className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    View in Inspector
                  </span>
                </Button>
              </ExternalLink>
              <ExternalLink href={getExplorerUrl(contractId)}>
                <Button size="sm" variant="secondary" className="h-8 gap-1">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    View in Explorer
                  </span>
                </Button>
              </ExternalLink>
            </div>
          </div>
          <TabsContent value="details">
            <Card className="bg-gray-50">
              <CardHeader />
              <CardContent>
                <div className="flex items-stretch justify-center gap-x-4 w-full">
                  <StockContractStats contract={contract} />
                  <StockContractDetails contract={contract} />
                  <OwnerDetails ownerId={data.ownerId} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>Contract Errors</CardTitle>
                <CardDescription>
                  All Errors occurred on this contract
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[400px] h-[400px] overflow-y-auto">
                  <StockContractErrorTable errors={errors} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="lots">
            <Card>
              <CardHeader>
                <CardTitle>Lots</CardTitle>
                <CardDescription>
                  Shows all the lots and their states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockContractLotsTable lotIds={lotIds} contract={contract} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="auth">
            <Card>
              <CardHeader>
                <CardTitle>Authorized Users</CardTitle>
                <CardDescription>
                  Manage Authorized Users and Business Partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthorizedUsersTable authorizations={authorizations} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
