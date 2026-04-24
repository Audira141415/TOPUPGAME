import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Proof {
  id: number;
  user: string;
  action: string;
  target: string;
  type: 'topup' | 'rekber' | 'account';
}

const ZenithSocialProof: React.FC = () => {
  const [proof, setProof] = useState<Proof | null>(null);

  const data = {
    users: ['0812***', '0857***', '0899***', 'Sultan_***', 'Player_***', 'Gamer_***', 'Legend_***'],
    actions: {
      topup: ['berhasil Top Up', 'baru saja membeli', 'mengisi saldo'],
      rekber: ['menggunakan Rekber untuk', 'transaksi aman via Rekber'],
      account: ['berhasil membeli akun', 'akuisisi akun premium']
    },
    targets: ['MLBB (1000 DM)', 'Valorant (2400 VP)', 'HSR (60 Gems)', 'PUBG (UC Pack)', 'Akun Sultan Ganyu', 'Akun Mythic MLBB'],
  };

  useEffect(() => {
    const generateProof = () => {
      const types: ('topup' | 'rekber' | 'account')[] = ['topup', 'rekber', 'account'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const newProof: Proof = {
        id: Date.now(),
        user: data.users[Math.floor(Math.random() * data.users.length)] + Math.floor(100 + Math.random() * 900),
        action: data.actions[type][Math.floor(Math.random() * data.actions[type].length)],
        target: data.targets[Math.floor(Math.random() * data.targets.length)],
        type
      };
      setProof(newProof);

      setTimeout(() => setProof(null), 6000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) generateProof();
    }, 12000);

    setTimeout(generateProof, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'topup': return 'bg-brutal-cyan text-brutal-black';
      case 'rekber': return 'bg-brutal-magenta text-white';
      case 'account': return 'bg-brutal-yellow text-brutal-black';
      default: return 'bg-brutal-black text-white';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'topup': return '💎';
      case 'rekber': return '🛡️';
      case 'account': return '👤';
      default: return '✅';
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {proof && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white p-4 shadow-[8px_8px_0px_0px_#000] dark:shadow-brutal-white flex items-center gap-4 max-w-[320px] pointer-events-auto"
          >
            <div className={`w-12 h-12 border-2 border-brutal-black shrink-0 flex items-center justify-center text-xl ${getTypeStyle(proof.type)}`}>
               {getIcon(proof.type)}
            </div>
            <div>
               <p className="text-[10px] font-black uppercase opacity-60 dark:text-white/60 leading-none mb-1">Live Activity</p>
               <h4 className="text-[11px] font-black uppercase leading-tight dark:text-white">
                  <span className="text-brutal-magenta">{proof.user}</span> {proof.action} <span className="bg-brutal-black text-white dark:bg-white dark:text-brutal-black px-1">{proof.target}</span>
               </h4>
               <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase text-green-600 dark:text-green-400 italic tracking-tighter">Verified by Zenith Security</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZenithSocialProof;
