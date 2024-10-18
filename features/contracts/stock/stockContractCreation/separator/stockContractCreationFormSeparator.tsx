'use client';
import { Wizard, WizardStepProps } from '@/components/ui/wizard';
import { StepDescription, StepMaterial, StepCollectible } from './steps';
import { CreationData } from './creationData';

const initialData: CreationData = {
  ownerId: '',
  certificateContractId: '',
  collectorTokenId: '',
  description: ''
};

const steps = [
  { title: 'Description', description: 'What describes the Separator best?' },
  {
    title: 'Collectible',
    description: 'Which materials does the Separator receive from Collectors?'
  },
  {
    title: 'Material',
    description: 'Which materials does the Separators sell to their partners?'
  }
];

const StepComponents = [StepDescription, StepCollectible, StepMaterial];

const WizardStepRenderer = (props: WizardStepProps<CreationData, string>) => {
  const StepComponent = StepComponents[props.step - 1];
  return StepComponent ? <StepComponent {...props} /> : null;
};

export function StockContractCreationFormSeparator() {
  const handleOnFinish = (data: CreationData) => {
    console.log('onFinish', data);
  };

  return (
    <Wizard steps={steps} initialState={initialData} onFinish={handleOnFinish}>
      {(props) => (
        <div className="min-h-[200px] w-full py-2">
          <WizardStepRenderer {...props} />
        </div>
      )}
    </Wizard>
  );
}
