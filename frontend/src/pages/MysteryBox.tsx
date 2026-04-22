import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';

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
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full text-center">
        <div className="mb-16 space-y-4">
           <h1 className="text-6xl md:text-8xl font-space font-black italic uppercase text-brutal-black leading-none">
              MYSTERY <span className="text-brutal-magenta">BOX</span>
           </h1>
           <p className="bg-brutal-black text-brutal-white inline-block px-4 py-1 font-space font-bold uppercase text-lg border-2 border-brutal-cyan">Uji Keberuntunganmu Sekarang!</p>
        </div>

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
      </main>
    </div>
  );
};

export default MysteryBox;
