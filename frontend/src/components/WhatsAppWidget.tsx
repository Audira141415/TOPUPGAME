import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppWidget: React.FC = () => {
  const whatsappNumber = '6281234567890';
  const message = encodeURIComponent('Halo Admin Audira Zenith, saya butuh bantuan mengenai layanan top up.');

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[8px_8px_0px_0px_#000] border-4 border-brutal-black cursor-pointer group"
    >
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span className="absolute -top-12 -right-4 w-40 bg-brutal-black text-white text-[10px] font-black py-1 px-2 border-2 border-brutal-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
          Butuh Bantuan? Chat Admin!
        </span>
        <div className="absolute -top-3 -right-6 bg-brutal-yellow text-brutal-black border-2 border-brutal-black px-2 py-0.5 text-[8px] font-black uppercase italic shadow-[2px_2px_0px_0px_#000] animate-bounce">
          NEW
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      </div>
    </motion.a>
  );
};

export default WhatsAppWidget;

