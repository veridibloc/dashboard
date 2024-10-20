import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';
import { useMaterial } from '@/components/hooks/useMaterial';
import { useMemo } from 'react';
import { FieldLegend } from '@/components/ui/fieldLegend';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props extends WizardStepProps<CreationData, string> {}

export function StepMaterial({updateData, data}:Props) {
  const { getProducibles } = useMaterial();

  const producibles = useMemo(() => {
    return getProducibles();
  }, [getProducibles]);

  return (
    <>
      <FieldLegend text="Producible Material" />
      <div className="relative">
        <Select onValueChange={materialId => updateData('certificateContractId', materialId)} value={data.certificateContractId}>
          <SelectTrigger>
            <SelectValue placeholder="Select producible material..." />
          </SelectTrigger>
          <SelectContent>
            {producibles
              .map((m) => (
                <SelectItem key={`producible-${m.slug}-${m.materialId}`} value={m.materialId}>
                  {m.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}