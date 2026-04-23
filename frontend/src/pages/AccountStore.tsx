import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';

import { STORAGE_URL } from '../services/api';

const AccountStore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const accounts = [
    { 
      id: 1, 
      game: 'Mobile Legends', 
      title: 'MLBB Mythical Glory', 
      price: 'Rp 1.250.000', 
      skins: '150 Skins', 
      hero: '98 Heroes', 
      accent: 'cyan',
      image: `${STORAGE_URL}/accounts/mlbb_sultan.png`,
      isHot: true
    },
    { 
      id: 2, 
      game: 'Genshin Impact', 
      title: 'Genshin Impact AR 58', 
      price: 'Rp 2.400.000', 
      skins: '8 Char ★5', 
      hero: 'Endgame Ready', 
      accent: 'magenta',
      image: `${STORAGE_URL}/accounts/genshin_sultan.png`,
      isHot: false
    },
    { 
      id: 3, 
      game: 'Valorant', 
      title: 'Valorant Ascendant 3', 
      price: 'Rp 850.000', 
      skins: 'Bundle Reaver', 
      hero: 'Full Agent', 
      accent: 'yellow',
      image: `${STORAGE_URL}/accounts/valorant_sultan.png`,
      isHot: true
    },
    { 
      id: 4, 
      game: 'Free Fire', 
      title: 'Free Fire Old Acc', 
      price: 'Rp 500.000', 
      skins: 'Set Season 1', 
      hero: 'Elite Pass', 
      accent: 'cyan',
      image: 'https://images.unsplash.com/photo-1552824730-85360dfd59fe?auto=format&fit=crop&q=80&w=400',
      isHot: false
    },
    { 
      id: 5, 
      game: 'Mobile Legends', 
      title: 'MLBB Account Sultan', 
      price: 'Rp 5.500.000', 
      skins: '350 Skins (Collector)', 
      hero: 'All Heroes', 
      accent: 'yellow',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
      isHot: true
    }
  ];

  const categories = ['All', 'Mobile Legends', 'Genshin Impact', 'Valorant', 'Free Fire'];

  const filteredAccounts = accounts.filter(acc => {
    const matchesCategory = activeCategory === 'All' || acc.game === activeCategory;
    const matchesSearch = acc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      {/* Hero Account Store */}
      <section className="px-4 py-12 max-w-7xl mx-auto w-full">
        <div className="bg-brutal-white border-8 border-brutal-black p-8 md:p-20 shadow-[16px_16px_0px_0px_#000] shadow-brutal-cyan relative overflow-hidden group">
           {/* Background Image */}
           <div className="absolute inset-0 z-0">
              <img 
                src={`${STORAGE_URL}/banners/account_hero.png`} 
                className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[5000ms]" 
                alt="Account Store Hero" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brutal-white via-brutal-white/80 to-transparent"></div>
           </div>

           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 text-center md:text-left max-w-2xl">
                 <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="inline-block bg-brutal-cyan text-brutal-black font-black uppercase text-xs px-4 py-1 border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000]"
                 >
                    Premium Marketplace
                 </motion.div>
                 <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-[8rem] font-space font-black text-brutal-black uppercase italic leading-none tracking-tighter"
                 >
                    ACCOUNT <br /><span className="text-brutal-magenta">STORE</span>
                 </motion.h1>
                 <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4"
                 >
                    <span className="bg-brutal-black text-white px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-black">🛡️ 100% TERVERIFIKASI</span>
                    <span className="bg-brutal-yellow text-brutal-black px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-black">⚡ LOGIN INSTAN</span>
                 </motion.div>
                 <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-brutal-black/60 font-space font-bold uppercase text-lg border-l-4 border-brutal-cyan pl-6"
                 >
                    Platform jual beli akun sultan paling aman di Indonesia. Akun MLBB, Genshin Impact, Valorant, dan lainnya dengan data lengkap & garansi seumur hidup.
                 </motion.p>
              </div>

              <motion.div 
                 initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                 animate={{ rotate: 0, scale: 1, opacity: 1 }}
                 transition={{ delay: 0.8, type: 'spring' }}
                 className="hidden lg:block bg-brutal-magenta border-4 border-brutal-black p-8 text-center min-w-[280px] shadow-[12px_12px_0px_0px_#000] rotate-3 group-hover:rotate-0 transition-transform duration-500"
              >
                 <div className="text-white space-y-4">
                    <p className="font-space font-black uppercase text-2xl italic leading-none">TRUSTED BY</p>
                    <p className="text-6xl font-space font-black tracking-tighter">10K+</p>
                    <p className="font-space font-bold uppercase text-xs opacity-80">GAMERS ACROSS INDONESIA</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
         {/* Filters & Search */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex flex-wrap justify-center gap-2">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2 font-space font-black uppercase border-2 transition-all ${activeCategory === cat ? 'bg-brutal-black text-brutal-white shadow-brutal-cyan -translate-y-1' : 'bg-brutal-white hover:bg-brutal-cyan'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            <div className="relative w-full md:w-96">
               <input 
                 type="text" 
                 placeholder="Cari akun sultan..." 
                 className="brutal-input py-2"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2">🔍</div>
            </div>
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAccounts.map((acc) => (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: acc.id * 0.1 }}
              >
                 <BrutalCard accent={acc.accent as any} className="bg-brutal-white group hover:-translate-y-2 transition-transform cursor-pointer h-full flex flex-col">
                    <div className="aspect-square bg-brutal-black border-2 border-brutal-black mb-6 relative overflow-hidden">
                       <img src={acc.image} alt={acc.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                       {acc.isHot && (
                         <div className="absolute top-2 right-2 bg-brutal-magenta text-white px-3 py-1 font-space font-black text-[10px] uppercase border-2 border-brutal-black animate-pulse">
                            HOT ITEM
                         </div>
                       )}
                       <div className="absolute bottom-2 left-2 bg-brutal-black text-brutal-white px-2 py-1 font-space font-black text-[8px] uppercase">
                          {acc.game}
                       </div>
                    </div>
                    
                    <div className="flex-grow space-y-4">
                       <h3 className="text-xl font-space font-black uppercase leading-tight line-clamp-2">{acc.title}</h3>
                       <div className="grid grid-cols-2 gap-2">
                          <div className="bg-brutal-black/5 p-2 border border-brutal-black/10 text-center">
                             <p className="text-[8px] font-bold opacity-40 uppercase">Skins</p>
                             <p className="text-[10px] font-black uppercase">{acc.skins}</p>
                          </div>
                          <div className="bg-brutal-black/5 p-2 border border-brutal-black/10 text-center">
                             <p className="text-[8px] font-bold opacity-40 uppercase">Heroes</p>
                             <p className="text-[10px] font-black uppercase">{acc.hero}</p>
                          </div>
                       </div>
                       <div className="pt-4 border-t-2 border-dashed border-brutal-black/20">
                          <p className="text-xs font-bold opacity-40 uppercase">Price</p>
                          <p className="text-3xl font-space font-black text-brutal-magenta italic">{acc.price}</p>
                       </div>
                    </div>

                                         <Link to={`/account/${acc.id}`} className="block w-full mt-6">
                        <BrutalButton variant="black" className="w-full text-sm uppercase">Detail Akun</BrutalButton>
                     </Link>

                 </BrutalCard>
              </motion.div>
            ))}
         </div>

         {/* Call to Action - Sell Account */}
         <section className="mt-20 relative">
            <div className="bg-brutal-black p-12 md:p-20 border-8 border-brutal-black shadow-[16px_16px_0px_0px_#000] shadow-brutal-yellow text-center space-y-8 relative overflow-hidden group">
               {/* Background Banner */}
               <div className="absolute inset-0 z-0">
                  <img 
                    src={`${STORAGE_URL}/banners/sell_account_cta.png`} 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[3000ms]" 
                    alt="Sell Account CTA" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/40 to-transparent"></div>
               </div>

               <div className="relative z-10 space-y-6">
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-7xl font-space font-black text-brutal-white uppercase italic leading-none"
                  >
                    PUNYA AKUN SULTAN <br /><span className="text-brutal-yellow">UNTUK DIJUAL?</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-brutal-white/80 font-space font-bold uppercase text-xl max-w-3xl mx-auto"
                  >
                    Titip jual akunmu di Audira Zenith & dapatkan harga terbaik dengan sistem keamanan yang terjamin!
                  </motion.p>
                  <div className="flex flex-col md:flex-row justify-center gap-6 pt-4">
                     <BrutalButton variant="yellow" className="px-16 py-5 text-2xl shadow-brutal-white hover:shadow-brutal-magenta transition-all">
                        HUBUNGI ADMIN
                     </BrutalButton>
                     <BrutalButton variant="white" className="px-16 py-5 text-2xl">
                        PELAJARI SYARAT
                     </BrutalButton>
                  </div>
               </div>

               {/* Floating Icon Decoration */}
               <div className="absolute -bottom-10 -right-10 text-brutal-yellow opacity-20 text-9xl font-black -rotate-12 group-hover:rotate-0 transition-transform duration-700 select-none">
                  $$$
               </div>
            </div>
         </section>
      </main>

      {/* Footer Space */}
      <div className="py-20"></div>
    </div>
  );
};

export default AccountStore;
