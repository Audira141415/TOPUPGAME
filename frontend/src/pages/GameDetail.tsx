import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { gameService } from '../services/api';

const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState('');
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

  const handleOrder = () => {
    if (!userId) {
       alert('Mohon masukkan User ID Anda!');
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
    setTimeout(() => {
       setIsProcessing(false);
       setShowSuccess(true);
    }, 2000);
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
      <div className="bg-brutal-black py-12 border-b-4 border-brutal-black relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-64 border-4 border-brutal-white shadow-brutal-cyan overflow-hidden bg-brutal-white">
               <img 
                 src={game.image ? `http://localhost:8000/storage/${game.image}` : '/placeholder.png'} 
                 alt={game.name}
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="text-center md:text-left space-y-4">
               <span className="bg-brutal-yellow text-brutal-black px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-black">
                  Official Partner
               </span>
               <h1 className="text-5xl md:text-7xl font-space font-black text-brutal-white italic uppercase tracking-tighter shadow-brutal-magenta">
                  {game.name}
               </h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="text-brutal-cyan font-space font-bold uppercase italic">⚡ INSTANT DELIVERY</span>
                  <span className="text-brutal-white/40">•</span>
                  <span className="text-brutal-yellow font-space font-bold uppercase italic">🛡️ 100% SECURE</span>
                  <span className="text-brutal-white/40">•</span>
                  <span className="text-brutal-magenta font-space font-bold uppercase italic">⭐ 24/7 SUPPORT</span>
               </div>
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
                <p className="text-[10px] font-bold opacity-40 uppercase italic">Pastikan ID yang Anda masukkan sudah benar untuk menghindari kesalahan pengiriman.</p>
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
                                src={product.image ? `http://localhost:8000/storage/${product.image}` : `http://localhost:8000/storage/products/mlbb_diamond.png`} 
                                alt="Currency"
                                className="w-full h-full object-contain"
                              />
                           </div>
                           {selectedProduct?.id === product.id && <div className="text-[8px] font-black uppercase bg-brutal-black text-brutal-white px-1">Selected</div>}
                        </div>
                        <p className="text-[10px] font-black uppercase leading-tight h-8 line-clamp-2">{product.name}</p>
                        <p className="text-lg font-black italic">Rp {new Intl.NumberFormat('id-ID').format(product.price_basic)}</p>
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
                     { name: 'QRIS', provider: 'Semua E-Wallet' },
                     { name: 'BCA Virtual Account', provider: 'Transfer Bank' },
                     { name: 'Mandiri VA', provider: 'Transfer Bank' },
                     { name: 'ShopeePay', provider: 'E-Wallet' }
                   ].map((method) => (
                     <button
                       key={method.name}
                       onClick={() => setSelectedPayment(method.name)}
                       className={`p-4 border-2 border-brutal-black font-space flex justify-between items-center transition-all ${selectedPayment === method.name ? 'bg-brutal-cyan shadow-[4px_4px_0px_0px_#000] -translate-y-1' : 'bg-brutal-white hover:bg-brutal-cyan/5'}`}
                     >
                        <div className="text-left">
                           <span className="font-black uppercase text-xs block">{method.name}</span>
                           <span className="text-[8px] opacity-40 font-bold uppercase">{method.provider}</span>
                        </div>
                        <div className={`w-4 h-4 border-2 border-brutal-black rounded-full ${selectedPayment === method.name ? 'bg-brutal-black' : ''}`}></div>
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
                      <div className="space-y-2">
                         <label className="font-space font-black uppercase text-xs">No. WhatsApp</label>
                         <input 
                           type="text" 
                           className="brutal-input" 
                           placeholder="08xxxxxxxx"
                           value={whatsapp}
                           onChange={(e) => setWhatsapp(e.target.value)}
                         />
                      </div>
                      
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
                   <p className="font-space font-bold uppercase text-[10px] opacity-60">Pesanan {selectedProduct?.name} sedang diproses. Cek WhatsApp untuk detail pembayaran.</p>
                </div>

                <div className="bg-brutal-black/5 p-4 border-2 border-dashed border-brutal-black text-left space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Order ID:</span>
                      <span className="text-brutal-magenta">#AZ-{Math.floor(Math.random() * 1000000)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Game:</span>
                      <span>{game.name}</span>
                   </div>
                </div>

                <BrutalButton variant="black" className="w-full py-4" onClick={() => navigate('/')}>
                   KEMBALI KE BERANDA
                </BrutalButton>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDetail;
