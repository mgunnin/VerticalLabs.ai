import React from 'react';
import { motion } from 'framer-motion';

const StrategicDiagnostics: React.FC = () => {
  const stats = [
    { label: 'AI_AGENTS_DEPLOYED', value: '500+', color: 'text-neon-blue' },
    { label: 'AUTOMATION_ACCELERATION', value: '10X', color: 'text-neon-purple' },
    { label: 'ADAPTIVE_INTELLIGENCE', value: '24/7', color: 'text-white' }
  ];

  return (
    <section className="py-12 bg-black/40 border-b border-white/5 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-lg flex flex-col items-center justify-center text-center group hover:border-neon-blue/30 transition-colors"
            >
              <div className={`text-4xl md:text-5xl font-display font-bold mb-2 ${stat.color} drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]`}>
                {stat.value}
              </div>
              <div className="text-xs font-mono text-gray-500 tracking-widest uppercase group-hover:text-neon-blue transition-colors">
                // {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicDiagnostics;