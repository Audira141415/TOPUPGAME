import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

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
        <section className="bg-brutal-black text-brutal-white border-4 border-brutal-black p-12 shadow-brutal-cyan mb-20 relative overflow-hidden">
           <div className="absolute right-0 top-0 opacity-10 font-space font-black text-[12rem] -rotate-12 select-none">ESPORT</div>
           <div className="relative z-10 space-y-6">
              <span className="bg-brutal-magenta text-brutal-white px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-white shadow-brutal-black inline-block">Official Tournament</span>
              <h1 className="text-5xl md:text-8xl font-space font-black uppercase italic leading-none">ARENA <br /> <span className="text-brutal-cyan text-brutal-white-outline">ZENITH</span></h1>
              <p className="max-w-2xl font-space font-bold uppercase text-lg text-brutal-white/60">Tunjukkan skill-mu, bangun tim pemenang, dan raih hadiah jutaan Rupiah di ekosistem E-Sport Audira Zenith.</p>
              <BrutalButton variant="cyan" className="text-xl px-12 py-4">Daftarkan Timmu</BrutalButton>
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
