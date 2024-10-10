import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PageProps } from '@/types/pageProps';
import { StockContractErrorTable } from '@/features/contracts/stock/stockContractView';
import { notFound } from 'next/navigation';
import { fetchSingleContract } from '../../server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contractsProvider } from '@/common/contractsProvider';
import { Marker } from '@/components/ui/marker';

interface Props extends PageProps<{ contractId: string }> {}

export default async function ContractPage({ params: { contractId } }: Props) {
  const contract = await fetchSingleContract(contractId);
  if (!contract) {
    notFound();
  }

  const stockContract = contractsProvider.toStockContract(contract);
  const errors = await stockContract.getErrors();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Contract - {contract.atRS}</CardTitle>
        <CardDescription>All about this Stock Contract</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <Marker variant="error" text={errors.length > 9 ? "9+": errors.length.toString()} visible={!!errors.length}>
                <TabsTrigger value="errors">Errors</TabsTrigger>
              </Marker>
            </TabsList>
          </div>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Stock Contracts</CardTitle>
                <CardDescription>All created Stock Contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[400px] h-[400px] overflow-y-auto">
                  <h2>TO DO</h2>
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
        </Tabs>
      </CardContent>
    </Card>
  );
}
