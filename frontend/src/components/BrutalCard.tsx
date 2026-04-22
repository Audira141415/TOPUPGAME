import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: 'cyan' | 'yellow' | 'magenta' | 'white';
}

const BrutalCard: React.FC<BrutalCardProps> = ({ 
  children, 
  accent = 'white', 
  className, 
  ...props 
}) => {
  const accentStyles = {
    white: 'shadow-brutal-black',
    cyan: 'shadow-brutal-cyan',
    yellow: 'shadow-brutal-yellow',
    magenta: 'shadow-brutal-magenta',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'bg-brutal-white border-2 border-brutal-black p-6 transition-all hover:-translate-x-1 hover:-translate-y-1',
        accentStyles[accent],
        className
      )}
      {...props as any}
    >
      {children}
    </motion.div>
  );
};

export default BrutalCard;
