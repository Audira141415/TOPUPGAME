import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Halo Hunter! Saya ZENITH AI, asisten pribadimu. Siap level-up hari ini? 🎮' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = { role: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let response = "Maaf, saya belum mengerti itu. Coba tanya tentang 'Promo', 'Game Baru', atau 'Rekber'!";
      
      const lowerText = inputText.toLowerCase();
      if (lowerText.includes('promo') || lowerText.includes('diskon') || lowerText.includes('murah')) {
        response = "Saat ini ada Flash Sale gila-gilaan di menu Flash Sale! Gunakan kode ZENITH2026 untuk diskon ekstra 5%. 📉";
      } else if (lowerText.includes('game') || lowerText.includes('seal') || lowerText.includes('ragnarok')) {
        response = "Kami baru saja menambahkan 20 game baru termasuk Seal M dan Ragnarok X! Cek katalog di Home ya. 🚀";
      } else if (lowerText.includes('rekber') || lowerText.includes('aman') || lowerText.includes('scam')) {
        response = "Gunakan fitur Rekber Zenith untuk transaksi akun yang 100% aman. Kami menjamin dana Anda sampai akun berhasil diamankan! 🛡️";
      } else if (lowerText.includes('halo') || lowerText.includes('hi') || lowerText.includes('p')) {
        response = "Halo juga! Ada yang bisa saya bantu carikan deal termurah hari ini? 😊";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 right-8 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, rotate: 5 }}
            className="w-80 md:w-96 bg-brutal-white dark:bg-brutal-black border-4 border-brutal-black dark:border-brutal-white shadow-[12px_12px_0px_0px_#000] dark:shadow-brutal-white overflow-hidden mb-6 flex flex-col"
          >
            {/* Header */}
            <div className="bg-brutal-black p-4 text-white dark:bg-brutal-white dark:text-brutal-black flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brutal-magenta border-2 border-white dark:border-brutal-black flex items-center justify-center font-black text-xs italic shadow-[2px_2px_0px_0px_#fff] dark:shadow-[2px_2px_0px_0px_#000]">ZEN</div>
                  <div>
                    <h3 className="font-space font-black uppercase text-xs tracking-tighter">Zenith AI Assistant</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-[8px] font-bold uppercase opacity-60">Online - Ready to help</span>
                    </div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
               </button>
            </div>
            
            {/* Chat Area */}
            <div ref={scrollRef} className="h-80 p-4 overflow-y-auto space-y-4 bg-brutal-bg dark:bg-zinc-900 scroll-smooth">
               {messages.map((msg, i) => (
                 <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                 >
                    <div className={`max-w-[85%] p-3 font-space font-bold text-[11px] uppercase border-2 border-brutal-black dark:border-brutal-white ${msg.role === 'bot' ? 'bg-brutal-cyan text-brutal-black shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white' : 'bg-brutal-yellow text-brutal-black shadow-[4px_4px_0px_0px_#000] dark:shadow-brutal-white self-end'}`}>
                       {msg.text}
                    </div>
                 </motion.div>
               ))}
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-brutal-cyan p-2 border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000] flex gap-1">
                       <span className="w-1 h-1 bg-black rounded-full animate-bounce"></span>
                       <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
                       <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                 </div>
               )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t-4 border-brutal-black dark:border-brutal-white bg-brutal-white dark:bg-brutal-black flex gap-2">
               <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya harga, game, atau rekber..." 
                className="flex-grow bg-brutal-black/5 dark:bg-white/10 border-2 border-brutal-black dark:border-brutal-white px-4 py-2 font-space font-bold text-[11px] uppercase outline-none dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
               />
               <button 
                onClick={handleSend}
                className="bg-brutal-black text-brutal-white dark:bg-brutal-white dark:text-brutal-black px-4 border-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-magenta dark:hover:bg-brutal-cyan transition-colors shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 border-4 border-brutal-black dark:border-brutal-white flex items-center justify-center shadow-[6px_6px_0px_0px_#000] dark:shadow-brutal-white hover:translate-y-[-4px] active:translate-y-[2px] transition-all group relative overflow-hidden ${isOpen ? 'bg-brutal-magenta' : 'bg-brutal-cyan'}`}
      >
        <div className="relative z-10">
           {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-black"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
           ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brutal-black dark:text-white group-hover:rotate-12 transition-transform"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
           )}
        </div>
        {!isOpen && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-brutal-magenta border-2 border-brutal-black rounded-full animate-bounce"></span>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
