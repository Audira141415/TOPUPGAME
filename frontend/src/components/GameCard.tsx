import React from 'react';
import { useNavigate } from 'react-router-dom';

import { STORAGE_URL } from '../services/api';

interface GameCardProps {
  game: any;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  
  // Ambil data dengan aman (Defensive Coding)
  const id = game?.id;
  const name = game?.name || 'Unknown Game';
  const image = game?.image;
  const slug = game?.slug;
  const category = typeof game?.category === 'object' ? game.category.name : game?.category || 'General';

  const handleNavigate = () => {
    // Navigasi menggunakan slug agar lebih SEO friendly
    if (slug) {
      navigate(`/game/${slug}`);
    } else {
      navigate(`/game/${id}`);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={handleNavigate}>
      <div className="aspect-[3/4] bg-brutal-white border-4 border-brutal-black mb-4 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[8px_8px_0px_0px_#000] transition-all relative overflow-hidden">
        {image ? (
          <img 
            src={image.startsWith('http') ? image : `${STORAGE_URL}/${image}`} 
            alt={name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          />
        ) : (
          <div className="absolute inset-0 bg-brutal-cyan/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
             <span className="font-space font-black text-6xl text-brutal-black/10">{name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-brutal-yellow text-brutal-black px-2 py-1 font-space font-bold text-xs uppercase border-2 border-brutal-black shadow-[2px_2px_0px_0px_#000]">
           {category}
        </div>
      </div>
      <h4 className="font-space font-black text-xl uppercase tracking-tighter group-hover:text-brutal-cyan transition-colors text-brutal-black leading-none mb-1">{name}</h4>
      <p className="font-inter text-[10px] font-bold text-brutal-black/40 uppercase tracking-widest italic">Fast Delivery 24/7</p>
    </div>
  );
};

export default GameCard;
