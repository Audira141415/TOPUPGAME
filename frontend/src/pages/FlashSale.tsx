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
        <section className="bg-brutal-black py-20 px-4 border-b-4 border-brutal-black relative overflow-hidden">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
           
           <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                 <h1 className="text-6xl md:text-9xl font-space font-black text-brutal-cyan italic uppercase leading-none shadow-brutal-white inline-block">FLASH SALE</h1>
                 <p className="text-brutal-white font-space font-bold uppercase tracking-[0.5em] block">Unlimited Deals - Limited Time</p>
              </motion.div>

              <div className="flex gap-6">
                 {[
                   { label: 'HOURS', val: h },
                   { label: 'MINUTES', val: m },
                   { label: 'SECONDS', val: s },
                 ].map((t, i) => (
                   <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex flex-col items-center"
                   >
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-brutal-magenta text-brutal-white border-4 border-brutal-white flex items-center justify-center text-5xl md:text-7xl font-space font-black shadow-brutal-cyan">
                         {t.val}
                      </div>
                      <span className="text-xs font-space font-black text-brutal-cyan mt-4 tracking-widest">{t.label}</span>
                   </motion.div>
                 ))}
              </div>
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
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <BrutalCard accent="cyan" className="group hover:-rotate-1 transition-transform relative overflow-hidden h-full flex flex-col">
                      <div className="absolute top-4 right-4 bg-brutal-magenta text-white text-xs font-black px-3 py-1 border-2 border-brutal-black z-20">
                        -{Math.round(((item.product.price - item.flash_price) / item.product.price) * 100)}%
                      </div>
                      
                      <div className="aspect-video bg-brutal-black/5 border-4 border-brutal-black mb-6 overflow-hidden">
                        <img 
                          src={`${STORAGE_URL}/${item.product.game?.image}`} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-end">
                           <h3 className="text-2xl font-space font-black uppercase leading-tight line-clamp-2 flex-grow pr-4">{item.product.name}</h3>
                           <div className="text-right">
                              <span className="text-[10px] font-black uppercase opacity-40">Flash Price</span>
                              <p className="text-3xl font-space font-black text-brutal-magenta leading-none">Rp {Number(item.flash_price).toLocaleString('id-ID')}</p>
                           </div>
                        </div>
                        <p className="text-sm font-space font-bold opacity-40 line-through">Normal Price: Rp {Number(item.product.price).toLocaleString('id-ID')}</p>
                      </div>

                      <div className="mt-8">
                        <BrutalButton variant="black" className="w-full text-xl py-4">BELI SEKARANG</BrutalButton>
                      </div>
                    </BrutalCard>
                  </motion.div>
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
