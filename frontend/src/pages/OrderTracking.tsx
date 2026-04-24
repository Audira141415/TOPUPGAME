import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { gameService, STORAGE_URL } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await gameService.getOrder(orderId);
      setOrderData(data);
    } catch (err: any) {
      setError('Nomor pesanan tidak ditemukan. Pastikan ID sudah benar.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setOrderId(id);
      // Auto-trigger search
      const triggerSearch = async (searchId: string) => {
        setLoading(true);
        try {
          const data = await gameService.getOrder(searchId);
          setOrderData(data);
        } catch (err) {
          setError('Nomor pesanan tidak ditemukan.');
        } finally {
          setLoading(false);
        }
      };
      triggerSearch(id);
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (orderData && !['success', 'failed', 'completed', 'canceled'].includes(orderData.status.toLowerCase())) {
      interval = setInterval(async () => {
        try {
          const data = await gameService.getOrder(orderId);
          setOrderData(data);
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 10000); // Poll every 10 seconds
    }
    return () => clearInterval(interval);
  }, [orderData, orderId]);

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 1;
      case 'unpaid': return 1;
      case 'paid': return 2;
      case 'processing': return 3;
      case 'success': return 4;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const statusSteps = [
    { id: 1, label: 'PESANAN DITERIMA', color: 'bg-brutal-cyan', icon: '📝' },
    { id: 2, label: 'PEMBAYARAN VALID', color: 'bg-brutal-yellow', icon: '💰' },
    { id: 3, label: 'SEDANG DIPROSES', color: 'bg-brutal-magenta', icon: '⚡' },
    { id: 4, label: 'TRANSAKSI SELESAI', color: 'bg-green-400', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Hero Order Tracking */}
        <section className="mb-20 relative">
          <div className="bg-brutal-black border-8 border-brutal-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#000] shadow-brutal-magenta relative overflow-hidden group">
             {/* Background Banner */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/track_hero.png`} 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[5000ms]" 
                  alt="Track Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brutal-black via-brutal-black/40 to-transparent"></div>
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
                   <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="inline-block bg-brutal-magenta text-brutal-white font-black uppercase text-xs px-4 py-1 border-2 border-brutal-white shadow-[4px_4px_0px_0px_#000]"
                   >
                      Instant Fulfillment
                   </motion.div>
                   <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-[8rem] font-space font-black text-brutal-white uppercase italic leading-none tracking-tighter"
                   >
                      TRACK <br /><span className="text-brutal-magenta text-brutal-black-outline inline-flex items-center gap-4">ORDER <span className="bg-red-600 text-white text-[12px] not-italic px-2 py-1 border-2 border-white animate-pulse shadow-[2px_2px_0px_0px_#000]">LIVE</span></span>
                   </motion.h1>
                   <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-brutal-white/80 font-space font-bold uppercase text-lg border-l-4 border-brutal-cyan pl-6"
                   >
                      Pantau status pesananmu secara real-time. Mulai dari pembayaran hingga diamonds masuk ke akunmu, semuanya transparan!
                   </motion.p>
                </div>

                <motion.div 
                   initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                   animate={{ scale: 1, rotate: 0, opacity: 1 }}
                   transition={{ delay: 0.6, type: 'spring' }}
                   className="hidden lg:flex flex-col gap-4 bg-brutal-white p-8 border-4 border-brutal-black shadow-[12px_12px_0px_0px_#ff00ff] rotate-2"
                >
                   <div className="text-brutal-black space-y-2">
                      <p className="font-space font-black uppercase text-xl italic leading-none">ORDER STATUS</p>
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                         <p className="text-sm font-black uppercase">Sistem Online</p>
                      </div>
                      <p className="font-space font-bold uppercase text-[10px] opacity-40">Update: Barusan</p>
                   </div>
                </motion.div>
             </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto">

        {/* Search Command Section */}
        <BrutalCard accent="magenta" className="mb-16 p-2">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
               <input 
                type="text" 
                className="brutal-input w-full text-xl py-5 px-6 font-space font-black uppercase tracking-tight" 
                placeholder="Masukkan ID Pesanan (cth: TP12345678)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-20 hidden md:block">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
            <BrutalButton variant="black" className="py-5 px-16 text-xl group" disabled={loading}>
               {loading ? 'MEMINDAI...' : (
                 <span className="flex items-center gap-3 font-space font-black">
                   LACAK SEKARANG
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                 </span>
               )}
            </BrutalButton>
          </form>
        </BrutalCard>

        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12 p-6 bg-brutal-magenta text-white border-4 border-brutal-black font-space font-black uppercase shadow-brutal-black flex items-center gap-4">
             <div className="text-3xl">⚠️</div>
             <div>{error}</div>
          </motion.div>
        )}

        <AnimatePresence>
          {orderData && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              {/* Visual Timeline Command */}
              <BrutalCard accent="yellow" className="p-8">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative">
                    {/* Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-brutal-black/10 hidden md:block -translate-y-1/2"></div>
                    
                    {statusSteps.map((step) => {
                      const isActive = getStatusStep(orderData.status) >= step.id;
                      return (
                        <div key={step.id} className="relative z-10 flex md:flex-col items-center gap-4 flex-1">
                           <div className={`w-16 h-16 border-4 border-brutal-black flex items-center justify-center text-2xl transition-all duration-500 ${isActive ? step.color + ' shadow-[4px_4px_0px_0px_#000] scale-110' : 'bg-brutal-white grayscale opacity-30 shadow-none'}`}>
                              {step.icon}
                              {isActive && step.id === getStatusStep(orderData.status) && (
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                  className="absolute inset-0 bg-white"
                                />
                              )}
                           </div>
                           <div className="text-left md:text-center">
                              <p className={`font-space font-black text-[10px] uppercase leading-none transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}>{step.label}</p>
                           </div>
                        </div>
                      )
                    })}
                 </div>
              </BrutalCard>

              {/* Order Data Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                 <BrutalCard accent="cyan" className="p-8 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-6">
                          <h2 className="text-3xl font-space font-black uppercase italic leading-none">{orderData.game_name || 'Game Order'}</h2>
                          <span className="bg-brutal-black text-white px-3 py-1 text-[10px] font-black uppercase border-2 border-brutal-black">{orderData.status}</span>
                       </div>
                       <p className="text-2xl font-space font-black text-brutal-magenta mb-8">{orderData.product_name}</p>
                    </div>

                    <div className="space-y-4 pt-6 border-t-4 border-brutal-black border-dashed">
                       <div className="flex justify-between">
                          <span className="text-[10px] font-space font-black uppercase opacity-40">ORDER ID</span>
                          <span className="text-xs font-space font-black uppercase">{orderData.order_id}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-[10px] font-space font-black uppercase opacity-40">TANGGAL</span>
                          <span className="text-xs font-space font-black uppercase">{new Date(orderData.created_at).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-[10px] font-space font-black uppercase opacity-40">METODE BAYAR</span>
                          <span className="text-xs font-space font-black uppercase">{orderData.payment_method || 'SALDO'}</span>
                       </div>
                    </div>
                 </BrutalCard>

                 <BrutalCard accent="magenta" className="p-8 bg-brutal-black text-white flex flex-col justify-between">
                    <div>
                       <h3 className="text-xl font-space font-black uppercase mb-6 text-brutal-cyan">RINGKASAN PEMBAYARAN</h3>
                       <div className="space-y-6">
                          <div className="flex justify-between items-end border-b-2 border-white/20 pb-4">
                             <span className="text-[10px] font-space font-black uppercase opacity-60">TOTAL TAGIHAN</span>
                             <span className="text-3xl font-space font-black">Rp {Number(orderData.total_amount || 0).toLocaleString('id-ID')}</span>
                          </div>
                          <div className="p-4 bg-white/5 border-2 border-white/10">
                             <p className="text-[10px] font-space font-bold uppercase mb-2">TARGET TUJUAN</p>
                             <p className="text-lg font-space font-black text-brutal-yellow">{orderData.target_user_id || 'NOT_SPECIFIED'}</p>
                             {orderData.target_zone_id && <p className="text-xs font-space font-bold opacity-60 mt-1">ZONE: {orderData.target_zone_id}</p>}
                          </div>
                       </div>
                    </div>

                    <div className="mt-8">
                       <a 
                        href={`https://wa.me/628123456789?text=Halo Audira Zenith, saya ingin bertanya status pesanan ${orderData.order_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-green-500 border-2 border-white py-4 font-space font-black text-xs uppercase hover:bg-green-600 transition-colors shadow-[4px_4px_0px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                       >
                          HUBUNGI SUPPORT
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                       </a>
                    </div>
                 </BrutalCard>
              </div>

              <p className="text-center font-space font-bold text-[9px] uppercase opacity-30 tracking-widest italic">
                Sistem melakukan pembaruan status setiap 30 detik secara otomatis.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
