"use client"

import React, { createContext } from 'react';
import { type MaterialMap } from '@/types/materialMap';
import { ChildrenProps } from '@/types/childrenProps';

interface Props extends ChildrenProps {
  materials: MaterialMap;
}

export const MaterialContext = createContext<MaterialMap>(new Map());

export function MaterialClientProvider({ children, materials }: Props) {

  return (
    <MaterialContext.Provider value={materials}>
      {children}
    </MaterialContext.Provider>
  );
}
