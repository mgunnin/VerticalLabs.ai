import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Cpu, User, Loader2, Terminal, Activity, Zap } from 'lucide-react';
import { Message } from '../types';
import { generateChatResponse } from '../services/geminiService';

interface AiDemoProps {
  onContactClick?: (transcript?: string) => void;
}

const AiDemo: React.FC<AiDemoProps> = ({ onContactClick }) => {
  const [input, setInput] = useState('');
  // PHASE 0: INITIALIZATION (Vertical Core Technical Tone)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "VERTICAL_CORE_ONLINE. System ready for scoping. Which architectural module are we analyzing: a Core Interface, an Autonomous Agent, or a Bid Automation system?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnCount = useRef(0);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    turnCount.current += 1;

    try {
      const historyForApi = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // Await the structured response (text + action flag)
      const { text, hasAction } = await generateChatResponse(historyForApi, userMsg.content);
      
      setMessages(prev => [...prev, { role: 'model', content: text, hasAction: hasAction }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "CRITICAL ERROR: CONNECTION SEVERED.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCtaClick = () => {
      // Generate Conversation Transcript
      const transcript = messages.map(m => 
        `[${m.role === 'user' ? 'CLIENT' : 'VERTICAL_CORE'}]: ${m.content}`
      ).join('\n\n');
      
      const formattedSpec = `--- AUTOMATED ARCHITECTURAL SPEC ---\n${transcript}\n----------------------------------`;

      if (onContactClick) {
          onContactClick(formattedSpec);
      } else {
          // Fallback if no prop provided
          const contactSection = document.getElementById('contact');
          if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
          }
      }
  };

  return (
    <section id="ai-consultant" className="pt-4 pb-32 px-4 relative z-10 flex justify-center items-start">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-neon-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full relative mt-4">
        
        {/* HUD Container */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden relative shadow-2xl">
            
            {/* Scanline Effect - Animated Shimmer */}
            <motion.div 
              animate={{ opacity: [0.15, 0.22, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20" 
            />
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue z-30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue z-30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue z-30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue z-30" />

            {/* Header */}
            <div className="bg-black/60 px-6 py-4 border-b border-white/10 flex items-center justify-between relative z-30">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <motion.span 
                          animate={{ 
                            textShadow: ["0 0 5px rgba(0,243,255,0.3)", "0 0 12px rgba(0,243,255,0.6)", "0 0 5px rgba(0,243,255,0.3)"],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="text-neon-blue font-mono font-bold text-sm tracking-widest"
                        >
                          CORE TERMINAL
                        </motion.span>
                        <span className="text-[10px] text-gray-500 font-mono">V 2.5.0 // CONNECTED</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-xs text-green-500 font-mono">SYSTEM STABLE</span>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-700" />
                    <div className="text-xs text-gray-500 font-mono">LATENCY: 12ms</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-[600px]">
                {/* Sidebar Stats - Only visible on desktop */}
                <div className="hidden md:flex w-64 border-r border-white/10 bg-black/20 flex-col p-6 gap-6 font-mono text-xs text-gray-400">
                    <div>
                        <div className="text-white font-bold mb-2">ACTIVE MODULES</div>
                        <ul className="space-y-2">
                            <li className="flex justify-between text-neon-blue"><span>NLP_ENGINE</span> <span>ON</span></li>
                            <li className="flex justify-between"><span>RAG_PIPELINE</span> <span>ON</span></li>
                            <li className="flex justify-between"><span>VISION_V2</span> <span>STBY</span></li>
                        </ul>
                    </div>
                    <div className="h-[1px] bg-white/10" />
                    <div className="flex-1 relative overflow-hidden">
                         <div className="text-white font-bold mb-2">MEMORY BANK</div>
                         <div className="absolute inset-0 top-8 opacity-30">
                            {Array.from({length: 20}).map((_, i) => (
                                <div key={i} className="text-[10px] whitespace-nowrap overflow-hidden font-mono">
                                    0x{Math.floor(Math.random()*16777215).toString(16)}...
                                </div>
                            ))}
                         </div>
                    </div>
                    <div className="text-[10px] text-gray-600">
                        SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-black/80 relative z-30">
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-6 scrollbar-thin scrollbar-thumb-neon-blue/20 scrollbar-track-black"
                    >
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-white/10 border border-white/10' : 'bg-neon-blue/5 border border-neon-blue/20'} p-4 rounded-sm backdrop-blur-md relative`}>
                                    {/* Decorative little corners for messages */}
                                    <div className={`absolute top-0 w-2 h-2 border-t border-${msg.role === 'user' ? 'white' : 'neon-blue'} ${msg.role === 'user' ? 'right-0 border-r' : 'left-0 border-l'}`} />
                                    <div className={`absolute bottom-0 w-2 h-2 border-b border-${msg.role === 'user' ? 'white' : 'neon-blue'} ${msg.role === 'user' ? 'left-0 border-l' : 'right-0 border-r'}`} />
                                    
                                    <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] uppercase tracking-wider">
                                        {msg.role === 'user' ? <User size={10} /> : <Cpu size={10} />}
                                        {msg.role === 'user' ? 'PROSPECT_IDENTIFIED' : 'VERTICAL_CORE'}
                                    </div>
                                    <div className={`leading-relaxed ${msg.isError ? 'text-red-400' : msg.role === 'user' ? 'text-gray-200' : 'text-neon-blue shadow-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]'}`}>
                                       {msg.role === 'model' ? <TypewriterEffect text={msg.content} /> : msg.content}
                                       
                                       {/* Functional CTA Button */}
                                       {msg.hasAction && (
                                           <motion.button 
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1 }}
                                                onClick={handleCtaClick}
                                                className="mt-4 w-full border border-neon-blue/30 bg-neon-blue/5 hover:bg-neon-blue hover:text-black text-neon-blue px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group cursor-pointer"
                                            >
                                                <Zap size={14} className="group-hover:fill-current" />
                                                [ INITIALIZE_PARTNERSHIP_PROTOCOL ]
                                            </motion.button>
                                       )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        {loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-neon-blue/50 text-xs font-mono">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                PROCESSING_NEURAL_PATHWAYS...
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black/90">
                        <form onSubmit={handleSend} className="flex gap-4 items-center">
                            <div className="text-neon-blue">
                                <Terminal size={18} />
                            </div>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ENTER COMMAND OR QUERY..."
                                className="flex-1 bg-transparent border-none text-white placeholder-gray-700 focus:ring-0 font-mono text-sm tracking-wider caret-neon-blue"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-neon-blue hover:text-white transition-colors disabled:opacity-30 uppercase text-xs font-bold tracking-widest flex items-center gap-2"
                            >
                                EXECUTE <Zap size={14} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    
    useEffect(() => {
        let i = 0;
        setDisplayText('');
        setIsTyping(true);
        
        const timer = setInterval(() => {
            if (i < text.length) {
                // Use slice to ensure absolute correctness of the string at every frame
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(timer);
            }
        }, 10); // Sped up to 10ms to meet the 2-3 second constraint
        
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {displayText}
            {isTyping && <span className="inline-block w-2 h-4 bg-neon-blue ml-1 animate-pulse align-middle" />}
        </span>
    );
};

export default AiDemo;