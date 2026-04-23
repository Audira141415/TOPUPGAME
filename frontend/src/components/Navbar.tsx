import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const notifications = [
    { id: 1, title: 'Top Up Berhasil!', desc: '1000 Diamonds telah ditambahkan ke akun MLBB Anda.', time: '2 menit yang lalu', type: 'success' },
    { id: 2, title: 'Promo Flash Sale!', desc: 'Diskon 50% untuk Mystery Box terbatas.', time: '1 jam yang lalu', type: 'promo' },
    { id: 3, title: 'Akun Terjual', desc: 'Akun Genshin Impact Sultan Anda telah laku terjual.', time: '3 jam yang lalu', type: 'info' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brutal-white border-b-4 border-brutal-black px-4 py-2">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Logo Section (Protected Space) */}
        <Link to="/" className="flex items-center gap-3 shrink-0 mr-4 group">
          <div className="w-10 h-10 bg-brutal-black border-2 border-brutal-black shadow-brutal-magenta group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all flex items-center justify-center overflow-hidden">
             <img src="/logo.png" alt="AZ" className="w-full h-full object-cover" />
          </div>
          <span className="hidden lg:inline font-space font-black text-xl uppercase tracking-tighter text-brutal-black">
            AUDIRA<span className="text-brutal-magenta">ZENITH</span>
          </span>
        </Link>

        {/* Center: Main Navigation (Grouped & Spaced) */}
        <div className="hidden xl:flex flex-1 items-center justify-center gap-2">
           {/* Section 1: Shop */}
           <div className="flex items-center gap-6 px-6 border-r-2 border-brutal-black/10 h-10">
              <Link to="/" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight">Games</Link>
              <Link to="/flash-sale" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight relative">
                Flash Sale
                <span className="absolute -top-3 -right-5 bg-brutal-magenta text-white text-[7px] px-1.5 py-0.5 font-black border border-brutal-black shadow-[1px_1px_0px_0px_#000] animate-bounce">NEW</span>
              </Link>
              <Link to="/mystery-box" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight relative">
                Mystery Box
                <span className="absolute -top-3 -right-5 bg-brutal-yellow text-brutal-black text-[7px] px-1.5 py-0.5 font-black border border-brutal-black shadow-[1px_1px_0px_0px_#000]">NEW</span>
              </Link>
              <Link to="/account-store" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight relative">
                Accounts
                <span className="absolute -top-3 -right-5 bg-brutal-cyan text-brutal-black text-[7px] px-1.5 py-0.5 font-black border border-brutal-black shadow-[1px_1px_0px_0px_#000] animate-pulse">NEW</span>
              </Link>
           </div>
           
           {/* Section 2: Hub */}
           <div className="flex items-center gap-6 px-6 h-10">
              <Link to="/tournaments" className="hover:text-brutal-magenta transition-colors font-space font-black uppercase text-[11px] tracking-tight text-brutal-magenta">Tournaments</Link>
              <Link to="/loyalty-shop" className="hover:text-brutal-yellow transition-colors font-space font-black uppercase text-[11px] tracking-tight text-brutal-black relative">
                Loyalty Shop
                <span className="absolute -top-3 -right-6 bg-brutal-white text-brutal-black text-[7px] px-1.5 py-0.5 font-black border border-brutal-black shadow-[1px_1px_0px_0px_#000]">NEW</span>
              </Link>
              <Link to="/tools" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight">Tools</Link>
              <Link to="/track" className="hover:text-brutal-cyan transition-colors font-space font-black uppercase text-[11px] tracking-tight">Tracking</Link>
           </div>
        </div>

        {/* Right: Actions (Clean & Functional) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-2 border-2 border-brutal-black bg-brutal-white px-3 py-0 h-9 shadow-[2px_2px_0px_0px_#000]">
             <span className="text-[9px] font-black uppercase opacity-40">Currency:</span>
             <select className="bg-transparent font-space font-black text-[11px] outline-none cursor-pointer pr-1">
                <option>IDR</option>
                <option>USD</option>
             </select>
          </div>
 
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-all shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none bg-brutal-white" title="Toggle Theme">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            </button>
 
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`hidden md:flex w-9 h-9 border-2 border-brutal-black items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none bg-brutal-white relative ${showNotifications ? 'bg-brutal-cyan translate-x-[1px] translate-y-[1px] shadow-none' : ''}`} 
                title="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brutal-magenta border-2 border-brutal-black rounded-full"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-80 bg-brutal-white border-4 border-brutal-black shadow-[6px_6px_0px_0px_#000] z-[60]"
                  >
                    <div className="bg-brutal-black p-3 flex justify-between items-center">
                      <h3 className="text-brutal-white font-space font-black uppercase text-xs">Pusat Notifikasi</h3>
                      <span className="bg-brutal-magenta text-white text-[8px] px-2 py-0.5 font-black uppercase border border-brutal-white">3 NEW</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b-2 border-brutal-black hover:bg-brutal-black/5 cursor-pointer transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-space font-black text-[10px] uppercase">{n.title}</span>
                            <span className="text-[8px] font-bold opacity-40 uppercase">{n.time}</span>
                          </div>
                          <p className="text-[10px] font-bold leading-tight opacity-70">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-brutal-cyan border-t-2 border-brutal-black text-center">
                      <button className="font-space font-black text-[10px] uppercase hover:underline">Lihat Semua Notifikasi</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
 
          <div className="flex items-center gap-4 ml-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-space font-black uppercase leading-none">{user?.name}</span>
                  <span className="text-[8px] font-space font-bold uppercase text-brutal-magenta">
                    Rp {user?.balance ? Number(user.balance).toLocaleString('id-ID') : 0}
                  </span>
                </div>
                <div className="group relative">
                  <Link to="/dashboard" className="w-10 h-10 border-2 border-brutal-black bg-brutal-cyan flex items-center justify-center shadow-[3px_3px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </Link>
                  <button 
                    onClick={logout}
                    className="absolute top-full right-0 mt-2 bg-brutal-white border-2 border-brutal-black px-4 py-2 font-space font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_#000] hover:bg-red-500 hover:text-white transition-all hidden group-hover:block"
                  >
                    Logout
                  </button>
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
            className="xl:hidden w-9 h-9 border-2 border-brutal-black flex items-center justify-center bg-brutal-white shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
               {isMobileMenuOpen && <line x1="6" y1="6" x2="18" y2="18"></line>}
             </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Side Drawer Style) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brutal-black/40 backdrop-blur-sm z-[90] xl:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] sm:w-[400px] z-[100] bg-brutal-white border-l-4 border-brutal-black flex flex-col p-6 xl:hidden overflow-y-auto shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex justify-between items-center mb-10">
                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brutal-black border-2 border-brutal-black shadow-brutal-magenta flex items-center justify-center">
                       <img src="/logo.png" alt="AZ" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-space font-black text-lg uppercase italic">AUDIRA<span className="text-brutal-magenta">ZENITH</span></span>
                 </Link>
                 <button 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="w-9 h-9 border-2 border-brutal-black flex items-center justify-center bg-brutal-magenta text-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>
              </div>

              <div className="flex flex-col gap-4">
                 {[
                   { label: 'Games', path: '/', badge: null, color: 'hover:bg-brutal-cyan' },
                   { label: 'Flash Sale', path: '/flash-sale', badge: 'HOT', color: 'hover:bg-brutal-magenta hover:text-white' },
                   { label: 'Mystery Box', path: '/mystery-box', badge: 'NEW', color: 'hover:bg-brutal-yellow' },
                   { label: 'Account Store', path: '/account-store', badge: 'PRO', color: 'hover:bg-brutal-cyan' },
                   { label: 'Tournaments', path: '/tournaments', badge: null, color: 'hover:bg-brutal-magenta hover:text-white' },
                   { label: 'Loyalty Shop', path: '/loyalty-shop', badge: 'COIN', color: 'hover:bg-brutal-yellow' },
                   { label: 'Tools', path: '/tools', badge: null, color: 'hover:bg-brutal-cyan' },
                   { label: 'Tracking', path: '/track', badge: null, color: 'hover:bg-brutal-magenta hover:text-white' },
                 ].map((item, i) => (
                   <Link 
                     key={i}
                     to={item.path}
                     onClick={() => setIsMobileMenuOpen(false)}
                     className={`flex items-center justify-between group p-4 border-4 border-brutal-black bg-brutal-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${item.color}`}
                   >
                      <span className="text-xl font-space font-black uppercase italic">{item.label}</span>
                      <div className="flex items-center gap-3">
                        {item.badge && (
                          <span className="bg-brutal-black text-white px-2 py-0.5 font-space font-black text-[9px] border-2 border-brutal-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">{item.badge}</span>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                   </Link>
                 ))}
              </div>

              <div className="mt-auto pt-8 border-t-4 border-brutal-black space-y-6">
                 {!isAuthenticated ? (
                   <div className="grid grid-cols-2 gap-3">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                         <BrutalButton variant="white" className="w-full py-3 text-lg">LOGIN</BrutalButton>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                         <BrutalButton variant="cyan" className="w-full py-3 text-lg">DAFTAR</BrutalButton>
                      </Link>
                   </div>
                 ) : (
                   <div className="bg-brutal-cyan border-4 border-brutal-black p-5 shadow-brutal-black">
                      <p className="font-space font-black uppercase text-[10px] opacity-50 mb-1">Logged in as</p>
                      <p className="text-xl font-space font-black uppercase mb-3 truncate">{user?.name}</p>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                         <BrutalButton variant="black" className="w-full py-2 text-sm">OPEN DASHBOARD</BrutalButton>
                      </Link>
                   </div>
                 )}
                 <p className="text-center font-space font-bold uppercase text-[9px] opacity-30 italic">Audira Zenith v2.0 • Command Center</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
