import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

const LoyaltyShop: React.FC = () => {
  const rewards = [
    { id: 1, name: 'Voucher Diskon 50%', cost: '500 Koin', desc: 'Diskon untuk semua game tanpa minimal belanja.', color: 'cyan' },
    { id: 2, name: '86 Diamonds MLBB', cost: '1200 Koin', desc: 'Tukarkan koinmu dengan Diamonds instan.', color: 'magenta' },
    { id: 3, name: 'Badge Sultan Gold', cost: '2000 Koin', desc: 'Badge eksklusif di profil & prioritas antrean.', color: 'yellow' },
    { id: 4, name: 'Voucher Mystery Box', cost: '300 Koin', desc: 'Tiket gratis untuk memutar Mystery Box.', color: 'white' },
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* User Coins Header */}
        <div className="bg-brutal-black p-8 border-4 border-brutal-black shadow-brutal-yellow mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-space font-black text-brutal-white uppercase italic leading-none">LOYALTY <span className="text-brutal-yellow">SHOP</span></h1>
              <p className="text-brutal-white/60 font-space font-bold uppercase text-xs">Tukarkan Koin Zenith hasil belanjamu dengan hadiah eksklusif!</p>
           </div>
           <div className="bg-brutal-yellow border-2 border-brutal-white p-4 text-center min-w-[200px]">
              <span className="text-[10px] font-black uppercase opacity-60 block mb-1 text-brutal-black">Koin Kamu</span>
              <p className="text-4xl font-space font-black text-brutal-black tracking-tighter">✨ 1.250</p>
           </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {rewards.map((r) => (
             <BrutalCard key={r.id} accent={r.color as any} className="flex flex-col h-full bg-brutal-white group">
                <div className={`w-full aspect-video bg-brutal-${r.color}/20 border-2 border-brutal-black mb-6 flex items-center justify-center font-black text-4xl group-hover:bg-brutal-${r.color} transition-colors`}>
                   🎁
                </div>
                <h3 className="text-xl font-space font-black uppercase mb-2">{r.name}</h3>
                <p className="text-[10px] font-bold uppercase opacity-40 mb-6 flex-grow">{r.desc}</p>
                
                <div className="border-t-2 border-brutal-black/10 pt-4 mt-auto">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-black uppercase">Harga:</span>
                      <span className="font-space font-black text-brutal-black">{r.cost}</span>
                   </div>
                   <BrutalButton variant="black" className="w-full text-xs">Tukarkan Sekarang</BrutalButton>
                </div>
             </BrutalCard>
           ))}
        </div>

        {/* How to Get Coins */}
        <section className="mt-32 grid md:grid-cols-2 gap-12 border-t-4 border-brutal-black pt-20">
           <div>
              <h2 className="text-4xl font-space font-black uppercase mb-8 italic">CARA DAPAT KOIN?</h2>
              <div className="space-y-6">
                 {[
                   { step: '01', text: 'BELANJA TOP-UP DI AUDIRA ZENITH SETIAP HARI.' },
                   { step: '02', text: 'SELESAIKAN MISI HARIAN DI DASHBOARD KAMU.' },
                   { step: '03', text: 'AJAK TEMAN MENGGUNAKAN KODE REFERRAL KAMU.' },
                 ].map((s, i) => (
                   <div key={i} className="flex gap-4 items-center">
                      <span className="text-3xl font-space font-black text-brutal-magenta">{s.step}</span>
                      <p className="font-space font-black uppercase text-sm leading-tight">{s.text}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-brutal-cyan border-4 border-brutal-black p-12 shadow-brutal-black flex flex-col justify-center text-center">
              <h3 className="text-3xl font-space font-black uppercase mb-4">INGIN KOIN GRATIS?</h3>
              <p className="font-space font-bold uppercase text-xs mb-8 opacity-60">Ikuti event komunitas kami setiap akhir pekan dan dapatkan ribuan koin gratis!</p>
              <BrutalButton variant="black">Gabung Komunitas</BrutalButton>
           </div>
        </section>
      </main>
    </div>
  );
};

export default LoyaltyShop;
