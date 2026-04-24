import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { STORAGE_URL } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const TournamentHub: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [selectedTourney, setSelectedTourney] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const tournaments = [
    { id: 1, title: 'ZENITH MLBB CHAMPIONSHIP', prize: 'Rp 5.000.000', date: '25 Mei 2026', slots: 12, maxSlots: 32, type: 'Teams', status: 'Open', accent: 'cyan' },
    { id: 2, title: 'FREE FIRE FAST CUP', prize: 'Rp 2.000.000', date: '30 Mei 2026', slots: 32, maxSlots: 32, type: 'Teams', status: 'Closed', accent: 'magenta' },
    { id: 3, title: 'VALORANT NEON BATTLE', prize: 'Rp 3.500.000', date: '05 Juni 2026', slots: 20, maxSlots: 64, type: 'Players', status: 'Open', accent: 'yellow' },
  ];

  const handleRegister = (tourney: any) => {
    setSelectedTourney(tourney);
    setShowRegister(true);
  };

  const handleScrimSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
        setIsSearching(false);
        window.open('https://chat.whatsapp.com/example', '_blank'); // Simulasi masuk grup komunitas
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col overflow-x-hidden">
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

             <div className="relative z-10 space-y-8 text-center md:text-left">
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
                  className="max-w-2xl font-space font-bold uppercase text-xl text-brutal-white/80 border-l-4 border-brutal-cyan pl-6 hidden md:block"
                >
                  Tunjukkan skill-mu, bangun tim pemenang, dan raih hadiah jutaan Rupiah di ekosistem E-Sport Audira Zenith.
                </motion.p>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <BrutalButton variant="cyan" className="text-2xl px-16 py-5 shadow-brutal-white group-hover:shadow-brutal-magenta transition-all w-full md:w-auto">
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
             <BrutalCard key={t.id} accent={t.accent as any} className="flex flex-col h-full bg-brutal-white hover:-translate-y-2 transition-transform group">
                <div className="flex justify-between items-start mb-6">
                   <span className={`px-3 py-1 font-space font-black text-xs border-2 border-brutal-black shadow-brutal-black ${t.status === 'Open' ? 'bg-green-500 text-white animate-pulse' : 'bg-red-500 text-white'}`}>
                      {t.status.toUpperCase()}
                   </span>
                   <p className="font-space font-black text-xs opacity-40">{t.date}</p>
                </div>
                
                <h3 className="text-2xl font-space font-black uppercase mb-6 flex-grow group-hover:text-brutal-magenta transition-colors">{t.title}</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between border-b-2 border-brutal-black/10 pb-2">
                      <span className="text-[10px] font-black uppercase opacity-40">Prizepool</span>
                      <span className="font-space font-black text-brutal-magenta text-xl">{t.prize}</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between">
                         <span className="text-[10px] font-black uppercase opacity-40">Slot Tersedia</span>
                         <span className="font-space font-black text-xs">{t.slots}/{t.maxSlots} {t.type}</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-4 bg-brutal-black/10 border-2 border-brutal-black relative overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(t.slots / t.maxSlots) * 100}%` }}
                            className={`h-full border-r-2 border-brutal-black ${t.slots === t.maxSlots ? 'bg-red-500' : 'bg-brutal-cyan'}`}
                         />
                      </div>
                   </div>
                </div>

                <BrutalButton 
                  variant={t.status === 'Open' ? 'black' : 'white'} 
                  className="w-full"
                  disabled={t.status === 'Closed'}
                  onClick={() => handleRegister(t)}
                >
                   {t.status === 'Open' ? 'Daftar Sekarang' : 'Pendaftaran Tutup'}
                </BrutalButton>
             </BrutalCard>
           ))}
        </div>

        {/* Scrims/Latih Tanding Section */}
        <section className="mt-32 relative group">
           <div className="absolute inset-0 bg-brutal-black translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
           <div className="bg-brutal-yellow border-4 border-brutal-black p-12 md:p-20 text-center space-y-8">
              <div className="inline-block bg-brutal-black text-brutal-white px-8 py-2 font-space font-black text-xl italic uppercase skew-x-[-10deg] mb-4">
                 LIVE MATCHMAKING
              </div>
              <h2 className="text-4xl md:text-7xl font-space font-black uppercase italic leading-none">INGIN LATIH TANDING (SCRIM)?</h2>
              <p className="font-space font-bold uppercase text-lg max-w-3xl mx-auto opacity-60">CARI LAWAN SEIMBANG UNTUK TIMMU DAN TINGKATKAN RANK BERSAMA KOMUNITAS AUDIRA ZENITH.</p>
              
              <div className="flex justify-center pt-8">
                <BrutalButton 
                    variant="black" 
                    className={`px-16 py-6 text-2xl relative overflow-hidden ${isSearching ? 'animate-pulse bg-brutal-magenta' : ''}`}
                    onClick={handleScrimSearch}
                    disabled={isSearching}
                >
                    {isSearching ? (
                        <span className="flex items-center gap-4">
                            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                            MENCARI LAWAN...
                        </span>
                    ) : 'CARI LAWAN SCRIM SEKARANG'}
                </BrutalButton>
              </div>
           </div>
        </section>
      </main>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegister && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-md">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-2xl w-full shadow-brutal-cyan relative"
                >
                    <button className="absolute top-4 right-4 text-4xl font-black hover:rotate-90 transition-transform" onClick={() => setShowRegister(false)}>×</button>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="bg-brutal-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest">Registrasi Terbuka</span>
                            <h2 className="text-4xl font-space font-black uppercase italic leading-none">{selectedTourney?.title}</h2>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase opacity-40">Nama Tim / Player</label>
                                <input type="text" className="brutal-input w-full" placeholder="Contoh: Audira Gaming" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase opacity-40">WhatsApp Kapten</label>
                                <input type="text" className="brutal-input w-full" placeholder="0812xxxxxx" />
                            </div>
                        </div>

                        <div className="bg-brutal-black text-brutal-white p-6 border-4 border-brutal-black space-y-4">
                            <p className="font-space font-black text-sm uppercase">INSTRUKSI PEMBAYARAN:</p>
                            <p className="text-xs opacity-60">Biaya pendaftaran sebesar <span className="text-brutal-yellow">Gratis (Sponsored)</span>. Harap lengkapi data dan admin kami akan menghubungi Anda dalam 1x24 jam.</p>
                        </div>

                        <BrutalButton variant="cyan" className="w-full py-5 text-xl" onClick={() => setShowRegister(false)}>KONFIRMASI PENDAFTARAN</BrutalButton>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TournamentHub;
