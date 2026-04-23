/**
 * Purpose: Main landing page for Audira Zenith Gaming Platform.
 * Caller: App.tsx (Root Route '/').
 * Dependencies: React, Navbar, Marquee, BrutalCard, GameCard, api.ts.
 * Main Functions: Fetches and displays games with search and category filtering logic.
 * Side Effects: API calls to fetch banners, settings, and games.
 */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';
import { cmsService, gameService, STORAGE_URL } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(10000);
  const [banners, setBanners] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [allGames, setAllGames] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showSpin, setShowSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const rewards = [
    { label: 'Rp 500', value: 500, color: '#FF00FF' },
    { label: 'ZONK', value: 0, color: '#000000' },
    { label: 'Rp 1.000', value: 1000, color: '#00FFFF' },
    { label: 'VOUCHER 5%', value: 'v5', color: '#FFFF00' },
    { label: 'Rp 200', value: 200, color: '#FF00FF' },
    { label: 'ZONK', value: 0, color: '#000000' },
    { label: 'Rp 5.000', value: 5000, color: '#00FFFF' },
    { label: 'VOUCHER 10%', value: 'v10', color: '#FFFF00' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);
    
    // Simulate spin duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      setSpinResult(rewards[randomIndex].label);
      setIsSpinning(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, settingsData, gameData, categoryData] = await Promise.all([
          cmsService.getBanners(),
          cmsService.getSettings(),
          gameService.getGames(),
          cmsService.getCategories()
        ]);
        setBanners(bannerData);
        setSettings(settingsData);
        setAllGames(gameData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  const filteredGames = allGames.filter(game => {
    const categoryName = typeof game.category === 'object' ? game.category?.name : game.category;
    
    const matchesTab = activeTab === 'All' || 
                      (categoryName && categoryName === activeTab);
    
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabList = ['All', ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen flex flex-col bg-brutal-bg">
      <Navbar />
      
      {/* Live Transaction Ticker */}
      <div className="bg-brutal-cyan text-brutal-black py-1 border-b-2 border-brutal-black overflow-hidden whitespace-nowrap font-space font-bold text-xs uppercase">
        <div className="animate-marquee flex gap-12">
          {[...Array(5)].map((_, i) => (
            <span key={i}>🔥 USER-77** JUST TOPPED UP 1,200 DIAMONDS (MOBILE LEGENDS) • ⚡ FASTEST DELIVERY IN 12 SECONDS • 💎 PROMO DISCOUNT APPLIED!</span>
          ))}
        </div>
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
               <div className="relative h-[400px] md:h-[500px] border-4 border-brutal-black shadow-brutal-black group overflow-hidden bg-brutal-black">
                  {banners.length > 0 ? (
                    <div className="absolute inset-0">
                        <img 
                            src={`${STORAGE_URL}/${banners[0].image_path}`} 
                            alt={banners[0].title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-12 left-12 z-20 space-y-4">
                            <h1 className="text-5xl md:text-7xl font-space font-black text-brutal-white bg-brutal-black inline-block px-4 border-2 border-brutal-white shadow-brutal-magenta">
                                {banners[0].title}
                            </h1>
                            <div className="flex gap-4">
                                <BrutalButton variant="yellow">TOP UP NOW</BrutalButton>
                                <BrutalButton variant="white">SEE PROMO</BrutalButton>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brutal-yellow">
                        <h1 className="text-9xl font-space font-black italic -rotate-12 opacity-20">LEVEL UP</h1>
                        <div className="absolute z-10 text-center space-y-6">
                            <h2 className="text-6xl md:text-8xl font-space font-black text-brutal-black uppercase italic leading-none">GAMING PORTAL</h2>
                            <p className="bg-brutal-black text-brutal-white px-4 py-1 font-space font-bold uppercase tracking-widest">Tempat Top-Up Terpercaya</p>
                        </div>
                    </div>
                  )}
               </div>
            </div>

            <div className="lg:col-span-4 grid grid-rows-2 gap-8">
               <BrutalCard accent="magenta" className="flex flex-col justify-center items-center text-center p-8 bg-brutal-magenta relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
                     {[...Array(10)].map((_, i) => (
                        <div key={i} className="text-2xl font-black rotate-45 whitespace-nowrap">LUCKY SPIN LUCKY SPIN</div>
                     ))}
                  </div>
                  <h3 className="text-3xl font-space font-black text-brutal-white uppercase italic mb-4 relative z-10">DAILY LUCKY SPIN!</h3>
                  <p className="text-brutal-black font-space font-bold mb-6 relative z-10">Dapatkan Cashback Hingga 50%!</p>
                  <BrutalButton variant="yellow" className="w-full py-4 text-xl" onClick={() => setShowSpin(true)}>AMBIL HADIAH</BrutalButton>
               </BrutalCard>
               <BrutalCard accent="cyan" className="flex flex-col justify-center items-center text-center p-8 bg-brutal-white group">
                  <div className="w-16 h-16 bg-brutal-cyan border-2 border-brutal-black mb-4 flex items-center justify-center font-black text-4xl group-hover:rotate-12 transition-transform shadow-brutal-black">?</div>
                  <h3 className="text-2xl font-space font-black uppercase mb-2">Punya Pertanyaan?</h3>
                  <p className="text-sm font-space font-bold mb-6 opacity-60">CS Kami Aktif 24/7 Untuk Anda</p>
                  <BrutalButton variant="black" className="w-full">HUBUNGI KAMI</BrutalButton>
               </BrutalCard>
            </div>
          </div>
        </section>

        {/* Search & Categories Bar */}
        <section className="sticky top-[74px] z-40 bg-brutal-white border-y-4 border-brutal-black px-4 py-4">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                 {tabList.map((cat) => (
                   <button 
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-6 py-2 font-space font-black uppercase border-2 transition-all ${
                      activeTab === cat 
                      ? 'bg-brutal-black text-brutal-white border-brutal-black shadow-brutal-cyan -translate-y-1' 
                      : 'bg-brutal-white text-brutal-black border-brutal-black hover:bg-brutal-cyan'
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  className="brutal-input py-2 pr-12" 
                  placeholder="Find your favorite game..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brutal-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>
           </div>
        </section>

        {/* Combo Deals Section */}
        <section className="bg-brutal-cyan py-20 px-4 border-y-4 border-brutal-black relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden flex flex-wrap gap-4">
              {[...Array(20)].map((_, i) => (
                <span key={i} className="text-4xl font-space font-black -rotate-12">COMBO COMBO COMBO</span>
              ))}
           </div>
           
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 space-y-4">
                 <h2 className="text-5xl md:text-8xl font-space font-black text-brutal-black italic uppercase leading-none shadow-brutal-white inline-block relative">
                    BEST COMBO
                    <span className="absolute -top-6 -right-16 bg-brutal-magenta text-white px-3 py-1 font-space font-black text-2xl border-4 border-brutal-black -rotate-6 shadow-brutal-black">NEW</span>
                 </h2>
                 <p className="bg-brutal-magenta text-brutal-white px-6 py-2 font-space font-black uppercase text-xl border-2 border-brutal-white shadow-brutal-black inline-block ml-4 rotate-2">Hemat Hingga 25%!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                 {[
                   { title: 'MLBB SUPREME PACK', items: ['866 Diamonds', 'Weekly Diamond Pass', 'Starlight Member'], price: 'Rp 285.000', old: 'Rp 350.000', accent: 'yellow', link: '/game/mobile-legends' },
                   { title: 'VALORANT ELITE BUNDLE', items: ['1250 VP', 'Battlepass Premium', 'Radiant Points'], price: 'Rp 195.000', old: 'Rp 240.000', accent: 'white', link: '/game/valorant' },
                 ].map((combo, i) => (
                   <div key={i} className={`bg-brutal-white border-4 border-brutal-black p-8 shadow-brutal-black group hover:-translate-y-2 transition-transform relative`}>
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-brutal-magenta border-4 border-brutal-black rounded-full flex items-center justify-center font-space font-black text-brutal-white rotate-12 shadow-brutal-black group-hover:scale-110 transition-transform">
                         HOT!
                      </div>
                      <h3 className="text-3xl font-space font-black uppercase mb-8 border-b-4 border-brutal-black pb-4 italic">{combo.title}</h3>
                      <ul className="space-y-4 mb-12">
                         {combo.items.map((item, idx) => (
                           <li key={idx} className="flex items-center gap-3 font-space font-bold uppercase text-sm">
                              <span className="w-6 h-6 bg-brutal-black text-brutal-cyan flex items-center justify-center text-xs">✓</span>
                              {item}
                           </li>
                         ))}
                      </ul>
                      <div className="flex items-center justify-between">
                         <div>
                            <span className="text-sm font-bold opacity-40 line-through">{combo.old}</span>
                            <p className="text-4xl font-space font-black text-brutal-magenta">{combo.price}</p>
                         </div>
                         <Link to={combo.link}>
                            <BrutalButton variant="black" className="px-8 py-4 text-xl italic">BELI PAKET</BrutalButton>
                         </Link>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Game Grid */}
        <section className="px-4 py-16 max-w-7xl mx-auto min-h-[400px]">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-6xl uppercase italic">AVAILABLE GAMES</h2>
            <div className="flex-grow h-1 bg-brutal-black"></div>
            <span className="font-space font-black text-xl">TOTAL: {filteredGames.length}</span>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
            </div>
          ) : (
            <div className="py-20 text-center">
               <h3 className="text-4xl italic text-brutal-black/20 uppercase">No games found matching your criteria</h3>
            </div>
          )}
        </section>

        {/* Flash Sale Section */}
        <section id="flash-sale" className="px-4 py-20 max-w-7xl mx-auto">
          <div className="bg-brutal-magenta border-4 border-brutal-black p-8 md:p-12 shadow-brutal-black relative overflow-hidden">
             <div className="absolute top-0 right-0 font-space font-black text-9xl text-brutal-black/10 -rotate-12 select-none pointer-events-none">SALE</div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="space-y-2 text-center md:text-left">
                   <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-white italic uppercase leading-none shadow-brutal-black inline-block">FLASH SALE</h2>
                   <p className="text-brutal-black font-space font-bold uppercase tracking-widest bg-brutal-yellow px-4 py-1 border-2 border-brutal-black inline-block ml-2">ENDS IN:</p>
                </div>
                <div className="flex gap-4">
                   {[
                     { label: 'HRS', val: h },
                     { label: 'MIN', val: m },
                     { label: 'SEC', val: s },
                   ].map((t, i) => (
                     <div key={i} className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-brutal-black text-brutal-cyan border-4 border-brutal-white flex items-center justify-center text-4xl font-space font-black shadow-brutal-white">
                           {t.val}
                        </div>
                        <span className="text-xs font-space font-black text-brutal-white mt-2">{t.label}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                  { name: 'MLBB 86 Diamonds', price: 'Rp 19.500', discount: '-25%', img: 'mlbb_diamond.png' },
                  { name: 'Free Fire 140 Diamonds', price: 'Rp 15.200', discount: '-15%', img: 'ff_diamond.png' },
                  { name: 'PUBG Mobile 60 UC', price: 'Rp 12.000', discount: '-10%', img: 'pubg_uc.png' },
                  { name: 'Genshin 60 Genesis', price: 'Rp 14.500', discount: '-12%', img: 'genshin_crystal.png' },
                  { name: 'Valorant 625 VP', price: 'Rp 62.000', discount: '-5%', img: 'valorant_vp.png' },
                ].map((item, i) => (
                  <div key={i} className="bg-brutal-white border-4 border-brutal-black p-4 shadow-brutal-black hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden group">
                     <div className="absolute top-2 right-2 bg-brutal-magenta text-white text-[10px] font-black px-2 py-0.5 border-2 border-brutal-black z-20">
                        {item.discount}
                     </div>
                     <div className="aspect-square bg-brutal-cyan/10 border-2 border-brutal-black mb-4 flex items-center justify-center overflow-hidden">
                        <img src={`${STORAGE_URL}/products/${item.img}`} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                     </div>
                     <h4 className="font-space font-black text-xs uppercase mb-2 line-clamp-1">{item.name}</h4>
                     <p className="font-space font-black text-lg text-brutal-magenta">{item.price}</p>
                     <div className="mt-4 h-1 bg-brutal-black/10 relative">
                        <div className="absolute top-0 left-0 h-full bg-brutal-magenta" style={{ width: '65%' }}></div>
                     </div>
                     <p className="text-[8px] font-black uppercase mt-1 opacity-40 text-right">65% SOLD</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="px-4 py-20 max-w-7xl mx-auto border-t-4 border-brutal-black mt-20">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-space font-black text-brutal-black italic uppercase leading-none inline-block border-b-8 border-brutal-cyan pb-2">OFFICIAL PARTNERS</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
               {[
                 { name: 'Jess No Limit', code: 'JESSLUP', accent: 'cyan', img: 'jess.png' },
                 { name: 'Lemon', code: 'LEMONADE', accent: 'yellow', img: 'lemon.png' },
                 { name: 'Windah Basudara', code: 'BRUTAL', accent: 'magenta', img: 'windah.png' },
                 { name: 'Oura', code: 'OURA1', accent: 'cyan', img: 'oura.png' },
                 { name: 'Tuturu', code: 'KINGS', accent: 'yellow', img: 'tuturu.png' },
               ].map((p, i) => (
                 <div key={i} className="text-center group cursor-pointer">
                    <div className={`aspect-square bg-brutal-black border-4 border-brutal-black mb-4 flex items-center justify-center overflow-hidden relative shadow-brutal-black group-hover:-translate-y-2 transition-transform`}>
                       <img src={`${STORAGE_URL}/partners/${p.img}`} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute inset-0 bg-gradient-to-t from-brutal-black to-transparent z-10 opacity-30"></div>
                    </div>
                    <h4 className="font-space font-black uppercase text-sm mb-2">{p.name}</h4>
                    <div className={`bg-brutal-${p.accent} border-2 border-brutal-black py-1 font-space font-black text-[10px] uppercase shadow-brutal-black`}>
                       KODE: {p.code}
                    </div>
                 </div>
               ))}
            </div>
         </section>

         {/* Gaming News Section */}
         <section className="px-4 py-20 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
               <h2 className="text-4xl md:text-6xl uppercase italic">GAMING NEWS</h2>
               <div className="flex-grow h-1 bg-brutal-black"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
               {[
                 { title: 'New Patch 1.8.66 Mobile Legends: Meta Marksman Kembali?', date: '22 April 2026', tag: 'MLBB', img: 'patch.png' },
                 { title: 'Bocoran Skin Legend Magic Wheel Terbaru, Siapkan Diamonds!', date: '21 April 2026', tag: 'SKIN', img: 'skin.png' },
                 { title: 'Cara Cepat Push Rank ke Mythical Glory di Season Ini', date: '20 April 2026', tag: 'GUIDE', img: 'rank.png' },
               ].map((news, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-brutal-black border-4 border-brutal-black mb-6 overflow-hidden relative">
                       <img src={`${STORAGE_URL}/news/${news.img}`} alt={news.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute inset-0 bg-brutal-cyan/20 group-hover:bg-transparent transition-colors"></div>
                       <span className="absolute top-4 left-4 bg-brutal-yellow text-brutal-black px-3 py-1 font-space font-black text-xs border-2 border-brutal-black">{news.tag}</span>
                    </div>
                    <span className="text-xs font-space font-bold opacity-40 uppercase">{news.date}</span>
                    <h3 className="text-xl font-space font-black uppercase mt-2 group-hover:text-brutal-magenta transition-colors">{news.title}</h3>
                 </div>
               ))}
            </div>
         </section>

         {/* Account Marketplace Section */}
         <section className="bg-brutal-yellow py-20 px-4 border-y-4 border-brutal-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                  <div className="space-y-2">
                     <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-black italic uppercase leading-none relative inline-block">
                        ACCOUNT STORE
                        <span className="absolute -top-4 -right-12 bg-brutal-black text-brutal-cyan px-2 py-0.5 font-space font-black text-lg border-2 border-brutal-black shadow-brutal-white rotate-12">NEW!</span>
                     </h2>
                     <p className="bg-brutal-black text-brutal-white px-4 py-1 font-space font-bold uppercase tracking-widest inline-block border-2 border-brutal-white">Jual Beli Akun Sultan - 100% Aman</p>
                  </div>
                  <Link to="/account-store">
                     <BrutalButton variant="black">Lihat Semua Akun</BrutalButton>
                  </Link>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { id: 1, title: 'MLBB Mythical Glory', price: 'Rp 1.250.000', skins: '150 Skins', hero: '98 Heroes', accent: 'cyan', img: 'mlbb_sultan.png' },
                    { id: 2, title: 'Genshin Impact AR 58', price: 'Rp 2.400.000', skins: '8 Char ★5', hero: 'Endgame Ready', accent: 'magenta', img: 'genshin_sultan.png' },
                    { id: 3, title: 'Valorant Ascendant 3', price: 'Rp 850.000', skins: 'Bundle Reaver', hero: 'Full Agent', accent: 'white', img: 'valorant_sultan.png' },
                    { id: 4, title: 'Free Fire Old Acc', price: 'Rp 500.000', skins: 'Set Season 1', hero: 'Elite Pass', accent: 'cyan', img: 'mlbb_sultan.png' },
                  ].map((acc, i) => (
                    <BrutalCard key={i} accent={acc.accent as any} className="bg-brutal-white hover:-translate-y-2 transition-transform cursor-pointer">
                       <div className="aspect-square bg-brutal-black/10 border-2 border-brutal-black mb-6 flex items-center justify-center font-black text-xs italic"><img src={`${STORAGE_URL}/accounts/${acc.img}`} alt={acc.title} className="w-full h-full object-cover" /></div>
                       <h4 className="text-xl font-black uppercase mb-4">{acc.title}</h4>
                       <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                             <span>{acc.skins}</span>
                             <span>{acc.hero}</span>
                          </div>
                          <div className="h-1 bg-brutal-black/10"></div>
                       </div>
                       <p className="text-2xl font-black text-brutal-magenta mb-4">{acc.price}</p>
                       <Link to={`/account/${acc.id}`} className="block w-full">
                           <BrutalButton variant="black" className="w-full text-xs">Detail Akun</BrutalButton>
                        </Link>

                    </BrutalCard>
                  ))}
               </div>
            </div>
         </section>

         {/* Spin Modal */}
         <AnimatePresence>
            {showSpin && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-md">
                  <motion.div 
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-2xl w-full text-center space-y-8 shadow-brutal-cyan relative overflow-hidden"
                  >
                     <button className="absolute top-4 right-4 text-4xl font-black hover:rotate-90 transition-transform" onClick={() => setShowSpin(false)}>×</button>
                     
                     <h2 className="text-4xl md:text-6xl font-space font-black uppercase italic leading-none">LUCKY SPIN</h2>
                     
                     <div className="relative w-64 h-64 mx-auto border-8 border-brutal-black rounded-full overflow-hidden shadow-brutal-black">
                        <motion.div 
                          className="w-full h-full relative"
                          animate={{ rotate: isSpinning ? 1800 : 0 }}
                          transition={{ duration: 3, ease: "easeOut" }}
                        >
                           {rewards.map((r, i) => (
                              <div 
                                key={i} 
                                className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-4 border-l-2 border-brutal-black"
                                style={{ transform: `rotate(${i * (360/rewards.length)}deg)`, backgroundColor: r.color }}
                              >
                                 <span className="font-space font-black text-[8px] -rotate-90 text-brutal-black">{r.label}</span>
                              </div>
                           ))}
                        </motion.div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-brutal-black z-20 clip-path-triangle"></div>
                     </div>

                     <div className="space-y-4">
                        {spinResult && (
                           <motion.div 
                             initial={{ y: 20, opacity: 0 }} 
                             animate={{ y: 0, opacity: 1 }}
                             className="bg-brutal-yellow p-4 border-4 border-brutal-black shadow-brutal-black"
                           >
                              <p className="font-space font-black text-2xl uppercase">SELAMAT! ANDA MENDAPATKAN:</p>
                              <p className="font-space font-black text-4xl text-brutal-magenta">{spinResult}</p>
                           </motion.div>
                        )}
                        <BrutalButton variant="black" className="w-full py-4 text-2xl" onClick={handleSpin} disabled={isSpinning}>
                           {isSpinning ? 'SPINNING...' : 'SPIN NOW! (GRATIS)'}
                        </BrutalButton>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

      </main>
    </div>
  );
};

export default Home;
