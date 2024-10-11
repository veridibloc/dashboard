"use server"

import { Contract } from '@signumjs/contracts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  StockContractDetailsTable
} from './stockContractDetailsTable';

interface Props {
  contract: Contract;
}

export async function StockContractDetails({contract}: Props) {
  return (<Card>
    <CardHeader>
      <CardTitle>Details</CardTitle>
    </CardHeader>
    <CardContent>
      <StockContractDetailsTable contract={contract} />
    </CardContent>
  </Card>)
}