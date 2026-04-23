/**
 * Purpose: News Detail page to display full article content.
 * Design: Neo-Brutalist (bold shadows, thick borders, vibrant colors).
 * Dependencies: React, useParams, cmsService, STORAGE_URL.
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cmsService, STORAGE_URL } from '../services/api';
import { motion } from 'framer-motion';
import BrutalButton from '../components/BrutalButton';
import Navbar from '../components/Navbar';

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!slug) return;
      try {
        const data = await cmsService.getNewsBySlug(slug);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-brutal-white flex items-center justify-center">
      <div className="animate-spin w-16 h-16 border-8 border-brutal-black border-t-brutal-magenta"></div>
    </div>
  );

  if (!news) return (
    <div className="min-h-screen bg-brutal-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-black uppercase">News Not Found</h1>
      <Link to="/news">
        <BrutalButton variant="black">Back to News</BrutalButton>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-brutal-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/news" className="inline-block mb-8 group">
            <div className="flex items-center gap-2 font-black uppercase text-sm group-hover:text-brutal-magenta transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to Gaming News
            </div>
          </Link>

          <header className="mb-10 space-y-6">
            <div className="inline-block bg-brutal-yellow text-brutal-black font-black uppercase text-xs px-4 py-1 border-2 border-brutal-black shadow-[2px_2px_0px_0px_#000]">
              {news.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-space font-black uppercase leading-tight italic">
              {news.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-black opacity-40 uppercase">
              <span>Admin Audira</span>
              <span>•</span>
              <span>{new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </header>

          <div className="mb-12 border-8 border-brutal-black shadow-[12px_12px_0px_0px_#000] overflow-hidden bg-brutal-black">
            <img 
              src={`${STORAGE_URL}/${news.image}`} 
              alt={news.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          <article className="prose prose-xl max-w-none font-space font-bold leading-relaxed text-brutal-black/80">
            {news.content.split('\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t-4 border-brutal-black">
             <h4 className="font-black uppercase mb-6 italic text-2xl">Don't forget to top up!</h4>
             <div className="flex flex-wrap gap-4">
                <Link to="/">
                   <BrutalButton variant="cyan" className="px-8 py-4 text-xl">TOP UP NOW</BrutalButton>
                </Link>
                <Link to="/news">
                   <BrutalButton variant="white" className="px-8 py-4 text-xl">OTHER NEWS</BrutalButton>
                </Link>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NewsDetail;
