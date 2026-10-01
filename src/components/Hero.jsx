import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Calendar } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound, audioManager } from '../utils/audioManager';
import confetti from 'canvas-confetti';

export default function Hero({ onEnterUniverse, isEntered }) {
  const { couple, hero } = relationshipData;
  const [constellationStep, setConstellationStep] = useState(0);
  const [daysTogether, setDaysTogether] = useState(null);

  // Calculate days together
  useEffect(() => {
    if (couple.relationshipStartDate) {
      const start = new Date(couple.relationshipStartDate);
      const now = new Date();
      const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      if (!isNaN(diff) && diff > 0) {
        setDaysTogether(diff);
      }
    }
  }, [couple.relationshipStartDate]);

  // Constellation star reveal sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setConstellationStep(1), 800);   // First star
    const timer2 = setTimeout(() => setConstellationStep(2), 1800);  // Second star
    const timer3 = setTimeout(() => setConstellationStep(3), 2900);  // Constellation connects
    const timer4 = setTimeout(() => setConstellationStep(4), 4000);  // Text 1 appears
    const timer5 = setTimeout(() => setConstellationStep(5), 5800);  // Text 2 appears
    const timer6 = setTimeout(() => setConstellationStep(6), 7200);  // Button appears

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  const handleEnterClick = () => {
    playSound('transition');
    playSound('buttonClick');

    // Trigger subtle celestial stardust burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#c084fc', '#f43f5e', '#fcd34d', '#ffffff'],
        shapes: ['circle'],
        ticks: 120,
        gravity: 0.6,
      });
    } catch {
      // Ignore
    }

    // Start background music gracefully upon user interaction
    audioManager.playSong(0);

    onEnterUniverse();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none bg-[#030307]">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isEntered ? 0.35 : 0.18, scale: 1 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030307] via-transparent to-[#030307]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030307]/80 via-transparent to-[#030307]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#030307]/60 to-[#030307]" />
      </div>

      {/* Constellation Canvas / SVG Animation */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Constellation Nodes */}
        <div className="relative w-72 h-36 mb-6 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connecting lines between stars */}
            {constellationStep >= 3 && (
              <motion.path
                d="M 50 65 L 110 35 L 175 75 L 235 40"
                fill="none"
                stroke="rgba(192, 132, 252, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            )}
            {constellationStep >= 3 && (
              <motion.path
                d="M 110 35 L 140 100 L 175 75"
                fill="none"
                stroke="rgba(244, 63, 94, 0.35)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
              />
            )}
          </svg>

          {/* Star 1 - His Star */}
          {constellationStep >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, type: 'spring' }}
              className="absolute left-[45px] top-[60px] flex flex-col items-center group cursor-pointer"
              title={couple.person1}
            >
              <div className="relative">
                <div className="w-3.5 h-3.5 rounded-full bg-violet-300 shadow-[0_0_15px_#a855f7]" />
                <div className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-60" />
              </div>
              <span className="text-[10px] tracking-widest text-violet-300/80 mt-1 uppercase font-serif">
                {couple.person1}
              </span>
            </motion.div>
          )}

          {/* Star 2 - Her Star */}
          {constellationStep >= 2 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, type: 'spring' }}
              className="absolute right-[45px] top-[35px] flex flex-col items-center group cursor-pointer"
              title={couple.person2}
            >
              <div className="relative">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-300 shadow-[0_0_15px_#f43f5e]" />
                <div className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-60" />
              </div>
              <span className="text-[10px] tracking-widest text-rose-300/80 mt-1 uppercase font-serif">
                {couple.person2}
              </span>
            </motion.div>
          )}

          {/* Intermediate Constellation Stars */}
          {constellationStep >= 3 && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute left-[106px] top-[31px] w-2 h-2 rounded-full bg-amber-200/90 shadow-[0_0_10px_#fde68a]"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-[171px] top-[71px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#fff]"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute left-[136px] top-[96px] w-2 h-2 rounded-full bg-pink-300/80 shadow-[0_0_8px_#f472b6]"
              />
            </>
          )}
        </div>

        {/* Cinematic Title & Lead Lines */}
        <div className="space-y-4 max-w-2xl px-4 min-h-[160px] flex flex-col justify-center">
          {constellationStep >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-slate-300 italic tracking-wide"
            >
              “{hero.title}”
            </motion.p>
          )}

          {constellationStep >= 5 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-200 to-amber-100 font-semibold tracking-wide text-glow"
            >
              “{hero.subtitle}”
            </motion.p>
          )}
        </div>

        {/* Days Together Counter (Subtle Pill) */}
        {daysTogether && constellationStep >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs tracking-wider text-rose-200/90 border border-rose-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{daysTogether.toLocaleString()} days in our private orbit</span>
          </motion.div>
        )}

        {/* Enter Button */}
        {constellationStep >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-8"
          >
            <button
              id="enter-universe-btn"
              onClick={handleEnterClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-900/60 via-rose-900/50 to-indigo-900/60 border border-purple-400/30 text-white font-medium tracking-widest text-sm uppercase shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] hover:border-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
            >
              {/* Subtle pulsing background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-rose-600/20 blur-md group-hover:blur-lg transition-all" />

              <span className="relative z-10 font-sans">{hero.enterButtonText}</span>
              <ArrowRight className="relative z-10 w-4 h-4 text-rose-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-4 text-[11px] text-slate-500 tracking-wider">
              ✦ Sound and music will begin upon entry ✦
            </p>
          </motion.div>
        )}
      </div>

      {/* Subtle bottom scroll indicator if already entered */}
      {isEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-widest uppercase text-slate-400">Scroll to Explore</span>
          <div className="w-4 h-7 rounded-full border border-slate-600 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-rose-400"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
