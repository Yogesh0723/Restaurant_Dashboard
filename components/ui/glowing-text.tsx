// components/ui/glowing-text.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlowingText({ children, className, delay = 0 }: GlowingTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "relative inline-block",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500",
        "before:opacity-0 before:blur-xl before:transition-opacity before:duration-300",
        "hover:before:opacity-20",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
