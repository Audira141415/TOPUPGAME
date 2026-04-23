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
    <div className="min-h-screen bg-brutal-bg">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-brutal-yellow py-16 border-b-4 border-brutal-black relative overflow-hidden">
         <div className="absolute top-0 right-0 font-space font-black text-9xl text-brutal-black/5 -rotate-12 select-none">STORE</div>
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left space-y-6">
            <h1 className="text-6xl md:text-8xl font-space font-black text-brutal-black italic uppercase leading-none shadow-brutal-white inline-block">ACCOUNT STORE</h1>
            <div className="flex flex-col md:flex-row items-center gap-6">
               <p className="bg-brutal-black text-brutal-white px-6 py-2 font-space font-black uppercase text-xl border-2 border-brutal-white shadow-brutal-magenta inline-block -rotate-1">
                  Jual Beli Akun Sultan - 100% Aman
               </p>
               <div className="flex gap-4">
                  <span className="text-brutal-black font-space font-bold uppercase italic">🛡️ VERIFIED SELLER</span>
                  <span className="text-brutal-black/40">•</span>
                  <span className="text-brutal-black font-space font-bold uppercase italic">⚡ INSTANT LOGIN</span>
               </div>
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

         {/* Call to Action */}
         <section className="mt-20 bg-brutal-black p-12 border-4 border-brutal-black shadow-brutal-cyan text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10 space-y-4">
               <h2 className="text-4xl md:text-6xl font-space font-black text-brutal-white uppercase italic">PUNYA AKUN SULTAN UNTUK DIJUAL?</h2>
               <p className="text-brutal-yellow font-space font-bold uppercase text-xl">Titip jual akunmu di Audira Zenith & dapatkan harga terbaik!</p>
               <div className="flex justify-center gap-6 pt-4">
                  <BrutalButton variant="yellow" className="px-12 py-4 text-xl">HUBUNGI ADMIN</BrutalButton>
                  <BrutalButton variant="white" className="px-12 py-4 text-xl">PELAJARI SYARAT</BrutalButton>
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
