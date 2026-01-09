import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import ThreeHeroBackground from './ThreeHeroBackground';
import ScrambleText from './ScrambleText';
import LogoMarquee from './LogoMarquee';

interface HeroProps {
  onConsultClick: () => void;
  onCaseStudiesClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConsultClick, onCaseStudiesClick }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <ThreeHeroBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_120%)] z-0 pointer-events-none" />

      <div className="z-10 text-center max-w-5xl space-y-8 px-6 pt-32 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-blue"></span>
          </div>
          <span className="text-xs font-mono text-neon-blue tracking-[0.2em] font-bold uppercase">
            Systems Operational
          </span>
        </motion.div>

        <div className="relative">
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.9]">
                <span className="block text-white mix-blend-difference">
                    <ScrambleText text="BUILDING" delay={200} />
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple">
                    <ScrambleText text="INTELLIGENCE" delay={1000} />
                </span>
            </h1>
        </div>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Vertical Labs architects bespoke neural networks for the next generation of enterprise. 
          We don't just code; we evolve your business logic.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <MagneticButton onClick={onConsultClick}>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-80 blur-md group-hover:blur-lg transition-all duration-500" />
            <div className="relative bg-black border border-white/20 px-8 py-4 flex items-center gap-3 group-hover:border-white/50 transition-colors">
                <span className="font-bold tracking-wider text-white">INITIALIZE CORE</span>
                <Cpu className="w-4 h-4 text-neon-blue" />
            </div>
          </MagneticButton>
          
          <button 
            onClick={onCaseStudiesClick}
            className="px-8 py-4 text-gray-400 font-mono text-sm hover:text-white transition-colors flex items-center gap-2 group"
          >
            [ VIEW CASE STUDIES ]
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        </motion.div>
      </div>

      <motion.div 
         className="w-full mt-auto"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 2.2 }}
      >
        <LogoMarquee />
      </motion.div>
    </section>
  );
};

const MagneticButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
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
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative group"
        >
            {children}
        </motion.button>
    )
}

export default Hero;