import React from 'react';
import { fetchMaterials } from '@/server/fetchMaterials';
import { ChildrenProps } from '@/types/childrenProps';
import { MaterialClientProvider } from './materialClientProvider';

interface Props extends ChildrenProps {
  locale: string;
}

export async function MaterialProvider({
  children,
  locale
}: Props) {
  const materials = await fetchMaterials(locale);
  return (
    <MaterialClientProvider materials={materials}>
      {children}
    </MaterialClientProvider>
  );
}
