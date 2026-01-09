
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const Team: React.FC = () => {
  const architects = [
    {
      name: "Matt Gunnin",
      role: "Chief Executive Officer (CEO)",
      bio: "Entrepreneur and AI engineer with 20+ years leading ventures across gaming, sports, and emerging tech. Matt blends deep technical expertise with strategic vision, building scalable platforms that merge automation, intelligence, and design.",
      expertise: ["Deep Learning", "Neural Architecture", "AI Product Strategy"],
      achievements: [
        "3 Successful Exits",
        "Former Rackspace & Twitch Partner",
        "Keynote Speaker on AI & Automation"
      ],
      image: "https://www.dropbox.com/scl/fi/lfy2auayqgxl59vd5zhf8/matt-gunnin.jpeg?rlkey=pgrdlmjzj506b0xox50g8t27g&st=t4p7nrbk&raw=1"
    },
    {
      name: "Raquel Ortega",
      role: "Chief Design Officer (CDO)",
      bio: "Automation architect and UI/UX design expert who specializes in building intelligent, human-centered systems – uniting automation, product design, and user experience to drive measurable growth and efficiency.",
      expertise: ["Process Automation", "System Integration", "Business Intelligence", "UI/UX Design"],
      achievements: [
        "Led automation and design systems that cut operational costs by up to 60%",
        "Designed AI-driven interfaces",
        "Recognized as an AI Workflow & UX Integration Specialist"
      ],
      image: "https://www.dropbox.com/scl/fi/nu1crhexn5yc0i4fjfac4/IMG_3708.jpg?rlkey=fqxdprqkzt0xjvusn2cb0towl&st=71or4kxs&raw=1"
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
            <div className="w-1 h-6 bg-neon-blue" />
            <h2 className="text-xl font-mono font-bold tracking-widest text-gray-400 uppercase">
                Meet_The_Architects
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architects.map((member, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-black/50 border border-white/10 rounded-xl p-8 hover:border-neon-blue/40 transition-all duration-500 flex flex-col h-full"
            >
                {/* Header Section: System ID Layout */}
                <div className="flex items-center gap-6 mb-8">
                    {/* Image - Fixed ID Photo Size */}
                    <div className="w-32 h-32 relative overflow-hidden shrink-0 bg-black border border-white/10 rounded-sm">
                        <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay z-10" />
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="absolute inset-0 w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Scanline decoration */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20 pointer-events-none" />
                    </div>
                    
                    {/* ID Details */}
                    <div className="flex flex-col">
                        <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight leading-none">{member.name}</h3>
                        <div className="text-xs font-mono text-neon-blue uppercase tracking-widest border border-neon-blue/20 bg-neon-blue/5 px-2 py-1 self-start rounded">
                            {member.role}
                        </div>
                    </div>
                </div>

                {/* Visual Connector Line */}
                <div className="w-full h-px bg-white/5 mb-8 group-hover:bg-neon-blue/20 transition-colors" />
                
                {/* Body Content - Full Width */}
                <div className="flex-1 flex flex-col">
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                        {member.bio}
                    </p>

                    <div className="mb-8">
                        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-3 tracking-widest">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, k) => (
                                <span key={k} className="text-[10px] font-mono text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-auto">
                        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-3 tracking-widest">Key Achievements</h4>
                        <ul className="space-y-3">
                            {member.achievements.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-xs text-gray-300">
                                    <Award size={14} className="text-neon-purple mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
