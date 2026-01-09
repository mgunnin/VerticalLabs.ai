import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import ScrambleText from './ScrambleText';
import Footer from './Footer';
import ClosingSequence from './ClosingSequence';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onNavigate: (section: string) => void;
  onContactClick: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack, onNavigate, onContactClick }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white relative z-20 flex flex-col"
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-blue origin-left z-50"
        style={{ scaleX }}
      />

      <div className="flex-1">
        {/* Header Image */}
        <div className="relative h-[50vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60" />
            
            <div className="absolute top-24 left-6 z-20">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-mono text-white/70 hover:text-neon-blue transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                >
                    <ArrowLeft size={16} />
                    RETURN_TO_ARCHIVE
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 bg-neon-blue text-black font-bold text-xs font-mono rounded uppercase">
                            {post.category}
                        </span>
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 border border-white/20 bg-black/50 backdrop-blur rounded text-xs font-mono uppercase">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight mb-6 text-white">
                        <ScrambleText text={post.title} delay={300} />
                    </h1>
                    <div className="flex items-center gap-6 text-sm font-mono text-gray-400 border-t border-white/10 pt-6">
                        <div className="flex items-center gap-2"><Calendar size={14} /> {post.date}</div>
                        <div className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</div>
                        <div className="flex items-center gap-2"><User size={14} /> {post.author}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="prose prose-invert prose-lg max-w-none font-light leading-relaxed text-gray-300">
                <p className="text-2xl text-white font-display leading-relaxed mb-12 border-l-4 border-neon-blue pl-6 italic">
                    {post.excerpt}
                </p>
                
                {/* Simulated Rich Text Content - In a real app this would come from a CMS or Markdown */}
                <p>
                    The landscape of software development is undergoing a tectonic shift. For decades, we have been obsessed with syntax: the specific incantations required to convince a compiler to execute our will. We spent years mastering languages, frameworks, and design patterns.
                </p>
                <p>
                    But with the advent of advanced LLMs like Gemini 1.5 Pro and Claude 3.5 Sonnet, the barrier between intent and execution is dissolving. We are entering the era of <strong>"Vibe Coding"</strong>.
                </p>
                
                <h3 className="text-2xl text-white font-bold mt-12 mb-6 flex items-center gap-3">
                    <span className="text-neon-purple">01 //</span> The Shift from Syntax to Semantics
                </h3>
                <p>
                    In traditional coding, you translate logic into code. In Vibe Coding, you curate logic. The AI handles the syntax, the boilerplate, and the implementation details. Your role elevates to that of an Architect or a Director. You are responsible for the <em>"vibe"</em> of the application—its behavior, its user experience, and its structural integrity.
                </p>

                <div className="my-12 bg-white/5 border border-white/10 rounded-xl p-8">
                    <h4 className="text-lg font-bold text-white mb-4 font-mono uppercase tracking-widest">Core Principles of Vibe Coding</h4>
                    <ul className="space-y-3 text-sm font-mono text-gray-400">
                        <li className="flex items-start gap-3">
                            <span className="text-neon-blue">PLEASE_NOTE::</span>
                            <span>Focus on system design, not function implementation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-neon-blue">PLEASE_NOTE::</span>
                            <span>Iterate on natural language prompts as if they were code commits.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-neon-blue">PLEASE_NOTE::</span>
                            <span>Verification becomes more important than writing.</span>
                        </li>
                    </ul>
                </div>

                <h3 className="text-2xl text-white font-bold mt-12 mb-6 flex items-center gap-3">
                    <span className="text-neon-purple">02 //</span> The Agentic Workflow
                </h3>
                <p>
                    This shift enables a new kind of workflow. Instead of writing a function to parse a CSV, you ask an agent to "create a robust data ingestion pipeline that handles edge cases X, Y, and Z." The agent writes the code, writes the tests, and documents the usage. 
                </p>
                <p>
                    At Vertical Labs, we leverage this to build enterprise-grade systems at startup speeds. By utilizing swarm intelligence, we can have one agent draft the architecture while another critiques it for security vulnerabilities.
                </p>

                <p className="mt-12">
                    The future belongs to those who can think clearly, not just those who can type quickly.
                </p>
            </div>

            {/* Footer Share */}
            <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
                <div className="font-mono text-xs text-gray-500">END OF TRANSMISSION</div>
                <button className="flex items-center gap-2 text-sm font-mono text-white hover:text-neon-blue transition-colors">
                    <Share2 size={16} /> SHARE_BRIEFING
                </button>
            </div>
        </div>
      </div>

      <ClosingSequence />
      <Footer onNavigate={onNavigate} onContactClick={onContactClick} />
    </motion.div>
  );
};

export default BlogPostView;