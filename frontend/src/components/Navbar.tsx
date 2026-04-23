import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('IDR');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || document.body.classList.contains('dark');
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const profileRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'Top Up Berhasil!', desc: '1000 Diamonds telah ditambahkan ke akun MLBB Anda.', time: '2 menit yang lalu', type: 'success' },
    { id: 2, title: 'Promo Flash Sale!', desc: 'Diskon 50% untuk Mystery Box terbatas.', time: '1 jam yang lalu', type: 'promo' },
    { id: 3, title: 'Akun Terjual', desc: 'Akun Genshin Impact Sultan Anda telah laku terjual.', time: '3 jam yang lalu', type: 'info' },
  ];

  const currencies = [
    { code: 'IDR', label: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
  ];

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Initial theme sync
    if (isDarkMode) {
      document.body.classList.add('dark');
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDarkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-brutal-white dark:bg-brutal-black border-b-4 border-brutal-black dark:border-brutal-white px-4 py-2 transition-colors">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0 mr-4 group">
          <div className="w-10 h-10 bg-brutal-black border-2 border-brutal-black dark:border-brutal-white shadow-brutal-magenta group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all flex items-center justify-center overflow-hidden">
             <img src="/logo.png" alt="AZ" className="w-full h-full object-cover" />
          </div>
          <span className="hidden lg:inline font-space font-black text-xl uppercase tracking-tighter text-brutal-black dark:text-brutal-white">
            AUDIRA<span className="text-brutal-magenta">ZENITH</span>
            <span className="ml-2 text-[8px] bg-brutal-yellow text-brutal-black px-1 border border-brutal-black shadow-[1px_1px_0px_0px_#000]">V2.1</span>
          </span>
        </Link>

        {/* Center: Main Navigation Grouped */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
           {/* Marketplace Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta dark:text-brutal-white transition-colors h-10">
               Marketplace
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white">
                 <Link to="/" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-cyan dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">All Games</Link>
                 <Link to="/flash-sale" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-magenta hover:text-white font-black text-[10px] uppercase transition-colors flex justify-between items-center">
                   Flash Sale
                   <span className="bg-yellow-400 text-black px-1 text-[8px] border border-black shadow-[1px_1px_0px_0px_#000]">HOT</span>
                 </Link>
                 <Link to="/mystery-box" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-yellow dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Mystery Box</Link>
                 <Link to="/account-store" className="block px-4 py-3 hover:bg-brutal-cyan dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Account Store</Link>
               </div>
             </div>
           </div>

           {/* Community Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta dark:text-brutal-white transition-colors h-10">
               Community
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white">
                 <Link to="/news" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-cyan dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Gaming News</Link>
                 <Link to="/tournaments" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-magenta hover:text-white font-black text-[10px] uppercase transition-colors">Tournaments</Link>
                 <Link to="/loyalty-shop" className="block px-4 py-3 hover:bg-brutal-yellow dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Loyalty Shop</Link>
               </div>
             </div>
           </div>

           {/* Resources Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta dark:text-brutal-white transition-colors h-10">
               Resources
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white">
                 <Link to="/tools" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-cyan dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Gamer Tools</Link>
                 <Link to="/rekber" className="block px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-magenta hover:text-white font-black text-[10px] uppercase transition-colors">Rekber Zenith</Link>
                 <Link to="/track" className="block px-4 py-3 hover:bg-brutal-yellow dark:hover:text-brutal-black font-black text-[10px] uppercase transition-colors">Order Tracking</Link>
               </div>
             </div>
           </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Switcher */}
          <div className="relative" ref={currencyRef}>
            <button 
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              className="flex items-center gap-2 border-2 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-black px-3 py-0 h-9 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition-all hover:-translate-y-0.5"
            >
               <span className="text-[10px] font-black uppercase text-brutal-black dark:text-brutal-white">{currentCurrency}</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={`${showCurrencyMenu ? 'rotate-180' : ''} transition-transform dark:text-white`}><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <AnimatePresence>
              {showCurrencyMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white z-50"
                >
                  {currencies.map((c) => (
                    <button 
                      key={c.code}
                      onClick={() => { setCurrentCurrency(c.code); setShowCurrencyMenu(false); }}
                      className={`w-full text-left px-4 py-3 border-b-2 border-brutal-black dark:border-brutal-white last:border-0 hover:bg-brutal-cyan dark:hover:text-brutal-black transition-colors font-black text-[10px] uppercase ${currentCurrency === c.code ? 'bg-brutal-yellow dark:text-brutal-black' : 'dark:text-white'}`}
                    >
                      <span className="mr-2 opacity-40">{c.symbol}</span> {c.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="w-9 h-9 border-2 border-brutal-black dark:border-brutal-white flex items-center justify-center hover:bg-brutal-yellow dark:hover:bg-brutal-magenta transition-all shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] bg-brutal-white dark:bg-brutal-black"
            >
               {isDarkMode ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
               )}
            </button>
   
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`flex w-9 h-9 border-2 border-brutal-black dark:border-brutal-white items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] bg-brutal-white dark:bg-brutal-black relative ${showNotifications ? 'bg-brutal-cyan' : ''}`} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brutal-magenta border-2 border-brutal-black dark:border-brutal-white rounded-full"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-80 bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[8px_8px_0px_0px_#000] dark:shadow-brutal-white z-[60] overflow-hidden"
                  >
                    <div className="p-4 bg-brutal-black text-white dark:bg-brutal-white dark:text-brutal-black flex justify-between items-center">
                       <span className="font-space font-black text-xs uppercase italic">Notifications Center</span>
                       <button onClick={() => setShowNotifications(false)} className="text-xl font-black">&times;</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                       {notifications.map((n) => (
                         <div key={n.id} className="p-4 border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-bg dark:hover:bg-white/10 transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                               <h4 className="font-space font-black text-[10px] uppercase text-brutal-magenta">{n.title}</h4>
                               <span className="text-[8px] font-bold opacity-40 dark:text-white">{n.time}</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase dark:text-white/80 leading-tight">{n.desc}</p>
                         </div>
                       ))}
                    </div>
                    <div className="p-4 bg-brutal-cyan text-center">
                       <button className="font-space font-black text-[10px] uppercase hover:underline">Mark all as read</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  
          <div className="flex items-center gap-4 ml-2" ref={profileRef}>
            {isAuthenticated ? (
              <div className="flex items-center gap-4 relative">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-space font-black uppercase leading-none">{user?.name}</span>
                  <span className="text-[8px] font-space font-bold uppercase text-brutal-magenta">
                    Rp {user?.balance ? Number(user.balance).toLocaleString('id-ID') : 0}
                  </span>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`w-10 h-10 border-2 border-brutal-black bg-brutal-cyan flex items-center justify-center shadow-[3px_3px_0px_0px_#000] transition-all ${showProfileMenu ? 'translate-x-1 translate-y-1 shadow-none' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-48 bg-brutal-white border-4 border-brutal-black shadow-[6px_6px_0px_0px_#000] z-[60] overflow-hidden"
                      >
                        <Link to="/dashboard" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 p-4 hover:bg-brutal-cyan border-b-2 border-brutal-black transition-colors group">
                           <div className="w-2 h-2 bg-brutal-black group-hover:scale-150 transition-transform"></div>
                           <span className="font-space font-black text-[10px] uppercase">Dashboard</span>
                        </Link>
                        <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 p-4 hover:bg-brutal-yellow border-b-2 border-brutal-black transition-colors group">
                           <div className="w-2 h-2 bg-brutal-black group-hover:scale-150 transition-transform"></div>
                           <span className="font-space font-black text-[10px] uppercase">Settings</span>
                        </Link>
                        <button 
                          onClick={() => { logout(); setShowProfileMenu(false); }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-red-500 hover:text-white transition-colors group text-left"
                        >
                           <div className="w-2 h-2 bg-brutal-black group-hover:bg-white group-hover:scale-150 transition-transform"></div>
                           <span className="font-space font-black text-[10px] uppercase">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="font-space font-black text-[11px] uppercase hover:text-brutal-magenta transition-colors">LOGIN</Link>
                <Link to="/signup">
                  <BrutalButton variant="cyan" className="px-5 py-2 text-[11px] shadow-[3px_3px_0px_0px_#000]">DAFTAR</BrutalButton>
                </Link>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden w-9 h-9 border-2 border-brutal-black flex items-center justify-center bg-brutal-white shadow-[2px_2px_0px_0px_#000] transition-all"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               {isMobileMenuOpen ? (
                 <line x1="18" y1="6" x2="6" y2="18"></line>
               ) : (
                 <>
                   <line x1="3" y1="12" x2="21" y2="12"></line>
                   <line x1="3" y1="6" x2="21" y2="6"></line>
                   <line x1="3" y1="18" x2="21" y2="18"></line>
                 </>
               )}
             </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
