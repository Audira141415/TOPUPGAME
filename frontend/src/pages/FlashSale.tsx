import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 Hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  const saleItems = [
    { id: 1, name: '86 Diamonds MLBB', price: 'Rp 18.500', old: 'Rp 25.000', stock: 85, accent: 'cyan', discount: '30%' },
    { id: 2, name: '355 Diamonds Free Fire', price: 'Rp 42.000', old: 'Rp 60.000', stock: 42, accent: 'yellow', discount: '30%' },
    { id: 3, name: '60 UC PUBG Mobile', price: 'Rp 12.000', old: 'Rp 18.000', stock: 92, accent: 'white', discount: '33%' },
    { id: 4, name: 'Weekly Diamond Pass', price: 'Rp 26.500', old: 'Rp 32.000', stock: 75, accent: 'magenta', discount: '17%' },
    { id: 5, name: '1000 Steam Wallet', price: 'Rp 135.000', old: 'Rp 150.000', stock: 60, accent: 'cyan', discount: '10%' },
    { id: 6, name: 'Valo Points 625', price: 'Rp 58.000', old: 'Rp 75.000', stock: 95, accent: 'yellow', discount: '22%' },
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Flash Sale Hero */}
        <section className="bg-brutal-black py-20 px-4 border-b-4 border-brutal-black relative overflow-hidden">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
           
           <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="space-y-2">
                 <h1 className="text-6xl md:text-9xl font-space font-black text-brutal-cyan italic uppercase leading-none shadow-brutal-white inline-block">FLASH SALE</h1>
                 <p className="text-brutal-white font-space font-bold uppercase tracking-[0.5em] block">Unlimited Deals - Limited Time</p>
              </div>

              <div className="flex gap-6">
                 {[
                   { label: 'HOURS', val: h },
                   { label: 'MINUTES', val: m },
                   { label: 'SECONDS', val: s },
                 ].map((t, i) => (
                   <div key={i} className="flex flex-col items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-brutal-magenta text-brutal-white border-4 border-brutal-white flex items-center justify-center text-5xl md:text-7xl font-space font-black shadow-brutal-cyan">
                         {t.val}
                      </div>
                      <span className="text-xs font-space font-black text-brutal-cyan mt-4 tracking-widest">{t.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Sales Grid */}
        <section className="max-w-7xl mx-auto px-4 py-20">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {saleItems.map((item) => (
                <BrutalCard key={item.id} accent={item.accent as any} className="group hover:-rotate-1 transition-transform relative overflow-hidden">
                   {item.stock > 90 && (
                     <div className="absolute -right-12 top-6 bg-brutal-magenta text-brutal-white px-12 py-1 font-space font-black text-xs rotate-45 border-2 border-brutal-black shadow-brutal-white z-20 animate-pulse">
                        HOT DEAL
                     </div>
                   )}
                   
                   <div className="flex justify-between items-start mb-8">
                      <div className="bg-brutal-black text-brutal-white px-4 py-1 font-space font-black text-xl border-2 border-brutal-black shadow-brutal-cyan">
                         -{item.discount}
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black uppercase opacity-40">Flash Price</span>
                         <p className="text-3xl font-space font-black text-brutal-magenta leading-none">{item.price}</p>
                      </div>
                   </div>

                   <h3 className="text-2xl font-space font-black uppercase mb-2">{item.name}</h3>
                   <p className="text-sm font-space font-bold opacity-40 line-through mb-8">Normal Price: {item.old}</p>

                   {/* Stock Status */}
                   <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-xs font-space font-black uppercase italic">
                         <span className="text-brutal-black">Limited Stock</span>
                         <span className={item.stock > 80 ? 'text-brutal-magenta' : 'text-brutal-cyan'}>
                            {item.stock}% SOLD
                         </span>
                      </div>
                      <div className="h-6 border-4 border-brutal-black bg-brutal-black/10 relative">
                         <div 
                            className={`h-full bg-brutal-${item.accent} border-r-4 border-brutal-black transition-all duration-1000`} 
                            style={{ width: `${item.stock}%` }}
                         ></div>
                         {item.stock > 85 && (
                           <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-brutal-white mix-blend-difference">SELLING FAST!</span>
                         )}
                      </div>
                   </div>

                   <BrutalButton variant="black" className="w-full text-xl py-4">Claim This Deal</BrutalButton>
                </BrutalCard>
              ))}
           </div>
        </section>

        {/* Promo Code Banner */}
        <section className="px-4 pb-20">
           <div className="max-w-7xl mx-auto bg-brutal-yellow border-4 border-brutal-black p-12 shadow-brutal-black text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-space font-black uppercase italic">WANT MORE DISCOUNT?</h2>
              <p className="font-space font-bold text-xl uppercase">Use code: <span className="bg-brutal-black text-brutal-yellow px-4 py-2 border-2 border-brutal-black inline-block">ZENITH2026</span> for extra 5% off</p>
           </div>
        </section>
      </main>
    </div>
  );
};

export default FlashSale;
