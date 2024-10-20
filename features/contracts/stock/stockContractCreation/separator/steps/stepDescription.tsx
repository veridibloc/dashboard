'use client';

import { TextArea } from '@/components/ui/textarea';
import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';
import { FieldLegend } from '@/components/ui/fieldLegend';
import { ChangeEvent, useState } from 'react';

interface Props extends WizardStepProps<CreationData, string> {}

const MaxLength = 64;

export function StepDescription({ updateData, data }: Props) {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setText(description);
    updateData('description', description)
  };

  return (
    <>
      <FieldLegend text="Brief Owner Description" />
      <div className="relative">
        <TextArea
          maxLength={MaxLength}
          value={data.description}
          onChange={handleChange}
        />
        <small className="absolute text-xs text-gray-400 top-1 right-1">{text.length}/{MaxLength}</small>
      </div>
    </>
  );
}
