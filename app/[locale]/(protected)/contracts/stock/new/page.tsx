import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChildrenProps } from '@/types/childrenProps';

/*
 * 1. instantiate contract -> charges with 1 SIGNA also
 * 2. [if separator] register certification contract
 * 3. [if separator && !intermediate] register at collector token contract
 * 4. register business partner
 * 5. [optional] authorize additional user
 */


export default async function NewContractPage() {
  return (
      <div className="flex items-center">
        <Card>
          <CardHeader>
            <CardTitle>New Contract</CardTitle>
            <CardDescription>Create a new contract Table</CardDescription>
          </CardHeader>
          <CardContent>
            <TableContainer>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
  );
}

const TableContainer = ({ children }: ChildrenProps) => (
  <div className="max-h-[600px] overflow-y-auto">{children}</div>
);
