import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const names = ['Andi', 'Sultan_ML', 'GamerPro', 'Dodo', 'Rina', 'Budi', 'X-Dragon', 'Player99'];
const cities = ['Jakarta', 'Surabaya', 'Medan', 'Bandung', 'Makassar', 'Bali'];
const games = ['Mobile Legends', 'Free Fire', 'PUBG Mobile', 'Valorant', 'Genshin Impact'];

const LiveSocialProof: React.FC = () => {
  const [notification, setNotification] = useState<{ name: string, city: string, game: string, amount: string } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomAmount = (Math.floor(Math.random() * 50) + 1) * 100;

      setNotification({
        name: randomName,
        city: randomCity,
        game: randomGame,
        amount: `${randomAmount} Diamonds`
      });

      setTimeout(() => setNotification(null), 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) showNotification();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[100] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            className="bg-brutal-white border-4 border-brutal-black p-4 shadow-brutal-magenta flex items-center gap-4 max-w-sm pointer-events-auto"
          >
            <div className="w-12 h-12 bg-brutal-black flex items-center justify-center text-brutal-white font-black shrink-0 border-2 border-brutal-black">
               {notification.name[0]}
            </div>
            <div>
               <p className="font-space font-black text-xs uppercase leading-tight">
                  <span className="text-brutal-magenta">{notification.name}</span> dari {notification.city}
               </p>
               <p className="font-space font-bold text-[10px] uppercase opacity-60">
                  Baru saja membeli <span className="text-brutal-black">{notification.amount}</span> ({notification.game})
               </p>
               <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase text-green-600 italic">Verified Purchase</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveSocialProof;
