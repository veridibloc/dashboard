"use server"
import { Contract } from '@signumjs/contracts';
import { contractsProvider } from '@/common/contractsProvider';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { stockModeText } from '@/common/stockModeText';
import { AddressField } from '@/components/ui/addressField';
import { AmountField } from '@/components/ui/amountField';
import { Amount } from '@signumjs/util';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getStockContractDescriptor } from '@/common/getStockContractDescriptor';

interface Props {
  contract: Contract;
}

export async function StockContractDetailsTable({contract}: Props) {

  const stockContract = contractsProvider.toStockContract(contract);
  const data = stockContract.getData();
  const descriptor = getStockContractDescriptor(contract);
  const isBalanceLow  = Amount.fromPlanck(contract.balanceNQT).lessOrEqual(Amount.fromSigna(1.0))

  return (
    <Table>
      <TableHeader/>
      <TableBody>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>
            {data.isHalted
              ? <Badge variant="destructive">INACTIVE</Badge>
              : <Badge variant="success">ACTIVE</Badge>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>
            {contract.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Material</TableCell>
          <TableCell>
            {descriptor.material}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mode</TableCell>
          <TableCell>
            <Badge variant="accent">{stockModeText(data.stockMode).toUpperCase()}</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Intermediate</TableCell>
          <TableCell>
            {data.isIntermediate ? <Badge variant="default">INTERMEDIATE</Badge> : '-' }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Issuing Certificate</TableCell>
          <TableCell>
            {!data.certificateContractId || data.certificateContractId === "0" ? "-" :
              <AddressField accountId={data.certificateContractId}/>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Usage Fee (SIGNA)</TableCell>
          <TableCell>
              <AmountField planck={data.usageFeePlanck}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Balance (SIGNA)</TableCell>
          <TableCell>
            {isBalanceLow
              ?
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="destructive"><AmountField planck={contract.balanceNQT}/></Badge>
                </TooltipTrigger>
                <TooltipContent>Balance Low - Recharge Contract</TooltipContent>
              </Tooltip>
              : <AmountField planck={contract.balanceNQT} />
            }
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}