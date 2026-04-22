import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

const WinrateCalculator: React.FC = () => {
  const [totalMatch, setTotalMatch] = useState('');
  const [totalWr, setTotalWr] = useState('');
  const [targetWr, setTargetWr] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const tMatch = parseInt(totalMatch);
    const tWr = parseFloat(totalWr);
    const tgWr = parseFloat(targetWr);

    if (isNaN(tMatch) || isNaN(tWr) || isNaN(tgWr)) return;

    // Logic: (tMatch * tWr + x) / (tMatch + x) = tgWr
    // tMatch * tWr + x = tgWr * tMatch + tgWr * x
    // x - tgWr * x = tgWr * tMatch - tMatch * tWr
    // x(1 - tgWr) = tMatch(tgWr - tWr)
    // x = tMatch(tgWr - tWr) / (1 - tgWr)

    const winNeeded = Math.ceil((tMatch * (tgWr / 100) - (tMatch * (tWr / 100))) / (1 - (tgWr / 100)));
    setResult(winNeeded > 0 ? winNeeded : 0);
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-space font-black italic uppercase text-brutal-black">
            WINRATE <span className="text-brutal-magenta">CALC</span>
          </h1>
          <p className="bg-brutal-black text-brutal-white inline-block px-4 py-1 font-space font-bold uppercase text-sm">
            Hitung berapa kemenangan lagi untuk mencapai Winrate impianmu
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <BrutalCard accent="cyan" className="space-y-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="font-space font-black uppercase text-xs">Total Match Saat Ini</label>
                  <input 
                    type="number" 
                    className="brutal-input" 
                    placeholder="Contoh: 1250"
                    value={totalMatch}
                    onChange={(e) => setTotalMatch(e.target.value)}
                  />
               </div>
               <div className="space-y-2">
                  <label className="font-space font-black uppercase text-xs">Total Winrate Saat Ini (%)</label>
                  <input 
                    type="number" 
                    className="brutal-input" 
                    placeholder="Contoh: 52.4"
                    value={totalWr}
                    onChange={(e) => setTotalWr(e.target.value)}
                  />
               </div>
               <div className="space-y-2">
                  <label className="font-space font-black uppercase text-xs">Target Winrate (%)</label>
                  <input 
                    type="number" 
                    className="brutal-input" 
                    placeholder="Contoh: 60"
                    value={targetWr}
                    onChange={(e) => setTargetWr(e.target.value)}
                  />
               </div>
            </div>
            <BrutalButton variant="black" className="w-full py-4 text-xl" onClick={calculate}>
               HITUNG SEKARANG
            </BrutalButton>
          </BrutalCard>

          <div className="flex flex-col justify-center">
             {result !== null ? (
               <BrutalCard accent="magenta" className="text-center space-y-6 bg-brutal-black text-brutal-white border-brutal-white animate-in fade-in zoom-in duration-300">
                  <h3 className="font-space font-black text-2xl uppercase">Hasil Analisis</h3>
                  <div className="py-8 border-y-2 border-brutal-white/20">
                     <span className="text-8xl font-space font-black text-brutal-cyan">{result}</span>
                     <p className="font-space font-black text-xl uppercase mt-4">WIN LAGI</p>
                  </div>
                  <p className="text-xs font-bold uppercase opacity-60 leading-relaxed">
                     Kamu butuh <span className="text-brutal-magenta">{result}</span> kemenangan beruntun (win streak) tanpa kalah untuk mencapai winrate <span className="text-brutal-cyan">{targetWr}%</span>. Semangat, Gamer!
                  </p>
                  <BrutalButton variant="cyan" className="w-full" onClick={() => setResult(null)}>ULANGI</BrutalButton>
               </BrutalCard>
             ) : (
               <div className="border-4 border-dashed border-brutal-black/20 rounded-none h-full flex flex-center items-center justify-center p-12 text-center italic text-brutal-black/40 font-space font-bold uppercase">
                  Hasil hitungan akan muncul di sini setelah Anda memasukkan data
               </div>
             )}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-12 bg-brutal-yellow p-6 border-2 border-brutal-black shadow-brutal-black">
           <h4 className="font-space font-black text-xl mb-2 italic">PRO TIP:</h4>
           <p className="font-space font-bold text-sm uppercase">
              Jangan lupa top up Diamonds di <span className="text-brutal-magenta">AUDIRA ZENITH</span> agar performa mainmu makin garang dengan skin baru!
           </p>
        </div>
      </main>
    </div>
  );
};

export default WinrateCalculator;
