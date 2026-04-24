import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';

const ZenithPrime: React.FC = () => {
  const benefits = [
    { title: 'Zero Admin Fee', desc: 'Bebas biaya admin untuk semua layanan Rekber & Escrow.', icon: '🛡️' },
    { title: 'Flat 2% Discount', desc: 'Diskon tambahan 2% untuk setiap Top Up game apapun.', icon: '📉' },
    { title: 'Priority Queue', desc: 'Transaksi Anda diprioritaskan oleh sistem otomatis kami.', icon: '⚡' },
    { title: 'Exclusive Badges', desc: 'Lencana Prime Emas yang prestisius di profil Anda.', icon: '👑' },
    { title: 'Monthly Mystery Box', desc: 'Dapatkan 1 Mystery Box gratis setiap bulan.', icon: '🎁' },
    { title: '24/7 VIP Support', desc: 'Akses langsung ke tim support senior tanpa antrean.', icon: '☎️' },
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brutal-yellow/10 blur-[150px] -z-10"></div>
      
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-20 w-full relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24">
           <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block bg-brutal-yellow text-black px-6 py-2 font-space font-black uppercase text-xl border-4 border-white shadow-[8px_8px_0px_0px_#fff] mb-4 rotate-2"
           >
             Most Wanted
           </motion.div>
           <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-space font-black uppercase italic leading-none tracking-tighter"
           >
             ZENITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-brutal-yellow via-white to-brutal-yellow animate-shimmer">PRIME</span>
           </motion.h1>
           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto font-space font-bold uppercase text-lg text-white/60"
           >
             Gabung dengan elite squad Audira Zenith dan nikmati keuntungan tanpa batas untuk setiap transaksi gaming Anda.
           </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {benefits.map((b, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
             >
                <BrutalCard accent="yellow" className="p-8 bg-zinc-900 border-4 border-brutal-yellow h-full hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_#facc15]">
                   <div className="text-5xl mb-6">{b.icon}</div>
                   <h3 className="text-2xl font-black uppercase mb-3 text-brutal-yellow italic">{b.title}</h3>
                   <p className="text-sm font-bold uppercase opacity-60 leading-relaxed">{b.desc}</p>
                </BrutalCard>
             </motion.div>
           ))}
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto">
           <div className="bg-brutal-yellow border-8 border-brutal-black p-12 text-black text-center relative shadow-[16px_16px_0px_0px_#fff]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brutal-black text-white px-8 py-3 font-black uppercase text-xl shadow-[6px_6px_0px_0px_#fff]">
                 SPECIAL LAUNCH PRICE
              </div>
              <h2 className="text-4xl font-space font-black uppercase italic mb-2 mt-4">ZENITH PRIME ANNUAL</h2>
              <p className="font-space font-bold text-xl uppercase mb-8">Access all benefits for 1 full year</p>
              
              <div className="flex items-center justify-center gap-4 mb-10">
                 <span className="text-2xl line-through opacity-40 font-black">RP 599.000</span>
                 <div className="bg-brutal-black text-brutal-yellow px-6 py-4 border-4 border-brutal-black">
                    <span className="text-5xl md:text-7xl font-space font-black tracking-tighter">RP 199K</span>
                 </div>
              </div>

              <BrutalButton variant="black" className="w-full py-6 text-3xl shadow-[8px_8px_0px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                 BECOME A PRIME MEMBER
              </BrutalButton>
              
              <p className="mt-8 text-[10px] font-black uppercase opacity-60">*Berlaku untuk 100 member pertama bulan ini. Syarat & Ketentuan berlaku.</p>
           </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-32 text-center">
           <p className="font-space font-black text-xs uppercase opacity-40 mb-12 tracking-[0.5em]">TRUSTED BY 5000+ ELITE GAMERS</p>
           <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
              {['VALORANT', 'MLBB', 'GENSHIN', 'PUBGM', 'HOK'].map(brand => (
                <span key={brand} className="text-4xl font-space font-black italic">{brand}</span>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default ZenithPrime;
