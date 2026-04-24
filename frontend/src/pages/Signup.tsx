import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

import Turnstile from '../components/Turnstile';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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

    if (password !== passwordConfirmation) {
      setError('Konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      const data = await authService.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        turnstile_token: turnstileToken,
      });
      setAuth(data.user, data.access_token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <BrutalCard accent="cyan" className="p-8 md:p-12 space-y-8">
            <div className="text-center space-y-2">
               <span className="bg-brutal-yellow text-brutal-black px-3 py-1 font-space font-black text-[10px] uppercase border-2 border-brutal-black">Bonus 100 Koin Zenith</span>
               <h1 className="text-4xl font-space font-black uppercase italic">CREATE ACCOUNT</h1>
               <p className="text-xs font-space font-bold uppercase opacity-40">Bergabung dengan 10.000+ Sultan lainnya</p>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-brutal-black p-3 text-xs font-bold uppercase text-red-600">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="brutal-input py-2" 
                    placeholder="Nama Sultan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
               </div>
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Email</label>
                  <input 
                    type="email" 
                    className="brutal-input py-2" 
                    placeholder="email@contoh.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
               </div>
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Password</label>
                  <input 
                    type="password" 
                    className="brutal-input py-2" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
               </div>
               <div className="space-y-1">
                  <label className="font-space font-black uppercase text-[10px]">Konfirmasi Password</label>
                  <input 
                    type="password" 
                    className="brutal-input py-2" 
                    placeholder="••••••••"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
               </div>

               <Turnstile onVerify={setTurnstileToken} />
               
               <div className="pt-4">
                  <BrutalButton 
                    variant="black" 
                    type="submit"
                    className="w-full py-4 text-xl italic shadow-brutal-cyan"
                    disabled={loading}
                  >
                    {loading ? 'DAFTAR...' : 'DAFTAR SEKARANG'}
                  </BrutalButton>
               </div>
            </form>

            <p className="text-center text-[10px] font-space font-black uppercase">
               Sudah punya akun? <Link to="/login" className="text-brutal-cyan underline">Login Di Sini</Link>
            </p>

            <div className="text-[8px] font-black uppercase opacity-40 text-center leading-tight">
               Dengan mendaftar, Anda menyetujui <br /> <a href="#" className="underline">Syarat & Ketentuan</a> Audira Zenith.
            </div>
          </BrutalCard>
        </motion.div>
      </main>
    </div>
  );
};

export default Signup;
