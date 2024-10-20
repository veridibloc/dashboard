'use client';

import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';
import { useMaterial } from '@/components/hooks/useMaterial';
import { FieldLegend } from '@/components/ui/fieldLegend';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useMemo } from 'react';

interface Props extends WizardStepProps<CreationData, string> {}

export function StepCollectible({updateData, data}: Props) {
  const { getCollectibles } = useMaterial();

  const collectibles = useMemo(() => {
    return getCollectibles();
  }, [getCollectibles]);

  return (
    <>
      <FieldLegend text="Collectible Material" />
      <div className="relative">
        <Select onValueChange={materialId => updateData('materialId', materialId)} value={data.materialId}>
          <SelectTrigger>
            <SelectValue placeholder="Select collectible material..." />
          </SelectTrigger>
          <SelectContent>
            {collectibles
              .map((m) => (
                <SelectItem key={`collectible-${m.slug}-${m.materialId}`} value={m.materialId}>
                  {m.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
