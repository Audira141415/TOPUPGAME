import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_URL } from '../services/api';

const GamerTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState('winrate');

  // Winrate Tool States
  const [totalMatch, setTotalMatch] = useState('');
  const [totalWr, setTotalWr] = useState('');
  const [targetWr, setTargetWr] = useState('');
  const [wrResult, setWrResult] = useState<number | null>(null);

  // Magic Wheel States
  const [currentPoints, setCurrentPoints] = useState('');
  const [diamondNeed, setDiamondNeed] = useState<number | null>(null);

  const calculateWr = () => {
    const tMatch = parseInt(totalMatch);
    const tWr = parseFloat(totalWr);
    const tarWr = parseFloat(targetWr);
    
    if (tMatch && tWr && tarWr) {
       const winNeeded = Math.ceil((tMatch * (tarWr - tWr)) / (100 - tarWr));
       setWrResult(winNeeded > 0 ? winNeeded : 0);
    }
  };

  const calculateMagicWheel = () => {
    const points = parseInt(currentPoints);
    if (points !== NaN) {
       const remaining = 200 - points;
       const diamonds = remaining * 60; // 60 diamonds per 1 point (estimate)
       setDiamondNeed(diamonds > 0 ? diamonds : 0);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Hero Gamer Tools */}
        <section className="mb-20 relative">
          <div className="bg-brutal-white border-8 border-brutal-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#000] shadow-brutal-cyan relative overflow-hidden group">
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/tools_hero.png`} 
                  className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[5000ms]" 
                  alt="Tools Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brutal-white via-brutal-white/60 to-transparent"></div>
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
                   <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="inline-block bg-brutal-black text-brutal-white font-black uppercase text-xs px-4 py-1 border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000]"
                   >
                      Pro Utility Suite
                   </motion.div>
                   <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-[8rem] font-space font-black text-brutal-black uppercase italic leading-none tracking-tighter"
                   >
                      GAMER <br /><span className="text-brutal-cyan text-brutal-white-outline text-brutal-black shadow-brutal-black">TOOLS</span>
                   </motion.h1>
                   <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-brutal-black font-space font-bold uppercase text-lg border-l-4 border-brutal-magenta pl-6"
                   >
                      Tingkatkan performa gamingmu dengan kumpulan tools kalkulator winrate, estimasi magic wheel, dan generator nickname profesional.
                   </motion.p>
                </div>

                <motion.div 
                   initial={{ scale: 0.5, rotate: 20, opacity: 0 }}
                   animate={{ scale: 1, rotate: 0, opacity: 1 }}
                   transition={{ delay: 0.6, type: 'spring' }}
                   className="hidden lg:flex flex-col gap-4"
                >
                   <div className="bg-brutal-cyan border-4 border-brutal-black p-6 shadow-[8px_8px_0px_0px_#000] rotate-3">
                      <p className="font-space font-black text-xs uppercase">Server Status</p>
                      <p className="text-2xl font-black text-brutal-black">OPTIMAL 🟢</p>
                   </div>
                   <div className="bg-brutal-yellow border-4 border-brutal-black p-6 shadow-[8px_8px_0px_0px_#000] -rotate-2">
                      <p className="font-space font-black text-xs uppercase">Tools Version</p>
                      <p className="text-2xl font-black text-brutal-black">v2.4.0-PRO</p>
                   </div>
                </motion.div>
             </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
           {/* Sidebar Tool Selector */}
           <div className="lg:col-span-3 space-y-4">
              {[
                { id: 'winrate', label: 'WR Calculator', icon: '📈' },
                { id: 'magicwheel', label: 'Magic Wheel', icon: '🎡' },
                { id: 'nickname', label: 'Name Gen', icon: '📛' },
                { id: 'ping', label: 'Ping Test', icon: '📡' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTool(t.id)}
                  className={`w-full p-4 border-4 border-brutal-black font-space font-black uppercase text-left flex items-center gap-4 transition-all ${activeTool === t.id ? 'bg-brutal-yellow shadow-brutal-black -translate-y-1' : 'bg-brutal-white hover:bg-brutal-yellow/10'}`}
                >
                   <span className="text-2xl">{t.icon}</span>
                   <span className="text-sm">{t.label}</span>
                </button>
              ))}
           </div>

           {/* Tool Content Area */}
           <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                 {activeTool === 'winrate' && (
                   <motion.div key="wr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <BrutalCard accent="cyan" className="p-8 md:p-12 space-y-8">
                         <h2 className="text-3xl font-space font-black uppercase italic flex items-center gap-4">
                            Winrate Calculator
                            <span className="bg-brutal-magenta text-white text-[10px] px-2 py-0.5 not-italic border-2 border-brutal-black shadow-brutal-black">NEW</span>
                         </h2>
                         <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                               <label className="font-space font-black uppercase text-[10px]">Total Match</label>
                               <input type="number" value={totalMatch} onChange={(e) => setTotalMatch(e.target.value)} className="brutal-input" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                               <label className="font-space font-black uppercase text-[10px]">Current WR (%)</label>
                               <input type="number" value={totalWr} onChange={(e) => setTotalWr(e.target.value)} className="brutal-input" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                               <label className="font-space font-black uppercase text-[10px]">Target WR (%)</label>
                               <input type="number" value={targetWr} onChange={(e) => setTargetWr(e.target.value)} className="brutal-input" placeholder="0" />
                            </div>
                         </div>
                         <BrutalButton variant="black" className="w-full py-4 text-xl" onClick={calculateWr}>HITUNG SEKARANG</BrutalButton>
                         
                         {wrResult !== null && (
                           <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-brutal-cyan p-8 border-4 border-brutal-black text-center shadow-brutal-black">
                              <p className="font-space font-bold uppercase text-xs mb-2">Kamu butuh win beruntun sebanyak:</p>
                              <p className="text-6xl font-space font-black text-brutal-black italic">{wrResult} WIN</p>
                              <p className="text-[10px] font-black uppercase mt-4 opacity-60">Tanpa kalah sekalipun!</p>
                           </motion.div>
                         )}
                      </BrutalCard>
                   </motion.div>
                 )}

                 {activeTool === 'magicwheel' && (
                   <motion.div key="mw" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <BrutalCard accent="magenta" className="p-8 md:p-12 space-y-8">
                         <h2 className="text-3xl font-space font-black uppercase italic">Magic Wheel Calculator</h2>
                         <div className="space-y-4">
                            <label className="font-space font-black uppercase text-xs block text-center">Poin Saat Ini (0-200)</label>
                            <input type="number" value={currentPoints} onChange={(e) => setCurrentPoints(e.target.value)} className="brutal-input text-center text-4xl py-6" placeholder="0" />
                         </div>
                         <BrutalButton variant="black" className="w-full py-4 text-xl" onClick={calculateMagicWheel}>HITUNG DIAMONDS</BrutalButton>
                         
                         {diamondNeed !== null && (
                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-brutal-magenta p-6 border-4 border-brutal-black text-center shadow-brutal-black">
                                 <p className="font-space font-bold uppercase text-[10px] mb-2 text-white">Sisa Diamonds:</p>
                                 <p className="text-4xl font-space font-black text-brutal-white italic">{diamondNeed} 💎</p>
                              </div>
                              <div className="bg-brutal-white p-6 border-4 border-brutal-black text-center shadow-brutal-black flex flex-col justify-center">
                                 <p className="font-space font-bold uppercase text-[10px] mb-2">Estimasi Biaya:</p>
                                 <p className="text-2xl font-space font-black text-brutal-black italic">Rp {diamondNeed * 250}</p>
                              </div>
                           </div>
                         )}
                      </BrutalCard>
                   </motion.div>
                 )}

                 {activeTool === 'nickname' && (
                   <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <BrutalCard accent="yellow" className="p-8 md:p-12 space-y-8">
                         <h2 className="text-3xl font-space font-black uppercase italic">Nickname Generator</h2>
                         <div className="grid md:grid-cols-2 gap-4">
                            {[' ঔৣ☬✞ZENITH✞☬ঔ', '亗 AUDIRA 亗', '『AZ』Sultan×͜×', 'Ｚ Ｅ Ｎ Ｉ Ｔ Ｈ'].map((name, i) => (
                              <div key={i} className="bg-brutal-white border-2 border-brutal-black p-4 flex justify-between items-center group hover:bg-brutal-yellow transition-all cursor-pointer shadow-brutal-black">
                                 <span className="font-space font-black text-sm">{name}</span>
                                 <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 uppercase">Salin</span>
                              </div>
                            ))}
                         </div>
                         <BrutalButton variant="black" className="w-full py-2 text-xs">REGENERATE NAMES</BrutalButton>
                      </BrutalCard>
                   </motion.div>
                 )}

                 {activeTool === 'ping' && (
                   <motion.div key="ping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <BrutalCard accent="white" className="p-8 md:p-12 space-y-8 text-center">
                         <h2 className="text-3xl font-space font-black uppercase italic">Ping Test Hub</h2>
                         <div className="w-48 h-48 border-8 border-brutal-black rounded-full mx-auto flex items-center justify-center relative shadow-brutal-cyan animate-pulse">
                            <p className="text-5xl font-space font-black italic">25<span className="text-xs">ms</span></p>
                            <div className="absolute -top-2 bg-green-500 px-3 py-1 border-2 border-brutal-black font-black text-[8px] uppercase text-white shadow-brutal-black">EXCELLENT</div>
                         </div>
                         <p className="font-space font-bold uppercase text-[10px] opacity-60">Server Location: Singapore (SEA)</p>
                         <BrutalButton variant="black" className="w-full">REFRESH PING</BrutalButton>
                      </BrutalCard>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* Footer Info */}
        <section className="mt-32 p-8 border-t-4 border-brutal-black text-center">
           <p className="font-space font-black uppercase text-sm italic opacity-40">Tools ini disediakan secara GRATIS untuk komunitas Audira Zenith.</p>
        </section>
      </main>
    </div>
  );
};

export default GamerTools;
