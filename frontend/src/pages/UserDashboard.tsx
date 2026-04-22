import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const history = [
    { id: 'TP-98765', game: 'Free Fire', date: '2026-04-22', amount: 'Rp 20,000', status: 'Success', icon: '🔥' },
    { id: 'TP-98766', game: 'Mobile Legends', date: '2026-04-21', amount: 'Rp 50,000', status: 'Success', icon: '⚔️' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-hidden relative">
      {/* Abstract Background Elements for "Ultimate" feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brutal-cyan/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brutal-magenta/5 blur-[120px] rounded-full -z-10"></div>
      
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Sidebar: Profile Ultimate */}
          <div className="lg:w-1/3 space-y-6">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brutal-cyan via-brutal-magenta to-brutal-yellow blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <BrutalCard accent="cyan" className="relative p-8 text-center bg-white/80 backdrop-blur-xl border-4">
                   <div className="relative inline-block mb-6">
                      <div className="w-28 h-28 bg-gradient-to-br from-brutal-magenta to-brutal-cyan border-4 border-brutal-black mx-auto flex items-center justify-center font-space font-black text-5xl text-white shadow-[8px_8px_0px_0px_#000] rotate-3 group-hover:rotate-0 transition-transform">
                        {user?.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-brutal-yellow border-2 border-brutal-black px-3 py-1 font-space font-black text-sm shadow-[4px_4px_0px_0px_#000] animate-bounce">
                         PRO
                      </div>
                   </div>
                   
                   <div className="mb-6">
                     <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{user?.name}</h2>
                     <p className="text-xs font-space font-bold uppercase text-brutal-black/40 tracking-widest">{user?.email}</p>
                   </div>

                   <div className="flex items-center justify-center gap-2 mb-8">
                      <span className="bg-brutal-black text-white px-4 py-1 font-space font-black uppercase text-[10px] tracking-widest">
                         {user?.role} TIER
                      </span>
                      <span className="bg-brutal-cyan border-2 border-brutal-black px-4 py-1 font-space font-black uppercase text-[10px]">
                         VERIFIED
                      </span>
                   </div>
                   
                   <div className="pt-6 border-t-4 border-brutal-black/5">
                      <p className="text-[10px] font-space font-black text-brutal-black/30 uppercase mb-2">Current Liquidity</p>
                      <p className="text-5xl font-space font-black text-brutal-black tracking-tighter">
                        <span className="text-sm align-top mr-1">RP</span>
                        {user?.balance ? Number(user.balance).toLocaleString('id-ID') : 0}
                      </p>
                   </div>
                   
                   <div className="mt-8">
                      <BrutalButton variant="cyan" className="w-full py-4 text-xl shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                         DEPOSIT SALDO
                      </BrutalButton>
                   </div>
                </BrutalCard>
             </div>

             <BrutalCard accent="magenta" className="p-6 bg-brutal-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brutal-magenta/20 blur-3xl"></div>
                <h4 className="text-2xl font-space font-black uppercase italic mb-2 relative z-10">Referral System</h4>
                <p className="text-[10px] font-bold uppercase opacity-60 mb-6 leading-relaxed relative z-10">
                   Earn <span className="text-brutal-cyan">Zenith Coins</span> by inviting your elite squad.
                </p>
                <div className="bg-white/10 border-2 border-dashed border-white/20 p-4 mb-6 flex justify-between items-center group cursor-pointer hover:border-brutal-cyan transition-colors">
                   <span className="font-space font-black text-brutal-cyan tracking-widest text-lg">AZ-{user?.id}X-ULT</span>
                   <span className="text-[10px] font-black uppercase bg-brutal-cyan text-black px-2 py-1">COPY</span>
                </div>
                <button className="w-full py-3 bg-white text-black font-space font-black uppercase text-xs hover:bg-brutal-magenta hover:text-white transition-all border-2 border-brutal-black shadow-[4px_4px_0px_0px_#fff]">
                   SHARE COMMAND
                </button>
             </BrutalCard>
          </div>

          {/* Main Content: Stats & Transactions */}
          <div className="lg:w-2/3 space-y-8">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: '12', color: 'bg-brutal-yellow' },
                  { label: 'Coins Earned', value: '2.5K', color: 'bg-brutal-magenta' },
                  { label: 'Win Rate', value: '88%', color: 'bg-brutal-cyan' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.color} border-4 border-brutal-black p-4 shadow-[4px_4px_0px_0px_#000]`}>
                    <p className="text-[8px] font-black uppercase opacity-60">{stat.label}</p>
                    <p className="text-3xl font-black uppercase italic">{stat.value}</p>
                  </div>
                ))}
             </div>

             <section>
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-4xl font-black uppercase italic tracking-tighter">Activity Log</h3>
                   <span className="text-[10px] font-black uppercase bg-brutal-black text-white px-3 py-1">Last 30 Days</span>
                </div>
                
                <div className="space-y-4">
                   {history.map((item) => (
                     <motion.div 
                       whileHover={{ x: 10 }}
                       key={item.id} 
                       className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-4 border-brutal-black bg-white shadow-[8px_8px_0px_0px_#000] hover:shadow-brutal-cyan transition-all group relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 w-2 h-full bg-brutal-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-brutal-black flex items-center justify-center text-white text-4xl shadow-[4px_4px_0px_0px_#000] group-hover:-rotate-6 transition-transform">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-xl font-black uppercase italic tracking-tight">{item.game}</h4>
                              <p className="text-[10px] font-space font-bold uppercase text-brutal-black/40">Ref: {item.id} • {item.date}</p>
                           </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-10 mt-6 sm:mt-0">
                           <div className="text-right">
                              <p className="text-2xl font-black tracking-tighter">{item.amount}</p>
                              <p className="text-[8px] font-black text-brutal-cyan uppercase">Payment Verified</p>
                           </div>
                           <div className="bg-brutal-black text-white px-6 py-2 border-2 border-brutal-black font-space font-black text-xs uppercase italic group-hover:bg-brutal-cyan group-hover:text-black transition-colors">
                              {item.status}
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </section>

             {/* Quick Actions Ultimate */}
             <div className="bg-white border-4 border-brutal-black p-8 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brutal-yellow/10 rounded-full blur-3xl"></div>
                <h4 className="text-2xl font-black uppercase italic mb-6">Need Assistance?</h4>
                <div className="flex flex-wrap gap-4">
                   <BrutalButton variant="magenta" className="px-8 py-3 text-sm">24/7 Support</BrutalButton>
                   <BrutalButton variant="yellow" className="px-8 py-3 text-sm">Join Community</BrutalButton>
                   <BrutalButton variant="cyan" className="px-8 py-3 text-sm">Documentation</BrutalButton>
                </div>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;
