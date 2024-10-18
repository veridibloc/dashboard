import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';

interface Props extends WizardStepProps<CreationData, string> {}

export function StepMaterial({}:Props) {
  return <h1>Material</h1>
}