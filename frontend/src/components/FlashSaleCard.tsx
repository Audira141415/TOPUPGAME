/**
 * Purpose: Reusable card component for Flash Sale items.
 * Caller: Home.tsx, FlashSale.tsx.
 * Dependencies: React, framer-motion, BrutalCard, BrutalButton, api.ts.
 * Main Functions: Displays product info, discount percentage, and countdown prices.
 */
import React from 'react';
import { motion } from 'framer-motion';
import BrutalCard from './BrutalCard';
import BrutalButton from './BrutalButton';
import { useNavigate } from 'react-router-dom';
import { STORAGE_URL } from '../services/api';

interface FlashSaleCardProps {
  item: any;
  index: number;
}

const FlashSaleCard: React.FC<FlashSaleCardProps> = ({ item, index }) => {
  const navigate = useNavigate();
  const product = item?.product || {};
  const game = product?.game || {};
  
  const priceBasic = parseFloat(product?.price_basic || 0);
  const flashPrice = parseFloat(item?.flash_price || 0);
  
  const discount = (priceBasic > 0 && flashPrice > 0)
    ? Math.round(((priceBasic - flashPrice) / priceBasic) * 100) 
    : 0;

  const rawImage = game?.image || '';
  const imageUrl = rawImage.startsWith('http') 
    ? rawImage 
    : `${STORAGE_URL}/${rawImage}`;

  const handleBuy = () => {
    if (game?.slug) {
      navigate(`/game/${game.slug}?flash_sale=${item.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <BrutalCard accent="cyan" className="group hover:-rotate-1 transition-transform relative overflow-hidden h-full flex flex-col cursor-pointer" onClick={handleBuy}>
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-brutal-magenta text-white text-xs font-black px-3 py-1 border-2 border-brutal-black z-20">
            -{discount}%
          </div>
        )}
        
        <div className="aspect-square bg-brutal-black/5 border-4 border-brutal-black mb-6 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product?.name || 'Flash sale item'} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex-grow space-y-4">
          <div className="flex justify-between items-end">
             <h3 className="text-lg font-space font-black uppercase leading-tight line-clamp-2 flex-grow pr-4">{product?.name}</h3>
             <div className="text-right">
                <span className="text-[10px] font-black uppercase opacity-40">Flash Price</span>
                <p className="text-xl font-space font-black text-brutal-magenta leading-none">Rp {flashPrice.toLocaleString('id-ID')}</p>
             </div>
          </div>
          <p className="text-xs font-space font-bold opacity-40 line-through">Normal: Rp {priceBasic.toLocaleString('id-ID')}</p>
        </div>

        <div className="mt-8">
          <BrutalButton variant="black" className="w-full text-sm py-3" onClick={(e) => { e.stopPropagation(); handleBuy(); }}>BELI SEKARANG</BrutalButton>
        </div>
      </BrutalCard>
    </motion.div>
  );
};

export default FlashSaleCard;
