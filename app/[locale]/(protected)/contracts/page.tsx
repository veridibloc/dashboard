import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockContractTable } from 'features/contracts/stock/stockContractTable';
import { CertContractTable } from '@/features/contracts/cert/certContractTable';
import { fetchAllContracts } from './server';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PageProps } from '@/types/pageProps';

interface Props extends PageProps<{}, { t: string }>{}

export default async function ContractsPage({searchParams : {t : type}}: Props) {
  const contractList = await fetchAllContracts();
  return (
    <Tabs defaultValue="stock" value={type}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="stock">Stock Contracts</TabsTrigger>
          <TabsTrigger value="cert">Certificates</TabsTrigger>
          <TabsTrigger value="vericlean">Vericlean</TabsTrigger>
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
      <TabsContent value="stock">
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
      <TabsContent value="cert">
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
      <TabsContent value="vericlean">
        <Card>
          <CardHeader>
            <CardTitle>Vericlean Contracts</CardTitle>
            <CardDescription>The Collector Reward Contract</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] h-[400px] overflow-y-auto">
              <h2>TO DO</h2>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
