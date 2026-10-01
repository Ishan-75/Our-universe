import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Feather, RotateCcw } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { audioManager, playSound } from '../utils/audioManager';

export default function LoveLetter() {
  const { letter, couple } = relationshipData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    playSound('letterOpen');
    // Duck background music smoothly so she can read in quiet warmth
    audioManager.duckMusic(0.2, 25000);
    setIsOpen(true);
  };

  const handleFoldLetter = () => {
    playSound('buttonClick');
    audioManager.restoreMusicVolume();
    setIsOpen(false);
  };

  return (
    <section id="letter" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-rose-300 border border-rose-500/20 mb-4"
        >
          <Feather className="w-3.5 h-3.5" />
          <span>Chapter VI • The Heartpiece</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-3"
        >
          A Private Letter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-light"
        >
          {letter.envelopeTitle || 'A letter I wanted you to have.'}
        </motion.p>
      </div>

      {/* Envelope Presentation */}
      <div className="relative flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Floating Envelope */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                duration: 0.6,
              }}
              className="flex flex-col items-center"
            >
              {/* Envelope Box */}
              <div
                onClick={handleOpenLetter}
                className="group cursor-pointer relative w-72 sm:w-88 h-48 sm:h-56 rounded-2xl glass-card border border-rose-400/30 flex flex-col items-center justify-center p-6 shadow-[0_0_40px_rgba(244,63,94,0.25)] hover:shadow-[0_0_60px_rgba(244,63,94,0.45)] hover:border-rose-400/60 transition-all duration-500 overflow-hidden"
              >
                {/* Envelope Flap Accent */}
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />

                {/* Wax Seal */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.6)] border border-rose-300/40 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-rose-100 fill-rose-100" />
                </div>

                <div className="mt-4 text-center">
                  <p className="font-serif text-lg text-slate-100 group-hover:text-rose-200 transition-colors">
                    For {couple.person2}
                  </p>
                  <p className="text-[11px] font-mono text-rose-300/80 tracking-widest uppercase mt-0.5">
                    Sealed with love • Click to Open
                  </p>
                </div>
              </div>

              {/* Open Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenLetter}
                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 text-white font-medium text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>OPEN LETTER</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Unfolded Handwritten-style Letter */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-2xl relative"
            >
              {/* Letter Parchment Container */}
              <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#131122] via-[#0f0e1d] to-[#0c0b17] border border-rose-500/30 shadow-[0_0_70px_rgba(244,63,94,0.25)] text-slate-200">
                {/* Stamped Wax Seal at Top Right */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 flex items-center justify-center shadow-lg border border-rose-300/40 opacity-90">
                  <Heart className="w-5 h-5 text-rose-100 fill-rose-100" />
                </div>

                {/* Letter Header */}
                <div className="mb-8 pr-12">
                  <p className="text-xs font-mono text-purple-300/70 tracking-widest uppercase mb-1">
                    {letter.date}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif text-rose-200 italic">
                    {letter.greeting}
                  </h3>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed text-slate-200 font-light tracking-wide">
                  {letter.paragraphs && letter.paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-loose">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Letter Sign-off */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col items-end">
                  <p className="font-serif italic text-slate-400 text-sm">
                    {letter.closing}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-rose-300 mt-2">
                    {letter.signature}
                  </p>
                </div>
              </div>

              {/* Fold Letter Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleFoldLetter}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel border border-slate-600 text-slate-300 text-xs uppercase tracking-widest hover:text-white hover:border-rose-400/40 transition-all duration-300"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-300" />
                  <span>Fold & Seal Letter</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
