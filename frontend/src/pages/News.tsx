/**
 * Purpose: Gaming News page to display latest game updates and news.
 * Design: Neo-Brutalist (bold shadows, thick borders, vibrant colors).
 * Dependencies: React, framer-motion, cmsService, STORAGE_URL.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cmsService, STORAGE_URL } from '../services/api';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import Navbar from '../components/Navbar';

const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await cmsService.getNews();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-brutal-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="mb-20 relative">
          <div className="border-8 border-brutal-black bg-brutal-white shadow-[16px_16px_0px_0px_#000] overflow-hidden relative min-h-[400px] flex flex-col justify-center p-8 md:p-16 group">
             {/* Background Image */}
             <div className="absolute inset-0 z-0">
                <img 
                  src={`${STORAGE_URL}/banners/news_hero.png`} 
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" 
                  alt="News Hero" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brutal-white via-brutal-white/80 to-transparent z-10"></div>
             </div>

             <div className="relative z-20 space-y-6 max-w-2xl">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="inline-block bg-brutal-magenta text-white font-black uppercase text-sm px-4 py-1 border-2 border-brutal-black shadow-[4px_4px_0px_0px_#000]"
                >
                  Hot Updates
                </motion.div>
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-8xl font-space font-black uppercase italic tracking-tighter leading-none"
                >
                  Gaming <span className="text-brutal-magenta">News</span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-space font-bold border-l-8 border-brutal-black pl-4 uppercase"
                >
                  Latest updates, patch notes, and gaming trends delivered instantly.
                </motion.p>
             </div>

             {/* Decorative Elements */}
             <div className="absolute bottom-8 right-8 hidden md:flex gap-4 z-20">
                <div className="w-12 h-12 bg-brutal-cyan border-4 border-brutal-black shadow-[4px_4px_0px_0px_#000] animate-bounce"></div>
                <div className="w-12 h-12 bg-brutal-yellow border-4 border-brutal-black shadow-[4px_4px_0px_0px_#000] animate-pulse delay-75"></div>
             </div>
          </div>
        </section>

        <header className="mb-12 flex items-center gap-6">
          <h2 className="text-4xl font-space font-black uppercase italic">Latest Articles</h2>
          <div className="flex-grow h-1 bg-brutal-black opacity-20"></div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse border-4 border-brutal-black shadow-brutal-black"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <BrutalCard accent={i % 2 === 0 ? "magenta" : "cyan"} className="flex flex-col h-full group hover:-rotate-1 transition-transform">
                  <div className="relative aspect-video mb-6 border-4 border-brutal-black overflow-hidden bg-brutal-black">
                    <img 
                      src={`${STORAGE_URL}/${item.image}`} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brutal-yellow text-brutal-black font-black uppercase text-xs px-3 py-1 border-2 border-brutal-black z-20">
                      {item.category}
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <span className="text-xs font-black opacity-40 uppercase">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <h3 className="text-2xl font-space font-black uppercase leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-space font-bold opacity-60 line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link to={`/news/${item.slug}`}>
                      <BrutalButton variant="black" className="w-full text-lg py-3 uppercase">
                        Read More
                      </BrutalButton>
                    </Link>
                  </div>
                </BrutalCard>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
