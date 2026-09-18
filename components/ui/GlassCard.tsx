import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const baseCardStyles =
  'bg-[rgba(15,15,15,0.6)] backdrop-blur-xl border border-[var(--color-ghost-border)] rounded-2xl shadow-2xl p-6';

const hoverCardStyles =
  'transition-all duration-300 hover:border-[var(--color-ghost-border-glow)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]';

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const cardClassName = cn(
    baseCardStyles,
    hoverEffect ? hoverCardStyles : undefined,
    className
  );

  return (
    <motion.div
      {...props}
      className={cardClassName}
    >
      {children}
    </motion.div>
  );
}
