import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import { motion } from 'framer-motion';
import api from '../services/api';

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await api.get('/leaderboard');
        setLeaders(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 w-full">
        <header className="text-center mb-16 space-y-6">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block bg-brutal-magenta text-white px-6 py-2 border-4 border-brutal-black font-space font-black uppercase text-sm shadow-[8px_8px_0px_0px_#000]"
            >
                Elite Competition
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-space font-black uppercase italic leading-none tracking-tighter">
                THE <span className="text-brutal-black-outline text-brutal-yellow">SULTANS</span> <br />LEADERBOARD
            </h1>
            <p className="text-brutal-black/60 font-space font-bold uppercase max-w-2xl mx-auto">
                Inilah 10 penguasa ekonomi Audira Zenith bulan ini. Apakah Anda cukup "Sultan" untuk masuk ke daftar ini?
            </p>
        </header>

        <div className="space-y-6">
            {loading ? (
                <div className="text-center py-20 font-space font-black uppercase animate-pulse text-4xl">SCANNING THE WHALES...</div>
            ) : leaders.length > 0 ? (
                leaders.map((leader, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <BrutalCard 
                            accent={i === 0 ? "yellow" : i === 1 ? "cyan" : i === 2 ? "magenta" : "white"} 
                            className={`p-6 flex items-center justify-between group hover:scale-[1.02] transition-transform ${i === 0 ? 'border-8' : ''}`}
                        >
                            <div className="flex items-center gap-8">
                                <div className={`w-16 h-16 border-4 border-brutal-black flex items-center justify-center font-space font-black text-3xl shadow-[4px_4px_0px_0px_#000] ${i === 0 ? 'bg-brutal-yellow rotate-6' : 'bg-brutal-black text-white'}`}>
                                    #{i + 1}
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-space font-black uppercase italic flex items-center gap-3">
                                        {leader.user?.name || 'Anonymous Sultan'}
                                        {leader.user?.is_prime && (
                                            <span className="bg-brutal-cyan text-brutal-black text-[10px] px-2 py-1 border-2 border-brutal-black not-italic shadow-[2px_2px_0px_0px_#000]">PRIME</span>
                                        )}
                                    </h3>
                                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest">RANK: {i === 0 ? 'ZEUS SULTAN' : i === 1 ? 'POSEIDON WHALE' : i === 2 ? 'HADES MERCHANT' : 'ELITE MEMBER'}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] font-black opacity-40 uppercase mb-1">TOTAL SPENT</p>
                                <p className="text-2xl md:text-4xl font-space font-black text-brutal-magenta">
                                    Rp {Number(leader.total_spent).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </BrutalCard>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-20 bg-white border-8 border-dashed border-brutal-black/10">
                    <p className="text-2xl font-space font-black uppercase opacity-40 italic">BELUM ADA SULTAN TERDETEKSI BULAN INI.</p>
                </div>
            )}
        </div>

        {/* Benefits Section */}
        <section className="mt-24 grid md:grid-cols-2 gap-8">
            <BrutalCard accent="cyan" className="p-8 bg-brutal-black text-white">
                <h4 className="text-2xl font-space font-black uppercase italic mb-4">KENAPA HARUS RANK 1?</h4>
                <ul className="space-y-4 font-space font-bold uppercase text-xs">
                    <li className="flex items-start gap-3"><span className="text-brutal-yellow">▶</span> LENCANA KHUSUS "ZEUS" DI DASHBOARD</li>
                    <li className="flex items-start gap-3"><span className="text-brutal-yellow">▶</span> DISKON TAMBAHAN 5% PERMANEN</li>
                    <li className="flex items-start gap-3"><span className="text-brutal-yellow">▶</span> AKSES KE GRUP DISCORD VVIP</li>
                    <li className="flex items-start gap-3"><span className="text-brutal-yellow">▶</span> HADIAH MISTERI SETIAP AKHIR BULAN</li>
                </ul>
            </BrutalCard>
            <BrutalCard accent="magenta" className="p-8">
                <h4 className="text-2xl font-space font-black uppercase italic mb-4 text-brutal-magenta">SYARAT & KETENTUAN</h4>
                <p className="text-[10px] font-bold uppercase leading-relaxed opacity-60">
                    Leaderboard diupdate secara otomatis setiap ada transaksi sukses. Data yang dihitung hanya transaksi yang dilakukan saat login. Admin berhak mendiskualifikasi user jika ditemukan indikasi kecurangan.
                </p>
            </BrutalCard>
        </section>
      </main>
    </div>
  );
};

export default Leaderboard;
