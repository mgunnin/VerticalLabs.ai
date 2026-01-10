
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: '5',
    title: 'VANTAGE BID',
    client: 'IBYTE',
    year: '2026',
    tags: ['BID_AUTOMATION', 'PROPOSAL_ENGINE', 'WIN_OPTIMIZATION'],
    description: 'AI-powered bid discovery and automated proposal engineering. Designed to maximize win-potential for high-stakes contracts by eliminating manual back-office bottlenecks.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    stats: [
        { label: 'GEN TIME', value: '-85%' },
        { label: 'COMPLIANCE', value: '100%' },
        { label: 'SCALE', value: 'UNLIMITED' }
    ],
    challenge: "Procurement teams are often buried in 500+ page RFPs with razor-thin deadlines. Manual drafting leads to human error, compliance risks, and missed opportunities.",
    solution: "We deployed a custom logic layer to automate the full submission cycle: AI-Driven Bid Discovery, Automated Proposal Creation, Technical Pricing Strategy, and Compliance & Regulatory Verification.",
    result: "Proposal generation time reduced by 85%. The system ensures 100% compliance accuracy, allowing the team to scale submission volume without increasing overhead.",
    gallery: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '1',
    title: 'SEARCHEYE',
    client: 'SearchEye',
    year: '2026',
    tags: ['AGENTIC_SEO', 'PLATFORM_INTEL', 'AI_CORE'],
    description: 'Autonomous SEO agent swarm integrated directly into the SearchEye platform to automate SERP analysis and optimization.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    stats: [
        { label: 'SERP DOMINANCE', value: '+200%' },
        { label: 'ACTIONS', value: '1.2M' },
        { label: 'STATUS', value: 'AUTONOMOUS' }
    ],
    challenge: "SearchEye needed to evolve from a reporting tool into an active growth engine. The sheer volume of client pages made manual optimization impossible, and existing automated tools lacked the semantic understanding to effectively compete for high-value keywords.",
    solution: "We engineered a custom 'Sentinel' agent swarm. These autonomous agents continuously monitor search vectors, detect content gaps, and autonomously inject schema and meta-optimizations in real-time, effectively 'healing' SEO deficiencies as they appear.",
    result: "The integration transformed the platform's value proposition. Clients experienced a 200% increase in SERP dominance within the first quarter, with the system autonomously executing over 1.2 million optimization actions without human intervention.",
    gallery: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'ESPORTONE',
    client: 'EsportOne Inc.',
    year: '2026',
    tags: ['GAMING_ECOSYSTEM', 'DATA_ARCH', 'COMMUNITY'],
    description: 'Full-scale build for the competitive gaming ecosystem, focusing on high-performance data architecture and community engagement.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop',
    stats: [
        { label: 'LATENCY', value: '<20ms' },
        { label: 'CONCURRENT', value: '500K+' },
        { label: 'UPTIME', value: '99.99%' }
    ],
    challenge: "The competitive gaming ecosystem suffered from fragmented data sources and slow, unresponsive platforms that couldn't handle the traffic spikes of major tournament events.",
    solution: "We engineered a high-performance React frontend backed by a scalable Node.js event architecture. Real-time websockets stream match data instantly, while an optimized database structure handles millions of community interactions.",
    result: "Launched the definitive platform for the esports community, handling 500k+ concurrent users during peak finals with zero downtime and sub-20ms latency on live data updates.",
    gallery: [
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1593305841991-05c29736f87e?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'KAMP EVENTS',
    client: 'Kamp Inc.',
    year: '2026',
    tags: ['LOGISTICS', 'DASHBOARDS', 'REAL_TIME'],
    description: 'Intelligent event management dashboards built to streamline complex logistics and real-time attendee data.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    stats: [
        { label: 'EFFICIENCY', value: '+60%' },
        { label: 'SYNC', value: 'REAL-TIME' },
        { label: 'VISIBILITY', value: '100%' }
    ],
    challenge: "Managing large-scale event logistics was a chaotic mix of spreadsheets, emails, and disconnected tools, leading to operational blind spots and slow reaction times during live events.",
    solution: "We designed and built a centralized command dashboard. It aggregates ticketing, staffing, and attendee flow data into a single, real-time interface, allowing organizers to make data-driven decisions on the fly.",
    result: "Streamlined operations for major conferences, reducing logistical overhead by 60%. The system provided organizers with perfect visibility, eliminating bottlenecks and improving the attendee experience.",
    gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553877615-30c73e63cf71?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    title: 'CORE INTERFACES',
    client: 'Growth Sector Partners',
    year: '2026',
    tags: ['WEB_SYSTEMS', 'AUTOMATION', 'UX_DESIGN'],
    description: 'Custom-engineered web interfaces and digital systems designed to modernize and automate operations for growing businesses.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop',
    stats: [
        { label: 'LEAD CAPTURE', value: '+40%' },
        { label: 'OPS COST', value: '-30%' },
        { label: 'DEPLOYMENT', value: 'RAPID' }
    ],
    challenge: "Small to medium businesses often rely on disconnected tools that create manual bottlenecks.",
    solution: "We build unified web environments that combine sleek UI/UX with back-end automation to simplify business management.",
    result: "Faster lead capture, automated customer notifications, and a professional digital presence that stands out in the market.",
    liveLinks: [
      { label: 'IBYTE_ENTERPRISES', url: 'https://www.ibyteent.com/' },
      { label: 'EC_BUILDERS_LLC', url: 'https://www.ecbuildersllc.com/' },
      { label: 'KAMP_EVENTS', url: 'https://www.kampevents.com/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2655&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop'
    ]
  }
];

