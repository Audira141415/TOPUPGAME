import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';

const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const packages = [
    { id: 1, amount: '86 Diamonds', price: 'Rp 20.000', original: 'Rp 25.000' },
    { id: 2, amount: '172 Diamonds', price: 'Rp 40.000', original: 'Rp 50.000' },
    { id: 3, amount: '257 Diamonds', price: 'Rp 60.000', original: 'Rp 75.000' },
    { id: 4, amount: '344 Diamonds', price: 'Rp 80.000', original: 'Rp 100.000' },
    { id: 5, amount: '429 Diamonds', price: 'Rp 100.000', original: 'Rp 125.000' },
    { id: 6, amount: '514 Diamonds', price: 'Rp 120.000', original: 'Rp 150.000' },
  ];

  const handleOrder = () => {
    if (!userId) {
       alert('Mohon masukkan User ID Anda!');
       return;
    }
    if (selectedPackage === null) {
       alert('Mohon pilih paket Diamonds!');
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

  return (
    <div className="min-h-screen bg-brutal-bg">
      <Navbar />
      
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
                        placeholder="Contoh: 12345678" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="font-space font-black uppercase text-xs">Server ID</label>
                      <input 
                        type="text" 
                        className="brutal-input" 
                        placeholder="Contoh: 1234"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                      />
                   </div>
                </div>
                <p className="text-[10px] font-bold opacity-40 uppercase italic">Klik profil Anda untuk melihat User ID dan Server ID.</p>
             </BrutalCard>

             {/* Step 2: Select Package */}
             <BrutalCard accent="magenta" className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-brutal-black text-brutal-white flex items-center justify-center font-black text-xl">2</div>
                   <h3 className="text-xl font-space font-black uppercase">Pilih Paket</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {packages.map((pkg) => (
                     <button
                       key={pkg.id}
                       onClick={() => setSelectedPackage(pkg.id)}
                       className={`p-4 border-2 border-brutal-black font-space text-left transition-all relative overflow-hidden group ${selectedPackage === pkg.id ? 'bg-brutal-magenta text-white shadow-brutal-black -translate-y-1' : 'bg-brutal-white hover:bg-brutal-magenta/5'}`}
                     >
                        <p className="text-xs font-black uppercase mb-1">{pkg.amount}</p>
                        <p className="text-lg font-black italic">{pkg.price}</p>
                        {selectedPackage === pkg.id && <div className="absolute top-1 right-1 text-[8px] font-black uppercase">Selected</div>}
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
                   {['QRIS', 'BCA Virtual Account', 'Mandiri VA', 'OVO/Dana'].map((method) => (
                     <button
                       key={method}
                       onClick={() => setSelectedPayment(method)}
                       className={`p-4 border-2 border-brutal-black font-space flex justify-between items-center transition-all ${selectedPayment === method ? 'bg-brutal-cyan shadow-brutal-black -translate-y-1' : 'bg-brutal-white hover:bg-brutal-cyan/5'}`}
                     >
                        <span className="font-black uppercase text-xs">{method}</span>
                        <div className={`w-4 h-4 border-2 border-brutal-black rounded-full ${selectedPayment === method ? 'bg-brutal-black' : ''}`}></div>
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
                   <h2 className="text-3xl text-brutal-black font-space font-black uppercase italic">Checkout</h2>
                </div>

                <BrutalCard accent="yellow" className="p-6 space-y-6">
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="font-space font-black uppercase text-xs">WhatsApp Number</label>
                         <input 
                           type="text" 
                           className="brutal-input" 
                           placeholder="08xxxxxxxx"
                           value={whatsapp}
                           onChange={(e) => setWhatsapp(e.target.value)}
                         />
                      </div>
                      
                      <div className="border-t-2 border-brutal-black/10 pt-4 space-y-2">
                         <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="opacity-40">Product:</span>
                            <span>{selectedPackage ? packages.find(p => p.id === selectedPackage)?.amount : '-'}</span>
                         </div>
                         <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="opacity-40">Price:</span>
                            <span>{selectedPackage ? packages.find(p => p.id === selectedPackage)?.price : 'Rp 0'}</span>
                         </div>
                         <div className="flex justify-between text-xl font-space font-black italic mt-4 border-t-2 border-brutal-black pt-4">
                            <span>TOTAL:</span>
                            <span className="text-brutal-magenta">{selectedPackage ? packages.find(p => p.id === selectedPackage)?.price : 'Rp 0'}</span>
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
                   <p className="font-space font-bold uppercase text-xs opacity-60">Pesananmu sedang diproses secara instan. Cek WhatsApp untuk invoice.</p>
                </div>

                <div className="bg-brutal-black/5 p-4 border-2 border-dashed border-brutal-black text-left space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Order ID:</span>
                      <span className="text-brutal-magenta">#AZ-{Math.floor(Math.random() * 1000000)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Game:</span>
                      <span>{slug?.toUpperCase()}</span>
                   </div>
                </div>

                <BrutalButton variant="black" className="w-full py-4" onClick={() => setShowSuccess(false)}>
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
