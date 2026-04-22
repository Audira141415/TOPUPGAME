import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Halo! Saya ZENITH AI. Ada yang bisa saya bantu untuk level-up hari ini?' }
  ]);

  return (
    <div className="fixed bottom-36 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 bg-brutal-white border-4 border-brutal-black shadow-brutal-magenta overflow-hidden mb-4"
          >
            <div className="bg-brutal-black p-4 text-brutal-white flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brutal-magenta border-2 border-brutal-white flex items-center justify-center font-black text-xs italic">AI</div>
                  <span className="font-space font-black uppercase text-xs">Zenith Assistant</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="hover:text-brutal-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
               </button>
            </div>
            
            <div className="h-64 p-4 overflow-y-auto space-y-4 bg-brutal-white/50">
               {messages.map((msg, i) => (
                 <div key={i} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-2 font-space font-bold text-[10px] uppercase border-2 border-brutal-black ${msg.role === 'bot' ? 'bg-brutal-cyan shadow-brutal-black' : 'bg-brutal-yellow shadow-brutal-black'}`}>
                       {msg.text}
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-2 border-t-2 border-brutal-black bg-brutal-white flex gap-2">
               <input 
                type="text" 
                placeholder="Tanya Zenith AI..." 
                className="flex-grow bg-brutal-black/5 border-2 border-brutal-black px-3 py-1 font-space font-bold text-[10px] uppercase outline-none"
               />
               <button className="bg-brutal-black text-brutal-white px-3 border-2 border-brutal-black hover:bg-brutal-magenta transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brutal-magenta border-4 border-brutal-black text-brutal-white flex items-center justify-center shadow-brutal-black hover:translate-y-[-4px] active:translate-y-[2px] transition-all group"
      >
        <div className="relative">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-brutal-yellow border-2 border-brutal-black rounded-full animate-bounce"></span>
        </div>
      </button>
    </div>
  );
};

export default AIAssistant;
