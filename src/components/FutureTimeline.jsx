import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function FutureTimeline() {
  const { future } = relationshipData;
  const [lockedToast, setLockedToast] = useState(null);

  const handleMilestoneClick = (item) => {
    if (item.locked) {
      playSound('heartPop');
      setLockedToast({
        title: item.title,
        hint: item.unlockHint || 'Open when the time comes. Some dreams are even sweeter when lived in person.'
      });
      setTimeout(() => {
        setLockedToast(null);
      }, 5000);
    }
  };

  return (
    <section id="future" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-emerald-300 border border-emerald-500/20 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter VII • Horizons Ahead</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-3"
        >
          Future Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-light"
        >
          Every adventure yet unwritten, waiting for our footsteps.
        </motion.p>
      </div>

      {/* Stepper Timeline */}
      <div className="relative">
        {/* Connecting central line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500 via-rose-500 to-emerald-500/30 -translate-x-1/2" />

        <div className="space-y-12">
          {future.map((item, index) => {
            const isLocked = item.locked;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Node icon in center */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <button
                    onClick={() => handleMilestoneClick(item)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isLocked
                        ? 'bg-[#181628] border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-110'
                        : 'bg-[#181628] border border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4 fill-emerald-300/40" />
                    )}
                  </button>
                </div>

                {/* Milestone Card */}
                <div className={`w-full sm:w-[45%] pl-16 sm:pl-0 ${isEven ? 'sm:text-left' : 'sm:text-right'}`}>
                  <div
                    onClick={() => handleMilestoneClick(item)}
                    className={`glass-card p-6 rounded-2xl relative overflow-hidden transition-all duration-300 ${
                      isLocked
                        ? 'cursor-pointer border-amber-500/20 hover:border-amber-400/50 hover:bg-[#181730]'
                        : 'border-white/10 hover:border-emerald-400/30'
                    }`}
                  >
                    <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
                      isEven ? 'sm:justify-start' : 'sm:justify-end'
                    }`}>
                      <span className={isLocked ? 'text-amber-300' : 'text-emerald-300'}>
                        {item.date}
                      </span>
                      {isLocked && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-400/20">
                          Locked
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {isLocked ? '“Open when the time comes…”' : item.description}
                    </p>

                    {isLocked && (
                      <p className="mt-3 text-[11px] font-mono text-amber-300/80 italic">
                        ✦ Click for secret whisper
                      </p>
                    )}
                  </div>
                </div>

                <div className="hidden sm:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Secret Whisper Toast */}
      <AnimatePresence>
        {lockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none"
          >
            <div className="glass-panel p-5 rounded-2xl border border-amber-400/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] bg-[#121124] text-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-2">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-serif font-semibold text-white mb-1">
                {lockedToast.title}
              </h4>
              <p className="text-xs text-amber-200/90 font-light leading-relaxed italic">
                “{lockedToast.hint}”
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
