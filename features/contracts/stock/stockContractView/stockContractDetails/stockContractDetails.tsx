import { Contract } from '@signumjs/contracts';
import { contractsProvider } from '@/common/contractsProvider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  contract: Contract;
}


export function StockContractDetails({contract}: Props) {

  const stockContract = contractsProvider.toStockContract(contract);
  const data = stockContract.getData()
  // const {data: errors, isLoading} = useSWR(`veridibloc/api/stock/${contract.at}/errors`, () => stockContract.())

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Owner</TableCell>
          <TableCell>{data.ownerId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Owner Email</TableCell>
          <TableCell>"somemail@fromauth.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}