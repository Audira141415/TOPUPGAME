import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { api, STORAGE_URL } from '../services/api';
import toast from 'react-hot-toast';

const MysteryBox: React.FC = () => {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<any>(null);
  const [selectedBox, setSelectedBox] = useState<any>(null);

  const boxes = [
    { id: 'bronze', name: 'BRONZE BOX', price: 10000, color: 'bg-[#CD7F32]', icon: '📦', rewards: [
        { name: 'Zonk', value: 0 },
        { name: 'Saldo Rp 5.000', value: 5000 },
        { name: 'Saldo Rp 15.000', value: 15000 },
        { name: 'MLBB 5 Diamonds', value: 0 }
    ]},
    { id: 'gold', name: 'GOLD BOX', price: 50000, color: 'bg-brutal-yellow', icon: '🎁', rewards: [
        { name: 'Saldo Rp 10.000', value: 10000 },
        { name: 'Saldo Rp 75.000', value: 75000 },
        { name: 'Saldo Rp 150.000', value: 150000 },
        { name: 'Genshin 60 Genesis', value: 0 }
    ]},
    { id: 'diamond', name: 'DIAMOND BOX', price: 250000, color: 'bg-brutal-cyan', icon: '💎', rewards: [
        { name: 'Saldo Rp 50.000', value: 50000 },
        { name: 'Saldo Rp 500.000', value: 500000 },
        { name: 'Saldo Rp 1.000.000', value: 1000000 },
        { name: 'iPhone 15 Pro (Simulated)', value: 0 }
    ]}
  ];

  const handleSpin = async (box: any) => {
    if (!isAuthenticated) {
        toast.error('Silakan login untuk bermain!');
        return;
    }

    if (user?.balance < box.price) {
        toast.error('Saldo Anda tidak cukup!');
        return;
    }

    setSelectedBox(box);
    setIsSpinning(true);
    setReward(null);

    // Simulate Spin Animation Delay
    setTimeout(async () => {
        const randomIndex = Math.floor(Math.random() * box.rewards.length);
        const winReward = box.rewards[randomIndex];

        try {
            const response = await api.post('/mystery-box/win', {
                box_type: box.name,
                reward_name: winReward.name,
                reward_value: winReward.value,
                cost: box.price
            });

            if (response.data.success) {
                setReward(winReward);
                // Update local balance
                if (user) {
                    setUser({ ...user, balance: response.data.new_balance });
                }
                toast.success(`Selamat! Anda mendapatkan ${winReward.name}`);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Gagal memproses gacha');
        } finally {
            setIsSpinning(false);
        }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-16 w-full">
        <header className="text-center mb-16 space-y-4">
            <h1 className="text-6xl md:text-9xl font-space font-black uppercase italic leading-none tracking-tighter">
                MYSTERY <span className="text-brutal-magenta text-brutal-black-outline">GACHA</span>
            </h1>
            <p className="text-brutal-black font-space font-bold uppercase max-w-2xl mx-auto border-4 border-brutal-black bg-brutal-yellow p-4 shadow-[8px_8px_0px_0px_#000]">
                Uji keberuntunganmu! Dapatkan Saldo hingga Rp 1.000.000 atau hadiah menarik lainnya langsung ke akunmu.
            </p>
            {isAuthenticated && (
                <div className="inline-block bg-brutal-black text-white px-6 py-2 border-2 border-white font-space font-black mt-4">
                   SALDO ANDA: RP {Number(user?.balance).toLocaleString('id-ID')}
                </div>
            )}
        </header>

        <div className="grid md:grid-cols-3 gap-12">
            {boxes.map((box) => (
                <BrutalCard key={box.id} accent="black" className={`${box.color} p-8 flex flex-col items-center gap-6 group hover:-translate-y-4 transition-all`}>
                    <div className="text-8xl group-hover:scale-125 transition-transform">{box.icon}</div>
                    <h3 className="text-3xl font-space font-black uppercase italic">{box.name}</h3>
                    <div className="w-full bg-brutal-black text-white p-4 text-center font-space font-black">
                        Harga: Rp {box.price.toLocaleString('id-ID')}
                    </div>
                    <BrutalButton 
                        variant="black" 
                        className="w-full py-4"
                        onClick={() => handleSpin(box)}
                        disabled={isSpinning}
                    >
                        {isSpinning && selectedBox?.id === box.id ? 'MEMBUKA...' : 'BUKA BOX'}
                    </BrutalButton>
                </BrutalCard>
            ))}
        </div>

        {/* Animation Overlay */}
        <AnimatePresence>
            {isSpinning && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-brutal-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                >
                    <motion.div 
                        animate={{ 
                            rotate: [0, -10, 10, -10, 10, 0],
                            scale: [1, 1.2, 1.2, 1.2, 1.2, 1]
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="text-[12rem]"
                    >
                        {selectedBox?.icon}
                    </motion.div>
                    <h2 className="text-4xl font-space font-black text-white uppercase italic animate-pulse mt-8">Sedang Membuka Box...</h2>
                </motion.div>
            )}

            {reward && (
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="fixed inset-0 z-[201] flex items-center justify-center p-4 bg-brutal-cyan/20 backdrop-blur-sm"
                    onClick={() => setReward(null)}
                >
                    <BrutalCard accent="yellow" className="p-12 text-center max-w-md bg-white shadow-[24px_24px_0px_0px_#000] border-8">
                        <h2 className="text-3xl font-space font-black uppercase mb-4">CONGRATULATIONS!</h2>
                        <div className="text-8xl mb-6">🎉</div>
                        <p className="text-[10px] font-bold uppercase opacity-40 mb-2">Anda Memenangkan:</p>
                        <h3 className="text-4xl font-space font-black text-brutal-magenta uppercase italic mb-8">{reward.name}</h3>
                        <BrutalButton variant="black" className="w-full" onClick={() => setReward(null)}>AMBIL HADIAH</BrutalButton>
                    </BrutalCard>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Gacha History */}
        <section className="mt-24">
            <h3 className="text-4xl font-space font-black uppercase italic mb-8">GACHA HISTORY</h3>
            <BrutalCard accent="white" className="p-0 overflow-hidden">
                <div className="bg-brutal-black text-white p-4 grid grid-cols-4 font-space font-black text-xs uppercase">
                    <span>Box</span>
                    <span>Hadiah</span>
                    <span>Waktu</span>
                    <span className="text-right">Status</span>
                </div>
                <div className="divide-y-2 divide-brutal-black/10">
                    <div className="p-4 grid grid-cols-4 font-space font-bold text-[10px] uppercase">
                        <span className="font-black text-brutal-magenta">Diamond Box</span>
                        <span>Saldo Rp 50.000</span>
                        <span className="opacity-40 text-[8px]">Today, 14:20</span>
                        <span className="text-right text-green-600 font-black">SUCCESS</span>
                    </div>
                    <div className="p-4 grid grid-cols-4 font-space font-bold text-[10px] uppercase">
                        <span className="font-black text-brutal-yellow">Gold Box</span>
                        <span>Zonk</span>
                        <span className="opacity-40 text-[8px]">Today, 14:15</span>
                        <span className="text-right text-brutal-magenta font-black">FAILED</span>
                    </div>
                </div>
            </BrutalCard>
        </section>
      </main>
    </div>
  );
};

export default MysteryBox;
