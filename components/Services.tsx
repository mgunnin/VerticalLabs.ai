import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Globe, Database, Bot, Sparkles, Zap, Code2, Network, X, CheckCircle2, ArrowRight, LayoutDashboard, Workflow } from 'lucide-react';
import { ServiceItem } from '../types';
import ScrambleText from './ScrambleText';

// --- DATA DEFINITION ---

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'AI Websites & Dashboards',
    description: 'We build interactive, data-driven web ecosystems with integrated Custom ROI Calculators to track automation impact and system throughput in real-time.',
    details: 'We architect secure, air-gapped neural networks that live inside your firewall. By fine-tuning open-weight models (Llama 3, Mistral) on your proprietary data, we create intelligence that understands your specific business logic without ever leaking data to public APIs.',
    features: ['Custom Model Fine-tuning', 'Air-gapped Deployment', 'Role-Based Access Control', 'Proprietary RAG Pipelines'],
    icon: <LayoutDashboard className="w-6 h-6" />,
    tags: ['React', 'Next.js', 'Analytics']
  },
  {
    id: '2',
    title: 'Autonomous AI Systems',
    description: "Deploy autonomous agents to master the RFP'S bid lifecycle—from intelligent discovery and proposal generation to full back-office automation. We architect for precision, speed, and maximized win-potential.",
    details: 'Moving beyond simple chatbots, we build multi-agent systems where specialized AI workers collaborate to solve complex problems. From research and data analysis to code generation and deployment, these swarms operate 24/7 with self-correction capabilities.',
    features: ['Multi-Agent Orchestration', 'Self-Healing Workflows', 'Human-in-the-loop Handoff', 'Long-term Memory Systems'],
    icon: <Bot className="w-6 h-6" />,
    tags: ['LangChain', 'AutoGPT', 'Node']
  },
  {
    id: '3',
    title: 'Workflow Integration',
    description: 'Seamlessly connect AI into CRMs, ERPs, Notion, Slack, and internal proprietary tools.',
    details: 'The future of the web is immersive. We build high-performance WebGL and WebGPU experiences that transform flat UIs into spatial environments, enabling product visualization, data twins, and interactive storytelling at 60FPS.',
    features: ['WebGL / Three.js', 'React Fiber Ecosystem', 'Physics Simulations', 'VR/AR Web Integration'],
    icon: <Workflow className="w-6 h-6" />,
    tags: ['Integrations', 'API', 'CRM']
  },
  {
    id: '4',
    title: 'Vector Infrastructure',
    description: 'High-performance semantic search engines built on milvus and pinecone clusters.',
    details: 'Data is useless if you cannot find it. We implement massive-scale vector databases that allow for semantic understanding of your unstructured data (PDFs, Audio, Video), enabling "talk to your data" capabilities with sub-millisecond retrieval.',
    features: ['Semantic Search', 'Hybrid Search (Keyword + Vector)', 'Real-time Indexing', 'Multi-modal Embeddings'],
    icon: <Database className="w-6 h-6" />,
    tags: ['Vectors', 'Embeddings', 'Search']
  },
  {
    id: '5',
    title: 'Generative UI',
    description: 'Interfaces that adapt and generate themselves in real-time based on user intent.',
    details: 'Why build static dashboards? We utilize "Generative UI" paradigms where the interface layout, components, and data visualizations construct themselves on the fly based on the user\'s specific query and context.',
    features: ['Component Streaming', 'Adaptive Layouts', 'Intent-based Rendering', 'Dynamic Data Viz'],
    icon: <Sparkles className="w-6 h-6" />,
    tags: ['Generative', 'UI/UX', 'Adaptive']
  },
  {
    id: '6',
    title: 'Real-time Inference',
    description: 'Sub-millisecond latency pipelines for critical decision making systems.',
    details: 'For high-frequency trading, fraud detection, or real-time gaming, latency is the enemy. We optimize inference pipelines using edge computing, WASM, and distilled models to deliver intelligence in under 50ms.',
    features: ['Edge AI Deployment', 'Model Distillation', 'WASM Optimization', 'Global CDN Inference'],
    icon: <Zap className="w-6 h-6" />,
    tags: ['Edge', 'WASM', 'FastAPI']
  },
  {
    id: '7',
    title: 'Smart Contracts',
    description: 'AI-audited solidity contracts for decentralized autonomous organizations.',
    details: 'Merging AI with Web3. We develop decentralized applications where AI agents act as signers on multi-sig wallets, automate treasury management, and audit smart contract code in real-time to prevent exploits.',
    features: ['AI Auditors', 'Agentic Wallets', 'Automated Treasury', 'Solidity Development'],
    icon: <Code2 className="w-6 h-6" />,
    tags: ['Solidity', 'Web3', 'Audit']
  },
  {
    id: '8',
    title: 'Predictive Analytics',
    description: 'Deep learning models that forecast market trends and user behavior with high accuracy.',
    details: 'Stop looking at the past. Our predictive models ingest historical data to forecast future trends, user churn, and inventory requirements, allowing your business to be proactive rather than reactive.',
    features: ['Time-series Forecasting', 'User Behavior Modeling', 'Anomaly Detection', 'Automated Reporting'],
    icon: <Network className="w-6 h-6" />,
    tags: ['Keras', 'Pandas', 'Forecasting']
  }
];

