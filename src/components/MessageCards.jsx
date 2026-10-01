import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function MessageCards() {
  const { messages } = relationshipData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextMessage = () => {
    playSound('heartPop');
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handleReset = () => {
    playSound('buttonClick');
    setCurrentIndex(0);
  };

  const currentMessage = messages[currentIndex] || messages[0];
  const isLast = currentIndex === messages.length - 1;

  return (
    <section id="messages" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-rose-300 border border-rose-500/20 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter III • Quiet Truths</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4"
        >
          Things I Never Say Enough
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base font-light"
        >
          Small truths that live quietly in my heart every single day.
        </motion.p>
      </div>

      {/* Card Presentation Container */}
      <div className="relative min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
        {/* Decorative faint background glow */}
        <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-r from-rose-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full max-w-xl glass-card p-8 sm:p-12 rounded-3xl border border-rose-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-center relative overflow-hidden"
          >
            {/* Top delicate icon */}
            <div className="w-12 h-12 rounded-full glass-panel mx-auto mb-6 flex items-center justify-center border border-rose-400/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <Heart className="w-5 h-5 fill-rose-500/30" />
            </div>

            {/* Message Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-slate-100 font-light leading-relaxed tracking-wide min-h-[100px] flex items-center justify-center italic">
              “{currentMessage}”
            </blockquote>

            {/* Subtle Counter */}
            <div className="mt-8 flex items-center justify-center gap-1.5">
              {messages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-gradient-to-r from-rose-400 to-purple-400'
                      : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="mt-10 flex flex-col items-center justify-center">
        {!isLast ? (
          <button
            onClick={handleNextMessage}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-purple-800/50 to-rose-800/50 border border-purple-400/30 text-white font-medium text-xs uppercase tracking-widest hover:border-rose-400/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all duration-300 backdrop-blur-md active:scale-95"
          >
            <span>ONE MORE</span>
            <ArrowRight className="w-4 h-4 text-rose-300 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel border border-slate-600 text-slate-300 text-xs uppercase tracking-widest hover:text-white hover:border-rose-400/40 transition-all duration-300"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-300" />
            <span>Read Again From The Start</span>
          </button>
        )}

        <span className="text-[11px] text-slate-500 font-mono mt-3">
          Message {currentIndex + 1} of {messages.length}
        </span>
      </div>
    </section>
  );
}
