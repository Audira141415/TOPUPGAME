import React, { useState, useEffect } from 'react';
import { adminService, STORAGE_URL } from '../services/api';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  CheckCircle, 
  Clock, 
  Users,
  ArrowUpRight,
  ChevronRight,
  Settings,
  Shield,
  Gamepad2,
  ListOrdered,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit,
  Save,
  X,
  LayoutDashboard,
  Wallet,
  Tag,
  FileText,
  Bell,
  LogOut,
  Menu,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders' | 'games' | 'finance' | 'settings'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, last: 1 });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      const [overviewRes, chartRes, productsRes] = await Promise.all([
        adminService.getStatsOverview(),
        adminService.getChartData(),
        adminService.getTopProducts()
      ]);

      if (overviewRes.success) setStats(overviewRes.data);
      if (chartRes.success) setChartData(chartRes.data);
      if (productsRes.success) setTopProducts(productsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminService.getUsers(page);
      setUsers(res.data);
      setPagination({ current: res.current_page, last: res.last_page });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminService.getOrders(page);
      setOrders(res.data);
      setPagination({ current: res.current_page, last: res.last_page });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId: number, role: string) => {
    try {
      await adminService.updateUser(userId, { role });
      fetchUsers(pagination.current);
    } catch (error) {
      alert('Failed to update user role');
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      await adminService.updateOrderStatus(orderId, status);
      fetchOrders(pagination.current);
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await adminService.deleteUser(userId);
      fetchUsers(pagination.current);
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const SidebarLink = ({ id, icon: Icon, label }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        activeTab === id 
        ? 'bg-brutal-magenta/20 text-brutal-magenta border border-brutal-magenta/30 shadow-[0_0_15px_rgba(255,0,255,0.1)]' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${activeTab === id ? 'animate-pulse' : ''}`} />
      <span className={`font-space font-bold uppercase text-xs tracking-wider ${!sidebarOpen && 'hidden'}`}>{label}</span>
      {activeTab === id && sidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brutal-magenta shadow-[0_0_8px_#FF00FF]" />}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, gradient, percentage, isUp }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10 rounded-full bg-gradient-to-br ${gradient} blur-2xl group-hover:opacity-20 transition-opacity`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
          {percentage}%
        </div>
      </div>
      <h3 className="text-gray-400 font-space font-bold uppercase text-[10px] tracking-[0.2em]">{title}</h3>
      <div className="text-3xl font-space font-black mt-1 text-white tracking-tighter">{value}</div>
      <div className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest">vs last month</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-[#0D1117] border-r border-white/5 p-6 flex flex-col sticky top-0 h-screen z-50 overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-brutal-magenta rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)]">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div className="font-space font-black text-xl leading-none">
              ZENITH<span className="text-brutal-magenta">.</span>CORE
            </div>
          )}
        </div>

        <nav className="flex-grow space-y-2">
          <SidebarLink id="overview" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink id="orders" icon={ListOrdered} label="Transaksi" />
          <SidebarLink id="games" icon={Gamepad2} label="Katalog Game" />
          <SidebarLink id="users" icon={Users} label="Manajemen User" />
          <SidebarLink id="finance" icon={Wallet} label="Keuangan" />
          <SidebarLink id="settings" icon={Settings} label="Pengaturan" />
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
          {sidebarOpen && (
            <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-brutal-yellow overflow-hidden border-2 border-white/10">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-white truncate w-24">Super Admin</div>
                <div className="text-[8px] font-bold text-brutal-magenta uppercase">Online</div>
              </div>
              <button className="ml-auto p-2 text-gray-500 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0A0C10]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-space font-black uppercase italic tracking-wider">
                {activeTab === 'overview' ? 'Command Dashboard' : activeTab.toUpperCase()}
              </h1>
              <div className="text-[10px] font-bold text-gray-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brutal-cyan transition-colors" />
              <input 
                type="text" 
                placeholder="Search command..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs font-bold focus:outline-none focus:border-brutal-cyan/50 focus:ring-4 focus:ring-brutal-cyan/5 transition-all w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brutal-magenta rounded-full border-2 border-[#0A0C10]" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Activity className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stat Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Total Revenue" 
                    value={stats?.revenue_formatted || 'Rp 0'} 
                    icon={DollarSign} 
                    gradient="from-blue-600 to-cyan-400"
                    percentage="18.6"
                    isUp={true}
                  />
                  <StatCard 
                    title="Total Profit" 
                    value={stats?.profit_formatted || 'Rp 0'} 
                    icon={Activity} 
                    gradient="from-purple-600 to-magenta-400"
                    percentage="21.3"
                    isUp={true}
                  />
                  <StatCard 
                    title="Total Users" 
                    value={stats?.total_users || '0'} 
                    icon={Users} 
                    gradient="from-green-600 to-emerald-400"
                    percentage="15.7"
                    isUp={true}
                  />
                  <StatCard 
                    title="Orders Success" 
                    value={stats?.success_orders || '0'} 
                    icon={CheckCircle} 
                    gradient="from-orange-600 to-yellow-400"
                    percentage="8.3"
                    isUp={false}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Chart */}
                  <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-xl font-space font-black uppercase italic">Analisis Transaksi</h2>
                        <p className="text-xs font-bold text-gray-500">Volume transaksi 7 hari terakhir</p>
                      </div>
                      <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none">
                        <option>7 Hari Terakhir</option>
                        <option>30 Hari Terakhir</option>
                      </select>
                    </div>
                    <div className="h-[300px] flex items-end gap-3 px-4 border-b border-white/10 relative">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between opacity-5">
                        {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-white w-full" />)}
                      </div>
                      
                      {chartData.map((day, idx) => {
                        const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
                        const height = (day.revenue / maxRevenue) * 90;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              className="w-full bg-gradient-to-t from-brutal-cyan/20 to-brutal-cyan rounded-t-xl relative"
                            >
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brutal-cyan text-black text-[10px] font-black py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_15px_#00FFFF]">
                                Rp {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(day.revenue)}
                              </div>
                            </motion.div>
                            <div className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">
                              {new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short' })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top Selling Games */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                    <h2 className="text-xl font-space font-black uppercase italic mb-8">Top Up Terlaris</h2>
                    <div className="space-y-6">
                      {topProducts.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1 group-hover:border-brutal-cyan/50 transition-colors">
                            <img 
                              src={item.game?.image ? `${STORAGE_URL}/${item.game.image}` : 'https://via.placeholder.com/50'} 
                              alt="Game" 
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black uppercase truncate w-32">{item.game?.name || 'Unknown'}</span>
                              <span className="text-[10px] font-black text-brutal-cyan italic">{item.total_orders} TRX</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.total_orders / (topProducts[0]?.total_orders || 1)) * 100}%` }}
                                className="h-full bg-gradient-to-r from-brutal-cyan to-brutal-magenta"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-10 py-3 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                      Lihat Semua Laporan
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {/* Recent Transactions */}
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
                      <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-sm font-space font-black uppercase tracking-widest">Transaksi Terbaru</h3>
                        <button className="text-[10px] font-black uppercase text-brutal-cyan underline">View All</button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                              <th className="px-6 py-4">ID TRX</th>
                              <th className="px-6 py-4">Produk</th>
                              <th className="px-6 py-4">Status</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs font-bold">
                            {orders.slice(0, 5).map((order) => (
                              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-brutal-cyan">#{order.order_id}</td>
                                <td className="px-6 py-4 uppercase italic">{order.game?.name}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                                    order.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>

                   {/* System Notifications */}
                   <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                      <h3 className="text-sm font-space font-black uppercase tracking-widest mb-6">System Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { type: 'success', msg: 'Top up #TRX-265487 berhasil', time: '2 menit yang lalu' },
                          { type: 'pending', msg: 'Order #TRX-265485 pending (Pengecekan Manual)', time: '5 menit yang lalu' },
                          { type: 'info', msg: 'Deposit saldo berhasil: Admin +Rp 5.000.000', time: '15 menit yang lalu' }
                        ].map((notif, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              notif.type === 'success' ? 'bg-green-500/20 text-green-400' : 
                              notif.type === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {notif.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white mb-1">{notif.msg}</div>
                              <div className="text-[10px] font-bold text-gray-500">{notif.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex flex-wrap justify-between items-center bg-gradient-to-r from-brutal-cyan/10 to-transparent">
                  <h2 className="text-3xl font-space font-black uppercase italic">User Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                        <th className="px-8 py-6">User Details</th>
                        <th className="px-8 py-6">Role</th>
                        <th className="px-8 py-6">Joined</th>
                        <th className="px-8 py-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-space font-black uppercase text-brutal-cyan">{user.name}</div>
                            <div className="text-xs font-bold text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <select 
                              value={user.role}
                              onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-black uppercase focus:outline-none"
                            >
                              <option value="user">USER</option>
                              <option value="gold">GOLD</option>
                              <option value="platinum">PLATINUM</option>
                              <option value="admin">ADMIN</option>
                            </select>
                          </td>
                          <td className="px-8 py-6 text-xs font-bold text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center gap-3">
                              <button className="p-2 bg-white/5 hover:bg-brutal-cyan/20 text-gray-400 hover:text-brutal-cyan rounded-xl transition-all">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 bg-white/5 hover:bg-brutal-magenta/20 text-gray-400 hover:text-brutal-magenta rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Other tabs follow the same glassmorphism pattern */}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
