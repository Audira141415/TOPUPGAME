import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { api, gameService, STORAGE_URL } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      if (!slug) return;
      try {
        const data = await gameService.getGameBySlug(slug);
        setGame(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game:', error);
        setLoading(false);
      }
    };
    fetchGame();
  }, [slug]);

  const [lastOrder, setLastOrder] = useState<any>(null);

  const handleOrder = async () => {
    if (!userId) {
       alert('Mohon masukkan User ID Anda!');
       return;
    }
    if (!whatsapp || whatsapp.length < 9) {
       alert('Mohon masukkan nomor WhatsApp yang valid!');
       return;
    }
    if (!selectedProduct) {
       alert('Mohon pilih item top up!');
       return;
    }
    if (!selectedPayment) {
       alert('Mohon pilih metode pembayaran!');
       return;
    }
    
    setIsProcessing(true);
    try {
        const orderPayload = {
            game_id: game.id,
            product_id: selectedProduct.id,
            user_id_game: userId,
            server_id_game: serverId,
            payment_method_id: selectedPayment,
            whatsapp_number: whatsapp,
            referral_code: referralCode
        };

        const response = await api.post('/checkout', orderPayload);
        if (response.data.success) {
            setLastOrder(response.data.data);
            setShowSuccess(true);
        }
    } catch (error: any) {
        alert(error.response?.data?.message || 'Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
        setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center">
        <div className="text-4xl font-space font-black animate-pulse">LOADING GAME...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center flex-col gap-6">
        <div className="text-4xl font-space font-black">GAME NOT FOUND!</div>
        <BrutalButton variant="black" onClick={() => navigate('/')}>BACK TO HOME</BrutalButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-bg">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-brutal-black py-12 border-b-8 border-brutal-black relative overflow-hidden min-h-[400px] flex items-center group">
         {/* Banner Background */}
         {game.banner ? (
           <div className="absolute inset-0 z-0 transition-transform duration-[5000ms] group-hover:scale-110">
              <img 
                src={`${STORAGE_URL}/${game.banner}`} 
                alt="Banner" 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brutal-black via-brutal-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-brutal-black/80 to-transparent"></div>
           </div>
         ) : (
           <div className="absolute inset-0 z-0 bg-brutal-black overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-brutal-magenta/20 via-brutal-black to-brutal-cyan/20 animate-gradient-shift"></div>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-slide"></div>
              <h2 className="text-[15vw] font-black opacity-5 italic -rotate-12 select-none uppercase leading-none">AUDIRA ZENITH</h2>
           </div>
         )}

         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12 w-full">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-48 h-64 border-4 border-brutal-white shadow-[8px_8px_0px_0px_#00FFFF] overflow-hidden bg-brutal-white shrink-0 group-hover:-rotate-3 transition-transform"
            >
               <img 
                 src={game.image ? `${STORAGE_URL}/${game.image}` : '/placeholder.png'} 
                 alt={game.name}
                 className="w-full h-full object-cover"
               />
            </motion.div>
            <div className="text-center md:text-left space-y-6 flex-grow">
               <motion.span 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="bg-brutal-yellow text-brutal-black px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000]"
               >
                  Official Partner
               </motion.span>
               <motion.h1 
                 initial={{ y: 30, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-8xl font-space font-black text-brutal-white italic uppercase tracking-tighter drop-shadow-[8px_8px_0px_#000] leading-none"
               >
                  {game.name}
               </motion.h1>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="flex flex-wrap justify-center md:justify-start gap-4"
               >
                  <span className="bg-brutal-cyan text-brutal-black px-3 py-1 font-space font-bold uppercase italic text-xs border-2 border-brutal-black">⚡ INSTANT DELIVERY</span>
                  <span className="bg-brutal-magenta text-brutal-white px-3 py-1 font-space font-bold uppercase italic text-xs border-2 border-brutal-black">🛡️ 100% SECURE</span>
                  <span className="bg-brutal-yellow text-brutal-black px-3 py-1 font-space font-bold uppercase italic text-xs border-2 border-brutal-black">⭐ 24/7 SUPPORT</span>
               </motion.div>
            </div>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-12">
             
             {/* Step 1: Account Info */}
             <BrutalCard accent="cyan" className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-brutal-black text-brutal-white flex items-center justify-center font-black text-xl">1</div>
                   <h3 className="text-xl font-space font-black uppercase">Data Akun</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="font-space font-black uppercase text-xs">User ID</label>
                      <input 
                        type="text" 
                        className="brutal-input" 
                        placeholder="Masukkan ID Akun" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="font-space font-black uppercase text-xs">Server ID / Zone ID</label>
                      <input 
                        type="text" 
                        className="brutal-input" 
                        placeholder="Masukkan Server"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                      />
                   </div>
                </div>

                {/* WhatsApp Input with +62 Prefix */}
                <div className="space-y-2">
                   <label className="font-space font-black uppercase text-xs">Nomor WhatsApp</label>
                   <div className="flex">
                      <div className="bg-brutal-black text-brutal-white px-4 flex items-center justify-center font-black border-2 border-brutal-black border-r-0">
                         +62
                      </div>
                      <input 
                        type="text" 
                        className="brutal-input border-l-0" 
                        placeholder="812xxxxxx"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ''))} // Hanya angka
                      />
                   </div>
                </div>

                {/* Affiliate Code Input */}
                <div className="space-y-2 pt-4 border-t-2 border-brutal-black/10">
                   <label className="font-space font-black uppercase text-xs flex justify-between">
                      Kode Referral (Opsional)
                      <span className="text-brutal-magenta italic">Dapatkan Diskon!</span>
                   </label>
                   <input 
                     type="text" 
                     className="brutal-input bg-brutal-black/5" 
                     placeholder="Masukkan Kode Referral"
                     value={referralCode}
                     onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                   />
                </div>
             </BrutalCard>

             {/* Step 2: Select Package */}
             <BrutalCard accent="magenta" className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-brutal-black text-brutal-white flex items-center justify-center font-black text-xl">2</div>
                   <h3 className="text-xl font-space font-black uppercase">Pilih Item</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {game.products && game.products.map((product: any) => (
                     <button
                       key={product.id}
                       onClick={() => setSelectedProduct(product)}
                       className={`p-4 border-2 border-brutal-black font-space text-left transition-all relative overflow-hidden group ${selectedProduct?.id === product.id ? 'bg-brutal-magenta text-white shadow-[4px_4px_0px_0px_#000] -translate-y-1' : 'bg-brutal-white hover:bg-brutal-magenta/5'}`}
                     >
                        <div className="flex justify-between items-start mb-3">
                           <div className="w-10 h-10 bg-brutal-black/5 p-1 border border-brutal-black/10 group-hover:rotate-12 transition-transform">
                              <img 
                                src={product.image ? `${STORAGE_URL}/${product.image}` : `${STORAGE_URL}/products/mlbb_diamond.png`} 
                                alt="Currency"
                                className="w-full h-full object-contain"
                              />
                           </div>
                           {selectedProduct?.id === product.id && <div className="text-[8px] font-black uppercase bg-brutal-black text-brutal-white px-1">Selected</div>}
                        </div>
                        <p className="text-[10px] font-black uppercase leading-tight h-8 line-clamp-2">{product.name}</p>
                        <div className="flex flex-col">
                           {user?.is_prime && (
                              <span className="text-[10px] font-black text-brutal-magenta uppercase line-through opacity-40">Rp {new Intl.NumberFormat('id-ID').format(product.price_basic)}</span>
                           )}
                           <p className="text-lg font-black italic">
                              Rp {new Intl.NumberFormat('id-ID').format(user?.is_prime ? product.price_basic * 0.98 : product.price_basic)}
                           </p>
                           {user?.is_prime && (
                              <span className="bg-brutal-cyan text-brutal-black text-[8px] px-1 font-black uppercase w-fit">VIP PRICE</span>
                           )}
                        </div>
                     </button>
                   ))}
                </div>
             </BrutalCard>

             {/* Step 3: Payment Method */}
             <BrutalCard accent="white" className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-brutal-black text-brutal-white flex items-center justify-center font-black text-xl">3</div>
                   <h3 className="text-xl font-space font-black uppercase">Metode Pembayaran</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 1, name: 'QRIS', provider: 'Semua E-Wallet' },
                    { id: 2, name: 'BCA Transfer', provider: 'Transfer Bank' },
                    { id: 3, name: 'Mandiri Transfer', provider: 'Transfer Bank' },
                    { id: 4, name: 'Dana', provider: 'E-Wallet' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id.toString())}
                      className={`p-4 border-2 border-brutal-black font-space flex justify-between items-center transition-all ${selectedPayment === method.id.toString() ? 'bg-brutal-cyan shadow-[4px_4px_0px_0px_#000] -translate-y-1' : 'bg-brutal-white hover:bg-brutal-cyan/5'}`}
                    >
                       <div className="text-left">
                          <span className="font-black uppercase text-xs block">{method.name}</span>
                          <span className="text-[8px] opacity-40 font-bold uppercase">{method.provider}</span>
                       </div>
                       <div className={`w-4 h-4 border-2 border-brutal-black rounded-full ${selectedPayment === method.id.toString() ? 'bg-brutal-black' : ''}`}></div>
                    </button>
                  ))}
                </div>
             </BrutalCard>
          </div>

          {/* Right Column: Checkout Summary */}
          <div className="space-y-8">
             <section className="sticky top-28">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-brutal-black text-brutal-white font-space font-black text-2xl flex items-center justify-center border-2 border-brutal-black shadow-brutal-cyan">4</div>
                   <h2 className="text-3xl text-brutal-black font-space font-black uppercase italic">Konfirmasi</h2>
                </div>

                <BrutalCard accent="yellow" className="p-6 space-y-6">
                   <div className="space-y-4">
                      <div className="border-t-2 border-brutal-black/10 pt-4 space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="opacity-40">Item:</span>
                            <span className="text-right">{selectedProduct ? selectedProduct.name : '-'}</span>
                         </div>
                         <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="opacity-40">Payment:</span>
                            <span>{selectedPayment || '-'}</span>
                         </div>
                         <div className="flex justify-between text-2xl font-space font-black italic mt-4 border-t-2 border-brutal-black pt-4">
                            <span>TOTAL:</span>
                            <span className="text-brutal-magenta">
                               {selectedProduct ? `Rp ${new Intl.NumberFormat('id-ID').format(selectedProduct.price_basic)}` : 'Rp 0'}
                            </span>
                         </div>
                      </div>
                   </div>

                   <BrutalButton 
                     variant="yellow" 
                     className="w-full py-6 text-2xl shadow-brutal-black hover:scale-105 transition-transform"
                     onClick={handleOrder}
                     disabled={isProcessing}
                   >
                      {isProcessing ? 'PROCESSING...' : 'ORDER NOW'}
                   </BrutalButton>
                </BrutalCard>
             </section>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brutal-black/80 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.5, rotate: -10 }}
               animate={{ scale: 1, rotate: 0 }}
               exit={{ scale: 0.5, opacity: 0 }}
               className="bg-brutal-white border-8 border-brutal-black p-8 md:p-12 max-w-lg w-full text-center space-y-8 shadow-brutal-magenta relative overflow-hidden"
             >
                <div className="w-24 h-24 bg-green-500 border-4 border-brutal-black rounded-full mx-auto flex items-center justify-center text-brutal-white text-5xl shadow-brutal-black">
                   ✓
                </div>
                
                <div className="space-y-2">
                   <h2 className="text-4xl font-space font-black uppercase italic">ORDER SUCCESS!</h2>
                   <p className="font-space font-bold uppercase text-[10px] opacity-60">Pesanan {selectedProduct?.name} sedang diproses. Silakan selesaikan pembayaran.</p>
                </div>

                <div className="bg-brutal-black/5 p-4 border-2 border-dashed border-brutal-black text-left space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Order ID:</span>
                      <span className="text-brutal-magenta font-black">{lastOrder?.order_id}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Total Bayar:</span>
                      <span className="text-brutal-black">Rp {lastOrder?.total_amount.toLocaleString()}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <BrutalButton variant="white" className="py-4 text-xs" onClick={() => navigate(`/track?id=${lastOrder?.order_id}`)}>
                      LACAK PESANAN
                   </BrutalButton>
                   <BrutalButton variant="black" className="py-4 text-xs" onClick={() => navigate('/')}>
                      BERANDA
                   </BrutalButton>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDetail;
