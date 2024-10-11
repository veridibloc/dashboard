'use server';
import { Contract } from '@signumjs/contracts';
import { contractsProvider } from '@/common/contractsProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { stockModeText } from '@/common/stockModeText';
import { AddressField } from '@/components/ui/addressField';
import { AmountField } from '@/components/ui/amountField';
import { cn } from '@/lib/utils';
import { Amount } from '@signumjs/util';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  contract: Contract;
}

export async function StockContractStatsView({ contract }: Props) {
  const stockContract = contractsProvider.toStockContract(contract);
  const data = stockContract.getData();

  return (
    <div className="flex flex-col gap-4 text-center">
      <Card className="bg-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">In Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl text-center w-full font-bold text-gray-900">
            {data.stockQuantity} kg
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">Lot Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl text-center w-full font-bold text-gray-900">
            {data.generatedLotCount}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