// --- VISUAL COMPONENTS FOR MODAL ---

const CapabilityVisual: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'AI Websites & Dashboards':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border border-neon-blue/30 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-32 h-32 bg-neon-blue/10 rounded-full blur-xl"
          />
          <LayoutDashboard size={64} className="text-neon-blue relative z-10" />
          {/* Nodes */}
          {[...Array(6)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-purple rounded-full"
                animate={{ 
                    x: Math.cos(i * 1.05) * 80, 
                    y: Math.sin(i * 1.05) * 80,
                    scale: [1, 1.5, 1]
                }}
             />
          ))}
        </div>
      );
    case 'Autonomous AI Systems':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
             <Bot size={48} className="text-white relative z-10" />
             {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-neon-blue/40 rounded-full"
                    style={{ width: 100 + i * 40, height: 100 + i * 40 }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-3 h-3 bg-neon-blue rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#00f3ff]" />
                </motion.div>
             ))}
        </div>
      );
    case 'Workflow Integration':
      return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
             <motion.div
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-2 border-neon-purple/50 preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
             >
                 <div className="absolute inset-0 border border-neon-purple/20 translate-z-[20px]" />
                 <div className="absolute inset-0 border border-neon-purple/20 -translate-z-[20px]" />
             </motion.div>
             <Workflow size={48} className="text-white absolute z-10" />
        </div>
      );
    case 'Vector Infrastructure':
        return (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-8 bg-white/5 rounded-sm"
                            animate={{ height: [40, 120, 60, 90, 40] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                    ))}
                </div>
                <motion.div 
                    className="absolute w-full h-1 bg-neon-blue shadow-[0_0_15px_#00f3ff]"
                    animate={{ top: ['20%', '80%', '20%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    case 'Generative UI':
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                 <div className="grid grid-cols-2 gap-2 w-48">
                    <motion.div 
                        className="h-20 bg-white/10 rounded border border-white/20" 
                        animate={{ width: ['100%', '50%', '100%'] }} 
                        transition={{ duration: 4, repeat: Infinity }} 
                    />
                    <motion.div className="h-20 bg-neon-purple/20 rounded border border-neon-purple/40" animate={{ x: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} />
                    <motion.div className="col-span-2 h-10 bg-white/5 rounded" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}/>
                 </div>
                 <Sparkles className="absolute -top-4 -right-4 text-neon-blue" />
            </div>
        );
    case 'Real-time Inference':
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                <svg width="200" height="100" viewBox="0 0 200 100">
                    <motion.path
                        d="M0 50 L20 50 L30 20 L50 80 L70 30 L90 50 L200 50"
                        fill="none"
                        stroke="#00f3ff"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                </svg>
                <Zap className="absolute text-yellow-400" size={32} />
            </div>
        );
    case 'Smart Contracts':
        return (
             <div className="relative w-full h-full flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-neon-blue/30"
                        style={{ width: 60 + i * 40, height: 60 + i * 40, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        animate={{ rotate: [0, 60, 120, 180, 240, 300, 360], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                ))}
                <Code2 size={40} className="text-white z-10" />
             </div>
        );
    default: // Predictive Analytics
        return (
             <div className="relative w-full h-full flex items-center justify-center">
                 <div className="flex items-end gap-3 h-32">
                    {[20, 40, 30, 60, 50, 80, 70, 95].map((h, i) => (
                        <motion.div
                            key={i}
                            className="w-4 bg-gradient-to-t from-neon-purple to-neon-blue"
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                        />
                    ))}
                 </div>
             </div>
        );
  }
}

