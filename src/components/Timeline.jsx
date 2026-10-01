import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function Timeline() {
  const { timeline } = relationshipData;

  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-rose-300 border border-rose-500/20 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter I • The Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4"
        >
          Our Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light"
        >
          The quiet moments, spontaneous laughter, and unforgettable milestones that led us here.
        </motion.p>
      </div>

      {/* Central Timeline Track */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/0 via-purple-500/40 to-rose-500/0 -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Glowing Starlit Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="w-8 h-8 rounded-full glass-panel border border-rose-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)] bg-[#0c0c1e]">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-400 to-purple-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Card (Desktop: half width, Mobile: full width offset) */}
                <div className={`w-full md:w-[46%] pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div
                    onMouseEnter={() => playSound('heartPop')}
                    className="group glass-card p-6 sm:p-7 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-purple-400/30"
                  >
                    {/* Subtle hover gradient wash */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 via-rose-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                    {/* Image Container with Reveal */}
                    {item.image && (
                      <div className="relative w-full h-48 sm:h-56 mb-5 rounded-xl overflow-hidden bg-space-900 border border-white/5">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1b]/80 via-transparent to-transparent" />

                        {/* Tag Badge over Image */}
                        {item.tag && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-panel text-[11px] font-medium text-rose-300 border border-rose-400/20 backdrop-blur-md">
                            {item.tag}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Date */}
                    <div className={`flex items-center gap-1.5 text-xs text-purple-300/80 mb-2 font-mono tracking-wider ${
                      isEven ? 'md:justify-start' : 'md:justify-end'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-rose-200 transition-colors mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty spacer for alignment on opposite side */}
                <div className="hidden md:block w-[46%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
