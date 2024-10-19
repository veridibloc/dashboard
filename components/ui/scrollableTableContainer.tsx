import { ChildrenProps } from '@/types/childrenProps';
import { HTMLAttributes } from 'react';

interface Props extends ChildrenProps, HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

export const ScrollableTableContainer = ({ children, maxHeight = '600px', ...props }: Props) => (
  <div className={`max-h-[${maxHeight}] overflow-y-auto`} {...props}>{children}</div>
);