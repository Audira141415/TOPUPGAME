import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'yellow' | 'magenta' | 'white' | 'black';
}

const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  children, 
  variant = 'white', 
  className, 
  ...props 
}) => {
  const variantStyles = {
    white: 'bg-brutal-white text-brutal-black shadow-brutal-black',
    cyan: 'bg-brutal-cyan text-brutal-black shadow-brutal-black',
    yellow: 'bg-brutal-yellow text-brutal-black shadow-brutal-black',
    magenta: 'bg-brutal-magenta text-brutal-black shadow-brutal-black',
    black: 'bg-brutal-black text-brutal-white shadow-brutal-cyan border-brutal-white',
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02, x: -4, y: -4 }}
      whileTap={{ scale: 0.98, x: 0, y: 0 }}
      className={cn(
        'px-6 py-2 font-space font-bold uppercase border-2 border-brutal-black transition-all shadow-brutal-black',
        variantStyles[variant],
        className
      )}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};

export default BrutalButton;
