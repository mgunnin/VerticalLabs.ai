
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, MessageSquareCode } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    client: "KAMP EVENTS",
    author: "Phil Castro",
    role: "CEO",
    content: "Vertical Labs didn't just rebuild our site; they architected a digital ecosystem. We received a full overhaul including a cutting-edge design system, dynamic event page templates, and seamless integrations with PostHog, Slack, and Beehiiv. The animations are absolutely next-level.",
    tags: ["DESIGN_SYSTEM", "ANALYTICS", "INTEGRATIONS"]
  },
  {
    id: 2,
    client: "IBYTE",
    author: "Executive Team",
    role: "Government Solutions",
    content: "We needed a fully agentic RFP automation system for our government clients, and Vertical Labs delivered. The system automates complex proposal workflows with incredible accuracy, drastically reducing our turnaround time on critical contracts.",
    tags: ["RFP_AUTOMATION", "GOV_TECH", "AGENTS"]
  },
  {
    id: 3,
    client: "SEARCHEYE",
    author: "Product Lead",
    role: "Platform Strategy",
    content: "Vertical Labs built a sophisticated agentic system directly into our platform. Their ability to integrate complex AI logic into existing infrastructure has significantly boosted our intelligence capabilities and user value.",
    tags: ["AGENTIC_SYSTEM", "PLATFORM", "AI_CORE"]
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-6 bg-neon-purple" />
            <h2 className="text-xl font-mono font-bold tracking-widest text-gray-400 uppercase">
                Client_Transmissions
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-surface-light border border-white/10 rounded-xl transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-neon-blue/30" />
              
              {/* Content */}
              <div className="relative p-8 h-full flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/5 rounded-lg text-neon-blue border border-white/5 group-hover:text-white group-hover:bg-neon-blue transition-colors">
                            <Quote size={20} fill="currentColor" />
                        </div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="text-neon-purple fill-neon-purple" />
                            ))}
                        </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6 font-light">
                        "{t.content}"
                    </p>
                </div>

                <div>
                    <div className="h-px bg-white/10 w-full mb-6 group-hover:bg-neon-blue/30 transition-colors" />
                    
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-white font-bold font-display tracking-wide">{t.client}</div>
                            <div className="text-xs font-mono text-gray-500 mt-1">{t.author} // {t.role}</div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-blue">
                            <MessageSquareCode size={20} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {t.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-gray-600 border border-white/5 px-2 py-1 rounded bg-black/20">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
