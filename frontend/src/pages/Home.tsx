/**
 * Purpose: Main landing page for Audira Zenith Gaming Platform.
 * Caller: App.tsx (Root Route '/').
 * Dependencies: React, Navbar, Marquee, BrutalCard, GameCard, api.ts.
 * Main Functions: Fetches and displays games, banners, categories, and flash sales. Includes Lucky Spin and Sell Account CTA.
 * Side Effects: API calls to fetch banners, settings, games, categories, and flash sales.
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
  const [timeLeft, setTimeLeft] = useState(0);
  const [banners, setBanners] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [allGames, setAllGames] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [showSpin, setShowSpin] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const rewards = [
    { label: 'Rp 500', color: '#FF00FF' },
    { label: 'ZONK', color: '#000000' },
    { label: 'Rp 1.000', color: '#00FFFF' },
    { label: 'VOUCHER 5%', color: '#FFFF00' },
    { label: 'Rp 200', color: '#FF00FF' },
    { label: 'ZONK', color: '#000000' },
    { label: 'Rp 5.000', color: '#00FFFF' },
    { label: 'VOUCHER 10%', color: '#FFFF00' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    setTimeout(() => {
      setIsSpinning(false);
      const actualRotation = newRotation % 360;
      const index = Math.floor(((360 - actualRotation + 22.5) % 360) / 45);
      setSpinResult(rewards[index % rewards.length].label);
    }, 3000);
  };

  const contactAdmin = () => {
    const waNumber = settings.whatsapp || '6281234567890';
    const message = encodeURIComponent('Halo Admin Audira Zenith, saya ingin titip jual akun sultan saya. Bagaimana prosedurnya?');
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, settingsData, gameData, categoryData, flashSaleData] = await Promise.all([
          cmsService.getBanners(),
          cmsService.getSettings(),
          gameService.getGames(),
          cmsService.getCategories(),
          gameService.getFlashSales()
        ]);
        setBanners(bannerData);
        setSettings(settingsData);
        setAllGames(gameData);
        setCategories(categoryData);
        setFlashSales(flashSaleData);

        if (flashSaleData.length > 0) {
          const endTime = new Date(flashSaleData[0].end_time).getTime();
          const now = new Date().getTime();
          const diff = Math.floor((endTime - now) / 1000);
          setTimeLeft(diff > 0 ? diff : 0);
        }
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
    const matchesTab = activeTab === 'All' || (categoryName && categoryName === activeTab);
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabList = ['All', ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen flex flex-col bg-brutal-bg">
      <Navbar />
      
      <Marquee text="⚡ FASTEST DELIVERY IN 12 SECONDS • 💎 PROMO DISCOUNT APPLIED! • 🔥 NEW UPDATE: TOP UP VIA QRIS ACTIVE" />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 py-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
               <div className="relative h-[400px] md:h-[500px] border-4 border-brutal-black shadow-brutal-black group overflow-hidden bg-brutal-black">
                  {banners.length > 0 ? (
                    <div className="absolute inset-0">
                        <img src={`${STORAGE_URL}/${banners[0].image_path}`} alt={banners[0].title} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-12 left-12 z-20 space-y-4">
                            <h1 className="text-5xl md:text-7xl font-space font-black text-brutal-white bg-brutal-black inline-block px-4 border-2 border-brutal-white shadow-brutal-magenta">{banners[0].title}</h1>
                            <div className="flex gap-4">
                                <BrutalButton variant="yellow">TOP UP NOW</BrutalButton>
                                <BrutalButton variant="white">SEE PROMO</BrutalButton>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brutal-yellow">
                        <h1 className="text-9xl font-space font-black italic -rotate-12 opacity-20 uppercase">LEVEL UP</h1>
                    </div>
                  )}
               </div>
            </div>

            <div className="lg:col-span-4 grid grid-rows-2 gap-8">
               <BrutalCard accent="magenta" className="flex flex-col justify-center items-center text-center p-8 bg-brutal-magenta relative overflow-hidden">
                  <h3 className="text-3xl font-space font-black text-brutal-white uppercase italic mb-4 relative z-10">DAILY LUCKY SPIN!</h3>
                  <BrutalButton variant="yellow" className="w-full py-4 text-xl" onClick={() => setShowSpin(true)}>AMBIL HADIAH</BrutalButton>
               </BrutalCard>
               <BrutalCard accent="cyan" className="flex flex-col justify-center items-center text-center p-8 bg-brutal-white group">
                  <div className="w-16 h-16 bg-brutal-cyan border-2 border-brutal-black mb-4 flex items-center justify-center font-black text-4xl group-hover:rotate-12 transition-transform shadow-brutal-black">?</div>
                  <h3 className="text-2xl font-space font-black uppercase mb-2">Punya Pertanyaan?</h3>
                  <BrutalButton variant="black" className="w-full">HUBUNGI KAMI</BrutalButton>
               </BrutalCard>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="sticky top-[74px] z-40 bg-brutal-white border-y-4 border-brutal-black px-4 py-4">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                 {tabList.map((cat) => (
                   <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-2 font-space font-black uppercase border-2 transition-all ${activeTab === cat ? 'bg-brutal-black text-brutal-white border-brutal-black shadow-brutal-cyan -translate-y-1' : 'bg-brutal-white text-brutal-black border-brutal-black hover:bg-brutal-cyan'}`}>{cat}</button>
                 ))}
              </div>
              <div className="relative w-full md:w-96">
                <input type="text" className="brutal-input py-2 pr-12" placeholder="Find your favorite game..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
           </div>
        </section>

        {/* Flash Sale Section */}
        {flashSales.length > 0 && (
          <section className="px-4 py-20 max-w-7xl mx-auto">
            <div className="bg-brutal-magenta border-4 border-brutal-black p-8 md:p-12 shadow-brutal-black relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-white italic uppercase">FLASH SALE</h2>
                  <div className="flex gap-4">
                    {[{ label: 'HRS', val: h }, { label: 'MIN', val: m }, { label: 'SEC', val: s }].map((t, i) => (
                      <div key={i} className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-brutal-black text-brutal-cyan border-4 border-brutal-white flex items-center justify-center text-4xl font-space font-black shadow-brutal-white">{t.val}</div>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {flashSales.map((item, i) => (
                    <div key={i} className="bg-brutal-white border-4 border-brutal-black p-4 shadow-brutal-black hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden group">
                      <div className="absolute top-2 right-2 bg-brutal-magenta text-white text-[10px] font-black px-2 py-0.5 border-2 border-brutal-black z-20">-{Math.round(((item.product.price - item.flash_price) / item.product.price) * 100)}%</div>
                      <div className="aspect-square bg-brutal-cyan/10 border-2 border-brutal-black mb-4 flex items-center justify-center overflow-hidden">
                          <img src={`${STORAGE_URL}/${item.product.game?.image}`} alt={item.product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                      </div>
                      <h4 className="font-space font-black text-xs uppercase mb-2 line-clamp-1">{item.product.name}</h4>
                      <p className="font-space font-black text-lg text-brutal-magenta">Rp {Number(item.flash_price).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Game Grid */}
        <section className="px-4 py-16 max-w-7xl mx-auto min-h-[400px]">
          <div className="flex items-center gap-4 mb-12">
             <h2 className="text-4xl md:text-6xl font-space font-black italic uppercase">AVAILABLE GAMES</h2>
             <div className="flex-grow h-1 bg-brutal-black"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
          </div>
        </section>

        {/* Sell Account CTA */}
        <section className="px-4 py-12 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-brutal-black via-gray-800 to-brutal-black border-4 border-brutal-black p-8 md:p-12 shadow-brutal-cyan relative overflow-hidden text-center space-y-8">
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-space font-black text-brutal-white uppercase italic leading-tight">PUNYA AKUN SULTAN UNTUK DIJUAL?</h2>
                  <p className="text-brutal-yellow font-space font-black text-xl uppercase tracking-widest mt-4">TITIP JUAL AKUNMU DI AUDIRA ZENITH & DAPATKAN HARGA TERBAIK!</p>
               </div>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                  <BrutalButton variant="yellow" className="px-12 py-4 text-xl" onClick={contactAdmin}>HUBUNGI ADMIN</BrutalButton>
                  <BrutalButton variant="white" className="px-12 py-4 text-xl" onClick={() => setShowTerms(true)}>PELAJARI SYARAT</BrutalButton>
               </div>
               {/* Decorative Elements */}
               <div className="absolute top-0 right-0 w-32 h-full bg-brutal-cyan opacity-10 skew-x-12 translate-x-16"></div>
               <div className="absolute top-0 left-0 w-32 h-full bg-brutal-magenta opacity-10 -skew-x-12 -translate-x-16"></div>
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
                    </div>
                    <h4 className="font-space font-black uppercase text-sm mb-2">{p.name}</h4>
                 </div>
               ))}
            </div>
         </section>

         {/* News Section */}
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
                    </div>
                    <span className="text-xs font-space font-bold opacity-40 uppercase">{news.date}</span>
                    <h3 className="text-xl font-space font-black uppercase mt-2">{news.title}</h3>
                 </div>
               ))}
            </div>
         </section>

         {/* Account Marketplace Section */}
         <section className="bg-brutal-yellow py-20 px-4 border-y-4 border-brutal-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                  <h2 className="text-5xl md:text-7xl font-space font-black text-brutal-black italic uppercase leading-none">ACCOUNT STORE</h2>
                  <Link to="/account-store"><BrutalButton variant="black">Lihat Semua Akun</BrutalButton></Link>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { id: 1, title: 'MLBB Mythical Glory', price: 'Rp 1.250.000', accent: 'cyan', img: 'mlbb_sultan.png' },
                    { id: 2, title: 'Genshin Impact AR 58', price: 'Rp 2.400.000', accent: 'magenta', img: 'genshin_sultan.png' },
                    { id: 3, title: 'Valorant Ascendant 3', price: 'Rp 850.000', accent: 'white', img: 'valorant_sultan.png' },
                    { id: 4, title: 'Free Fire Old Acc', price: 'Rp 500.000', accent: 'cyan', img: 'mlbb_sultan.png' },
                  ].map((acc, i) => (
                    <BrutalCard key={i} accent={acc.accent as any} className="bg-brutal-white hover:-translate-y-2 transition-transform cursor-pointer">
                       <div className="aspect-square bg-brutal-black/10 border-2 border-brutal-black mb-6 overflow-hidden"><img src={`${STORAGE_URL}/accounts/${acc.img}`} alt={acc.title} className="w-full h-full object-cover" /></div>
                       <h4 className="text-xl font-black uppercase mb-4">{acc.title}</h4>
                       <p className="text-2xl font-black text-brutal-magenta">{acc.price}</p>
                    </BrutalCard>
                  ))}
               </div>
            </div>
         </section>

         {/* Spin Modal */}
         <AnimatePresence>
            {showSpin && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-md">
                  <motion.div initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0 }} className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-2xl w-full text-center space-y-8 shadow-brutal-cyan relative">
                     <button className="absolute top-4 right-4 text-4xl font-black hover:rotate-90 transition-transform" onClick={() => setShowSpin(false)}>×</button>
                     <h2 className="text-4xl md:text-6xl font-space font-black uppercase italic">LUCKY SPIN</h2>
                     <div className="relative w-80 h-80 mx-auto border-8 border-brutal-black rounded-full overflow-hidden shadow-brutal-black bg-brutal-black">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-brutal-white z-30 clip-path-triangle shadow-brutal-black border-x-4 border-b-4 border-brutal-black"></div>
                        <motion.div className="w-full h-full relative rounded-full overflow-hidden" animate={{ rotate: rotation }} transition={{ duration: 3, ease: [0.13, 0.99, 0.3, 1] }}>
                           {rewards.map((r, i) => (
                              <div key={i} className="absolute top-0 left-1/2 w-1/2 h-full origin-left" style={{ transform: `rotate(${i * 45}deg)`, backgroundColor: r.color, clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 50%)' }}>
                                 <div className="absolute top-12 left-8 font-space font-black text-[10px] uppercase text-brutal-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ transform: 'rotate(25deg)' }}>{r.label}</div>
                              </div>
                           ))}
                        </motion.div>
                     </div>
                     <div className="space-y-4">
                        {spinResult && (
                           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-brutal-yellow p-4 border-4 border-brutal-black shadow-brutal-black">
                              <p className="font-space font-black text-2xl uppercase">HADIAH ANDA: {spinResult}</p>
                           </motion.div>
                        )}
                        <BrutalButton variant="black" className="w-full py-4 text-2xl" onClick={handleSpin} disabled={isSpinning}>{isSpinning ? 'SPINNING...' : 'SPIN NOW! (GRATIS)'}</BrutalButton>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* Terms Modal */}
         <AnimatePresence>
            {showTerms && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-md">
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-2xl w-full shadow-brutal-yellow relative">
                     <button className="absolute top-4 right-4 text-4xl font-black hover:rotate-90 transition-transform" onClick={() => setShowTerms(false)}>×</button>
                     <h2 className="text-3xl font-space font-black uppercase mb-8 border-b-4 border-brutal-black pb-4">SYARAT TITIP JUAL AKUN</h2>
                     <div className="space-y-6 text-left font-space font-bold uppercase text-sm">
                        <div className="flex gap-4 items-start">
                           <div className="bg-brutal-cyan border-2 border-brutal-black px-2 py-1">01</div>
                           <p>AKUN HARUS MILIK PRIBADI & MEMILIKI DATA LENGKAP (TIDAK HASIL PHISING/HACK).</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="bg-brutal-magenta text-white border-2 border-brutal-black px-2 py-1">02</div>
                           <p>WAJIB MEMBERIKAN SCREENSHOT LENGKAP (SKIN, HERO, EMBLEM, DLL).</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="bg-brutal-yellow border-2 border-brutal-black px-2 py-1">03</div>
                           <p>PENENTUAN HARGA DISKUSIKAN DENGAN ADMIN (ADMIN FEE 5-10% DARI HARGA JUAL).</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="bg-brutal-black text-white border-2 border-brutal-black px-2 py-1">04</div>
                           <p>PROSES PENCAIRAN DANA DILAKUKAN MAKSIMAL 1X24 JAM SETELAH AKUN TERJUAL.</p>
                        </div>
                     </div>
                     <BrutalButton variant="yellow" className="w-full mt-12 py-4 text-xl" onClick={contactAdmin}>SAYA MENGERTI, HUBUNGI ADMIN</BrutalButton>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
