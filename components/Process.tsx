import React from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'CONTACT & DIAGNOSTIC',
    description: 'Submit your project parameters via our initialization console. We perform an initial diagnostic of your current infrastructure and operational objectives.',
    icon: <Search className="w-6 h-6" />,
    color: 'text-neon-blue'
  },
  {
    id: '02',
    title: 'STRATEGIC ALIGNMENT',
    description: 'We evaluate the synergy between your needs and our neural capabilities. If a high-ROI fit is confirmed, we proceed to the architectural planning stage.',
    icon: <Cpu className="w-6 h-6" />,
    color: 'text-neon-purple'
  },
  {
    id: '03',
    title: 'ARCHITECTURAL PROPOSAL',
    description: 'We deliver a comprehensive project blueprint and technical roadmap tailored to your ecosystem, outlining clear milestones and development costs.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-white'
  },
  {
    id: '04',
    title: 'SYSTEM KICK-OFF',
    description: 'Sequence initialized. Our lead architects align directly with your vision to begin the active build-out and custom AI automation deployment.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'text-green-400'
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 px-6 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">ALGORITHM</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 md:space-y-32 relative">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`md:w-1/2 px-0 md:px-16 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className={`inline-block mb-4 p-3 rounded-full bg-white/5 border border-white/10 ${step.color}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-wide">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </motion.div>

                {/* Center Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-black border border-white/20 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 rounded-full border border-neon-blue opacity-20 animate-ping"></div>
                  <span className="font-mono font-bold text-sm">{step.id}</span>
                </div>

                {/* Empty Space for Balance */}
                <div className="md:w-1/2"></div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;