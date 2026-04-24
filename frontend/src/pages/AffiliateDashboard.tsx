import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const AffiliateDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [copied, setCopied] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.affiliate_code || `AZ-${user?.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-16 w-full">
        <header className="mb-16">
            <h1 className="text-6xl md:text-8xl font-space font-black uppercase italic leading-none tracking-tighter">
                AFFILIATE <br /><span className="text-brutal-magenta text-brutal-black-outline">COMMAND</span> CENTER
            </h1>
            <p className="text-brutal-black/60 font-space font-bold uppercase mt-4 border-l-8 border-brutal-magenta pl-6">
                Bagikan kode Anda, biarkan mereka belanja, dan lihat saldo Anda bertambah secara otomatis.
            </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Stats */}
            <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BrutalCard accent="cyan" className="p-8">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-2 tracking-widest">TOTAL KOMISI</p>
                        <p className="text-5xl font-space font-black text-brutal-magenta">
                            Rp {Number(user?.affiliate_balance || 0).toLocaleString('id-ID')}
                        </p>
                        <BrutalButton variant="black" className="w-full mt-6 py-4 text-xs">CAIRKAN SALDO</BrutalButton>
                    </BrutalCard>
                    <BrutalCard accent="yellow" className="p-8">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-2 tracking-widest">TOTAL REFERRAL</p>
                        <p className="text-5xl font-space font-black">128</p>
                        <p className="text-[10px] font-bold mt-4 opacity-60 uppercase tracking-tighter">Orang telah menggunakan kode Anda</p>
                    </BrutalCard>
                </div>

                <BrutalCard accent="white" className="p-8">
                    <h3 className="text-2xl font-space font-black uppercase italic mb-8 border-b-4 border-brutal-black pb-4">Activity Logs</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-brutal-black/5 border-2 border-brutal-black">
                                <div>
                                    <p className="font-space font-black text-xs uppercase">Komisi dari Order #TUP-8829</p>
                                    <p className="text-[8px] font-bold opacity-40 uppercase">24 April 2026 • 14:00</p>
                                </div>
                                <p className="font-space font-black text-green-600 uppercase">+Rp 2.500</p>
                            </div>
                        ))}
                    </div>
                </BrutalCard>
            </div>

            {/* Right: Your Code */}
            <div className="space-y-8">
                <BrutalCard accent="magenta" className="p-8 bg-brutal-black text-white text-center">
                    <h4 className="text-xl font-space font-black uppercase italic mb-6">KODE REFERRAL ANDA</h4>
                    <div 
                        onClick={handleCopy}
                        className="bg-brutal-magenta p-6 border-4 border-white shadow-[8px_8px_0px_0px_#fff] cursor-pointer hover:scale-105 transition-all group"
                    >
                        <p className="text-4xl font-space font-black tracking-widest group-hover:tracking-[0.2em] transition-all">
                            {user?.affiliate_code || `ZEN-${user?.id}X`}
                        </p>
                        <p className="text-[8px] font-bold mt-4 uppercase opacity-60">{copied ? 'COPIED!' : 'KLIK UNTUK COPY'}</p>
                    </div>
                </BrutalCard>

                <BrutalCard accent="cyan" className="p-8">
                    <h4 className="text-xl font-space font-black uppercase italic mb-4">Cara Kerja</h4>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="w-8 h-8 bg-brutal-cyan border-2 border-brutal-black flex items-center justify-center font-black text-xs shrink-0">1</span>
                            <p className="text-[10px] font-bold uppercase leading-tight">Bagikan kode referral Anda ke teman atau sosial media.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-8 h-8 bg-brutal-yellow border-2 border-brutal-black flex items-center justify-center font-black text-xs shrink-0">2</span>
                            <p className="text-[10px] font-bold uppercase leading-tight">Teman Anda menggunakan kode saat checkout dan mendapatkan diskon.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-8 h-8 bg-brutal-magenta border-2 border-brutal-black flex items-center justify-center font-black text-xs shrink-0 text-white">3</span>
                            <p className="text-[10px] font-bold uppercase leading-tight">Anda mendapatkan komisi 1% dari total belanja mereka selamanya.</p>
                        </div>
                    </div>
                </BrutalCard>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
