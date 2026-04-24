import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WABubble: React.FC = () => {
  const whatsappNumber = '6281234567890'; // Replace with admin number
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
        <MessageCircle size={32} />
        <span className="absolute -top-12 -left-32 w-32 bg-brutal-black text-white text-[10px] font-black py-1 px-2 border-2 border-brutal-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
          Butuh Bantuan? Chat Admin!
        </span>
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
      </div>
    </motion.a>
  );
};

export default WABubble;
