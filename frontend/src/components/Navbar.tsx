import React from 'react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';
import { useAuthStore } from '../store/useAuthStore';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

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
        <div className="hidden xl:flex flex-1 items-center justify-center gap-1">
           {/* Section 1: Shop */}
           <div className="flex items-center gap-4 px-6 border-r-2 border-brutal-black/10">
              <Link to="/" className="hover:text-brutal-cyan transition-colors font-space font-bold uppercase text-xs">Games</Link>
              <Link to="/flash-sale" className="hover:text-brutal-cyan transition-colors font-space font-bold uppercase text-xs">Flash Sale</Link>
              <Link to="/mystery-box" className="hover:text-brutal-cyan transition-colors font-space font-bold uppercase text-xs">Mystery Box</Link>
           </div>
           {/* Section 2: Hub */}
           <div className="flex items-center gap-3 px-4">
              <Link to="/tournaments" className="hover:text-brutal-magenta transition-colors font-space font-bold uppercase text-[10px] text-brutal-magenta">Tournaments</Link>
              <Link to="/loyalty-shop" className="hover:text-brutal-yellow transition-colors font-space font-black uppercase text-[10px] text-brutal-black">Loyalty Shop</Link>
              <Link to="/tools" className="hover:text-brutal-cyan transition-colors font-space font-bold uppercase text-[10px]">Tools</Link>
              <Link to="/track" className="hover:text-brutal-cyan transition-colors font-space font-bold uppercase text-[10px]">Tracking</Link>
           </div>
        </div>

        {/* Right: Actions (Clean & Functional) */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-2 border-2 border-brutal-black bg-brutal-white px-2 py-1 shadow-brutal-black h-9">
             <span className="text-[8px] font-black uppercase opacity-40">Currency:</span>
             <select className="bg-transparent font-space font-black text-[10px] outline-none cursor-pointer">
                <option>IDR</option>
                <option>USD</option>
             </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-all shadow-brutal-black hover:translate-y-[-2px] bg-brutal-white" title="Toggle Theme">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            </button>

            <button className="hidden md:flex w-9 h-9 border-2 border-brutal-black items-center justify-center hover:bg-brutal-cyan transition-all shadow-brutal-black hover:translate-y-[-2px] bg-brutal-white relative" title="Notifications">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
               <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brutal-magenta border-2 border-brutal-black rounded-full"></span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-space font-black uppercase leading-none">{user?.name}</span>
                  <span className="text-[8px] font-space font-bold uppercase text-brutal-magenta">
                    Rp {user?.balance ? Number(user.balance).toLocaleString('id-ID') : 0}
                  </span>
                </div>
                <div className="group relative">
                  <Link to="/dashboard" className="w-10 h-10 border-2 border-brutal-black bg-brutal-cyan flex items-center justify-center shadow-brutal-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </Link>
                  <button 
                    onClick={logout}
                    className="absolute top-full right-0 mt-2 bg-brutal-white border-2 border-brutal-black px-4 py-2 font-space font-black text-[10px] uppercase shadow-brutal-black hover:bg-red-500 hover:text-white transition-all hidden group-hover:block"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline font-space font-black text-xs uppercase hover:text-brutal-magenta transition-colors">LOGIN</Link>
                <Link to="/signup">
                  <BrutalButton variant="cyan" className="px-4 py-2 text-xs">DAFTAR</BrutalButton>
                </Link>
              </>
            )}
          </div>
          
          <button className="xl:hidden w-9 h-9 border-2 border-brutal-black flex items-center justify-center bg-brutal-white shadow-brutal-black">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
