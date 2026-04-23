/**
 * Purpose: User Settings page for managing profile and security.
 * Caller: App.tsx (Route '/settings').
 * Dependencies: React, Navbar, BrutalCard, BrutalButton, authService.
 * Main Functions: Update name, phone, avatar, and change password.
 */
import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { authService, STORAGE_URL } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const { user, setAuth } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.avatar ? `${STORAGE_URL}/${user.avatar}` : null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile({ name, phone });
      setAuth(updatedUser, localStorage.getItem('access_token') || '');
      setSuccess('Profil berhasil diperbarui!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to server
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await authService.updateAvatar(formData);
      setAuth(response.user, localStorage.getItem('access_token') || '');
      setSuccess('Foto profil berhasil diubah!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengunggah foto profil.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Password baru tidak cocok.');
      return;
    }
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await authService.updatePassword({ 
        old_password: oldPassword, 
        password: newPassword,
        password_confirmation: confirmPassword
      });
      setSuccess('Password berhasil diubah!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengubah password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full">
        <header className="mb-12">
           <h1 className="text-4xl md:text-6xl font-space font-black uppercase italic leading-none">USER SETTINGS</h1>
           <div className="w-32 h-2 bg-brutal-magenta mt-4 border-2 border-brutal-black"></div>
        </header>

        {success && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-4 bg-brutal-cyan border-4 border-brutal-black font-space font-black uppercase text-sm shadow-brutal-black">
             {success}
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-4 bg-brutal-magenta text-white border-4 border-brutal-black font-space font-black uppercase text-sm shadow-brutal-black">
             {error}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
           {/* Profile Identity */}
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BrutalCard accent="yellow" className="p-8 space-y-8">
                 <div className="flex items-center gap-4 border-b-4 border-brutal-black pb-4">
                    <div className="w-12 h-12 bg-brutal-black flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <h2 className="text-2xl font-space font-black uppercase">Identitas Sultan</h2>
                 </div>

                 {/* Avatar Upload Section */}
                 <div className="flex flex-col items-center gap-6 p-6 bg-brutal-black/5 border-4 border-brutal-black border-dashed">
                    <div className="relative group">
                       <div className="w-32 h-32 bg-brutal-white border-4 border-brutal-black shadow-brutal-magenta overflow-hidden flex items-center justify-center">
                          {preview ? (
                            <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          )}
                       </div>
                       <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-10 h-10 bg-brutal-yellow border-2 border-brutal-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                       >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                       </button>
                    </div>
                    <p className="font-space font-black text-[10px] uppercase opacity-50">Klik ikon kuning untuk ganti foto profil</p>
                    <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                 </div>

                 <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs opacity-50">Email Address (Locked)</label>
                       <input type="email" value={email} disabled className="brutal-input bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs">Full Name</label>
                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="brutal-input" placeholder="Masukkan nama lengkap..." />
                    </div>
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs">WhatsApp Number</label>
                       <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="brutal-input" placeholder="0812xxxx..." />
                    </div>
                    <BrutalButton variant="black" className="w-full py-4 text-lg" disabled={loading}>
                       {loading ? 'SIMPAN...' : 'SIMPAN PERUBAHAN'}
                    </BrutalButton>
                 </form>
              </BrutalCard>
           </motion.div>

           {/* Security Settings */}
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <BrutalCard accent="cyan" className="p-8 space-y-8">
                 <div className="flex items-center gap-4 border-b-4 border-brutal-black pb-4">
                    <div className="w-12 h-12 bg-brutal-black flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <h2 className="text-2xl font-space font-black uppercase">Benteng Keamanan</h2>
                 </div>

                 <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs">Password Lama</label>
                       <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required />
                    </div>
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs">Password Baru</label>
                       <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required />
                    </div>
                    <div className="space-y-2">
                       <label className="font-space font-black uppercase text-xs">Konfirmasi Password Baru</label>
                       <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="brutal-input" placeholder="••••••••" required />
                    </div>
                    <BrutalButton variant="magenta" className="w-full py-4 text-lg" disabled={loading}>
                       {loading ? 'MEMPROSES...' : 'GANTI PASSWORD'}
                    </BrutalButton>
                 </form>
              </BrutalCard>
           </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
