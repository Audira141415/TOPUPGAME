import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <BrutalCard accent="yellow" className="p-8 md:p-12 space-y-8">
            {!isSent ? (
              <>
                <div className="text-center space-y-2">
                   <div className="w-16 h-16 bg-brutal-black border-4 border-brutal-black shadow-brutal-yellow mx-auto flex items-center justify-center text-brutal-yellow text-3xl mb-4">
                      🔒
                   </div>
                   <h1 className="text-4xl font-space font-black uppercase italic">FORGOT PASSWORD</h1>
                   <p className="text-xs font-space font-bold uppercase opacity-40">Jangan panik! Masukkan emailmu dan kami akan kirimkan link sakti.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
                   <div className="space-y-2">
                      <label className="font-space font-black uppercase text-xs">Email Terdaftar</label>
                      <input type="email" className="brutal-input" placeholder="sultan@audira.com" required />
                   </div>
                   
                   <BrutalButton variant="black" className="w-full py-4 text-xl italic shadow-brutal-yellow">KIRIM LINK PEMULIHAN</BrutalButton>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center space-y-6"
              >
                 <div className="w-20 h-20 bg-green-500 border-4 border-brutal-black shadow-brutal-black mx-auto flex items-center justify-center text-white text-4xl">
                    ✓
                 </div>
                 <h2 className="text-3xl font-space font-black uppercase">LINK TERKIRIM!</h2>
                 <p className="text-xs font-space font-bold uppercase opacity-60 leading-relaxed">
                    Kami telah mengirimkan instruksi ke emailmu. <br /> Periksa folder <b>Inbox</b> atau <b>Spam</b>.
                 </p>
                 <Link to="/login" className="block">
                    <BrutalButton variant="black" className="w-full">KEMBALI KE LOGIN</BrutalButton>
                 </Link>
              </motion.div>
            )}

            <div className="text-center">
               <Link to="/login" className="text-[10px] font-space font-black uppercase underline opacity-40 hover:opacity-100 transition-opacity">Batal & Kembali</Link>
            </div>
          </BrutalCard>
        </motion.div>
      </main>
    </div>
  );
};

export default ForgotPassword;
