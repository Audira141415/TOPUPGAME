import React from 'react';

interface MarqueeProps {
  text: string;
  variant?: 'yellow' | 'cyan' | 'magenta';
}

const Marquee: React.FC<MarqueeProps> = ({ text, variant = 'yellow' }) => {
  const bgStyles = {
    yellow: 'bg-brutal-yellow',
    cyan: 'bg-brutal-cyan',
    magenta: 'bg-brutal-magenta',
  };

  return (
    <div className={`brutal-marquee ${bgStyles[variant]} py-1 border-y-2 border-brutal-white relative overflow-hidden flex`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 font-space font-black text-sm uppercase">
            {text} • {text} •
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
