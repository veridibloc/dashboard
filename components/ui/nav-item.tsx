'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEnhancedRouter } from '@/components/hooks/useEnhancedRouter';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const {push} = useEnhancedRouter()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() => push(href)}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'bg-accent text-black': pathname === href
            }
          )}
        >
          {children}
          <span className="sr-only">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
