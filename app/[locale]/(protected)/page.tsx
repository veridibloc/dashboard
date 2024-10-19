import { PlusCircle } from 'lucide-react';
import { StockContractCard } from '@/features/dashboard/stockContractCard';
import { CertContractCard } from '@/features/dashboard/certContractCard';
import { VericleanContractCard } from '@/features/dashboard/vericleanContractCard';
import { NavButton } from '@/components/ui/navButton';

export default async function Page({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <NavButton path={"./contracts/stock/deployment"}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Stock Contract
            </span>
          </NavButton>
          <NavButton path={"./contracts/cert/deployment"}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Certificate Contract
            </span>
          </NavButton>
        </div>
      </div>
      <hr className="w-full"/>
      <div className="flex justify-center items-stretch gap-4 ">
        <StockContractCard />
        <CertContractCard />
        <VericleanContractCard />
      </div>
    </div>
  );
}
