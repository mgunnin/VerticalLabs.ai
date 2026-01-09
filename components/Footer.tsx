import React from 'react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onContactClick }) => {
  return (
    <footer className="py-8 bg-black border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* System Links */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <button className="text-[10px] md:text-xs font-mono text-gray-500 hover:text-neon-blue transition-colors uppercase tracking-wider">
                PROJECT_DASHBOARD
            </button>
            <button className="text-[10px] md:text-xs font-mono text-gray-500 hover:text-neon-blue transition-colors uppercase tracking-wider">
                PRIVACY_PROTOCOL
            </button>
            <button className="text-[10px] md:text-xs font-mono text-gray-500 hover:text-neon-blue transition-colors uppercase tracking-wider">
                TERMS_OF_SERVICE
            </button>
        </div>

        {/* Copyright */}
        <div className="text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-widest text-center md:text-right">
          © 2026 VERTICAL LABS // ALL SYSTEMS NOMINAL.
        </div>
      </div>
    </footer>
  );
};

export default Footer;