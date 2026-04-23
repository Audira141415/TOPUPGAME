import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';

import { STORAGE_URL } from '../services/api';

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data based on the ID (In real app, fetch from API)
  const accountData: any = {
    '1': { 
      game: 'Mobile Legends', 
      title: 'MLBB Mythical Glory Sultan', 
      price: 'Rp 1.250.000', 
      skins: '150 Skins', 
      hero: '98 Heroes', 
      accent: 'cyan',
      image: `${STORAGE_URL}/accounts/mlbb_sultan.png`,
      description: 'Akun pribadi tangan pertama. Full skin KOF (Chou, Gusion), Skin Legend Granger & Gusion. Winrate overall 65%+. Emblem Max All.',
      specs: [
        { label: 'Rank', value: 'Mythical Glory 75★' },
        { label: 'Winrate', value: '68.5% (Total)' },
        { label: 'Skins Legend', value: 'Granger, Gusion' },
        { label: 'Skins Collector', value: 'Jawhead, Granger, Bene' },
        { label: 'Emblem', value: 'All Max Level 60' },
        { label: 'Login', value: 'Moonton (Changeable)' }
      ]
    },
    '2': { 
      game: 'Genshin Impact', 
      title: 'Genshin Impact AR 58 Endgame', 
      price: 'Rp 2.400.000', 
      skins: '8 Char ★5', 
      hero: 'Endgame Ready', 
      accent: 'magenta',
      image: `${STORAGE_URL}/accounts/genshin_sultan.png`,
      description: 'Akun rawat sejak day 1. Raiden C2 + EL, Zhongli, Nahida, Kazuha. Spiral Abyss easy floor 12-3. Resource berlimpah.',
      specs: [
        { label: 'Adventure Rank', value: '58' },
        { label: 'World Level', value: '8' },
        { label: 'Character ★5', value: 'Raiden, Zhongli, Nahida, etc' },
        { label: 'Weapon ★5', value: 'Engulfing Lightning, Homa' },
        { label: 'Primogems', value: '4,500+' },
        { label: 'Server', value: 'Asia' }
      ]
    },
    '3': { 
      game: 'Valorant', 
      title: 'Valorant Ascendant 3 Reaver', 
      price: 'Rp 850.000', 
      skins: 'Bundle Reaver', 
      hero: 'Full Agent', 
      accent: 'yellow',
      image: `${STORAGE_URL}/accounts/valorant_sultan.png`,
      description: 'Skin Reaver Full Bundle (Vandal, Operator, Sheriff, Knife). Semua Agent terbuka. BP Season ini On.',
      specs: [
        { label: 'Rank', value: 'Ascendant 3' },
        { label: 'Peak Rank', value: 'Immortal 1' },
        { label: 'Vandal Skin', value: 'Reaver, Prime, RGX' },
        { label: 'Phantom Skin', value: 'Oni, Spectrum' },
        { label: 'VP Remaining', value: '450' },
        { label: 'Radianite', value: '120' }
      ]
    }
  };

  const account = accountData[id || '1'] || accountData['1'];

  const handleBuy = () => {
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
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-6">
             <div className="aspect-square bg-brutal-black border-4 border-brutal-black shadow-brutal-black relative overflow-hidden group">
                <img src={account.image} alt={account.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-brutal-black text-brutal-white px-4 py-1 font-space font-black uppercase text-sm border-2 border-brutal-white">
                   {account.game}
                </div>
             </div>
             <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-brutal-white border-2 border-brutal-black shadow-brutal-black hover:-translate-y-1 transition-transform cursor-pointer overflow-hidden opacity-60 hover:opacity-100">
                     <img src={account.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>

          {/* Right: Details & Purchase */}
          <div className="space-y-8">
             <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-space font-black text-brutal-black uppercase italic leading-none">{account.title}</h1>
                <div className="flex items-center gap-4">
                   <span className="bg-brutal-cyan text-brutal-black px-3 py-1 font-space font-black text-xs border-2 border-brutal-black">VERIFIED ACCOUNT</span>
                   <span className="bg-brutal-yellow text-brutal-black px-3 py-1 font-space font-black text-xs border-2 border-brutal-black">INSTANT DELIVERY</span>
                </div>
             </div>

             <BrutalCard accent={account.accent} className="p-8 space-y-6">
                <div className="flex justify-between items-end border-b-2 border-brutal-black pb-4">
                   <p className="text-xs font-space font-black uppercase opacity-40">Special Price</p>
                   <p className="text-5xl font-space font-black text-brutal-magenta italic">{account.price}</p>
                </div>
                
                <div className="space-y-4">
                   <h3 className="font-space font-black uppercase text-sm italic underline">Informasi Akun:</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {account.specs.map((spec: any, i: number) => (
                        <div key={i} className="flex justify-between border-b border-brutal-black/10 pb-1">
                           <span className="text-[10px] font-bold uppercase opacity-60">{spec.label}</span>
                           <span className="text-[10px] font-black uppercase">{spec.value}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="font-space font-black uppercase text-sm italic underline">Deskripsi:</h3>
                   <p className="text-xs font-space font-bold uppercase leading-relaxed opacity-70">
                      {account.description}
                   </p>
                </div>

                <div className="pt-6 space-y-4">
                   <BrutalButton 
                     variant="black" 
                     className="w-full py-6 text-2xl shadow-brutal-magenta hover:scale-[1.02] transition-transform"
                     onClick={handleBuy}
                     disabled={isProcessing}
                   >
                      {isProcessing ? 'PROCESSING...' : 'BUY THIS ACCOUNT'}
                   </BrutalButton>
                   <p className="text-[10px] text-center font-black uppercase opacity-40">Transaksi dilindungi oleh Garansi Audira Zenith 30 Hari.</p>
                </div>
             </BrutalCard>

             {/* Seller Info */}
             <div className="bg-brutal-black text-brutal-white p-6 border-4 border-brutal-black shadow-brutal-cyan flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-brutal-magenta border-2 border-brutal-white flex items-center justify-center font-black text-xl italic shadow-brutal-white">AZ</div>
                   <div>
                      <p className="text-xs font-bold uppercase opacity-60">Seller:</p>
                      <p className="font-space font-black uppercase italic">Audira Official Store</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-brutal-cyan uppercase">★ 5.0 Rating</p>
                   <p className="text-[8px] font-bold opacity-40 uppercase">Trusted since 2021</p>
                </div>
             </div>
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
                   <h2 className="text-4xl font-space font-black uppercase italic">ORDER INITIATED!</h2>
                   <p className="font-space font-bold uppercase text-[10px] opacity-60">Pesanan akun sultanmu sedang diproses. Hubungi Admin via WhatsApp untuk serah terima akun.</p>
                </div>

                <div className="bg-brutal-black/5 p-4 border-2 border-dashed border-brutal-black text-left space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Order ID:</span>
                      <span className="text-brutal-magenta">#ACC-{Math.floor(Math.random() * 1000000)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>Account:</span>
                      <span>{account.title}</span>
                   </div>
                </div>

                <BrutalButton variant="black" className="w-full py-4" onClick={() => navigate('/account-store')}>
                   KEMBALI KE STORE
                </BrutalButton>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDetail;
