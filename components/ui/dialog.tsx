'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

export const Dialog = DialogPrimitive.Root;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTitle>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.DialogTitle
    ref={ref}
    className={cn('text-xl text-center font-bold p-2', className)}
    {...props}
  />
));

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/20  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, title, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-1/3 left-1/2 z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:duration-300 data-[state=open]:duration-500",
        "max-w-full max-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/3 rounded-lg drop-shadow-lg",
        className
        )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close>
        <div className="fixed top-2 right-2 rounded-full hover:bg-gray-100 p-1 cursor-pointer transition-colors">
          <XIcon size="20px" />
        </div>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;
