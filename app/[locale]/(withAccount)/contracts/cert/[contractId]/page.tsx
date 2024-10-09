import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PageProps } from '@/types/pageProps';
import { notFound } from 'next/navigation';
import { fetchSingleContract } from '../../server';

interface Props extends PageProps<{ contractId: string }> {}

export default async function ContractPage({ params: { contractId } }: Props) {
  const contract = await fetchSingleContract(contractId);
  if (!contract) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificate Contract</CardTitle>
        <CardDescription>Details of Certificate Contract</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] h-[400px] overflow-y-auto">
          <h2>Cert Contract View</h2>
        </div>
      </CardContent>
    </Card>
  );
}
