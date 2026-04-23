/**
 * Purpose: Gaming News page to display latest game updates and news.
 * Design: Neo-Brutalist (bold shadows, thick borders, vibrant colors).
 * Dependencies: React, framer-motion, cmsService, STORAGE_URL.
 */
import React, { useEffect, useState } from 'react';
import { cmsService, STORAGE_URL } from '../services/api';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        <header className="mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-space font-black uppercase italic tracking-tighter">
            Gaming <span className="text-brutal-magenta">News</span>
          </h1>
          <p className="text-xl font-space font-bold border-l-8 border-brutal-black pl-4">
            LATEST UPDATES, PATCH NOTES, AND GAMING TRENDS.
          </p>
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
                    <BrutalButton variant="black" className="w-full text-lg py-3 uppercase">
                      Read More
                    </BrutalButton>
                  </div>
                </BrutalCard>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default News;
