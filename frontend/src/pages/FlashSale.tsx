/**
 * Purpose: Flash Sale page displaying time-limited discounts.
 * Caller: App.tsx (Route '/flash-sale').
 * Dependencies: React, Navbar, BrutalCard, BrutalButton, gameService, STORAGE_URL.
 * Main Functions: Fetches and displays active flash sales with real-time countdown.
 */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { gameService, STORAGE_URL } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import FlashSaleCard from '../components/FlashSaleCard';

const FlashSale: React.FC = () => {
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gameService.getFlashSales();
        setFlashSales(data);
        
        if (data.length > 0) {
          const endTime = new Date(data[0].end_time).getTime();
          const now = new Date().getTime();
          const diff = Math.floor((endTime - now) / 1000);
          setTimeLeft(diff > 0 ? diff : 0);
        }
      } catch (error) {
        console.error('Error fetching flash sales:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Flash Sale Hero */}
        <section className="px-4 py-12 max-w-7xl mx-auto">
          <div className="bg-brutal-black text-brutal-white border-8 border-brutal-black p-8 md:p-20 shadow-[16px_16px_0px_0px_#000] shadow-brutal-magenta relative overflow-hidden group">
             {/* Background Banner */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/flashsale_hero.png`} 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[4000ms]" 
                  alt="Flash Sale Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/40 to-transparent"></div>
             </div>

             <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                <motion.div 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-brutal-magenta text-brutal-white px-8 py-2 font-space font-black uppercase text-xl border-4 border-brutal-white shadow-[8px_8px_0px_0px_#000] -rotate-2"
                >
                  Limited Time Offer
                </motion.div>
                
                <motion.h1 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-7xl md:text-[10rem] font-space font-black uppercase italic leading-none tracking-tighter"
                >
                  FLASH <br /><span className="text-brutal-cyan text-transparent bg-clip-text bg-gradient-to-r from-brutal-cyan via-white to-brutal-yellow">SALE</span>
                </motion.h1>
                
                <div className="flex gap-4 md:gap-8">
                   {[
                     { label: 'HOURS', val: h },
                     { label: 'MINS', val: m },
                     { label: 'SECS', val: s },
                   ].map((t, i) => (
                     <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      key={i} 
                      className="flex flex-col items-center"
                     >
                        <div className="w-20 h-24 md:w-32 md:h-40 bg-brutal-white text-brutal-black border-4 border-brutal-black flex items-center justify-center text-5xl md:text-8xl font-space font-black shadow-[8px_8px_0px_0px_#000] shadow-brutal-cyan">
                           {t.val}
                        </div>
                        <span className="text-[10px] md:text-xs font-space font-black text-brutal-white mt-4 tracking-widest bg-brutal-black px-2 py-1">
                           {t.label}
                        </span>
                     </motion.div>
                   ))}
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl font-space font-bold uppercase text-lg text-brutal-white/80 bg-brutal-black/50 backdrop-blur-sm p-4 border-2 border-brutal-white/20"
                >
                  Serbu diskon gila-gilaan hingga 90% untuk game favoritmu. Stok terbatas, waktu terus berjalan!
                </motion.p>
             </div>

             {/* Lightning Decorations */}
             <div className="absolute top-10 left-10 text-brutal-yellow animate-pulse scale-150">⚡</div>
             <div className="absolute bottom-10 right-10 text-brutal-cyan animate-pulse delay-500 scale-150">⚡</div>
          </div>
        </section>

        {/* Sales Grid */}
        <section className="max-w-7xl mx-auto px-4 py-20 min-h-[400px]">
           {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="w-16 h-16 border-8 border-brutal-black border-t-brutal-magenta animate-spin"></div>
             </div>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {flashSales.map((item, i) => (
                   <FlashSaleCard key={item.id} item={item} index={i} />
                 ))}
              </div>
           )}
        </section>

        {/* Promo Code Banner */}
        <section className="px-4 pb-20">
           <div className="max-w-7xl mx-auto bg-brutal-yellow border-4 border-brutal-black p-12 shadow-brutal-black text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-space font-black uppercase italic">WANT MORE DISCOUNT?</h2>
              <p className="font-space font-bold text-xl uppercase">Use code: <span className="bg-brutal-black text-brutal-yellow px-4 py-2 border-2 border-brutal-black inline-block">ZENITH2026</span> for extra 5% off</p>
           </div>
        </section>
      </main>
    </div>
  );
};

export default FlashSale;
