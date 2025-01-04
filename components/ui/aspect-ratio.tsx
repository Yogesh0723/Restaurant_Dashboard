// components/ui/AspectRatio.tsx
'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

interface AspectRatioProps {
  ratio?: number; // Default ratio will be 16/9
  children: React.ReactNode;
  className?: string;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  children,
  className = '',
}) => {
  return (
    <AspectRatioPrimitive.Root ratio={ratio} className={className}>
      {children}
    </AspectRatioPrimitive.Root>
  );
};
