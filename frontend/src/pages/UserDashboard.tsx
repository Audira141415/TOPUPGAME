import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gameService } from '../services/api';

const UserDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
        if (!isAuthenticated) return;
        try {
            const data = await gameService.getUserOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'success': return 'bg-green-400';
        case 'pending': return 'bg-brutal-yellow';
        case 'processing': return 'bg-brutal-cyan';
        case 'failed': return 'bg-brutal-magenta';
        default: return 'bg-brutal-black';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brutal-cyan/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brutal-magenta/5 blur-[120px] rounded-full -z-10"></div>
      
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Sidebar: Profile */}
          <div className="lg:w-1/3 space-y-6">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brutal-cyan via-brutal-magenta to-brutal-yellow blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <BrutalCard accent="cyan" className="relative p-8 text-center bg-white/80 dark:bg-brutal-black/80 backdrop-blur-xl border-4">
                   <div className="relative inline-block mb-6">
                      <div className="w-28 h-28 bg-gradient-to-br from-brutal-magenta to-brutal-cyan border-4 border-brutal-black mx-auto flex items-center justify-center font-space font-black text-5xl text-white shadow-[8px_8px_0px_0px_#000] rotate-3">
                        {user?.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-brutal-yellow border-2 border-brutal-black px-3 py-1 font-space font-black text-sm shadow-[4px_4px_0px_0px_#000] animate-bounce">
                         LV.{Math.floor((orders.length * 2) + 1)}
                      </div>
                   </div>
                   
                   <div className="mb-6">
                     <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-1">{user?.name}</h2>
                     <p className="text-xs font-space font-bold uppercase text-brutal-black/40 tracking-widest">{user?.email}</p>
                   </div>

                   <div className="pt-6 border-t-4 border-brutal-black/5">
                      <p className="text-[10px] font-space font-black text-brutal-black/30 uppercase mb-2">Total Saldo</p>
                      <p className="text-5xl font-space font-black text-brutal-black tracking-tighter">
                        <span className="text-sm align-top mr-1">RP</span>
                        {user?.balance ? Number(user.balance).toLocaleString('id-ID') : 0}
                      </p>
                   </div>
                   
                   <div className="mt-8">
                      <BrutalButton variant="cyan" className="w-full py-4 text-xl">
                         TOP UP SALDO
                      </BrutalButton>
                   </div>
                </BrutalCard>
             </div>

             <BrutalCard accent="magenta" className="p-6 bg-brutal-black text-white">
                <h4 className="text-2xl font-space font-black uppercase italic mb-2">Elite Rank</h4>
                <p className="text-[10px] font-bold uppercase opacity-60 mb-6">Anda berada di urutan top 5% sultan bulan ini.</p>
                <div className="bg-white/10 p-4 border-2 border-dashed border-white/20">
                    <p className="font-space font-black text-brutal-cyan text-lg">PRO GAMER</p>
                </div>
             </BrutalCard>
          </div>

          {/* Main Content: Activity Log */}
          <div className="lg:w-2/3 space-y-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Pesanan', value: orders.length, color: 'bg-brutal-yellow' },
                  { label: 'Poin Loyalitas', value: orders.length * 10, color: 'bg-brutal-magenta' },
                  { label: 'Voucher Aktif', value: '3', color: 'bg-brutal-cyan' },
                  { label: 'Level Akun', value: Math.floor((orders.length / 5) + 1), color: 'bg-brutal-black text-white' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.color} border-4 border-brutal-black p-4 shadow-[4px_4px_0px_0px_#000]`}>
                    <p className={`text-[8px] font-black uppercase ${stat.color.includes('black') ? 'opacity-40' : 'opacity-60 text-brutal-black'}`}>{stat.label}</p>
                    <p className="text-3xl font-black uppercase italic">{stat.value}</p>
                  </div>
                ))}
             </div>

             <section>
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-4xl font-black uppercase italic tracking-tighter">Activity Log</h3>
                   <span className="text-[10px] font-black uppercase bg-brutal-black text-white px-3 py-1">Real-time Data</span>
                </div>
                
                <div className="space-y-4">
                   {loading ? (
                     <div className="text-center py-12 font-space font-black uppercase animate-pulse">Menghubungkan ke database...</div>
                   ) : orders.length > 0 ? (
                     orders.map((order) => (
                      <motion.div 
                        whileHover={{ x: 10 }}
                        key={order.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-4 border-brutal-black bg-white shadow-[8px_8px_0px_0px_#000] group relative overflow-hidden"
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-brutal-black flex items-center justify-center text-white text-4xl shadow-[4px_4px_0px_0px_#000] group-hover:-rotate-6 transition-transform">
                               {order.game?.slug.includes('mobile-legends') ? '⚔️' : order.game?.slug.includes('free-fire') ? '🔥' : '💎'}
                            </div>
                            <div>
                               <h4 className="text-xl font-black uppercase italic tracking-tight">{order.game?.name || 'Top Up'}</h4>
                               <p className="text-[10px] font-space font-bold uppercase text-brutal-black/40">Ref: {order.order_id} • {new Date(order.created_at).toLocaleDateString()}</p>
                               <p className="text-[10px] font-black text-brutal-magenta uppercase">{order.product?.name}</p>
                            </div>
                         </div>
                         <div className="flex items-center justify-between sm:justify-end gap-10 mt-6 sm:mt-0">
                            <div className="text-right">
                               <p className="text-2xl font-black tracking-tighter">Rp {Number(order.total_amount).toLocaleString('id-ID')}</p>
                               <p className="text-[8px] font-black text-brutal-cyan uppercase">Verified Transaction</p>
                            </div>
                            <div className={`px-6 py-2 border-2 border-brutal-black font-space font-black text-xs uppercase italic ${getStatusColor(order.status)}`}>
                               {order.status}
                            </div>
                         </div>
                      </motion.div>
                     ))
                   ) : (
                     <div className="text-center py-20 bg-white border-4 border-dashed border-brutal-black/20">
                        <p className="text-xl font-space font-black uppercase opacity-40">Belum ada riwayat pesanan.</p>
                        <BrutalButton variant="black" className="mt-4" onClick={() => window.location.href='/store'}>Mulai Belanja Sekarang</BrutalButton>
                     </div>
                   )}
                </div>
             </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;
