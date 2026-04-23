import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import { STORAGE_URL } from '../services/api';

const RekberService: React.FC = () => {
  const steps = [
    { title: 'Daftar Transaksi', desc: 'Penjual dan Pembeli sepakat menggunakan Rekber Audira Zenith.', icon: '📝' },
    { title: 'Pembeli Bayar', desc: 'Pembeli mentransfer dana ke rekening resmi Audira Zenith.', icon: '💰' },
    { title: 'Amankan Data', desc: 'Admin membantu proses pemindahan data akun secara aman.', icon: '🛡️' },
    { title: 'Pencairan Dana', desc: 'Setelah data aman, dana diteruskan ke penjual. Selesai!', icon: '🤝' },
  ];

  const fees = [
    { range: 'Rp 0 - Rp 100.000', fee: 'Rp 5.000' },
    { range: 'Rp 100.001 - Rp 500.000', fee: 'Rp 10.000' },
    { range: 'Rp 500.001 - Rp 1.000.000', fee: 'Rp 20.000' },
    { range: 'Rp 1.000.000+', fee: '2% dari Harga' },
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Hero Section */}
        <section className="mb-20 relative">
          <div className="bg-brutal-black border-8 border-brutal-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#000] shadow-green-400 relative overflow-hidden group">
             {/* Background Banner */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/rekber_hero.png`} 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[5000ms]" 
                  alt="Rekber Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brutal-black via-brutal-black/40 to-transparent"></div>
             </div>

             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
                   <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="inline-block bg-green-500 text-brutal-black font-black uppercase text-xs px-4 py-1 border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000]"
                   >
                      100% Anti-Phising Service
                   </motion.div>
                   <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-[8rem] font-space font-black text-brutal-white uppercase italic leading-none tracking-tighter"
                   >
                      REKBER <br /><span className="text-green-400 text-brutal-black-outline">ZENITH</span>
                   </motion.h1>
                   <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-brutal-white/80 font-space font-bold uppercase text-lg border-l-4 border-green-500 pl-6"
                   >
                      Solusi Rekening Bersama paling terpercaya untuk transaksi akun dan item game. Aman, Cepat, dan Transparan.
                   </motion.p>
                </div>

                <motion.div 
                   initial={{ scale: 0.5, rotate: 10, opacity: 0 }}
                   animate={{ scale: 1, rotate: 0, opacity: 1 }}
                   transition={{ delay: 0.6, type: 'spring' }}
                   className="hidden lg:block"
                >
                   <div className="bg-brutal-white p-8 border-4 border-brutal-black shadow-[12px_12px_0px_0px_#4ade80] -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                      <p className="text-brutal-black font-space font-black text-4xl mb-2">TERJAMIN</p>
                      <p className="text-brutal-black/60 font-space font-bold uppercase text-xs">Oleh Audira Zenith Group</p>
                   </div>
                </motion.div>
             </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
           {/* Why Us */}
           <div className="lg:col-span-8 space-y-12">
              <section>
                 <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-4xl font-space font-black uppercase italic">Cara Kerja Rekber</h2>
                    <div className="flex-grow h-1 bg-brutal-black"></div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    {steps.map((step, i) => (
                      <BrutalCard key={i} accent="cyan" className="p-6 space-y-4 group hover:-translate-y-1 transition-all">
                         <div className="w-12 h-12 bg-brutal-black text-white flex items-center justify-center text-2xl border-2 border-brutal-black shadow-brutal-cyan group-hover:rotate-12 transition-transform">
                            {step.icon}
                         </div>
                         <h4 className="text-xl font-black uppercase">{i + 1}. {step.title}</h4>
                         <p className="text-sm font-bold uppercase opacity-60 leading-tight">{step.desc}</p>
                      </BrutalCard>
                    ))}
                 </div>
              </section>

              <BrutalCard accent="magenta" className="p-8 md:p-12 bg-brutal-magenta text-white">
                 <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-6xl">⚠️</div>
                    <div className="space-y-4">
                       <h3 className="text-3xl font-space font-black uppercase">Waspada Penipuan!</h3>
                       <p className="font-space font-bold uppercase text-sm leading-relaxed">
                          Pastikan Anda hanya bertransaksi melalui nomor resmi Admin Audira Zenith. Kami TIDAK PERNAH meminta password email secara langsung tanpa prosedur resmi. Selalu cek nomor WA admin di website ini!
                       </p>
                    </div>
                 </div>
              </BrutalCard>
           </div>

           {/* Fee Table & Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <BrutalCard accent="yellow" className="p-8">
                 <h3 className="text-2xl font-space font-black uppercase mb-6 text-center border-b-4 border-brutal-black pb-4">Biaya Layanan</h3>
                 <div className="space-y-4">
                    {fees.map((f, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border-2 border-brutal-black bg-brutal-white shadow-[4px_4px_0px_0px_#000]">
                         <span className="text-[10px] font-black uppercase">{f.range}</span>
                         <span className="text-sm font-black text-brutal-magenta">{f.fee}</span>
                      </div>
                    ))}
                 </div>
                 <div className="mt-8">
                    <BrutalButton variant="black" className="w-full py-4 text-xl group">
                       <span className="flex items-center justify-center gap-3">
                          HUBUNGI ADMIN
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.28-2.28a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                       </span>
                    </BrutalButton>
                 </div>
              </BrutalCard>

              <div className="bg-brutal-cyan p-8 border-4 border-brutal-black shadow-brutal-black text-center">
                 <p className="font-space font-black text-5xl italic mb-2">500+</p>
                 <p className="font-space font-bold uppercase text-xs tracking-widest">Transaksi Berhasil</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default RekberService;
