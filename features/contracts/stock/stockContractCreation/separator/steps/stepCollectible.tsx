import { WizardStepProps } from '@/components/ui/wizard';
import { CreationData } from '../creationData';


interface Props extends WizardStepProps<CreationData, string> {}

export function StepCollectible({}: Props) {
  return <h1>Collectible</h1>
}