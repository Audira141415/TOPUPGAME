import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_URL } from '../services/api';

const MysteryBox: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const startGacha = () => {
    setIsSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      setIsSpinning(false);
      const prizes = ['1,000 Diamonds', 'Weekly Pass', 'Rp 5.000 Cashback', 'Zodiac Skin Voucher', 'Zonk! Coba Lagi'];
      setResult(prizes[Math.floor(Math.random() * prizes.length)]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
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

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
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
                      MYSTERY <br /><span className="text-brutal-magenta">BOX</span>
                   </motion.h1>
                   <motion.p 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-brutal-white/80 font-space font-bold uppercase text-lg border-l-4 border-brutal-magenta pl-6"
                   >
                      Uji keberuntunganmu! Dapatkan skin legend, ribuan diamonds, atau voucher belanja hanya dengan satu putaran.
                   </motion.p>
                </div>

                <motion.div 
                   initial={{ rotate: 10, scale: 0.8, opacity: 0 }}
                   animate={{ rotate: 0, scale: 1, opacity: 1 }}
                   transition={{ delay: 0.6, type: 'spring' }}
                   className="hidden lg:block bg-brutal-yellow border-4 border-brutal-black p-6 shadow-[12px_12px_0px_0px_#fff] -rotate-3"
                >
                   <div className="text-4xl animate-bounce mb-2">🎁</div>
                   <p className="font-space font-black text-brutal-black uppercase text-sm">Gacha Winner:</p>
                   <p className="font-space font-black text-brutal-magenta uppercase text-xs">@ZenityGamer99</p>
                   <p className="font-space font-black text-brutal-black uppercase text-[10px] opacity-40 italic">Baru saja memenangkan 1000 DM!</p>
                </motion.div>
             </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto text-center">

        <div className="relative mb-20">
           <div className="absolute inset-0 bg-brutal-cyan/20 blur-3xl rounded-full"></div>
           
           <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div 
                  key="spinning"
                  initial={{ scale: 0.8, rotate: 0 }}
                  animate={{ scale: 1.1, rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                  className="w-64 h-64 bg-brutal-magenta border-8 border-brutal-black mx-auto shadow-brutal-black flex items-center justify-center"
                >
                   <span className="text-8xl italic">?</span>
                </motion.div>
              ) : result ? (
                <motion.div 
                  key="result"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-brutal-white border-8 border-brutal-black p-12 shadow-brutal-cyan mx-auto max-w-md"
                >
                   <h2 className="text-2xl font-space font-black uppercase mb-4">SELAMAT! KAMU DAPAT:</h2>
                   <p className="text-5xl font-space font-black text-brutal-magenta uppercase italic mb-8">{result}</p>
                   <BrutalButton variant="black" className="w-full" onClick={() => setResult(null)}>AMBIL HADIAH</BrutalButton>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  className="w-64 h-64 bg-brutal-yellow border-8 border-brutal-black mx-auto shadow-brutal-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                  onClick={startGacha}
                >
                   <span className="text-8xl font-black group-hover:animate-bounce italic">BOX</span>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: 'TICKET GACHA', price: 'Rp 5.000', icon: '🎫' },
             { title: 'SULTAN BOX', price: 'Rp 25.000', icon: '👑' },
             { title: 'LEGEND BOX', price: 'Rp 50.000', icon: '💎' },
           ].map((box, i) => (
             <BrutalCard key={i} accent="cyan" className="space-y-4">
                <span className="text-4xl">{box.icon}</span>
                <h4 className="text-xl font-black uppercase">{box.title}</h4>
                <p className="text-2xl font-black text-brutal-magenta">{box.price}</p>
                <BrutalButton variant="black" className="w-full text-xs" onClick={startGacha}>Beli & Putar</BrutalButton>
             </BrutalCard>
           ))}
        </div>

        <div className="mt-12 text-[10px] font-space font-black uppercase opacity-40 italic">
           *Hasil gacha bersifat acak dan tidak dapat diganggu gugat. Syarat & ketentuan berlaku.
        </div>
        </div>
      </main>
    </div>
  );
};

export default MysteryBox;
