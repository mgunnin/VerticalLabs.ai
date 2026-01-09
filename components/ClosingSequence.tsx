import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Mail, Globe, MapPin, Cpu, Zap, X, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import ScrambleText from './ScrambleText';

const SERVICES = [
  "AI Websites & Dashboards", 
  "Autonomous AI Systems", 
  "Workflow Integration", 
  "Real-time Inference", 
  "Smart Contracts"
];

const BUDGETS = ["< $50k", "$50k - $100k", "$100k - $500k", "$500k+"];
const TIMELINES = ["ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months"];

interface ClosingSequenceProps {
    isOpen?: boolean;
    onToggle?: (newState: boolean) => void;
    aiTranscript?: string;
}

// Reused MagneticButton for visual consistency with Hero
const MagneticButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit" }> = ({ children, onClick, className, type = "button" }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    }

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            type={type}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative group cursor-pointer ${className || ''}`}
        >
            {children}
        </motion.button>
    )
}

const ClosingSequence: React.FC<ClosingSequenceProps> = ({ isOpen: externalIsOpen, onToggle: externalOnToggle, aiTranscript }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const [step, setStep] = useState<'form' | 'sending' | 'success' | 'error'>('form');
  const sectionRef = useRef<HTMLElement>(null);
  const lastTranscriptRef = useRef('');
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    services: [],
    budget: '',
    timeline: '',
    message: ''
  });

  // Effect to scroll when opened (controlled or uncontrolled)
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
  }, [isOpen]);

  // Effect to handle AI Transcript Auto-fill
  useEffect(() => {
    if (isOpen && aiTranscript && aiTranscript !== lastTranscriptRef.current) {
        setFormData(prev => {
            // Avoid duplicate appending
            if (prev.message.includes(aiTranscript)) return prev;

            const spacer = prev.message.trim() ? '\n\n' : '';
            return {
                ...prev,
                message: prev.message + spacer + aiTranscript
            }
        });
        lastTranscriptRef.current = aiTranscript;
    }
  }, [isOpen, aiTranscript]);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('sending');

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "da8f2084-27a0-4b26-aa24-2eeebd860a45",
                visitor_name: formData.name,
                email: formData.email,
                company: formData.company,
                protocols_requested: formData.services.join(', '),
                budget: formData.budget,
                timeline: formData.timeline,
                message: formData.message,
                ai_generated_spec: aiTranscript, // Explicitly include in payload
                subject: "New Vertical Labs Partnership Request"
            }),
        });
        
        const result = await response.json();
        
        if (result.success) {
            setStep('success');
        } else {
            console.error(result);
            setStep('error');
        }
    } catch (error) {
        console.error(error);
        setStep('error');
    }
  };

  const resetForm = () => {
    setFormData({
        name: '', email: '', company: '', services: [], budget: '', timeline: '', message: ''
    });
    setStep('form');
  };

  const handleToggle = () => {
      const newState = !isOpen;
      
      if (isControlled && externalOnToggle) {
          externalOnToggle(newState);
      } else {
          setInternalIsOpen(newState);
      }
  };

  return (
    <section 
        id="contact" 
        ref={sectionRef}
        className="relative z-20 bg-black pt-32 pb-0 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-neon-blue">
                  [ SYSTEM_STATUS: READY_FOR_INPUT ]
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-gray-600">
                  // ARCHITECTS_STANDING_BY
              </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none mb-12">
              INITIATE <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">
                  PARTNERSHIP
              </span>
          </h2>
          
          <motion.div>
              <MagneticButton onClick={handleToggle}>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-80 blur-md group-hover:blur-lg transition-all duration-500" />
                  <div className="relative bg-black border border-white/20 px-8 py-4 flex items-center gap-3 group-hover:border-white/50 transition-colors">
                      <span className="font-bold tracking-wider text-white">
                        {isOpen ? "[ CLOSE_SECURE_CHANNEL ]" : "[ OPEN_SECURE_CHANNEL ]"}
                      </span>
                      {isOpen ? <X className="w-4 h-4 text-neon-blue" /> : <Cpu className="w-4 h-4 text-neon-blue" />}
                  </div>
              </MagneticButton>
          </motion.div>
      </div>

      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-hidden"
      >
        <div className="border-y border-white/10 bg-surface-light/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                
                {/* LEFT COLUMN - VISUALS */}
                <div className="w-full lg:w-5/12 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03),transparent_60%)]" />
                    
                    {/* Abstract Globe/Network visual */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square opacity-20 pointer-events-none">
                        <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
                        <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                        <div className="absolute inset-24 border border-neon-blue/20 rounded-full animate-[spin_15s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-blue/20">
                            <Globe size={180} strokeWidth={0.5} />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-8">
                            Our architects are ready to audit your infrastructure and propose a vertical solution. Secure a slot in our production queue below.
                        </p>
                    </div>

                    <div className="space-y-6 font-mono text-sm text-gray-400 relative z-10">
                        <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
                            <div className="p-2 bg-white/5 rounded-full group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors">
                                <Mail size={16} />
                            </div>
                            <span>raquel@verticallabs.ai</span>
                        </div>
                        <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
                            <div className="p-2 bg-white/5 rounded-full group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors">
                                <MapPin size={16} />
                            </div>
                            <span>Austin, Texas // Sector 7G</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - CONSOLE */}
                <div className="w-full lg:w-7/12 bg-black/50">
                    <div className="p-8 md:p-12">
                        <AnimatePresence mode='wait'>
                            {step === 'form' && (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-12"
                                >
                                    {/* Web3Forms Access Key */}
                                    <input type="hidden" name="access_key" value="da8f2084-27a0-4b26-aa24-2eeebd860a45" />
                                    
                                    {/* Hidden AI Spec Field */}
                                    <input type="hidden" name="ai_generated_spec" id="ai_spec_field" value={aiTranscript || ''} />

                                    <div className="space-y-8">
                                        {/* Identity Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-6">01 // Identity</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="group relative">
                                                    <input
                                                        type="text"
                                                        name="visitor_name"
                                                        required
                                                        value={formData.name}
                                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors text-white"
                                                        placeholder=" "
                                                    />
                                                    <label className="absolute left-0 top-2 text-gray-500 pointer-events-none transition-all duration-300 group-focus-within:-top-5 group-focus-within:text-xs group-focus-within:text-neon-blue peer-valid:-top-5 peer-valid:text-xs">
                                                        Full Name
                                                    </label>
                                                </div>
                                                <div className="group relative">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors text-white"
                                                        placeholder=" "
                                                    />
                                                    <label className="absolute left-0 top-2 text-gray-500 pointer-events-none transition-all duration-300 group-focus-within:-top-5 group-focus-within:text-xs group-focus-within:text-neon-blue peer-valid:-top-5 peer-valid:text-xs">
                                                        Email Address
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="group relative">
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={e => setFormData({...formData, company: e.target.value})}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors text-white"
                                                    placeholder=" "
                                                />
                                                <label className="absolute left-0 top-2 text-gray-500 pointer-events-none transition-all duration-300 group-focus-within:-top-5 group-focus-within:text-xs group-focus-within:text-neon-blue peer-valid:-top-5 peer-valid:text-xs">
                                                    Company / Organization
                                                </label>
                                            </div>
                                        </div>

                                        {/* Protocols Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-6">02 // Protocols</h3>
                                            
                                            <div className="space-y-3">
                                                <label className="text-sm text-gray-400">Required Capabilities</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {SERVICES.map(service => (
                                                        <button
                                                            key={service}
                                                            type="button"
                                                            onClick={() => toggleService(service)}
                                                            className={`px-4 py-2 rounded-full text-xs md:text-sm border transition-all ${
                                                                formData.services.includes(service)
                                                                    ? 'bg-neon-blue text-black border-neon-blue font-bold'
                                                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                                                            }`}
                                                        >
                                                            {service}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-4">
                                                <label className="text-sm text-gray-400">Estimated Allocation</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {BUDGETS.map(budget => (
                                                        <button
                                                            key={budget}
                                                            type="button"
                                                            onClick={() => setFormData({...formData, budget})}
                                                            className={`px-4 py-2 text-sm border transition-all skew-x-[-10deg] ${
                                                                formData.budget === budget
                                                                    ? 'bg-neon-purple text-white border-neon-purple'
                                                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                                                            }`}
                                                        >
                                                            <div className="skew-x-[10deg]">{budget}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-4">
                                                <label className="text-sm text-gray-400">Timeline</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {TIMELINES.map(timeline => (
                                                        <button
                                                            key={timeline}
                                                            type="button"
                                                            onClick={() => setFormData({...formData, timeline})}
                                                            className={`px-4 py-2 text-sm border transition-all skew-x-[-10deg] ${
                                                                formData.timeline === timeline
                                                                    ? 'bg-neon-blue text-black border-neon-blue font-bold'
                                                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                                                            }`}
                                                        >
                                                            <div className="skew-x-[10deg]">{timeline}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Brief Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-6">03 // Mission Brief</h3>
                                            <textarea
                                                name="message"
                                                rows={3}
                                                value={formData.message}
                                                onChange={e => setFormData({...formData, message: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded p-4 text-gray-300 focus:outline-none focus:border-neon-blue transition-colors resize-none placeholder-gray-600"
                                                placeholder="Describe your project requirements and target objectives..."
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                                        <div className="hidden md:block text-xs font-mono text-gray-600">
                                            ENCRYPTED_CONNECTION::TRUE
                                        </div>
                                        
                                        {/* MATCH HERO CTA STYLE */}
                                        <MagneticButton type="submit">
                                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-80 blur-md group-hover:blur-lg transition-all duration-500" />
                                            <div className="relative bg-black border border-white/20 px-8 py-4 flex items-center gap-3 group-hover:border-white/50 transition-colors">
                                                <span className="font-bold tracking-wider text-white">[ RUN_INITIALIZATION_SEQUENCE ]</span>
                                                <Zap className="w-4 h-4 text-neon-blue" />
                                            </div>
                                        </MagneticButton>
                                    </div>
                                </motion.form>
                            )}

                            {step === 'sending' && (
                                <motion.div
                                    key="sending"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center space-y-6 py-20 min-h-[400px]"
                                >
                                    <div className="relative w-24 h-24">
                                        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                                        <div className="absolute inset-4 bg-neon-blue/10 rounded-full animate-pulse" />
                                        <Loader2 className="absolute inset-0 m-auto text-neon-blue animate-spin" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold font-display mb-2 text-white">ENCRYPTING DATA</h3>
                                        <p className="font-mono text-neon-blue text-sm">
                                            <ScrambleText text="[ INITIALIZING_UPLINK... ]" />
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative flex flex-col items-center justify-center text-center space-y-8 py-16 min-h-[400px]"
                                >
                                    <div className="relative mb-4">
                                        <motion.div 
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            className="relative w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/20 z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                        >
                                            <CheckCircle size={48} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                                            [ SUCCESS: <span className="text-green-400">PARTNERSHIP_REQUEST_LOGGED</span> ]
                                        </h3>
                                        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed font-light">
                                            Your inquiry has been logged. A strategist will decode your request and establish a secure uplink within 24 hours.
                                        </p>
                                    </div>

                                    <button
                                        onClick={resetForm}
                                        className="text-xs font-mono text-green-400 hover:text-white border-b border-green-400/50 hover:border-white transition-colors pb-1 uppercase tracking-widest mt-4"
                                    >
                                        // Submit Another Query
                                    </button>
                                </motion.div>
                            )}
                            
                            {step === 'error' && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative flex flex-col items-center justify-center text-center space-y-8 py-16 min-h-[400px]"
                                >
                                    <div className="relative mb-4">
                                        <motion.div 
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            className="relative w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 border border-red-500/20 z-10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                        >
                                            <AlertCircle size={48} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                                            [ ERROR: <span className="text-red-400">UPLINK_FAILED</span> ]
                                        </h3>
                                        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed font-light">
                                            Connection to the mainframe was interrupted. Please check your signal and attempt re-transmission.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setStep('form')}
                                        className="text-xs font-mono text-red-400 hover:text-white border-b border-red-400/50 hover:border-white transition-colors pb-1 uppercase tracking-widest mt-4"
                                    >
                                        // Retry Connection
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClosingSequence;