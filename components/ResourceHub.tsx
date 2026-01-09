import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Filter, Star, Zap, Database, ArrowLeft, Code, Image as ImageIcon, Video, MessageSquare, Cpu, Music } from 'lucide-react';
import { ResourceItem } from '../types';
import Footer from './Footer';
import ClosingSequence from './ClosingSequence';

const RESOURCES: ResourceItem[] = [
  { id: '1', name: 'ChatGPT (OpenAI)', category: 'LLM', pricing: 'Freemium', popular: true, url: 'https://chat.openai.com', description: 'The industry standard for conversational AI and reasoning.' },
  { id: '2', name: 'Claude 3', category: 'LLM', pricing: 'Freemium', popular: true, url: 'https://claude.ai', description: 'High-performance model known for nuance, coding, and large context windows.' },
  { id: '3', name: 'Gemini', category: 'LLM', pricing: 'Freemium', popular: true, url: 'https://gemini.google.com', description: 'Google\'s multimodal model integrated with real-time search and workspace.' },
  { id: '4', name: 'Midjourney', category: 'Image', pricing: 'Paid', popular: true, url: 'https://midjourney.com', description: 'The highest fidelity artistic image generation available.' },
  { id: '5', name: 'Runway Gen-2', category: 'Video', pricing: 'Freemium', popular: true, url: 'https://runwayml.com', description: 'Text-to-video generation and advanced video in-painting tools.' },
  { id: '6', name: 'GitHub Copilot', category: 'Code', pricing: 'Paid', popular: true, url: 'https://github.com/features/copilot', description: 'AI pair programmer that suggests code and entire functions in real-time.' },
  { id: '7', name: 'Cursor', category: 'Code', pricing: 'Freemium', popular: true, url: 'https://cursor.sh', description: 'An AI-first code editor built for pair-programming with LLMs.' },
  { id: '8', name: 'ElevenLabs', category: 'Audio', pricing: 'Freemium', popular: true, url: 'https://elevenlabs.io', description: 'The most realistic AI voice generation and text-to-speech engine.' },
  { id: '9', name: 'Perplexity', category: 'Productivity', pricing: 'Freemium', popular: true, url: 'https://perplexity.ai', description: 'AI-powered search engine that provides cited answers.' },
  { id: '10', name: 'AutoGPT', category: 'Agent', pricing: 'Free', popular: false, url: 'https://news.agpt.co/', description: 'Open-source autonomous AI agent that chains thoughts to achieve goals.' },
  { id: '11', name: 'Stable Diffusion', category: 'Image', pricing: 'Free', popular: false, url: 'https://stability.ai', description: 'Open weights image generation model capable of running locally.' },
  { id: '12', name: 'Suno', category: 'Audio', pricing: 'Freemium', popular: true, url: 'https://suno.com', description: 'Generates full songs with vocals and instrumentation from text prompts.' },
  { id: '13', name: 'Pika', category: 'Video', pricing: 'Freemium', popular: false, url: 'https://pika.art', description: 'Idea-to-video platform with specific controls for camera movement.' },
  { id: '14', name: 'LangChain', category: 'Code', pricing: 'Free', popular: false, url: 'https://langchain.com', description: 'Framework for developing applications powered by language models.' },
  { id: '15', name: 'Notion AI', category: 'Productivity', pricing: 'Paid', popular: false, url: 'https://notion.so', description: 'Integrated AI assistant for notes, docs, and project management.' },
  { id: '16', name: 'Hugging Face', category: 'Code', pricing: 'Free', popular: true, url: 'https://huggingface.co', description: 'The platform where the machine learning community collaborates on models.' },
];

const CATEGORIES = ['All', 'LLM', 'Image', 'Video', 'Code', 'Audio', 'Productivity', 'Agent'];

interface ResourceHubProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
  onContactClick: () => void;
}

const ResourceHub: React.FC<ResourceHubProps> = ({ onBack, onNavigate, onContactClick }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'LLM': return <MessageSquare size={16} />;
      case 'Image': return <ImageIcon size={16} />;
      case 'Video': return <Video size={16} />;
      case 'Code': return <Code size={16} />;
      case 'Audio': return <Music size={16} />;
      case 'Agent': return <Cpu size={16} />;
      default: return <Zap size={16} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-28 relative z-20 flex flex-col"
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
                        NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">LIBRARY</span>
                    </h1>
                    <p className="text-gray-400 font-mono max-w-xl">
                        // A CURATED DATABASE OF NEXT-GEN AI TOOLS & RESOURCES.
                        <br />
                        // UPDATED DAILY.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-neon-blue border border-neon-blue/20 bg-neon-blue/5 px-4 py-2 rounded">
                    <Database size={14} />
                    DATABASE_SIZE: {RESOURCES.length}_ENTRIES
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-4 focus-within:border-neon-blue/50 transition-colors">
                    <Search className="text-gray-500 mr-3" />
                    <input 
                        type="text" 
                        placeholder="SEARCH_DATABASE..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent w-full outline-none text-white font-mono placeholder-gray-600"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-mono border transition-all ${
                            activeCategory === cat 
                            ? 'bg-white text-black border-white font-bold' 
                            : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {cat === 'All' ? <Filter size={14} className="inline mr-2"/> : null}
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {filteredResources.map((item) => (
                    <motion.a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-surface-light border border-white/10 rounded-xl p-6 overflow-hidden hover:border-neon-blue/50 transition-colors block"
                    >
                        {/* Popular Badge */}
                        {item.popular && (
                            <div className="absolute top-4 right-4 text-neon-purple">
                                <Star size={16} fill="currentColor" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 rounded-lg text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-colors">
                                    {getIcon(item.category)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none mb-1">{item.name}</h3>
                                    <span className="text-[10px] font-mono text-gray-500 border border-gray-800 px-1.5 py-0.5 rounded uppercase">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[3rem]">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className={`text-xs font-mono ${item.pricing === 'Free' ? 'text-green-400' : item.pricing === 'Freemium' ? 'text-yellow-400' : 'text-gray-500'}`}>
                                    {item.pricing.toUpperCase()}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                    ACCESS_TOOL <ExternalLink size={12} />
                                </div>
                            </div>
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.a>
                ))}
            </AnimatePresence>
        </div>
            
        {filteredResources.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-mono">
                NO_DATA_FOUND_FOR_QUERY
            </div>
        )}
      </div>

      <ClosingSequence />
      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </motion.div>
  );
};

export default ResourceHub;