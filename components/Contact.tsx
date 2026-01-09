import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Mail, Globe, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import ScrambleText from './ScrambleText';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "AI Websites & Dashboards", 
  "Autonomous AI Systems", 
  "Workflow Integration", 
  "Vector Infrastructure", 
  "Generative UI", 
  "Real-time Inference",
  "Smart Contracts",
  "Predictive Analytics"
];

const BUDGETS = [
  "< $50k", "$50k - $100k", "$100k - $500k", "$500k+"
];

const TIMELINES = [
  "ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months"
];

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'sending' | 'success' | 'error'>('form');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    services: [],
    budget: '',
    timeline: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
                subject: "New Vertical Labs Partnership Request (Overlay)"
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
        name: '',
        email: '',
        company: '',
        services: [],
        budget: '',
        timeline: '',
        message: ''
    });
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 text-gray-500 hover:text-white transition-colors group flex items-center gap-2"
          >
            <span className="text-xs font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity">Abort</span>
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/50 bg-black">
                <X size={20} />
            </div>
          </button>

          <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
            
            {/* LEFT COLUMN - INFO & VISUALS */}
            <div className="w-full lg:w-5/12 bg-surface relative p-12 hidden lg:flex flex-col justify-between border-r border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,243,255,0.05),transparent_40%)]" />
                
                <div>
                    <div className="flex items-center gap-2 text-neon-blue mb-6">
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                        <span className="font-mono text-xs tracking-widest uppercase">Secure Channel Open</span>
                    </div>
                    <h2 className="text-5xl font-display font-bold tracking-tighter mb-6 leading-tight">
                        INITIATE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">PARTNERSHIP</span>
                    </h2>
                    <p className="text-gray-400 max-w-md leading-relaxed">
                        Ready to deploy next-generation intelligence? Our architects are standing by to audit your infrastructure and propose a vertical solution.
                    </p>
                </div>

                {/* Abstract Globe/Network visual */}
                <div className="relative w-full aspect-square opacity-30">
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="absolute inset-16 border border-neon-blue/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-blue/20">
                        <Globe size={120} strokeWidth={0.5} />
                    </div>
                </div>

                <div className="space-y-6 font-mono text-sm text-gray-400">
                    <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                        <Mail size={16} className="text-neon-blue" />
                        <span>raquel@verticallabs.ai</span>
                    </div>
                    <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                        <MapPin size={16} className="text-neon-blue" />
                        <span>Austin, Texas // Sector 7G</span>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="w-full lg:w-7/12 relative overflow-y-auto">
                <div className="min-h-full p-8 md:p-20 flex items-center justify-center">
                    <div className="max-w-xl w-full">
                        
                        <AnimatePresence mode='wait'>
                            {step === 'form' && (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-12"
                                >
                                    {/* Web3Forms Access Key */}
                                    <input type="hidden" name="access_key" value="da8f2084-27a0-4b26-aa24-2eeebd860a45" />

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
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors"
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
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors"
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
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-neon-blue transition-colors"
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
                                                            className={`px-4 py-2 rounded-full text-sm border transition-all ${
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
                                                rows={4}
                                                value={formData.message}
                                                onChange={e => setFormData({...formData, message: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded p-4 text-gray-300 focus:outline-none focus:border-neon-blue transition-colors resize-none"
                                                placeholder="Describe your project requirements and target objectives..."
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                        <div className="hidden md:block text-xs font-mono text-gray-600">
                                            ENCRYPTED_CONNECTION::TRUE
                                        </div>
                                        <button
                                            type="submit"
                                            className="relative group bg-white text-black px-8 py-4 font-bold tracking-wider overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2 group-hover:text-black transition-colors">
                                                RUN_INITIALIZATION_SEQUENCE <ArrowRight size={16} />
                                            </span>
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {step === 'sending' && (
                                <motion.div
                                    key="sending"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center space-y-6 py-20"
                                >
                                    <div className="relative w-24 h-24">
                                        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                                        <div className="absolute inset-4 bg-neon-blue/10 rounded-full animate-pulse" />
                                        <Loader2 className="absolute inset-0 m-auto text-neon-blue animate-spin" size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold font-display mb-2">ENCRYPTING DATA</h3>
                                        <p className="font-mono text-neon-blue text-sm">
                                            <ScrambleText text="[ INITIALIZING_UPLINK... ]" />
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="relative flex flex-col items-center justify-center text-center space-y-8 py-16 bg-black/80 border border-green-500/30 rounded-2xl p-12 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                                >
                                    {/* Background glow effect */}
                                    <div className="absolute inset-0 bg-green-500/5 blur-3xl pointer-events-none" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)] animate-pulse-slow pointer-events-none" />
                                    
                                    {/* Radiating Icon */}
                                    <div className="relative mb-4">
                                        {/* Outer Rings */}
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute inset-0 border border-green-500/30 rounded-full"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ scale: 2.5, opacity: 0 }}
                                                transition={{ 
                                                    duration: 2.5, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.8,
                                                    ease: "easeOut"
                                                }}
                                            />
                                        ))}
                                        
                                        <motion.div 
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            className="relative w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/20 z-10 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                        >
                                            <CheckCircle size={48} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <motion.h3 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-4xl font-display font-bold text-white tracking-tight"
                                        >
                                            [ SUCCESS: <span className="text-green-400">PARTNERSHIP_REQUEST_LOGGED</span> ]
                                        </motion.h3>
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="text-gray-400 max-w-sm mx-auto leading-relaxed font-light"
                                        >
                                            Your inquiry has been successfully encrypted and logged. A strategist will decode your request and establish a secure uplink within 24 hours.
                                        </motion.div>
                                    </div>

                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        onClick={resetForm}
                                        className="text-xs font-mono text-green-400 hover:text-white border-b border-green-400/50 hover:border-white transition-colors pb-1 uppercase tracking-widest mt-4"
                                    >
                                        // Return to System
                                    </motion.button>
                                </motion.div>
                            )}

                            {step === 'error' && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="relative flex flex-col items-center justify-center text-center space-y-8 py-16 bg-black/80 border border-red-500/30 rounded-2xl p-12 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)]"
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
      )}
    </AnimatePresence>
  );
};

export default Contact;