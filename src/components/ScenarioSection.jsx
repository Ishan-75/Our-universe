import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, X, ArrowRight, BookOpen } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function ScenarioSection() {
  const { scenarios } = relationshipData;
  const [activeScenario, setActiveScenario] = useState(null);

  const handleOpenScenario = (scenario) => {
    playSound('pageOpen');
    setActiveScenario(scenario);
  };

  const handleClose = () => {
    playSound('buttonClick');
    setActiveScenario(null);
  };

  return (
    <section id="scenarios" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-amber-300 border border-amber-500/20 mb-4"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Chapter V • Parallel Universes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4"
        >
          If We Were...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light"
        >
          Daydreams and alternate coordinates where you and I still end up in each other’s arms.
        </motion.p>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {scenarios.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onClick={() => handleOpenScenario(item)}
            className="group glass-card p-6 rounded-2xl cursor-pointer border border-white/10 hover:border-amber-400/40 relative overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
          >
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all pointer-events-none" />

            <div>
              <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform origin-left">
                {item.emoji}
              </span>
              <h3 className="text-lg font-serif text-white group-hover:text-amber-200 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                {item.prompt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-mono">
              <span>Read Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Story Dialog Modal */}
      <AnimatePresence>
        {activeScenario && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl glass-panel border border-amber-400/30 overflow-hidden shadow-[0_0_70px_rgba(245,158,11,0.25)] bg-[#0d0d1f] p-8 sm:p-10"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{activeScenario.emoji}</span>
                <div>
                  <h3 className="text-2xl font-serif text-white">
                    {activeScenario.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-300/80">
                    A dream we get to dream together
                  </p>
                </div>
              </div>

              {activeScenario.image && (
                <div className="w-full h-44 rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={activeScenario.image}
                    alt={activeScenario.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                <p className="font-serif text-base sm:text-lg text-slate-200 leading-relaxed font-light italic bg-white/5 p-6 rounded-2xl border border-white/5">
                  “{activeScenario.story}”
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600/40 to-purple-600/40 border border-amber-400/30 text-white text-xs uppercase tracking-widest hover:border-amber-400/60 transition-all backdrop-blur-md"
                >
                  Close Daydream
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
