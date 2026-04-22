import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <BrutalCard accent="magenta" className="p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
               <h1 className="text-4xl font-space font-black uppercase italic leading-none">NEW <br /> <span className="text-brutal-magenta">PASSWORD</span></h1>
               <p className="text-xs font-space font-bold uppercase opacity-40">Gunakan password yang kuat agar akunmu tetap aman</p>
            </div>

            <form className="space-y-4">
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Password Baru</label>
                  <input type="password" className="brutal-input py-2" placeholder="••••••••" />
               </div>
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Konfirmasi Password</label>
                  <input type="password" className="brutal-input py-2" placeholder="••••••••" />
               </div>
               
               <div className="pt-4">
                  <BrutalButton variant="black" className="w-full py-4 text-xl italic shadow-brutal-magenta">UPDATE PASSWORD</BrutalButton>
               </div>
            </form>

            <div className="text-center">
               <Link to="/login" className="text-[10px] font-space font-black uppercase underline opacity-40 hover:opacity-100 transition-opacity">Batal & Kembali</Link>
            </div>
          </BrutalCard>
        </motion.div>
      </main>
    </div>
  );
};

export default ResetPassword;