// --- MAIN COMPONENT ---

const Services: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <section className="py-32 px-6 bg-surface-light/30 relative z-10 overflow-hidden">
        
      {/* Background Grid - Removed local grid to defer to global persistent grid */}
      
      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedService(null)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]"
                >
                    {/* Decorative Borders */}
                    <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-neon-blue to-transparent z-20" />
                    <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-neon-purple to-transparent z-20" />
                    
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedService(null)}
                        className="absolute top-4 right-4 z-30 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Left: Visual/Animation Side */}
                    <div className="w-full md:w-2/5 bg-surface-light border-r border-white/10 relative overflow-hidden flex items-center justify-center p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05),transparent_70%)]" />
                        <div className="absolute top-6 left-6 font-mono text-xs text-neon-blue">
                            VISUAL_REPRESENTATION // 0{selectedService.id}
                        </div>
                        <div className="w-full aspect-square max-w-[250px]">
                            <CapabilityVisual type={selectedService.title} />
                        </div>
                    </div>

                    {/* Right: Content Side */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-black/50 overflow-y-auto max-h-[70vh] md:max-h-full">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue border border-neon-blue/20">
                                    {selectedService.icon}
                                </div>
                                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                                    Capability Details
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                <ScrambleText text={selectedService.title} />
                            </h2>
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                                {selectedService.details}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-widest border-b border-white/10 pb-2">
                                Technical Specifications
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {selectedService.features.map((feature, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3 text-gray-400 group"
                                    >
                                        <CheckCircle2 size={16} className="text-neon-purple group-hover:text-neon-blue transition-colors" />
                                        <span className="group-hover:text-white transition-colors">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-2">
                            {selectedService.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-500">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
            CAPABILITIES <span className="text-neon-purple">.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light">
            We build the infrastructure that powers the artificial intelligence revolution.
          </p>
        </motion.div>

        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative group"
        >
            {services.map((service) => (
                <div 
                    key={service.id} 
                    onClick={() => setSelectedService(service)}
                    className="relative h-64 bg-black border border-white/10 rounded-xl p-6 overflow-hidden group/card hover:border-white/20 transition-colors cursor-pointer"
                >
                    {/* Content */}
                    <div className="relative z-20 flex flex-col h-full justify-between pointer-events-none">
                        <div>
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-neon-blue border border-white/5 group-hover/card:text-white group-hover/card:border-white/20 transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-100 mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{service.description}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex flex-wrap gap-2 mt-4">
                                {service.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-x-2 group-hover/card:translate-x-0 text-neon-blue">
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Spotlight overlay layer */}
            <div 
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            
             {/* Spotlight border layer */}
             <div 
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,243,255,0.15), transparent 40%)`,
                    zIndex: 10
                }}
            />
        </div>
      </div>
    </section>
  );
};

export default Services;