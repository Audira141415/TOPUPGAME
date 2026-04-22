import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';
import { cmsService, gameService } from '../services/api';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(10000);
  const [banners, setBanners] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [allGames, setAllGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, settingsData, gameData] = await Promise.all([
          cmsService.getBanners(),
          cmsService.getSettings(),
          gameService.getGames()
        ]);
        setBanners(bannerData);
        setSettings(settingsData);
        setAllGames(gameData);
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
    const categoryName = typeof game.category === 'object' ? game.category.name : game.category;
    const matchesTab = activeTab === 'All' || categoryName === activeTab;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categories = ['All', 'Mobile', 'PC', 'Console', 'Voucher'];

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
                            src={`http://localhost:8000/storage/${banners[0].image_path}`} 
                            alt={banners[0].title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-12 left-12 z-20 space-y-4">
                            <h1 className="text-5xl md:text-7xl font-space font-black text-brutal-white bg-brutal-black inline-block px-4 border-2 border-brutal-white shadow-brutal-magenta">
                                {banners[0].title}
                            </h1>
                        </div>
                    </div>
                  ) : (
                    <>
                        <div className="absolute top-12 left-0 z-30">
                            <button className="bg-brutal-black text-brutal-yellow border-2 border-l-0 border-brutal-white px-4 py-2 font-space font-black text-xs uppercase shadow-brutal-magenta hover:translate-x-2 transition-all flex items-center gap-2">
                                <span className="animate-spin inline-block">🎡</span>
                                Daily Spin & Win
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-brutal-magenta/20 to-brutal-cyan/20 mix-blend-overlay z-10"></div>
                        <div className="absolute inset-0 bg-brutal-black flex items-center justify-center text-brutal-white font-space font-black text-8xl md:text-[12rem] opacity-10 select-none">
                            LEVEL UP
                        </div>
                        <div className="absolute bottom-12 left-12 z-20 space-y-4">
                            <span className="bg-brutal-yellow text-brutal-black px-4 py-1 font-space font-black uppercase text-xl border-2 border-brutal-black shadow-brutal-white inline-block">
                            Big Event 2026
                            </span>
                            <h1 className="text-5xl md:text-7xl font-space font-black text-brutal-black bg-brutal-white inline-block px-4 border-2 border-brutal-black shadow-brutal-magenta">
                            {settings.site_name || 'AUDIRA ZENITH'}
                            </h1>
                            <p className="text-2xl font-space font-bold text-brutal-white bg-brutal-black px-4 py-2 border-2 border-brutal-white">
                            UNLIMITED GAME CREDITS INSTANTLY
                            </p>
                        </div>
                    </>
                  )}
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <BrutalCard accent="yellow" className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                     <h3 className="text-3xl italic uppercase">WEEKLY <br /> HIGHLIGHT</h3>
                     <p className="text-sm font-space font-bold uppercase text-brutal-black/60">Best selling game this week</p>
                     <div className="border-t-2 border-brutal-black pt-4 flex items-center gap-4">
                        <div className="w-20 h-20 bg-brutal-black flex items-center justify-center text-brutal-white font-black text-4xl">FF</div>
                        <div>
                           <h4 className="font-space font-black text-xl">FREE FIRE</h4>
                           <p className="text-xs">10,000+ Orders Today</p>
                        </div>
                     </div>
                  </div>
                  <BrutalButton variant="white" className="w-full mt-8">Check Prices</BrutalButton>
               </BrutalCard>
            </div>
          </div>
        </section>

        {/* Search & Categories Bar */}
        <section className="sticky top-[74px] z-40 bg-brutal-white border-y-4 border-brutal-black px-4 py-4">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                 {categories.map((cat) => (
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
                 <h2 className="text-5xl md:text-8xl font-space font-black text-brutal-black italic uppercase leading-none shadow-brutal-white inline-block">BEST COMBO</h2>
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
                 <Link key={game.id} to={`/game/${game.slug}`}>
                    <GameCard 
                      id={game.id} 
                      name={game.name} 
                      category={typeof game.category === 'object' ? game.category.name : game.category} 
                    />
                 </Link>
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
                        <span className="text-[10px] font-space font-black text-brutal-white mt-2">{t.label}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {[
                  { name: '86 Diamonds MLBB', price: 'Rp 18.500', old: 'Rp 25.000', stock: 85, accent: 'cyan' },
                  { name: '355 Diamonds Free Fire', price: 'Rp 42.000', old: 'Rp 60.000', stock: 42, accent: 'yellow' },
                  { name: '60 UC PUBG Mobile', price: 'Rp 12.000', old: 'Rp 18.000', stock: 92, accent: 'white' },
                ].map((item, i) => (
                  <div key={i} className="bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal-black group hover:-translate-y-2 transition-transform">
                     <div className="flex justify-between items-start mb-6">
                        <span className={`bg-brutal-magenta text-brutal-white px-3 py-1 font-space font-black text-xs border-2 border-brutal-black`}>SAVE 30%</span>
                        <div className="w-12 h-12 bg-brutal-black/5 flex items-center justify-center text-[10px] font-black italic">PROMO</div>
                     </div>
                     <h3 className="text-xl font-space font-black uppercase mb-2">{item.name}</h3>
                     <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-2xl font-space font-black text-brutal-magenta">{item.price}</span>
                        <span className="text-sm font-space font-bold line-through opacity-40">{item.old}</span>
                     </div>
                     <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-[10px] font-space font-black uppercase">
                           <span>Stock Available</span>
                           <span className={item.stock > 80 ? 'text-brutal-magenta animate-pulse' : ''}>
                              {item.stock > 80 ? 'ALMOST SOLD OUT!' : `${100 - item.stock}% SOLD`}
                           </span>
                        </div>
                        <div className="h-4 border-2 border-brutal-black bg-brutal-black/10 overflow-hidden">
                           <div className={`h-full border-r-2 border-brutal-black bg-brutal-${item.accent} transition-all duration-1000`} style={{ width: `${item.stock}%` }}></div>
                        </div>
                     </div>
                     <BrutalButton variant="black" className="w-full">Get Deal</BrutalButton>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Leaderboard Sultan */}
        <section className="bg-brutal-black py-20 px-4 border-y-4 border-brutal-black">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                 <div className="space-y-2">
                    <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-yellow italic uppercase leading-none">TOP SULTAN</h2>
                    <p className="text-brutal-white font-space font-bold uppercase tracking-widest">Hall of fame - This Month</p>
                 </div>
                 <BrutalButton variant="cyan">View All Ranking</BrutalButton>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { name: 'Sultan_MLBB', total: 'Rp 12,450,000', rank: 1, accent: 'yellow' },
                   { name: 'ProPlayer_99', total: 'Rp 8,200,000', rank: 2, accent: 'cyan' },
                   { name: 'VoucherHunter', total: 'Rp 5,100,000', rank: 3, accent: 'magenta' },
                 ].map((sultan) => (
                   <BrutalCard key={sultan.rank} accent={sultan.accent as any} className="bg-brutal-white group hover:-rotate-2 transition-transform">
                      <div className="flex items-start justify-between mb-6">
                         <div className={`w-12 h-12 bg-brutal-black text-brutal-white flex items-center justify-center font-black text-2xl border-2 border-brutal-black shadow-brutal-${sultan.accent}`}>{sultan.rank}</div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase opacity-40">Total Deposit</span>
                            <p className="font-space font-black text-xl text-brutal-black">{sultan.total}</p>
                         </div>
                      </div>
                      <h4 className="text-2xl font-space font-black uppercase mb-4">{sultan.name}</h4>
                      <div className="flex gap-1">
                         {[...Array(5)].map((_, i) => (
                           <div key={i} className={`w-4 h-4 border-2 border-brutal-black bg-brutal-${sultan.accent}`}></div>
                         ))}
                      </div>
                   </BrutalCard>
                 ))}
              </div>
           </div>
        </section>

        {/* Audira Partners Section */}
        <section className="px-4 py-20 max-w-7xl mx-auto border-t-4 border-brutal-black">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-6xl font-space font-black text-brutal-black italic uppercase leading-none">OFFICIAL PARTNERS</h2>
                 <p className="font-space font-bold uppercase tracking-widest text-sm opacity-40">Top Up menggunakan kode promo Influencer favoritmu!</p>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[
                { name: 'Jess No Limit', code: 'JESSLUP', accent: 'cyan' },
                { name: 'Lemon', code: 'LEMONADE', accent: 'yellow' },
                { name: 'Windah Basudara', code: 'BRUTAL', accent: 'magenta' },
                { name: 'Oura', code: 'OURA1', accent: 'cyan' },
                { name: 'Tuturu', code: 'KINGS', accent: 'yellow' },
              ].map((p, i) => (
                <div key={i} className="text-center group cursor-pointer">
                   <div className={`aspect-square bg-brutal-black border-4 border-brutal-black mb-4 flex items-center justify-center overflow-hidden relative shadow-brutal-black group-hover:-translate-y-2 transition-transform`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-brutal-black to-transparent z-10 opacity-60"></div>
                      <div className="absolute inset-0 flex items-center justify-center font-space font-black text-xs text-brutal-white z-20">PROFILE PIC</div>
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
                { title: 'New Patch 1.8.66 Mobile Legends: Meta Marksman Kembali?', date: '22 April 2026', tag: 'MLBB' },
                { title: 'Bocoran Skin Legend Magic Wheel Terbaru, Siapkan Diamonds!', date: '21 April 2026', tag: 'SKIN' },
                { title: 'Cara Cepat Push Rank ke Mythical Glory di Season Ini', date: '20 April 2026', tag: 'GUIDE' },
              ].map((news, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className="aspect-video bg-brutal-black border-4 border-brutal-black mb-6 overflow-hidden relative">
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
                    <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-black italic uppercase leading-none">ACCOUNT STORE</h2>
                    <p className="bg-brutal-black text-brutal-white px-4 py-1 font-space font-bold uppercase tracking-widest inline-block border-2 border-brutal-white">Jual Beli Akun Sultan - 100% Aman</p>
                 </div>
                 <BrutalButton variant="black">Lihat Semua Akun</BrutalButton>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { title: 'MLBB Mythical Glory', price: 'Rp 1.250.000', skins: '150 Skins', hero: '98 Heroes', accent: 'cyan' },
                   { title: 'Genshin Impact AR 58', price: 'Rp 2.400.000', skins: '8 Char ★5', hero: 'Endgame Ready', accent: 'magenta' },
                   { title: 'Valorant Ascendant 3', price: 'Rp 850.000', skins: 'Bundle Reaver', hero: 'Full Agent', accent: 'white' },
                   { title: 'Free Fire Old Acc', price: 'Rp 500.000', skins: 'Set Season 1', hero: 'Elite Pass', accent: 'cyan' },
                 ].map((acc, i) => (
                   <BrutalCard key={i} accent={acc.accent as any} className="bg-brutal-white hover:-translate-y-2 transition-transform cursor-pointer">
                      <div className="aspect-square bg-brutal-black/10 border-2 border-brutal-black mb-6 flex items-center justify-center font-black text-xs italic">PREVIEW IMAGE</div>
                      <h4 className="text-xl font-black uppercase mb-4">{acc.title}</h4>
                      <div className="space-y-2 mb-6">
                         <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                            <span>{acc.skins}</span>
                            <span>{acc.hero}</span>
                         </div>
                         <div className="h-1 bg-brutal-black/10"></div>
                      </div>
                      <p className="text-2xl font-black text-brutal-magenta mb-4">{acc.price}</p>
                      <BrutalButton variant="black" className="w-full text-xs">Detail Akun</BrutalButton>
                   </BrutalCard>
                 ))}
              </div>
           </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-4 py-20 max-w-7xl mx-auto text-center border-t-4 border-brutal-black">
           <h2 className="text-4xl md:text-6xl mb-16 italic">WHY AUDIRA ZENITH?</h2>
           <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'INSTANT DELIVERY', desc: 'Orders processed automatically in seconds 24/7.', color: 'bg-brutal-cyan' },
                { title: 'SECURE PAYMENT', desc: '100% Secure transaction with major payment gateways.', color: 'bg-brutal-magenta' },
                { title: 'BEST PRICE', desc: 'Competitive prices and daily flash sales for everyone.', color: 'bg-brutal-yellow' },
              ].map((item, i) => (
                <div key={i} className="p-8 border-4 border-brutal-black shadow-brutal-black bg-brutal-white">
                   <div className={`w-16 h-16 ${item.color} border-2 border-brutal-black mx-auto mb-6 flex items-center justify-center font-black text-2xl shadow-brutal-black`}>{i+1}</div>
                   <h4 className="text-2xl mb-4 font-space font-black uppercase">{item.title}</h4>
                   <p className="text-sm text-brutal-black/60 font-space font-bold uppercase">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brutal-white border-t-4 border-brutal-black pt-20 pb-12 px-4">
         <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brutal-cyan border-2 border-brutal-black flex items-center justify-center font-black text-2xl">AZ</div>
                  <span className="text-3xl font-space font-black italic">AUDIRA<span className="text-brutal-magenta">ZENITH</span></span>
               </div>
               <p className="font-space font-bold text-sm uppercase leading-relaxed text-brutal-black/60">
                  Audira Zenith adalah platform top-up game paling terpercaya di Indonesia. Kami menyediakan layanan instan 24/7 dengan keamanan tingkat tinggi dan harga yang sangat bersaing untuk para gamer sejati.
               </p>
               <div className="flex gap-4">
                  {['IG', 'FB', 'TT', 'YT'].map(soc => (
                    <div key={soc} className="w-10 h-10 bg-brutal-white border-2 border-brutal-black flex items-center justify-center font-black text-sm hover:bg-brutal-cyan hover:shadow-brutal-black transition-all cursor-pointer shadow-brutal-black">{soc}</div>
                  ))}
               </div>
            </div>
            <div className="md:col-span-2 space-y-6">
               <h4 className="font-space font-black uppercase text-xl italic border-b-2 border-brutal-black pb-2">Links</h4>
               <ul className="space-y-3 font-space font-bold text-sm uppercase text-brutal-black/60">
                  <li className="hover:text-brutal-black cursor-pointer">Home</li>
                  <li className="hover:text-brutal-black cursor-pointer">Track Order</li>
                  <li className="hover:text-brutal-black cursor-pointer">Gamer Tools</li>
               </ul>
            </div>
            <div className="md:col-span-5 space-y-6">
               <h4 className="font-space font-black uppercase text-xl italic border-b-2 border-brutal-black pb-2">Metode Pembayaran</h4>
               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'QRIS', color: 'bg-[#EA1D2C]' },
                    { name: 'BCA', color: 'bg-[#0060AF]' },
                    { name: 'BNI', color: 'bg-[#F15A23]' },
                    { name: 'MANDIRI', color: 'bg-[#00467E]' },
                    { name: 'OVO', color: 'bg-[#4C2A86]' },
                    { name: 'DANA', color: 'bg-[#118EEA]' },
                    { name: 'SHOPEE', color: 'bg-[#EE4D2D]' },
                    { name: 'LINKAJA', color: 'bg-[#E1251B]' },
                  ].map((pay, i) => (
                    <div key={i} className={`${pay.color} h-10 border-2 border-brutal-black flex items-center justify-center text-white font-space font-black text-[8px] uppercase shadow-brutal-black hover:translate-y-[-2px] transition-all cursor-help`}>
                       {pay.name}
                    </div>
                  ))}
               </div>
               <p className="text-[9px] font-bold uppercase opacity-40">Terverifikasi & Aman • Otomatis 24 Jam</p>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-20 pt-8 border-t-2 border-brutal-black text-center">
            <p className="font-space font-black text-xs uppercase opacity-40">© 2026 AUDIRA ZENITH COMMAND CENTER. ALL RIGHTS RESERVED.</p>
         </div>
      </footer>
    </div>
  );
};

export default Home;
