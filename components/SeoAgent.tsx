import React from 'react';
import { motion } from 'framer-motion';
import { Target, Database } from 'lucide-react';

const SeoAgent: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative z-10 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(189,0,255,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="lg:w-1/2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
            <span className="text-xs font-mono text-neon-purple tracking-widest uppercase">
              NEW_CAPABILITY_ONLINE
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6 leading-tight">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
              SEO SENTINEL
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
            The algorithms have changed. Static SEO is dead. Deploy our neural agent to continuously scan search vectors, optimize semantic relevance, and secure SERP dominance in real-time.
          </p>

          <div className="space-y-4">
            {[
              "Real-time SERP Vector Analysis",
              "Competitor Keyword Decryption",
              "Automated Schema & Meta Injection",
              "Semantic Gap Detection & Content Filling"
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-sm font-mono text-gray-300 group"
              >
                <div className="w-1.5 h-1.5 bg-neon-blue rounded-sm group-hover:bg-neon-purple transition-colors" />
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* HUD Visual */}
        <div className="lg:w-1/2 w-full">
          <div className="relative bg-black/40 border border-white/10 rounded-lg p-1 backdrop-blur-sm shadow-2xl">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-neon-purple" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-neon-purple" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-neon-purple" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-neon-purple" />

            {/* Header */}
            <div className="bg-white/5 border-b border-white/5 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Database size={14} className="text-neon-blue" />
                    <span className="text-xs font-mono text-neon-blue tracking-wider">SENTINEL_CORE_V3</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 space-y-6 relative overflow-hidden">
                {/* Scanline */}
                <motion.div 
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-neon-purple/50 shadow-[0_0_20px_#bd00ff] z-10 pointer-events-none"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/60 p-4 border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Domain_Authority</div>
                        <div className="text-3xl font-bold text-white flex items-end gap-2 font-display">
                            94 <span className="text-xs font-mono text-green-400 mb-1.5">+4.2%</span>
                        </div>
                    </div>
                    <div className="bg-black/60 p-4 border border-white/5 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Organic_Traffic</div>
                        <div className="text-3xl font-bold text-white flex items-end gap-2 font-display">
                            1.2M <span className="text-xs font-mono text-green-400 mb-1.5">↑</span>
                        </div>
                    </div>
                </div>

                {/* Keyword Grid */}
                <div className="border border-white/5 bg-black/40 p-4">
                    <div className="flex justify-between mb-4">
                         <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Target_Keywords</span>
                         <span className="text-[10px] font-mono text-neon-purple animate-pulse">OPTIMIZING...</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { k: "neural_search_optimization", v: "RANK #1", trend: "stable" },
                            { k: "autonomous_seo_agents", v: "RANK #3", trend: "up" },
                            { k: "generative_engine_opt", v: "CLIMBING", trend: "up" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <Target size={10} className="text-gray-600" />
                                    {item.k}
                                </span>
                                <span className={`${item.trend === 'stable' ? 'text-neon-blue' : 'text-green-400'} font-bold`}>
                                    {item.v}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Graph Visualization Mockup - Ambient Mode */}
                 <div className="h-24 flex items-end gap-1 p-2 border border-white/5 bg-black/40 relative">
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-600">TRAFFIC_VECTOR</div>
                    {/* Fixed seed data for consistent look, or randomness if preferred. Using map index for randomness. */}
                    {Array.from({ length: 24 }).map((_, i) => {
                        // Create a "full height" looking graph shape with some variation (40% to 90%)
                        // Using sine wave + random noise to make it look like data
                        const baseHeight = 50 + Math.sin(i * 0.5) * 20 + Math.random() * 20;
                        return (
                        <motion.div 
                            key={i}
                            className="flex-1 bg-gradient-to-t from-neon-purple/20 to-neon-purple/60 hover:from-neon-blue/20 hover:to-neon-blue/60 transition-colors rounded-t-sm"
                            initial={{ height: `${baseHeight}%` }}
                            animate={{ 
                                height: [`${baseHeight}%`, `${baseHeight + 10}%`, `${baseHeight}%`],
                                opacity: [0.6, 0.9, 0.6]
                            }}
                            transition={{ 
                                duration: 3 + (i % 3), // Slow, staggered pulsing (3s - 5s)
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: i * 0.1 
                            }}
                        />
                    )})}
                 </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SeoAgent;