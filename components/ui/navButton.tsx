'use client';

import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';
import Link from 'next/link';

interface Props extends ButtonProps {
  path: string;
  icon?: React.ReactNode;
}

export function NavButton({ path, icon, children, ...rest }: Props) {
  const router = useEnhancedRouter();

  const navigate = () => {
    router.push(path);
  };

  return (
    <Link href={path} shallow={true} prefetch={true}>
      <Button size="sm" className="h-8 gap-1" {...rest} onClick={navigate}>
        {children}
      </Button>
    </Link>
  );
}
