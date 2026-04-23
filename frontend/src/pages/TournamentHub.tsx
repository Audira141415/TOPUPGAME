import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { STORAGE_URL } from '../services/api';
import { motion } from 'framer-motion';

const TournamentHub: React.FC = () => {
  const tournaments = [
    { id: 1, title: 'ZENITH MLBB CHAMPIONSHIP', prize: 'Rp 5.000.000', date: '25 Mei 2026', slots: '12/32 Teams', status: 'Open', accent: 'cyan' },
    { id: 2, title: 'FREE FIRE FAST CUP', prize: 'Rp 2.000.000', date: '30 Mei 2026', slots: 'Full', status: 'Closed', accent: 'magenta' },
    { id: 3, title: 'VALORANT NEON BATTLE', prize: 'Rp 3.500.000', date: '05 Juni 2026', slots: '20/64 Players', status: 'Open', accent: 'yellow' },
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Hero Tournament */}
        <section className="mb-20 relative">
          <div className="bg-brutal-black text-brutal-white border-8 border-brutal-black p-12 md:p-20 shadow-[16px_16px_0px_0px_#000] shadow-brutal-cyan relative overflow-hidden group">
             {/* Background Banner */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/tournament_hero.png`} 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" 
                  alt="Tournament Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-transparent to-transparent opacity-80"></div>
             </div>

             <div className="relative z-10 space-y-8">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-brutal-magenta text-brutal-white px-6 py-2 font-space font-black uppercase text-sm border-2 border-brutal-white shadow-brutal-black inline-block"
                >
                  Official Arena
                </motion.div>
                
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-9xl font-space font-black uppercase italic leading-none"
                >
                  ARENA <br /> 
                  <span className="text-brutal-cyan text-transparent bg-clip-text bg-gradient-to-r from-brutal-cyan to-white">ZENITH</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-2xl font-space font-bold uppercase text-xl text-brutal-white/80 border-l-4 border-brutal-cyan pl-6"
                >
                  Tunjukkan skill-mu, bangun tim pemenang, dan raih hadiah jutaan Rupiah di ekosistem E-Sport Audira Zenith.
                </motion.p>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <BrutalButton variant="cyan" className="text-2xl px-16 py-5 shadow-brutal-white group-hover:shadow-brutal-magenta transition-all">
                    DAFTARKAN TIMMU SEKARANG
                  </BrutalButton>
                </motion.div>
             </div>

             {/* Decorative Trophy Icon */}
             <div className="absolute top-10 right-10 opacity-20 hidden lg:block scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
             </div>
          </div>
        </section>

        {/* Tournament List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
           {tournaments.map((t) => (
             <BrutalCard key={t.id} accent={t.accent as any} className="flex flex-col h-full bg-brutal-white">
                <div className="flex justify-between items-start mb-6">
                   <span className={`px-3 py-1 font-space font-black text-xs border-2 border-brutal-black shadow-brutal-black ${t.status === 'Open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {t.status.toUpperCase()}
                   </span>
                   <p className="font-space font-black text-xs opacity-40">{t.date}</p>
                </div>
                
                <h3 className="text-2xl font-space font-black uppercase mb-6 flex-grow">{t.title}</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between border-b-2 border-brutal-black/10 pb-2">
                      <span className="text-[10px] font-black uppercase opacity-40">Prizepool</span>
                      <span className="font-space font-black text-brutal-magenta text-xl">{t.prize}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-[10px] font-black uppercase opacity-40">Slot Tersedia</span>
                      <span className="font-space font-black">{t.slots}</span>
                   </div>
                </div>

                <BrutalButton 
                  variant={t.status === 'Open' ? 'black' : 'white'} 
                  className="w-full"
                  disabled={t.status === 'Closed'}
                >
                   {t.status === 'Open' ? 'Daftar Sekarang' : 'Pendaftaran Tutup'}
                </BrutalButton>
             </BrutalCard>
           ))}
        </div>

        {/* Scrims/Latih Tanding Section */}
        <section className="mt-32 p-12 bg-brutal-yellow border-4 border-brutal-black shadow-brutal-black text-center space-y-6">
           <h2 className="text-4xl font-space font-black uppercase italic">INGIN LATIH TANDING (SCRIM)?</h2>
           <p className="font-space font-bold uppercase text-sm">Cari lawan seimbang untuk timmu dan tingkatkan rank bersama komunitas Audira.</p>
           <BrutalButton variant="black" className="px-12 py-4">Cari Lawan Scrim</BrutalButton>
        </section>
      </main>
    </div>
  );
};

export default TournamentHub;
