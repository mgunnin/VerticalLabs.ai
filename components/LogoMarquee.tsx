import React from 'react';

// Official brand logos - Full Roster Preserved
const LOGOS = [
  {
    name: 'EC Builders',
    isText: true
  },
  {
    name: 'IBYTE',
    src: 'https://www.dropbox.com/scl/fi/kznv8sbyuq01opu2deut1/1.png?rlkey=b7kgde5lphldj6s7g7a0a4iz8&st=rsilwbo4&raw=1'
  },
  {
    name: 'Esportspedia',
    src: 'https://www.dropbox.com/scl/fi/hua9us5weni7eqsdiakii/2.png?rlkey=5qiwxc7bsosst2wpeqe34t9ym&st=d5x9zopw&raw=1'
  },
  {
    name: 'Leaguepedia',
    src: 'https://www.dropbox.com/scl/fi/vmkc4ynxjns1ecy7bqhn8/4.png?rlkey=k4trd9f6i2s54900hjkywabbd&st=qgdb8mgq&raw=1'
  },
  {
    name: 'Kamp',
    src: 'https://www.dropbox.com/scl/fi/7osa9o5rftqmi0d4ox8dh/3.png?rlkey=lzqwzfsm3ti9dz0t1q3v2oawg&st=zrdg2uvz&raw=1'
  },
  {
    name: 'SearchEye',
    src: 'https://www.dropbox.com/scl/fi/kzaky69e3lu2bwbwciv1l/5.png?rlkey=6wdivg8s5ekzzzadxfxsei2u7&st=q0l83wci&raw=1'
  }
];

const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full relative z-20 mt-24 md:mt-32 pointer-events-auto">
      {/* Label */}
      <div className="max-w-5xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-3">
            <span className="text-neon-blue/60 text-[10px] md:text-xs font-mono tracking-[0.2em] font-bold uppercase">
                // Trusted_Partners
            </span>
            <div className="h-px bg-gradient-to-r from-neon-blue/40 to-transparent w-24" />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden border-t border-white/5 bg-black/40 backdrop-blur-[2px]">
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-void to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-void to-transparent" />

        <div className="flex items-center py-12 group w-full">
            {/* Animated Track - Group 1 */}
            <div className="flex animate-marquee min-w-full items-center justify-around shrink-0 gap-16 md:gap-32 px-16 group-hover:[animation-play-state:paused] transition-all duration-300">
                {LOGOS.map((logo, index) => (
                    <LogoItem key={`l1-${index}`} logo={logo} />
                ))}
            </div>
            
            {/* Animated Track - Group 2 (Duplicate for loop) */}
            <div className="flex animate-marquee min-w-full items-center justify-around shrink-0 gap-16 md:gap-32 px-16 group-hover:[animation-play-state:paused] transition-all duration-300">
                {LOGOS.map((logo, index) => (
                    <LogoItem key={`l2-${index}`} logo={logo} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const LogoItem: React.FC<{ logo: { name: string; src?: string; isText?: boolean } }> = ({ logo }) => {
    // Shared visual treatment
    const commonClasses = "opacity-60 transition-all duration-500 ease-out group-hover/logo:opacity-100 flex items-center justify-center";
    
    // Weight and Luminance normalization
    // Contrast(2) makes the white pop against the black background to match the font weight
    const logoStyles: React.CSSProperties = { 
        filter: 'brightness(0) invert(1) contrast(2) saturate(0)', 
    };

    return (
        <div className="relative group/logo flex items-center justify-center bg-transparent">
            {logo.isText ? (
                /* EC Builders - Locked Reference (The Anchor) */
                <div 
                    className={`${commonClasses} h-10 md:h-14 px-4 font-display font-bold text-2xl md:text-3xl tracking-tighter whitespace-nowrap text-white`}
                    style={{ filter: 'brightness(0) invert(1)' }}
                >
                    {logo.name}
                </div>
            ) : (
                /* 
                   Partner Logos - AGGRESSIVE OPTICAL SCALING
                   Images are set to h-24/h-36 AND scaled 1.5x to overcome internal padding.
                   This effectively renders them significantly larger than their container bounds would normally suggest,
                   matching the optical weight of the "EC Builders" text.
                */
                <img 
                    src={logo.src} 
                    alt={logo.name}
                    className={`${commonClasses} h-24 md:h-36 w-auto object-contain scale-[1.5] origin-center px-2`}
                    style={logoStyles}
                />
            )}
            
            {/* Subtle Glitch/Hologram Overlay on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 pointer-events-none mix-blend-overlay">
                 <div className="absolute top-0 w-full h-[1px] bg-neon-blue/50 animate-scan" />
            </div>
        </div>
    )
}

export default LogoMarquee;