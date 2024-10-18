"use client";

import { TextArea } from '@/components/ui/textarea';
import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';
import { FieldLegend } from '@/components/ui/fieldLegend';

interface Props extends WizardStepProps<CreationData, string> {}

export function StepDescription({ updateData, data }: Props) {

  return (
    <>
      <FieldLegend text="Brief Owner Description" />
      <TextArea
        maxLength={64}
        value={data.description}
        onChange={(e) => updateData('description', e.target.value)}
      />
    </>
  );
}
