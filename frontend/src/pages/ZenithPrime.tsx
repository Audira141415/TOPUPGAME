import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const ZenithPrime: React.FC = () => {
  const { user } = useAuthStore();
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/prime/status');
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching prime status:', error);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-16 w-full">
        <section className="relative mb-20">
           <div className="bg-brutal-black p-12 md:p-24 border-8 border-brutal-black shadow-[24px_24px_0px_0px_#00ffff] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brutal-cyan/20 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-8 max-w-2xl text-center md:text-left">
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="inline-block bg-brutal-cyan text-brutal-black px-4 py-1 border-2 border-white font-space font-black uppercase text-xs shadow-[4px_4px_0px_0px_#fff]"
                    >
                        VIP MEMBERSHIP
                    </motion.div>
                    <h1 className="text-6xl md:text-[8rem] font-space font-black text-white leading-none tracking-tighter uppercase italic">
                        ZENITH <br /><span className="text-brutal-cyan text-brutal-black-outline">PRIME</span>
                    </h1>
                    <p className="text-white/80 font-space font-bold uppercase text-lg border-l-4 border-brutal-cyan pl-6">
                        Level-up pengalaman top-up Anda. Bayar sekali, nikmati harga modal selamanya.
                    </p>
                    
                    {!user?.is_prime ? (
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <BrutalButton variant="cyan" className="py-6 px-12 text-2xl shadow-[8px_8px_0px_0px_#fff]">
                                GABUNG SEKARANG
                            </BrutalButton>
                            <p className="w-full text-[10px] font-black text-white/40 uppercase italic">*Hanya Rp 49.000 / Bulan (Promo Opening)</p>
                        </div>
                    ) : (
                        <div className="bg-green-500 border-4 border-white p-6 inline-block">
                            <h4 className="text-white font-space font-black text-2xl uppercase">STATUS: ACTIVE VIP</h4>
                        </div>
                    )}
                 </div>

                 <motion.div 
                    initial={{ scale: 0.8, rotate: 10, opacity: 0 }}
                    animate={{ scale: 1, rotate: -5, opacity: 1 }}
                    className="w-72 h-72 bg-brutal-white border-8 border-brutal-black shadow-[16px_16px_0px_0px_#ff00ff] flex flex-col items-center justify-center p-8 text-center"
                 >
                    <span className="text-6xl mb-4">💎</span>
                    <h4 className="font-space font-black text-2xl leading-none uppercase">PRIME BADGE</h4>
                    <p className="text-[10px] font-bold mt-2 opacity-40 uppercase">Eksklusif di profil & dashboard Anda</p>
                 </motion.div>
              </div>
           </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: 'HARGA MODAL', desc: 'Diskon tambahan 2% untuk semua produk tanpa batas.', icon: '📉', color: 'bg-brutal-yellow' },
                { title: 'VIP MYSTERY BOX', desc: 'Akses ke kotak gacha eksklusif dengan rate kemenangan 2x lipat.', icon: '📦', color: 'bg-brutal-magenta text-white' },
                { title: 'PRIORITY SUPPORT', desc: 'Tiket bantuan Anda akan diproses dalam 5 menit oleh admin.', icon: '⚡', color: 'bg-brutal-cyan' },
                { title: 'NO ADS', desc: 'Hapus semua iklan dan popup promo untuk pengalaman bersih.', icon: '🚫', color: 'bg-brutal-black text-white' },
                { title: 'EARLY ACCESS', desc: 'Coba fitur baru Zenith 1 minggu sebelum user biasa.', icon: '🕒', color: 'bg-white' },
                { title: 'ZENITH COINS', desc: 'Dapatkan cashback 1% dalam bentuk koin untuk setiap transaksi.', icon: '🪙', color: 'bg-brutal-yellow' },
            ].map((benefit, i) => (
                <BrutalCard key={i} accent="white" className={`p-8 group hover:-translate-y-2 transition-transform ${benefit.color}`}>
                    <div className="text-5xl mb-6 group-hover:scale-125 transition-transform inline-block">{benefit.icon}</div>
                    <h4 className="text-2xl font-space font-black uppercase italic mb-2">{benefit.title}</h4>
                    <p className="text-[10px] font-bold uppercase opacity-80 leading-relaxed">{benefit.desc}</p>
                </BrutalCard>
            ))}
        </div>

        <section className="mt-24 text-center">
            <BrutalCard accent="magenta" className="p-12 bg-brutal-magenta text-white max-w-3xl mx-auto">
                <h3 className="text-4xl font-space font-black uppercase italic mb-6">SIAP JADI ELITE?</h3>
                <p className="font-space font-bold uppercase text-sm mb-8 opacity-80">
                    Bergabunglah dengan ribuan gamer profesional lainnya yang sudah menggunakan Zenith Prime untuk menghemat jutaan rupiah setiap bulannya.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <BrutalButton variant="black" className="py-4 px-12">PAKET 1 BULAN (RP 49K)</BrutalButton>
                    <BrutalButton variant="yellow" className="py-4 px-12">PAKET 1 TAHUN (RP 499K)</BrutalButton>
                </div>
            </BrutalCard>
        </section>
      </main>
    </div>
  );
};

export default ZenithPrime;
