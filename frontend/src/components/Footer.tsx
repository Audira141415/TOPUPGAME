import React from 'react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';

const Footer: React.FC = () => {
  return (
    <>
      {/* Why Choose Us */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center border-t-4 border-brutal-black">
        <h2 className="text-4xl md:text-6xl mb-16 italic font-space font-black uppercase">WHY AUDIRA ZENITH?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'INSTANT DELIVERY', desc: 'Orders processed automatically in seconds 24/7.', color: 'bg-brutal-cyan' },
            { title: 'SECURE PAYMENT', desc: '100% Secure transaction with major payment gateways.', color: 'bg-brutal-magenta text-white' },
            { title: 'BEST PRICE', desc: 'Competitive prices and daily flash sales for everyone.', color: 'bg-brutal-yellow' },
          ].map((item, i) => (
            <div key={i} className="p-8 border-4 border-brutal-black shadow-brutal-black bg-brutal-white group hover:-translate-y-2 transition-transform">
               <div className={`w-16 h-16 ${item.color} border-4 border-brutal-black mx-auto mb-6 flex items-center justify-center font-black text-2xl shadow-brutal-black group-hover:rotate-12 transition-transform`}>{i+1}</div>
               <h4 className="text-2xl mb-4 font-space font-black uppercase">{item.title}</h4>
               <p className="text-sm text-brutal-black/60 font-space font-bold uppercase">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brutal-white border-t-4 border-brutal-black pt-20 pb-12 px-4 relative overflow-hidden">
         {/* Background Accent */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-brutal-cyan opacity-5 -rotate-12 translate-x-32 -translate-y-32 select-none pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brutal-cyan border-2 border-brutal-black flex items-center justify-center font-black text-2xl shadow-brutal-black">AZ</div>
                  <span className="text-3xl font-space font-black italic uppercase">AUDIRA<span className="text-brutal-magenta">ZENITH</span></span>
               </div>
               <p className="font-space font-bold text-sm uppercase leading-relaxed text-brutal-black/60">
                  Audira Zenith adalah platform top-up game paling terpercaya di Indonesia. Kami menyediakan layanan instan 24/7 dengan keamanan tingkat tinggi dan harga yang sangat bersaing untuk para gamer sejati.
               </p>
               <div className="flex gap-4">
                  {['IG', 'FB', 'TT', 'YT'].map(soc => (
                    <div key={soc} className="w-10 h-10 bg-brutal-white border-2 border-brutal-black flex items-center justify-center font-black text-sm hover:bg-brutal-magenta hover:text-white hover:shadow-brutal-black transition-all cursor-pointer shadow-brutal-black">{soc}</div>
                  ))}
               </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
               <h4 className="font-space font-black uppercase text-xl italic border-b-4 border-brutal-black pb-2">Links</h4>
               <ul className="space-y-3 font-space font-bold text-sm uppercase text-brutal-black/60">
                  <li><Link to="/" className="hover:text-brutal-magenta transition-colors">Home</Link></li>
                  <li><Link to="/track" className="hover:text-brutal-magenta transition-colors">Track Order</Link></li>
                  <li><Link to="/tools" className="hover:text-brutal-magenta transition-colors">Gamer Tools</Link></li>
                  <li><Link to="/loyalty-shop" className="hover:text-brutal-magenta transition-colors">Loyalty Shop</Link></li>
               </ul>
            </div>
            
            <div className="md:col-span-5 space-y-6">
               <h4 className="font-space font-black uppercase text-xl italic border-b-4 border-brutal-black pb-2">Metode Pembayaran</h4>
               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'QRIS', color: 'bg-[#EA1D2C]' },
                    { name: 'BCA', color: 'bg-[#0060AF]' },
                    { name: 'BNI', color: 'bg-[#F15A23]' },
                    { name: 'MANDIRI', color: 'bg-[#00467E]' },
                    { name: 'OVO', color: 'bg-[#4C2A86]' },
                    { name: 'DANA', color: 'bg-[#118EEA]' },
                    { name: 'SHOPEE', color: 'bg-[#EE4D2D]' },
                    { name: 'LINKAJA', color: 'bg-[#E1251B]' },
                  ].map((pay, i) => (
                    <div key={i} className={`${pay.color} h-10 border-2 border-brutal-black flex items-center justify-center text-white font-space font-black text-[8px] uppercase shadow-brutal-black hover:translate-y-[-2px] transition-all cursor-help`}>
                       {pay.name}
                    </div>
                  ))}
               </div>
               <p className="text-[9px] font-bold uppercase opacity-40">Terverifikasi & Aman • Otomatis 24 Jam</p>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto mt-20 pt-8 border-t-2 border-brutal-black flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-space font-black text-[10px] uppercase opacity-40 text-center md:text-left">© 2026 AUDIRA ZENITH COMMAND CENTER. ALL RIGHTS RESERVED.</p>
            <p className="font-space font-black text-[10px] uppercase opacity-40 italic">Premium Experience Guaranteed</p>
         </div>
      </footer>

    </>
  );
};

export default Footer;
