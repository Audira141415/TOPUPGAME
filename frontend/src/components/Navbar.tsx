import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const profileRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'Top Up Berhasil!', desc: '1000 Diamonds telah ditambahkan ke akun MLBB Anda.', time: '2 menit yang lalu', type: 'success' },
    { id: 2, title: 'Promo Flash Sale!', desc: 'Diskon 50% untuk Mystery Box terbatas.', time: '1 jam yang lalu', type: 'promo' },
    { id: 3, title: 'Akun Terjual', desc: 'Akun Genshin Impact Sultan Anda telah laku terjual.', time: '3 jam yang lalu', type: 'info' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-brutal-white border-b-4 border-brutal-black px-4 py-2">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0 mr-4 group">
          <div className="w-10 h-10 bg-brutal-black border-2 border-brutal-black shadow-brutal-magenta group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all flex items-center justify-center overflow-hidden">
             <img src="/logo.png" alt="AZ" className="w-full h-full object-cover" />
          </div>
          <span className="hidden lg:inline font-space font-black text-xl uppercase tracking-tighter text-brutal-black">
            AUDIRA<span className="text-brutal-magenta">ZENITH</span>
            <span className="ml-2 text-[8px] bg-brutal-yellow px-1 border border-brutal-black">V2.1</span>
          </span>
        </Link>

        {/* Center: Main Navigation Grouped */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
           {/* Marketplace Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta transition-colors h-10">
               Marketplace
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white border-4 border-brutal-black shadow-[4px_4px_0px_0px_#000]">
                 <Link to="/" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-cyan font-black text-[10px] uppercase transition-colors">All Games</Link>
                 <Link to="/flash-sale" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-magenta hover:text-white font-black text-[10px] uppercase transition-colors flex justify-between items-center">
                   Flash Sale
                   <span className="bg-yellow-400 text-black px-1 text-[8px] border border-black shadow-[1px_1px_0px_0px_#000]">HOT</span>
                 </Link>
                 <Link to="/mystery-box" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-yellow font-black text-[10px] uppercase transition-colors">Mystery Box</Link>
                 <Link to="/account-store" className="block px-4 py-3 hover:bg-brutal-cyan font-black text-[10px] uppercase transition-colors">Account Store</Link>
               </div>
             </div>
           </div>

           {/* Community Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta transition-colors h-10">
               Community
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white border-4 border-brutal-black shadow-[4px_4px_0px_0px_#000]">
                 <Link to="/news" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-cyan font-black text-[10px] uppercase transition-colors">Gaming News</Link>
                 <Link to="/tournaments" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-magenta hover:text-white font-black text-[10px] uppercase transition-colors">Tournaments</Link>
                 <Link to="/loyalty-shop" className="block px-4 py-3 hover:bg-brutal-yellow font-black text-[10px] uppercase transition-colors">Loyalty Shop</Link>
               </div>
             </div>
           </div>

           {/* Resources Group */}
           <div className="relative group/nav">
             <button className="flex items-center gap-2 font-space font-black uppercase text-[12px] tracking-tight hover:text-brutal-magenta transition-colors h-10">
               Resources
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover/nav:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
             </button>
             <div className="absolute top-full left-0 w-48 hidden group-hover/nav:block z-50 pt-2">
               <div className="bg-brutal-white border-4 border-brutal-black shadow-[4px_4px_0px_0px_#000]">
                 <Link to="/tools" className="block px-4 py-3 border-b-2 border-brutal-black hover:bg-brutal-cyan font-black text-[10px] uppercase transition-colors">Gamer Tools</Link>
                 <Link to="/track" className="block px-4 py-3 hover:bg-brutal-yellow font-black text-[10px] uppercase transition-colors">Order Tracking</Link>
               </div>
             </div>
           </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-2 border-2 border-brutal-black bg-brutal-white px-3 py-0 h-9 shadow-[2px_2px_0px_0px_#000]">
             <span className="text-[9px] font-black uppercase opacity-40">IDR</span>
          </div>
  
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-all shadow-[2px_2px_0px_0px_#000] bg-brutal-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            </button>
  
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`hidden md:flex w-9 h-9 border-2 border-brutal-black items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] bg-brutal-white relative ${showNotifications ? 'bg-brutal-cyan' : ''}`} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brutal-magenta border-2 border-brutal-black rounded-full"></span>
              </button>
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