interface WorkProps {
  onProjectSelect: (project: ProjectItem) => void;
}

const Work: React.FC<WorkProps> = ({ onProjectSelect }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="work" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
              WORK
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              // DECLASSIFIED_OPERATIONS_2026
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Project List */}
          <div className="lg:w-1/2 space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onProjectSelect(project)}
                className={`group cursor-pointer relative pl-8 transition-all duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
              >
                {/* Active Indicator */}
                <div className={`absolute left-0 top-3 w-1 h-8 bg-neon-blue transition-all duration-300 ${activeIndex === index ? 'scale-y-100' : 'scale-y-0'}`} />

                <h3 className="text-3xl md:text-5xl font-bold mb-2 group-hover:text-white transition-colors flex items-center gap-4">
                  {project.title}
                  <motion.div
                    animate={{ x: activeIndex === index ? 0 : -10, opacity: activeIndex === index ? 1 : 0 }}
                  >
                     <ChevronRight className="w-6 h-6 text-neon-blue" />
                  </motion.div>
                </h3>
                
                <div className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-4 items-center">
                    <span className="text-xs font-mono text-neon-purple border border-neon-purple/30 px-2 py-1 rounded">
                      {project.client.toUpperCase()}
                    </span>
                    <button className="text-xs font-mono text-white hover:text-neon-blue underline decoration-neon-blue/30 hover:decoration-neon-blue underline-offset-4 transition-all">
                        VIEW_CASE_STUDY &gt;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Preview */}
          <div className="lg:w-1/2 relative h-[50vh] lg:h-auto hidden lg:block">
            <div 
                className="sticky top-32 w-full aspect-[4/3] bg-white/5 rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => onProjectSelect(projects[activeIndex])}
            >
               {/* Scanline Overlay */}
               <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20 pointer-events-none" />
               
               <AnimatePresence mode='wait'>
                 <motion.img
                   key={projects[activeIndex].image}
                   src={projects[activeIndex].image}
                   alt={projects[activeIndex].title}
                   initial={{ opacity: 0, scale: 1.1, filter: "grayscale(100%)" }}
                   animate={{ opacity: 1, scale: 1, filter: "grayscale(0%)" }}
                   exit={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }}
                   transition={{ duration: 0.5 }}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
               </AnimatePresence>

               {/* Overlay details */}
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent z-20 flex justify-between items-end">
                  <div className="font-mono text-xs text-neon-blue">
                    IMG_SRC: SECURE_DB_0{activeIndex + 1}
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider"
                    whileHover={{ x: 5 }}
                  >
                    Open File <ArrowUpRight size={16} />
                  </motion.div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Work;
