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
  const [upcomingFlashSales, setUpcomingFlashSales] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('ongoing'); // ongoing, upcoming, vouchers
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ongoingData, upcomingData, vouchersData] = await Promise.all([
          gameService.getFlashSales(),
          gameService.getUpcomingFlashSales(),
          gameService.getVouchers()
        ]);
        
        setFlashSales(ongoingData);
        setUpcomingFlashSales(upcomingData);
        setVouchers(vouchersData);
        
        if (ongoingData.length > 0) {
          const endTime = new Date(ongoingData[0].end_time).getTime();
          const now = new Date().getTime();
          const diff = Math.floor((endTime - now) / 1000);
          setTimeLeft(diff > 0 ? diff : 0);
        }
      } catch (error) {
        console.error('Error fetching flash sale data:', error);
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
             </div>

             {/* Lightning Decorations */}
             <div className="absolute top-10 left-10 text-brutal-yellow animate-pulse scale-150">⚡</div>
             <div className="absolute bottom-10 right-10 text-brutal-cyan animate-pulse delay-500 scale-150">⚡</div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
           <div className="flex flex-wrap gap-4 border-b-8 border-brutal-black pb-4">
              {['ongoing', 'upcoming', 'vouchers'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 font-space font-black uppercase text-xl border-4 border-brutal-black transition-all ${activeTab === tab ? 'bg-brutal-black text-brutal-white -translate-y-2 shadow-brutal-cyan' : 'bg-brutal-white hover:bg-brutal-bg'}`}
                >
                  {tab === 'ongoing' ? 'Ongoing DeaLS' : tab === 'upcoming' ? 'Upcoming DeaLS' : 'Voucher Center'}
                </button>
              ))}
           </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 py-12 min-h-[600px]">
           <AnimatePresence mode="wait">
              {activeTab === 'ongoing' && (
                 <motion.div 
                   key="ongoing"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-12"
                 >
                    <div className="flex items-center gap-4">
                       <h2 className="text-4xl font-space font-black uppercase italic">Sedang Berlangsung</h2>
                       <div className="flex-grow h-1 bg-brutal-black"></div>
                    </div>
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
                 </motion.div>
              )}

              {activeTab === 'upcoming' && (
                 <motion.div 
                   key="upcoming"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="space-y-12"
                 >
                    <div className="flex items-center gap-4">
                       <h2 className="text-4xl font-space font-black uppercase italic">Jadwal Diskon Mendatang</h2>
                       <div className="flex-grow h-1 bg-brutal-black"></div>
                    </div>
                    <div className="grid gap-8">
                       {upcomingFlashSales.length > 0 ? upcomingFlashSales.map((item, i) => (
                         <div key={item.id} className="bg-brutal-white border-4 border-brutal-black p-6 flex flex-col md:flex-row items-center gap-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-brutal-yellow transition-all group">
                            <div className="w-24 h-24 bg-brutal-black border-2 border-brutal-black overflow-hidden shrink-0">
                               <img 
                                 src={`${STORAGE_URL}/${item.product?.game?.image}`} 
                                 alt={item.product?.game?.name} 
                                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                               />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                               <h3 className="text-2xl font-black uppercase">{item.product?.game?.name} - {item.product?.name}</h3>
                               <p className="text-brutal-magenta font-black uppercase text-xl italic">Price: Rp {Number(item.flash_price).toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end">
                               <span className="bg-brutal-black text-brutal-white px-4 py-1 font-black text-xs uppercase mb-2">
                                 {new Date(item.start_time).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                               </span>
                               <span className="font-space font-black text-2xl">
                                 {new Date(item.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                               </span>
                            </div>
                            <BrutalButton variant="black" className="px-8 py-3">INGATKAN SAYA</BrutalButton>
                         </div>
                       )) : (
                         <div className="text-center py-20 border-4 border-dashed border-brutal-black">
                            <p className="text-2xl font-space font-black uppercase">Belum ada promo mendatang</p>
                         </div>
                       )}
                    </div>
                 </motion.div>
              )}

              {activeTab === 'vouchers' && (
                 <motion.div 
                   key="vouchers"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="space-y-12"
                 >
                    <div className="flex items-center gap-4">
                       <h2 className="text-4xl font-space font-black uppercase italic">Voucher Center</h2>
                       <div className="flex-grow h-1 bg-brutal-black"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                       {vouchers.length > 0 ? vouchers.map((v, i) => (
                         <BrutalCard key={i} accent="yellow" className="p-8 text-center space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-brutal-black text-white px-3 py-1 font-black text-[10px] -rotate-45 translate-x-4 translate-y-2 uppercase">Verified</div>
                            <h3 className="text-3xl font-black text-brutal-black tracking-tighter">{v.code}</h3>
                            <div className="border-y-2 border-brutal-black py-2">
                               <p className="font-bold uppercase text-xs">
                                 {v.type === 'percentage' ? `Diskon ${v.value}%` : `Potongan Rp ${Number(v.value).toLocaleString()}`}
                               </p>
                               <p className="text-[10px] opacity-60 mt-1 uppercase font-black">
                                 Min. Belanja Rp {Number(v.min_purchase).toLocaleString()}
                               </p>
                            </div>
                            <BrutalButton variant="black" className="w-full" onClick={() => { navigator.clipboard.writeText(v.code); alert('Kode Voucher Berhasil Disalin!'); }}>SALIN KODE</BrutalButton>
                         </BrutalCard>
                       )) : (
                         <div className="col-span-full text-center py-20 border-4 border-dashed border-brutal-black">
                            <p className="text-2xl font-space font-black uppercase">Belum ada voucher tersedia</p>
                         </div>
                       )}
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default FlashSale;
