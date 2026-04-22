import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName === 'A' || 
                         target.tagName === 'BUTTON' ||
                         target.closest('button') ||
                         target.closest('a');
      
      setIsPointer(!!isClickable);
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Main Square Cursor */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 border-2 border-brutal-black pointer-events-none z-[9999] transition-transform duration-75 mix-blend-difference"
        style={{ 
          transform: `translate(${position.x - 12}px, ${position.y - 12}px) rotate(${isPointer ? '45deg' : '0deg'}) scale(${isPointer ? 1.5 : 1})`,
          backgroundColor: isPointer ? '#00ffff' : 'white'
        }}
      />
      {/* Dot Cursor */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-brutal-magenta pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`
        }}
      />
    </>
  );
};

export default CustomCursor;
