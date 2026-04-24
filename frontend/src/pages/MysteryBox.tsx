import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_URL } from '../services/api';

const MysteryBox: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedBox, setSelectedBox] = useState<any>(null);
  const [userBalance, setUserBalance] = useState(15000); // Simulasi Saldo Awal
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'summary' | 'qris' | 'success'>('summary');

  const boxTiers = [
    { 
        id: 'bronze', 
        title: 'STARTER BOX', 
        price: 5000, 
        priceFormatted: 'Rp 5.000',
        img: 'bronze.png', 
        accent: 'cyan',
        prizes: ['50 Diamonds', '100 Diamonds', 'Rp 1.000 Cashback', 'Zonk! Coba Lagi']
    },
    { 
        id: 'gold', 
        title: 'PRO BOX', 
        price: 25000, 
        priceFormatted: 'Rp 25.000',
        img: 'gold.png', 
        accent: 'yellow',
        prizes: ['500 Diamonds', '1,000 Diamonds', 'Weekly Pass', 'Rp 10.000 Cashback']
    },
    { 
        id: 'diamond', 
        title: 'SULTAN BOX', 
        price: 50000, 
        priceFormatted: 'Rp 50.000',
        img: 'diamond.png', 
        accent: 'magenta',
        prizes: ['2,500 Diamonds', '5,000 Diamonds', 'Legendary Skin', 'Rp 25.000 Balance']
    },
  ];

  const handlePurchase = (box: any) => {
    setSelectedBox(box);
    if (userBalance >= box.price) {
        setUserBalance(prev => prev - box.price);
        startGacha(box);
    } else {
        setPaymentStep('summary');
        setShowPayment(true);
    }
  };

  const startGacha = (box: any) => {
    setIsSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      setIsSpinning(false);
      const randomPrize = box.prizes[Math.floor(Math.random() * box.prizes.length)];
      setResult({
          name: randomPrize,
          boxName: box.title,
          accent: box.accent
      });
    }, 3000);
  };

  const completePayment = () => {
    setPaymentStep('success');
    setTimeout(() => {
        setShowPayment(false);
        startGacha(selectedBox);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col overflow-x-hidden">
      <Navbar />
      
      <Marquee text="🎰 MYSTERY BOX LIVE • @USER1 WON 1000 DM • @USER2 WON LEGEND SKIN • @USER3 WON CASHBACK • 🔥 TRY YOUR LUCK NOW!" />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* User Stats Bar */}
        <div className="flex justify-end mb-8">
            <div className="bg-brutal-black border-4 border-brutal-black p-4 shadow-brutal-cyan flex items-center gap-6">
                <span className="text-brutal-white font-space font-black uppercase text-xs">Saldo Anda:</span>
                <span className="text-brutal-cyan font-space font-black text-2xl">Rp {userBalance.toLocaleString()}</span>
                <button className="bg-brutal-yellow px-4 py-1 border-2 border-brutal-black font-black text-[10px] uppercase hover:bg-white transition-colors" onClick={() => setUserBalance(prev => prev + 50000)}>Top Up Saldo</button>
            </div>
        </div>

        {/* Hero Mystery Box */}
        <section className="mb-20 relative">
          <div className="bg-brutal-black border-8 border-brutal-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#000] shadow-brutal-magenta relative overflow-hidden group">
             {/* Background Banner */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/mysterybox_hero.png`} 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[5000ms]" 
                  alt="Mystery Box Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brutal-black via-brutal-black/40 to-transparent"></div>
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="space-y-6 max-w-2xl">
                   <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="inline-block bg-brutal-magenta text-brutal-white font-black uppercase text-xs px-4 py-1 border-2 border-brutal-white shadow-[4px_4px_0px_0px_#000]"
                   >
                      Feeling Lucky?
                   </motion.div>
                   <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-8xl font-space font-black text-brutal-white uppercase italic leading-none"
                   >
                      MYSTERY <br /><span className="text-brutal-magenta text-brutal-black-outline">BOX</span>
                   </motion.h1>
                </div>

                <div className="bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal-cyan rotate-3 hidden md:block">
                   <p className="font-space font-black text-brutal-black uppercase text-sm">Gacha Winner:</p>
                   <p className="font-space font-black text-brutal-magenta uppercase text-xs">@ZenityGamer99</p>
                   <p className="font-space font-black text-brutal-black uppercase text-[10px] opacity-40 italic">Baru saja memenangkan 1000 DM!</p>
                </div>
             </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto text-center">
            {/* Gacha Area */}
            <div className="relative mb-24 min-h-[400px] flex items-center justify-center">
               <div className="absolute inset-0 bg-brutal-cyan/10 blur-[100px] rounded-full animate-pulse"></div>
               
               <AnimatePresence mode="wait">
                  {isSpinning ? (
                    <motion.div 
                      key="spinning"
                      initial={{ scale: 0.8, rotate: 0 }}
                      animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, -10, 10, 0] 
                      }}
                      transition={{ 
                          scale: { repeat: Infinity, duration: 0.5 },
                          rotate: { repeat: Infinity, duration: 0.2 }
                      }}
                      className="relative z-10"
                    >
                       <img src={`${STORAGE_URL}/boxes/${selectedBox.img}`} className="w-64 h-64 object-contain drop-shadow-[0_0_50px_rgba(255,0,255,0.5)]" alt="Spinning" />
                       <div className="absolute inset-0 bg-brutal-white mix-blend-overlay animate-pulse opacity-50"></div>
                    </motion.div>
                  ) : result ? (
                    <motion.div 
                      key="result"
                      initial={{ scale: 0, y: 100 }}
                      animate={{ 
                          scale: 1, 
                          y: 0,
                          x: [0, -5, 5, -5, 5, 0] 
                      }}
                      className="relative z-20 bg-brutal-white border-8 border-brutal-black p-12 shadow-brutal-magenta mx-auto max-w-md"
                    >
                       <div className="absolute -top-6 -left-6 bg-brutal-black text-white px-4 py-1 font-black text-xs uppercase italic shadow-brutal-cyan animate-bounce">
                           {result.boxName} REWARD
                       </div>
                       <h2 className="text-2xl font-space font-black uppercase mb-4">SELAMAT! KAMU DAPAT:</h2>
                       <p className="text-5xl font-space font-black text-brutal-magenta uppercase italic mb-8 drop-shadow-[4px_4px_0px_#000] scale-110 animate-pulse">{result.name}</p>
                       <BrutalButton variant="black" className="w-full text-xl py-4" onClick={() => setResult(null)}>AMBIL HADIAH SEKARANG</BrutalButton>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -20, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="relative z-10 text-center space-y-8"
                    >
                       <div className="relative inline-block group">
                          <div className="absolute inset-0 bg-brutal-black translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
                          <div className="bg-brutal-white border-4 border-brutal-black p-12 relative">
                             <img src={`${STORAGE_URL}/boxes/gold.png`} className="w-48 h-48 object-contain mb-6 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Main Box" />
                             <h3 className="text-3xl font-space font-black uppercase italic">PILIH BOX DIBAWAH</h3>
                          </div>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Box Selection Grid */}
            <div className="grid md:grid-cols-3 gap-12">
               {boxTiers.map((box, i) => (
                 <motion.div key={box.id} className="group">
                    <BrutalCard accent={box.accent as any} className="flex flex-col h-full bg-brutal-white group-hover:-translate-y-4 transition-transform p-0 overflow-hidden">
                        <div className="p-8 space-y-6 flex-grow">
                            <div className="aspect-square bg-brutal-black/5 border-2 border-brutal-black relative overflow-hidden">
                                <img src={`${STORAGE_URL}/boxes/${box.img}`} className="w-full h-full object-contain scale-90 group-hover:scale-110 transition-transform duration-700" alt={box.title} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-black uppercase italic leading-none">{box.title}</h4>
                                <p className="text-3xl font-black text-brutal-magenta drop-shadow-[2px_2px_0px_#000]">{box.priceFormatted}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handlePurchase(box)}
                            className={`w-full py-6 font-space font-black uppercase text-xl border-t-4 border-brutal-black transition-all ${isSpinning ? 'bg-gray-400' : `bg-brutal-${box.accent} hover:bg-brutal-black hover:text-white`}`}
                            disabled={isSpinning}
                        >
                            {isSpinning ? 'SPINNING...' : 'BELI & BUKA'}
                        </button>
                    </BrutalCard>
                 </motion.div>
               ))}
            </div>
        </div>
      </main>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-md">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-md w-full shadow-brutal-yellow text-center"
                >
                    <button className="absolute top-4 right-4 text-3xl font-black" onClick={() => setShowPayment(false)}>×</button>
                    
                    {paymentStep === 'summary' && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-space font-black uppercase italic">BUKTI TRANSAKSI</h2>
                            <div className="bg-brutal-black/5 p-6 border-4 border-brutal-black space-y-4 text-left">
                                <div className="flex justify-between border-b-2 border-brutal-black/10 pb-2">
                                    <span className="text-[10px] font-black uppercase opacity-40">Item</span>
                                    <span className="font-bold">{selectedBox?.title}</span>
                                </div>
                                <div className="flex justify-between border-b-2 border-brutal-black/10 pb-2">
                                    <span className="text-[10px] font-black uppercase opacity-40">Harga</span>
                                    <span className="font-bold">{selectedBox?.priceFormatted}</span>
                                </div>
                                <div className="flex justify-between text-brutal-magenta font-black">
                                    <span>SALDO KURANG</span>
                                    <span>Rp {(selectedBox?.price - userBalance).toLocaleString()}</span>
                                </div>
                            </div>
                            <BrutalButton variant="yellow" className="w-full py-4 text-xl" onClick={() => setPaymentStep('qris')}>BAYAR DENGAN QRIS</BrutalButton>
                        </div>
                    )}

                    {paymentStep === 'qris' && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-space font-black uppercase italic">SCAN UNTUK BAYAR</h2>
                            <div className="bg-white p-4 border-4 border-brutal-black inline-block">
                                <img src={`${STORAGE_URL}/qris_dummy.png`} alt="QRIS" className="w-48 h-48" />
                            </div>
                            <p className="text-xs font-bold uppercase opacity-40 italic">Selesaikan pembayaran dalam 05:00</p>
                            <BrutalButton variant="black" className="w-full py-4" onClick={completePayment}>SAYA SUDAH BAYAR</BrutalButton>
                        </div>
                    )}

                    {paymentStep === 'success' && (
                        <div className="space-y-8 py-12">
                            <div className="text-6xl animate-bounce">✅</div>
                            <h2 className="text-3xl font-space font-black uppercase text-green-600">PEMBAYARAN BERHASIL!</h2>
                            <p className="font-space font-black uppercase text-xs italic">Menyiapkan Mystery Box Anda...</p>
                        </div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MysteryBox;
