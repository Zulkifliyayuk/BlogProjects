import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  asChild = false,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  let baseClass = '';

  if (variant === 'primary') {
    baseClass = 'bg-primary-300 hover:bg-primary-300/70';
  } else if (variant === 'secondary') {
    baseClass = 'bg-[#EE1D52] hover:bg-[#EE1D52]/70';
  }

  return (
    <Comp
      data-slot='button'
      className={cn(
        'text-neutral-25 flex shrink-0 cursor-pointer items-center justify-center rounded-full py-2.5 disabled:pointer-events-none disabled:opacity-50',
        baseClass,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
