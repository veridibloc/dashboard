import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cache } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contractsProvider } from '@/common/contractsProvider';
import { StockContractTable } from 'features/contracts/stock/stockContractTable';
import { CertContractTable } from '@/features/contracts/cert/certContractTable';
import { fetchAllContracts } from './server';


export default async function ContractsPage() {
  const contractList = await fetchAllContracts();
  return (
    <Tabs defaultValue="stockContracts">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="stockContracts">Stock Contracts</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          {/*<TabsTrigger value="draft">Draft</TabsTrigger>*/}
          {/*<TabsTrigger value="archived" className="hidden sm:flex">*/}
          {/*  Archived*/}
          {/*</TabsTrigger>*/}
        </TabsList>
      </div>
      <TabsContent value="stockContracts">
        <Card>
          <CardHeader>
            <CardTitle>Stock Contracts</CardTitle>
            <CardDescription>All created Stock Contracts</CardDescription>
          </CardHeader>
          <CardContent >
            <div className="max-h-[400px] h-[400px] overflow-y-auto">
              <StockContractTable contracts={contractList.stockContracts} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="certificates">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Contracts</CardTitle>
            <CardDescription>All created Certificate Contracts</CardDescription>
          </CardHeader>
          <CardContent >
            <div className="max-h-[400px] h-[400px] overflow-y-auto">
              <CertContractTable contracts={contractList.certificateContracts} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
