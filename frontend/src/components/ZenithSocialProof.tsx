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
    if (latestOrders.length === 0) return;

    const showNextProof = () => {
        const order = latestOrders[Math.floor(Math.random() * latestOrders.length)];
        
        // Obfuscate phone number or user id
        const userDisplay = order.whatsapp_number 
            ? order.whatsapp_number.substring(0, 4) + '***' + order.whatsapp_number.slice(-3)
            : 'User_' + order.order_id.slice(-4);

        const newProof: Proof = {
            id: Date.now(),
            user: userDisplay,
            action: 'berhasil membeli',
            target: `${order.game?.name} (${order.product?.name})`,
            type: 'topup'
        };

        setProof(newProof);
        setTimeout(() => setProof(null), 6000);
    };

    const interval = setInterval(() => {
        if (Math.random() > 0.4) showNextProof();
    }, 15000);

    // Show first one after delay
    const timeout = setTimeout(showNextProof, 5000);

    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
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
            className="bg-brutal-white border-4 border-brutal-black p-4 shadow-[8px_8px_0px_0px_#000] flex items-center gap-4 max-w-[320px] pointer-events-auto"
          >
            <div className={`w-12 h-12 border-2 border-brutal-black shrink-0 flex items-center justify-center text-xl ${getTypeStyle(proof.type)}`}>
               {getIcon(proof.type)}
            </div>
            <div>
               <p className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">Live Transaction</p>
               <h4 className="text-[11px] font-black uppercase leading-tight">
                  <span className="text-brutal-magenta">{proof.user}</span> {proof.action} <span className="bg-brutal-black text-white px-1">{proof.target}</span>
               </h4>
               <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase text-green-600 italic tracking-tighter">Verified by Zenith Security</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZenithSocialProof;
