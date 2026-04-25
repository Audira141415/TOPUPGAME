import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gameService } from '../services/api';

interface Proof {
  id: number;
  user: string;
  action: string;
  target: string;
  type: 'topup' | 'rekber' | 'account';
}

const ZenithSocialProof: React.FC = () => {
  const [proof, setProof] = useState<Proof | null>(null);
  const [latestOrders, setLatestOrders] = useState<any[]>([]);

  // Simulation Data for "Sultan" Experience
  const sultanNames = ['Sultan_Jakarta', 'King_ProPlayer', 'Audira_Whale', 'RichGaming_99', 'Sultan_Savage', 'Zenith_Champion', 'Z_Sultan88', 'GamerSultan_ID', 'Sultan_VVIP', 'Lord_Topup'];
  const sultanItems = [
    { name: 'Mobile Legends', item: '5000+ Diamonds' },
    { name: 'Free Fire', item: '10,000 Diamonds' },
    { name: 'PUBG Mobile', item: '8100 UC' },
    { name: 'Genshin Impact', item: '6480 Genesis Crystals' },
    { name: 'Valorant', item: '11,000 VP' },
    { name: 'Honor of Kings', item: '7200 Tokens' },
    { name: 'Honkai Star Rail', item: '6480 Oneiric Shards' },
  ];

  useEffect(() => {
    const fetchLatest = async () => {
        try {
            const data = await gameService.getLatestOrders();
            if (data && data.length > 0) {
                setLatestOrders(data);
            }
        } catch (error) {
            console.error('Error fetching social proof:', error);
        }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 60000); // Update list every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const showNextProof = () => {
        let newProof: Proof;

        // 50/50 Chance to show real or simulated sultan order
        if (latestOrders.length > 0 && Math.random() > 0.5) {
            const order = latestOrders[Math.floor(Math.random() * latestOrders.length)];
            const userDisplay = order.whatsapp_number 
                ? order.whatsapp_number.substring(0, 4) + '***' + order.whatsapp_number.slice(-3)
                : 'User_' + order.order_id?.slice(-4);

            newProof = {
                id: Date.now(),
                user: userDisplay,
                action: 'berhasil membeli',
                target: `${order.game?.name || 'Item'} (${order.product?.name || 'Paket'})`,
                type: 'topup'
            };
        } else {
            // Sultan Simulation
            const name = sultanNames[Math.floor(Math.random() * sultanNames.length)];
            const item = sultanItems[Math.floor(Math.random() * sultanItems.length)];
            newProof = {
                id: Date.now(),
                user: name,
                action: 'baru saja memborong',
                target: `${item.name} (${item.item})`,
                type: Math.random() > 0.7 ? 'account' : 'topup'
            };
        }

        setProof(newProof);
        setTimeout(() => setProof(null), 5000);
    };

    const interval = setInterval(() => {
        // Show proof every 10-25 seconds
        const delay = Math.floor(Math.random() * 15000) + 10000;
        showNextProof();
    }, 20000);

    const initialTimeout = setTimeout(showNextProof, 3000);

    return () => {
        clearInterval(interval);
        clearTimeout(initialTimeout);
    };
  }, [latestOrders]);

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
            className="bg-brutal-white border-4 border-brutal-black p-4 shadow-[8px_8px_0px_0px_#000] flex items-center gap-4 max-w-[340px] pointer-events-auto relative overflow-hidden group"
          >
            {/* Sultan Pulse Effect */}
            {proof.user.includes('Sultan') && (
               <div className="absolute top-0 right-0 bg-brutal-yellow text-[8px] font-black px-2 py-0.5 border-l-2 border-b-2 border-brutal-black uppercase animate-pulse">
                  Sultan Transaction
               </div>
            )}
            
            <div className={`w-12 h-12 border-2 border-brutal-black shrink-0 flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_#000] ${getTypeStyle(proof.type)}`}>
               {getIcon(proof.type)}
            </div>
            <div>
               <p className="text-[9px] font-black uppercase opacity-60 leading-none mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                  Live Order Discovery
               </p>
               <h4 className="text-[11px] font-black uppercase leading-tight">
                  <span className="text-brutal-magenta underline decoration-2">{proof.user}</span> {proof.action} <span className="bg-brutal-black text-white px-1 ml-1 inline-block transform -rotate-1">{proof.target}</span>
               </h4>
               <div className="flex items-center gap-1 mt-2">
                  <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 bg-brutal-yellow border-[1px] border-brutal-black"></div>)}
                  </div>
                  <span className="text-[8px] font-black uppercase text-gray-500 italic ml-1">Premium Member Status Verified</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZenithSocialProof;
