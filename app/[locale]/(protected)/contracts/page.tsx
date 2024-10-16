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
import { BadgePlus, PackagePlus, PlusCircle } from 'lucide-react';
import { PageProps } from '@/types/pageProps';
import Link from 'next/link';
import { ChildrenProps } from '@/types/childrenProps';
import { NavButton } from '@/components/ui/navButton';

interface Props extends PageProps<{}, { t: string }> {}

export default async function ContractsPage({
  searchParams: { t: type = 'stock' }
}: Props) {
  const contractList = await fetchAllContracts();
  return (
    <Tabs value={type}>
      <div className="flex items-center">
        <TabsList>
          <Link href="?t=stock" shallow={true} prefetch={true}>
            <TabsTrigger value="stock">Stock Contracts</TabsTrigger>
          </Link>
          <Link href="?t=cert" shallow={true} prefetch={true}>
            <TabsTrigger value="cert">Certificates</TabsTrigger>
          </Link>
          <Link href="?t=vericlean" shallow={true} prefetch={true}>
            <TabsTrigger value="vericlean">Vericlean</TabsTrigger>
          </Link>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <NavButton path={"./contracts/stock/new"}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Stock Contract
            </span>
          </NavButton>
          <NavButton path={"./contracts/cert/new"}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Certificate Contract
            </span>
          </NavButton>
        </div>
      </div>
      <TabsContent value="stock">
        <Card>
          <CardHeader>
            <CardTitle>Stock Contracts</CardTitle>
            <CardDescription>All created Stock Contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <TableContainer>
              <StockContractTable contracts={contractList.stockContracts} />
            </TableContainer>
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
            <TableContainer>
              <CertContractTable
                contracts={contractList.certificateContracts}
              />
            </TableContainer>
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
            <TableContainer>
              <h2>TO DO</h2>
            </TableContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const TableContainer = ({ children }: ChildrenProps) => (
  <div className="max-h-[600px] overflow-y-auto">{children}</div>
);
