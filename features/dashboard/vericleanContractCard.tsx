'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { FileCog } from 'lucide-react';
import Image from 'next/image';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import Link from 'next/link';

export function VericleanContractCard() {
  const router = useEnhancedRouter();
  const targetRoute = '/contracts?t=vericlean';
  return (
    <Link
      href={targetRoute}
      shallow={true}
      onClick={() => router.push(targetRoute)}
    >
      <Card
        className="hover:bg-gray-50 cursor-pointer transition duration-200 ease-in-out  bg-white"
      >
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center gap-1">
              <FileCog className="h-[32px] w-[32px]" />
              Vericlean Contract
            </div>
          </CardTitle>
          <CardDescription>
            View Vericlean contract and its details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-[256px] m-auto">
            <Image
              className="rounded"
              src="/assets/vericleancontract.webp"
              alt="Reward Contract Card"
              height={256}
              width={256}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
