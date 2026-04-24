import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import Marquee from '../components/Marquee';
import { gameService, cmsService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Store: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const [gameData, catData] = await Promise.all([
          gameService.getGames(),
          cmsService.getCategories()
        ]);
        setGames(gameData);
        setCategories(catData);
      } catch (err) {
        console.error('Error fetching store data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  const filteredGames = games.filter(game => {
    const categoryName = typeof game.category === 'object' ? game.category?.name : game.category;
    const matchesCategory = activeCategory === 'All' || categoryName === activeCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <Marquee text="🎮 BROWSE ALL GAMES • 💎 BEST PRICES GUARANTEED • ⚡ INSTANT DELIVERY ACTIVE • 🔥 NEW GAMES ADDED WEEKLY" />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header Section */}
        <section className="mb-16">
          <div className="bg-brutal-black border-8 border-brutal-black p-8 md:p-12 shadow-[16px_16px_0px_0px_#000] shadow-brutal-cyan relative overflow-hidden group">
             <div className="relative z-10 space-y-4">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl md:text-8xl font-space font-black text-brutal-white uppercase italic leading-none"
                >
                  GAME <span className="text-brutal-cyan text-brutal-black-outline">CATALOG</span>
                </motion.h1>
                <p className="text-brutal-white/70 font-space font-bold uppercase text-lg max-w-2xl border-l-4 border-brutal-yellow pl-4">
                  Temukan game favoritmu dan lakukan top up dalam hitungan detik. Semua produk dijamin resmi dan aman.
                </p>
             </div>
             <div className="absolute top-1/2 -translate-y-1/2 -right-20 text-[20rem] font-black text-brutal-white/5 select-none rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                STORE
             </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="sticky top-[74px] z-40 bg-brutal-white border-4 border-brutal-black p-4 mb-12 shadow-brutal-black flex flex-col md:flex-row gap-6 items-center justify-between">
           <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {['All', ...categories.map(c => c.name)].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 font-space font-black uppercase border-2 transition-all ${activeCategory === cat ? 'bg-brutal-black text-brutal-white border-brutal-black shadow-brutal-magenta -translate-y-1' : 'bg-brutal-white text-brutal-black border-brutal-black hover:bg-brutal-cyan'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-96">
              <input 
                type="text" 
                className="brutal-input py-3 px-6 text-lg"
                placeholder="Search game name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
           </div>
        </section>

        {/* Games Grid */}
        <section className="min-h-[500px]">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 animate-pulse">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="aspect-[3/4] bg-brutal-black/10 border-4 border-brutal-black"></div>
               ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredGames.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
                >
                   {filteredGames.map((game) => (
                     <motion.div 
                       key={game.id}
                       layout
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       transition={{ duration: 0.2 }}
                     >
                        <GameCard game={game} />
                     </motion.div>
                   ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                   <div className="text-8xl mb-4">😿</div>
                   <h3 className="text-3xl font-space font-black uppercase">Game tidak ditemukan</h3>
                   <p className="opacity-40 font-bold uppercase mt-2">Coba kata kunci lain atau pilih kategori lain.</p>
                   <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="mt-8 text-brutal-magenta font-black uppercase underline hover:no-underline">Reset Filter</button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      </main>
    </div>
  );
};

export default Store;
