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
import { Button } from '@/components/ui/button';
import { File, PlusCircle } from 'lucide-react';


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
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Stock Contract
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="stockContracts">
        <Card>
          <CardHeader>
            <CardTitle>Stock Contracts</CardTitle>
            <CardDescription>All created Stock Contracts</CardDescription>
          </CardHeader>
          <CardContent>
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
          <CardContent>
            <div className="max-h-[400px] h-[400px] overflow-y-auto">
              <CertContractTable
                contracts={contractList.certificateContracts}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
