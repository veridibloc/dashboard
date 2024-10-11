"use server"

import { Contract } from '@signumjs/contracts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StockContractStatsView } from './stockContractStatsView';

interface Props {
  contract: Contract;
}

export async function StockContractStats({contract}: Props) {
  return (<Card>
    <CardHeader>
      <CardTitle>Stats</CardTitle>
    </CardHeader>
    <CardContent>
      <StockContractStatsView contract={contract} />
    </CardContent>
  </Card>)
}