import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  id: string;
  name: string;
  image?: string;
  category: string;
}

const GameCard: React.FC<GameCardProps> = ({ id, name, image, category }) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] bg-brutal-white border-4 border-brutal-black mb-4 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-brutal-black transition-all relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
        ) : (
          <div className="absolute inset-0 bg-brutal-cyan/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
             <span className="font-space font-black text-6xl text-brutal-black/10">{name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-brutal-yellow text-brutal-black px-2 py-1 font-space font-bold text-xs uppercase border-2 border-brutal-black">
          {category}
        </div>
      </div>
      <h4 className="font-space font-black text-xl uppercase tracking-tight group-hover:text-brutal-cyan transition-colors text-brutal-black">{name}</h4>
      <p className="font-inter text-sm text-brutal-black/60 uppercase tracking-widest">Instant Delivery</p>
    </div>
  );
};

export default GameCard;
