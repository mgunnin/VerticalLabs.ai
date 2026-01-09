
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Hash, User, FileText, Terminal, Search, ChevronRight, X } from 'lucide-react';
import { BlogPost } from '../types';
import Footer from './Footer';
import ClosingSequence from './ClosingSequence';

// Mock Data for Blog Posts
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Death of Syntax: Why Vibe Coding is the Future',
    excerpt: 'Traditional programming paradigms are shifting. As LLMs handle the boilerplate, engineers are becoming architects of intent rather than writers of syntax.',
    date: '2026.11.14',
    readTime: '5 MIN READ',
    category: 'PHILOSOPHY',
    author: 'M. Gunnin',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2500&auto=format&fit=crop',
    tags: ['Vibe Coding', 'Future of Work', 'LLM'],
    content: '' // Content handled in detail view or passed dynamically
  },
  {
    id: '2',
    title: 'Architecting Agent Swarms: Multi-Agent Systems',
    excerpt: 'Single agents are useful. Swarms are revolutionary. A deep dive into the orchestration patterns required to build self-healing, autonomous agent fleets.',
    date: '2026.11.02',
    readTime: '12 MIN READ',
    category: 'ENGINEERING',
    author: 'R. Ortega',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    tags: ['Agents', 'Swarm', 'Architecture'],
    content: ''
  },
  {
    id: '3',
    title: 'Prompt Engineering is Dead. Long Live Context.',
    excerpt: 'Why "magic words" are being replaced by systematic context orchestration and RAG pipelines in enterprise environments.',
    date: '2026.10.24',
    readTime: '8 MIN READ',
    category: 'STRATEGY',
    author: 'M. Gunnin',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    tags: ['RAG', 'Prompting', 'Context'],
    content: ''
  },
  {
    id: '4',
    title: 'The Enterprise RAG Stack: From Toy to Production',
    excerpt: 'Moving beyond simple vector search. How to implement hybrid search, reranking, and evaluation harnesses for mission-critical data retrieval.',
    date: '2026.10.11',
    readTime: '15 MIN READ',
    category: 'TECHNICAL',
    author: 'R. Ortega',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop',
    tags: ['RAG', 'Vector DB', 'Enterprise'],
    content: ''
  }
];

interface BlogListProps {
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onNavigate: (section: string) => void;
  onContactClick: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ onBack, onSelectPost, onNavigate, onContactClick }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white pt-28 relative z-20 flex flex-col"
    >
      <div className="flex-1 px-6 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors mb-8 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                RETURN_TO_BASE
            </button>
            
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
                        INTELLIGENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">BRIEFINGS</span>
                    </h1>
                    <p className="text-gray-400 font-mono max-w-xl">
                        // DECLASSIFIED ARCHIVES ON AI, AGENTS, AND VIBE CODING.
                        <br />
                        // ACCESS LEVEL: GRANTED.
                    </p>
                </div>
                
                <div className="relative group w-full md:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-neon-blue/50 transition-colors w-full md:w-80">
                        <Search className="text-gray-500 mr-3 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="QUERY_ARCHIVES..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent w-full outline-none text-white font-mono text-sm placeholder-gray-600"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="ml-2 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence>
                    {filteredPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredId(post.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => onSelectPost(post)}
                        className="group relative bg-surface-light border border-white/10 rounded-xl overflow-hidden cursor-pointer min-h-[340px] flex flex-col isolate"
                    >
                        {/* Background Layer */}
                        <div className="absolute inset-0 z-0">
                            {/* Base Image - Dimmed and Grayscale initially */}
                            <img 
                                src={post.image} 
                                alt="" 
                                className="w-full h-full object-cover grayscale opacity-20 transition-all duration-700 ease-out group-hover:opacity-50 group-hover:scale-105 group-hover:grayscale-0" 
                            />
                            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-colors duration-700" />
                            
                            {/* Digital Scanline Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,243,255,0.1)_50%,transparent_100%)] h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none opacity-0 group-hover:opacity-100" />
                            
                            {/* Noise Overlay */}
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>

                        {/* Mechanical Sidebar Indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-20 shadow-[0_0_15px_rgba(0,243,255,0.5)]" />

                        {/* Content Container */}
                        <div className="relative z-10 p-8 flex flex-col h-full justify-between transform transition-transform duration-500 group-hover:translate-x-2">
                            
                            {/* Top Metadata */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2 text-xs font-mono text-neon-blue border border-neon-blue/20 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
                                    <Terminal size={12} />
                                    {post.category}
                                </div>
                                <div className="text-xs font-mono text-gray-400 bg-black/40 px-2 py-1 rounded">
                                    {post.date}
                                </div>
                            </div>

                            {/* Main Text */}
                            <div className="space-y-4 mt-auto mb-8 relative">
                                <div className="absolute top-[0.3em] left-0 text-neon-blue opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    <ChevronRight size={24} strokeWidth={3} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-100 transition-all duration-300 group-hover:text-neon-blue group-hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]">
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-8">
                                        {post.title}
                                    </span>
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Bottom Footer */}
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between group-hover:border-neon-blue/30 transition-colors">
                                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-neon-blue text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                    ACCESS_DATA <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Tech HUD Elements - Corner Brackets */}
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto text-center py-20"
            >
                <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-6 relative">
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                    <Search className="w-8 h-8 text-gray-500 relative z-10" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">NO_INTELLIGENCE_FOUND</h3>
                <p className="text-gray-500 font-mono text-sm max-w-md mx-auto">
                    // SYSTEM COULD NOT LOCATE ANY FILES MATCHING QUERY "{searchQuery}". 
                    <br />
                    // PLEASE REFINE SEARCH PARAMETERS.
                </p>
            </motion.div>
        )}
      </div>

      <ClosingSequence />
      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </motion.div>
  );
};

export default BlogList;
