import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Tag, Layers, Code } from 'lucide-react';
import { ProjectItem } from '../types';
import ScrambleText from './ScrambleText';
import Footer from './Footer';
import ClosingSequence from './ClosingSequence';

interface ProjectDetailProps {
  project: ProjectItem;
  onBack: () => void;
  onNext: () => void;
  onNavigate: (section: string) => void;
  onContactClick: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNext, onNavigate, onContactClick }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  return (
    <motion.div 
      className="min-h-screen bg-black text-white relative z-50 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Noise handled globally now, but can keep local if needed for specific overlay feel */}
      
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 bg-black/80 backdrop-blur-md border-b border-white/10">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BACK_TO_ARCHIVE
        </button>
        <div className="font-mono text-xs text-gray-600 hidden md:block">
            CASE_ID: {project.id.padStart(4, '0')} // {project.year}
        </div>
      </div>

      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <motion.img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12 md:pb-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3 mb-6"
                    >
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-wider bg-black/30 backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6">
                        <ScrambleText text={project.title} delay={500} />
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        {project.description}
                    </p>

                    {/* LIVE DEPLOYMENTS SECTION */}
                    {project.liveLinks && project.liveLinks.length > 0 && (
                        <div className="mt-8">
                            <div className="text-xs font-mono text-neon-blue mb-3 tracking-widest uppercase">
                                [ SYSTEM_ACCESS: LIVE_DEPLOYMENTS ]
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {project.liveLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-md text-xs font-mono text-white transition-all duration-300 hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] group"
                                    >
                                        {link.label}
                                        <ExternalLink size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                {/* Sidebar Info (Sticky) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32 space-y-8">
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Client</h3>
                            <div className="text-xl font-bold">{project.client}</div>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Year</h3>
                            <div className="text-xl font-bold">{project.year}</div>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Services</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-gray-300"><Code size={14} className="text-neon-blue"/> AI Architecture</div>
                                <div className="flex items-center gap-2 text-gray-300"><Layers size={14} className="text-neon-blue"/> Full Stack Dev</div>
                                <div className="flex items-center gap-2 text-gray-300"><Calendar size={14} className="text-neon-blue"/> 6 Month Timeline</div>
                            </div>
                        </div>

                        {/* Stats Grid - Mini */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {project.stats.map((stat, i) => (
                                <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/10">
                                    <div className="text-2xl font-bold text-neon-blue">{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1 uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-24">
                    
                    {/* Challenge Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-neon-blue"></div>
                            <h2 className="text-3xl font-bold tracking-tight">THE CHALLENGE</h2>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {project.challenge}
                        </p>
                    </section>

                    {/* Solution Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-neon-purple"></div>
                            <h2 className="text-3xl font-bold tracking-tight">THE INTELLIGENCE</h2>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                            {project.solution}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.gallery.map((img, i) => (
                                <motion.div 
                                    key={i} 
                                    className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src={img} alt="Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Result Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-white"></div>
                            <h2 className="text-3xl font-bold tracking-tight">THE RESULT</h2>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-neon-blue/20 blur-[100px] rounded-full pointer-events-none"></div>
                            <p className="text-2xl text-white leading-relaxed relative z-10">
                                "{project.result}"
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                                <div className="flex gap-2 text-neon-blue">
                                    <Tag size={16} />
                                    <span className="text-sm font-mono">OUTCOME_VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>

        {/* Next Project Footer */}
        <div 
            className="border-t border-white/10 py-24 px-6 text-center cursor-pointer group relative overflow-hidden"
            onClick={onNext}
        >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            <h3 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">Next Case Study</h3>
            <div className="text-5xl md:text-8xl font-display font-bold tracking-tighter group-hover:text-neon-blue transition-colors duration-300 flex items-center justify-center gap-6">
                NEXT PROJECT <ArrowRight className="w-12 h-12 md:w-24 md:h-24 group-hover:translate-x-4 transition-transform duration-300" />
            </div>
        </div>
      </div>
      
      <ClosingSequence />
      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </motion.div>
  );
};

export default ProjectDetail;