import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders' | 'games'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, last: 1 });

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

  if (loading && activeTab === 'overview') {
    return (
      <div className="min-h-screen bg-[#F0F0F0] pt-24 flex items-center justify-center">
        <div className="text-2xl font-black italic animate-pulse">LOADING ZENITH CORE...</div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color, subValue }: any) => (
    <motion.div 
      whileHover={{ x: 4, y: -4 }}
      className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full ${color}`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 border-2 border-black ${color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
          <Icon className="w-6 h-6 text-black" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-gray-400" />
      </div>
      <h3 className="text-gray-500 font-bold uppercase text-xs tracking-widest">{title}</h3>
      <div className="text-3xl font-black mt-1">{value}</div>
      {subValue && <div className="text-sm font-bold text-gray-400 mt-2">{subValue}</div>}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F0F0F0] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Sidebar/Top */}
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { id: 'overview', icon: TrendingUp, label: 'Analytics' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'orders', icon: ListOrdered, label: 'Orders' },
            { id: 'games', icon: Gamepad2, label: 'Games' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 border-4 border-black font-black uppercase italic flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                ? 'bg-[#FF3B30] text-white translate-x-[4px] translate-y-[4px] shadow-none' 
                : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl font-black uppercase italic leading-none mb-4 text-black">
                  COMMAND <span className="text-[#FF3B30] underline decoration-8 underline-offset-8">CENTER</span>
                </h1>
                <p className="text-xl font-bold text-gray-600">Zenith Portal • Financial & Operational Intelligence</p>
              </div>

              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                  title="Total Revenue" 
                  value={stats?.revenue_formatted} 
                  icon={DollarSign} 
                  color="bg-[#FFEB3B]"
                  subValue="+12.5% from last month"
                />
                <StatCard 
                  title="Total Profit" 
                  value={stats?.profit_formatted} 
                  icon={TrendingUp} 
                  color="bg-[#4CAF50]"
                  subValue="Margin: 8.4%"
                />
                <StatCard 
                  title="Orders Success" 
                  value={stats?.success_orders} 
                  icon={CheckCircle} 
                  color="bg-[#2196F3]"
                  subValue={`${stats?.total_orders} Total Orders`}
                />
                <StatCard 
                  title="Active Users" 
                  value={stats?.total_users} 
                  icon={Users} 
                  color="bg-[#E91E63]"
                  subValue="Across platform"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-2xl font-black uppercase italic mb-8">Financial Performance</h2>
                  <div className="h-64 flex items-end gap-2 px-4 border-b-4 border-black">
                    {chartData.map((day, idx) => {
                      const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
                      const height = (day.revenue / maxRevenue) * 100;
                      return (
                        <motion.div 
                          key={idx}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          className="flex-1 bg-[#FFEB3B] border-t-2 border-x-2 border-black relative group"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            Rp {new Intl.NumberFormat('id-ID').format(day.revenue)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-4">
                    {chartData.map((day, idx) => (
                      <div key={idx} className="text-[10px] font-black text-gray-500 uppercase">{new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short' })}</div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-2xl font-black uppercase italic mb-8">Leaderboard</h2>
                  <div className="space-y-6">
                    {topProducts.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center font-black italic">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-black uppercase text-sm truncate w-24">{item.game?.name || 'Unknown'}</div>
                            <div className="text-[10px] font-bold text-gray-500">{item.total_orders} Orders</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-sm text-[#FF3B30]">Rp {new Intl.NumberFormat('id-ID').format(item.total_revenue)}</div>
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
              className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-8 border-b-4 border-black flex flex-wrap justify-between items-center bg-[#FFEB3B]">
                <h2 className="text-3xl font-black uppercase italic">User Registry</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="pl-10 pr-4 py-2 border-2 border-black bg-white font-bold text-sm focus:outline-none"
                    />
                  </div>
                  <button className="p-2 border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black text-white uppercase text-xs font-black">
                      <th className="p-4 border-r border-gray-800">ID</th>
                      <th className="p-4 border-r border-gray-800">User Details</th>
                      <th className="p-4 border-r border-gray-800">Role/Status</th>
                      <th className="p-4 border-r border-gray-800">Joined Date</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-black text-sm">#{user.id}</td>
                        <td className="p-4">
                          <div className="font-black text-sm uppercase">{user.name}</div>
                          <div className="text-xs font-bold text-gray-500">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <select 
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                            className={`px-3 py-1 border-2 border-black font-bold text-[10px] uppercase cursor-pointer ${
                              user.role === 'admin' ? 'bg-[#FF3B30] text-white' : 'bg-white text-black'
                            }`}
                          >
                            <option value="user">USER</option>
                            <option value="gold">GOLD</option>
                            <option value="platinum">PLATINUM</option>
                            <option value="admin">ADMIN</option>
                          </select>
                        </td>
                        <td className="p-4 text-xs font-bold text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 border-2 border-black bg-[#2196F3] text-white hover:bg-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 border-2 border-black bg-[#FF3B30] text-white hover:bg-red-600"
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
              <div className="p-6 bg-gray-50 flex justify-between items-center border-t-4 border-black">
                <span className="text-sm font-black uppercase">Page {pagination.current} of {pagination.last}</span>
                <div className="flex gap-2">
                  <button 
                    disabled={pagination.current === 1}
                    onClick={() => fetchUsers(pagination.current - 1)}
                    className="px-4 py-2 border-2 border-black bg-white font-bold text-xs uppercase disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button 
                    disabled={pagination.current === pagination.last}
                    onClick={() => fetchUsers(pagination.current + 1)}
                    className="px-4 py-2 border-2 border-black bg-white font-bold text-xs uppercase disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-8 border-b-4 border-black flex flex-wrap justify-between items-center bg-[#2196F3]">
                <h2 className="text-3xl font-black uppercase italic text-white">Order Control</h2>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border-2 border-black bg-white font-black text-xs uppercase">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Success</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black text-white uppercase text-xs font-black">
                      <th className="p-4 border-r border-gray-800">Order ID</th>
                      <th className="p-4 border-r border-gray-800">Game / Product</th>
                      <th className="p-4 border-r border-gray-800">Target ID</th>
                      <th className="p-4 border-r border-gray-800">Total</th>
                      <th className="p-4 border-r border-gray-800">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-black text-xs">#{order.order_id}</td>
                        <td className="p-4">
                          <div className="font-black text-sm uppercase italic">{order.game?.name}</div>
                          <div className="text-[10px] font-bold text-gray-500">{order.product?.name}</div>
                        </td>
                        <td className="p-4 font-bold text-xs">{order.target_id}</td>
                        <td className="p-4">
                          <div className="font-black text-sm">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</div>
                          <div className="text-[10px] font-bold text-green-600">Profit: Rp {new Intl.NumberFormat('id-ID').format(order.profit)}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 border-2 border-black font-black text-[10px] uppercase ${
                            order.status === 'success' ? 'bg-[#4CAF50]' : 
                            order.status === 'pending' ? 'bg-[#FFEB3B]' :
                            order.status === 'processing' ? 'bg-[#2196F3] text-white' : 'bg-[#FF3B30] text-white'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <select 
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="px-2 py-1 border-2 border-black bg-white font-bold text-[10px] uppercase cursor-pointer"
                              defaultValue=""
                            >
                              <option value="" disabled>Update Status</option>
                              <option value="pending">PENDING</option>
                              <option value="processing">PROCESSING</option>
                              <option value="success">SUCCESS</option>
                              <option value="failed">FAILED</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-gray-50 flex justify-between items-center border-t-4 border-black">
                <span className="text-sm font-black uppercase">Page {pagination.current} of {pagination.last}</span>
                <div className="flex gap-2">
                  <button 
                    disabled={pagination.current === 1}
                    onClick={() => fetchOrders(pagination.current - 1)}
                    className="px-4 py-2 border-2 border-black bg-white font-bold text-xs uppercase disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button 
                    disabled={pagination.current === pagination.last}
                    onClick={() => fetchOrders(pagination.current + 1)}
                    className="px-4 py-2 border-2 border-black bg-white font-bold text-xs uppercase disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-8 border-b-4 border-black flex flex-wrap justify-between items-center bg-[#FFEB3B]">
                  <h2 className="text-3xl font-black uppercase italic">Game Master List</h2>
                  <button className="px-6 py-2 border-4 border-black bg-black text-white font-black uppercase italic hover:bg-white hover:text-black transition-all">
                    ADD NEW GAME
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse">
                  {topProducts.map((game) => (
                    <div key={game.id} className="p-6 border-2 border-black hover:bg-gray-50 transition-colors flex flex-col justify-between">
                      <div>
                        <div className="text-2xl font-black uppercase italic mb-2 truncate">{game.game?.name || 'New Game'}</div>
                        <div className="text-sm font-bold text-gray-500 mb-4">{game.total_orders || 0} Successful Orders</div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            // Logic to open product management for this game
                            adminService.getProducts(game.game_id).then(res => {
                              alert(`Loaded ${res.length} products for ${game.game?.name}`);
                            });
                          }}
                          className="flex-1 py-2 border-2 border-black bg-[#2196F3] text-white font-black uppercase text-xs italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                          MANAGE PRODUCTS
                        </button>
                        <button className="p-2 border-2 border-black bg-white hover:bg-gray-100">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
