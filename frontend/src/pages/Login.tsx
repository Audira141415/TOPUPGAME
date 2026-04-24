import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

import Turnstile from '../components/Turnstile';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setError('Selesaikan verifikasi keamanan (Turnstile).');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login({ 
        email, 
        password,
        turnstile_token: turnstileToken 
      });
      setAuth(data.user, data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal login. Cek email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <BrutalCard accent="magenta" className="p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
               <h1 className="text-4xl font-space font-black uppercase italic">WELCOME BACK</h1>
               <p className="text-xs font-space font-bold uppercase opacity-40">Masuk untuk mengakses Dashboard Sultanmu</p>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-brutal-black p-3 text-xs font-bold uppercase text-red-600">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
               <div className="space-y-2">
                  <label className="font-space font-black uppercase text-xs">Email / Username</label>
                  <input 
                    type="email" 
                    className="brutal-input" 
                    placeholder="audira@zenith.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between">
                     <label className="font-space font-black uppercase text-xs">Password</label>
                     <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase text-brutal-magenta underline">Lupa?</Link>
                  </div>
                  <input 
                    type="password" 
                    className="brutal-input" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
               </div>
               
               <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-brutal-magenta border-2 border-brutal-black" />
                  <span className="text-[10px] font-black uppercase italic">Ingat Saya</span>
               </div>

               <Turnstile onVerify={setTurnstileToken} />

               <BrutalButton 
                variant="black" 
                type="submit"
                className="w-full py-4 text-xl italic"
                disabled={loading}
               >
                 {loading ? 'LOADING...' : 'LOGIN SEKARANG'}
               </BrutalButton>
            </form>

            <div className="relative py-4">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-brutal-black/10"></div></div>
               <div className="relative flex justify-center text-xs uppercase"><span className="bg-brutal-white px-2 font-black opacity-40">Atau Login Dengan</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button type="button" className="border-2 border-brutal-black py-2 font-space font-black text-[10px] uppercase hover:bg-brutal-cyan transition-colors">Google</button>
               <button type="button" className="border-2 border-brutal-black py-2 font-space font-black text-[10px] uppercase hover:bg-brutal-yellow transition-colors">Facebook</button>
            </div>

            <p className="text-center text-[10px] font-space font-black uppercase">
               Belum punya akun? <Link to="/signup" className="text-brutal-magenta underline">Daftar Di Sini</Link>
            </p>
          </BrutalCard>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
