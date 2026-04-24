import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
  onVerify: (token: string) => void;
  sitekey?: string;
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify, sitekey = '0x4AAAAAAA-YOUR-SITE-KEY' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.turnstile && containerRef.current) {
      // @ts-ignore
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: sitekey,
        callback: (token: string) => {
          onVerify(token);
        },
        'expired-callback': () => {
          onVerify('');
        },
        'error-callback': () => {
          onVerify('');
        },
      });
    }

    return () => {
      // @ts-ignore
      if (widgetIdRef.current && window.turnstile) {
        // @ts-ignore
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onVerify, sitekey]);

  return (
    <div className="flex justify-center my-4">
      <div ref={containerRef} className="border-4 border-brutal-black shadow-brutal-magenta"></div>
    </div>
  );
};

export default Turnstile;
