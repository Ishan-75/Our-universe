import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUp, Infinity as InfinityIcon } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function FinalSection({ onScrollToTop }) {
  const { couple, ending } = relationshipData;

  const handleRestart = () => {
    playSound('transition');
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="ending" className="relative min-h-screen py-32 px-4 sm:px-6 flex flex-col items-center justify-center text-center z-10 bg-[#020206] overflow-hidden">
      {/* Background starlit constellation radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/10 via-rose-900/10 to-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Constellation Icon / Floating Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative mb-10"
      >
        <div className="w-20 h-20 rounded-full glass-panel border border-rose-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.4)]">
          <Heart className="w-10 h-10 text-rose-400 fill-rose-500/40 animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
      </motion.div>

      {/* Poetic Lines Sequence */}
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-300 font-light italic tracking-wide"
        >
          “{ending.quote1 || 'Out of all the people in the world…'}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-200 to-amber-100 font-medium tracking-wide text-glow"
        >
          “{ending.quote2 || '…I’m glad I found you.'}”
        </motion.p>

        {/* The Couple Signet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border border-rose-400/30 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <span className="font-serif text-lg sm:text-xl text-rose-200 font-semibold tracking-wider">
              {couple.person2}
            </span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span className="font-serif text-lg sm:text-xl text-purple-200 font-semibold tracking-wider">
              {couple.person1}
            </span>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 3.2 }}
          className="font-serif text-lg sm:text-xl text-slate-400 font-light italic pt-4"
        >
          {ending.finalMessage || 'This isn’t the end of our story.'}
        </motion.p>
      </div>

      {/* Revisit / Return to top button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 4, duration: 1 }}
        className="mt-16"
      >
        <button
          onClick={handleRestart}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-white/10 text-slate-300 text-xs uppercase tracking-widest hover:text-white hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <ArrowUp className="w-4 h-4 text-purple-300 group-hover:-translate-y-1 transition-transform" />
          <span>Return to the Beginning</span>
        </button>
      </motion.div>

      {/* Footer copyright / credit */}
      <div className="mt-20 text-[11px] font-mono text-slate-600">
        ✦ Made with endless love for {couple.person2} ✦
      </div>
    </section>
  );
}
