import { ChildrenProps } from '@/types/childrenProps';
import { Spinner } from '@/components/ui/spinner';

interface Props extends ChildrenProps{
  isLoading: boolean
}

export function LoadableComponent({isLoading, children}: Props ){
  return isLoading ? <Spinner /> : children
}
