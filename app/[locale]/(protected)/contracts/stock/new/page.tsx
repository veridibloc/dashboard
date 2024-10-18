import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  StockContractCreationFormProcessor,
  StockContractCreationFormSeparator
} from '@/features/contracts/stock/stockContractCreation';

/*
 * 1. instantiate contract -> charges with 1 SIGNA also
 * 2. [if separator] register certification contract
 * 3. [if separator && !intermediate] register at collector token contract
 * 4. register business partner
 * 5. [optional] authorize additional user
 */


export default async function NewContractPage() {
  return (
    <Tabs defaultValue="separator">
      <div className="flex items-center">
        <TabsList>
            <TabsTrigger value="separator">Separator</TabsTrigger>
            <TabsTrigger value="processor">Processor</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="separator">
        <Card className="bg-card/25">
          <CardHeader>
            <CardTitle>New Separator Contract</CardTitle>
          </CardHeader>
          <CardContent>
              <StockContractCreationFormSeparator/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="processor">
        <Card className="bg-card/25">
          <CardHeader>
            <CardTitle>New Processor Contract</CardTitle>
          </CardHeader>
          <CardContent>
              <StockContractCreationFormProcessor/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>  );
}

