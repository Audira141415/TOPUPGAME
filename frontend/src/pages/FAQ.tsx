import React from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "BAGAIMANA CARA MELAKUKAN TOP UP?",
      a: "Pilih game yang diinginkan, masukkan data akun (User ID/Zone ID), pilih item yang ingin dibeli, lalu selesaikan pembayaran melalui metode yang tersedia. Diamonds/Currency akan masuk otomatis ke akun Anda."
    },
    {
      q: "BERAPA LAMA PROSES PENGIRIMAN?",
      a: "Sistem kami bekerja secara otomatis. Biasanya proses pengiriman memakan waktu 1-5 menit setelah pembayaran terverifikasi. Jika lebih dari 30 menit belum masuk, hubungi CS kami."
    },
    {
      q: "APAKAH TOP UP DI SINI AMAN?",
      a: "Sangat aman! Audira Zenith adalah partner resmi. Kami menjamin 100% keamanan akun Anda dan legalitas diamonds yang dikirimkan."
    },
    {
      q: "BAGAIMANA JIKA SALAH MEMASUKKAN ID?",
      a: "Mohon maaf, kami tidak bertanggung jawab atas kesalahan input data akun oleh pengguna. Pastikan User ID dan Zone ID Anda sudah benar sebelum membayar."
    },
    {
      q: "APAKAH ADA SISTEM REFUND?",
      a: "Refund hanya berlaku jika sistem kami gagal mengirimkan item setelah 24 jam dan stok sedang kosong. Refund akan dikirimkan ke saldo akun Anda."
    }
  ];

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 w-full">
        <header className="text-center mb-16 space-y-4">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block bg-brutal-yellow text-brutal-black px-6 py-2 border-4 border-brutal-black font-space font-black uppercase text-sm shadow-[8px_8px_0px_0px_#000]"
            >
                Help Center
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-space font-black uppercase italic leading-none">
                FREQUENTLY <br /><span className="text-brutal-magenta text-brutal-black-outline">ASKED</span> QUESTIONS
            </h1>
            <p className="text-brutal-black/60 font-space font-bold uppercase max-w-2xl mx-auto">
                Punya pertanyaan seputar layanan kami? Temukan jawabannya di sini sebelum menghubungi customer service.
            </p>
        </header>

        <div className="space-y-8">
            {faqs.map((faq, i) => (
                <motion.div 
                    key={i}
                    initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <BrutalCard accent={i % 2 === 0 ? "cyan" : "magenta"} className="p-8 group hover:-translate-y-2 transition-transform cursor-help">
                        <h3 className="text-2xl font-space font-black uppercase italic mb-4 flex items-center gap-4">
                            <span className="bg-brutal-black text-white w-8 h-8 flex items-center justify-center shrink-0">?</span>
                            {faq.q}
                        </h3>
                        <p className="font-space font-bold text-sm text-brutal-black/70 leading-relaxed border-l-4 border-brutal-black pl-6">
                            {faq.a}
                        </p>
                    </BrutalCard>
                </motion.div>
            ))}
        </div>

        <section className="mt-24 text-center space-y-12">
            <h2 className="text-4xl font-space font-black uppercase italic">Masih Butuh Bantuan?</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <div className="bg-brutal-white border-4 border-brutal-black p-8 shadow-brutal-cyan max-w-sm flex flex-col items-center gap-4">
                    <span className="text-5xl">💬</span>
                    <h4 className="font-black uppercase">Live Chat</h4>
                    <p className="text-xs font-bold opacity-40 uppercase">Hubungi admin kami melalui WhatsApp (Fast Response 24/7)</p>
                    <BrutalButton variant="black" className="w-full" onClick={() => window.open('https://wa.me/628123456789', '_blank')}>HUBUNGI ADMIN</BrutalButton>
                </div>
                <div className="bg-brutal-white border-4 border-brutal-black p-8 shadow-brutal-magenta max-w-sm flex flex-col items-center gap-4">
                    <span className="text-5xl">📧</span>
                    <h4 className="font-black uppercase">Email Support</h4>
                    <p className="text-xs font-bold opacity-40 uppercase">Kirimkan pertanyaan atau keluhan Anda melalui email resmi kami.</p>
                    <BrutalButton variant="black" className="w-full">KIRIM EMAIL</BrutalButton>
                </div>
            </div>
            
            <BrutalButton variant="white" className="mt-12" onClick={() => navigate('/')}>KEMBALI KE BERANDA</BrutalButton>
        </section>
      </main>
    </div>
  );
};

export default FAQ;
