import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<any>(null);

  const handleTrack = () => {
    // Mock tracking logic
    if (orderId) {
      setStatus({
        id: orderId,
        game: 'Mobile Legends',
        product: '50 Diamonds',
        price: 'Rp 15,000',
        status: 'Processing',
        date: '2026-04-22 07:55',
        payment: 'E-Wallet 1',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-3xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl mb-4">Track Order</h1>
          <p className="text-brutal-black/60 font-space uppercase font-bold">Enter your order ID to see the status</p>
        </div>

        <BrutalCard accent="magenta" className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              className="brutal-input flex-grow text-xl" 
              placeholder="Ex: TP-12345678"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <BrutalButton variant="magenta" className="py-4 px-12 text-xl" onClick={handleTrack}>
              Track
            </BrutalButton>
          </div>
        </BrutalCard>

        {status && (
          <BrutalCard accent="cyan" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start border-b-2 border-brutal-black pb-4">
              <div>
                <h3 className="text-2xl">{status.game}</h3>
                <p className="text-sm font-space font-bold text-brutal-black/60 uppercase">{status.product}</p>
              </div>
              <div className="bg-brutal-yellow px-4 py-1 border-2 border-brutal-black font-space font-black uppercase text-sm">
                {status.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-4">
              <div>
                <p className="text-[10px] font-space font-black text-brutal-black/40 uppercase mb-1">Order ID</p>
                <p className="font-space font-bold uppercase">{status.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-space font-black text-brutal-black/40 uppercase mb-1">Date</p>
                <p className="font-space font-bold uppercase">{status.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-space font-black text-brutal-black/40 uppercase mb-1">Total Amount</p>
                <p className="font-space font-black text-xl text-brutal-magenta">{status.price}</p>
              </div>
              <div>
                <p className="text-[10px] font-space font-black text-brutal-black/40 uppercase mb-1">Payment</p>
                <p className="font-space font-bold uppercase">{status.payment}</p>
              </div>
            </div>

            <div className="bg-brutal-cyan/10 p-4 border-2 border-dashed border-brutal-cyan">
              <p className="text-xs text-brutal-black italic">
                * Your order is being processed by the system. Please wait 1-5 minutes for delivery.
              </p>
            </div>
          </BrutalCard>
        )}
      </main>
    </div>
  );
};

export default OrderTracking;
