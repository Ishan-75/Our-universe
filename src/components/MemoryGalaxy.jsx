import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn, Eye, Heart } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { playSound } from '../utils/audioManager';

export default function MemoryGalaxy() {
  const { categories, memories } = relationshipData;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredMemory, setHoveredMemory] = useState(null);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filter memories based on category
  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  const activeMemory = activeModalIndex !== null ? memories[activeModalIndex] : null;

  const openMemoryModal = (id) => {
    const idx = memories.findIndex(m => m.id === id);
    if (idx !== -1) {
      playSound('pageOpen');
      setActiveModalIndex(idx);
      setIsZoomed(false);
    }
  };

  const closeModal = () => {
    playSound('buttonClick');
    setActiveModalIndex(null);
    setIsZoomed(false);
  };

  const nextMemory = (e) => {
    e?.stopPropagation();
    playSound('buttonClick');
    setIsZoomed(false);
    setActiveModalIndex((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = (e) => {
    e?.stopPropagation();
    playSound('buttonClick');
    setIsZoomed(false);
    setActiveModalIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <section id="galaxy" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-purple-300 border border-purple-500/20 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter II • Celestial Vault</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4"
        >
          Memory Galaxy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light mb-8"
        >
          Every glowing star holds a cherished memory. Hover to glimpse, or click to step into the moment.
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('buttonClick');
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 backdrop-blur-md ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/20 scale-105'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-purple-400/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Interactive Galaxy Night Sky Canvas/Container */}
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)] bg-gradient-to-b from-[#080816] via-[#05050f] to-[#0a0a1d]">
        {/* Soft Cosmic Nebula Gradients */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

        {/* Constellation lines connecting memories */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <polyline
            points={memories.map(m => `${m.starCoords.x}%,${m.starCoords.y}%`).join(' ')}
            fill="none"
            stroke="rgba(192, 132, 252, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Memory Star Nodes */}
        {memories.map((memory) => {
          const isDimmed = selectedCategory !== 'all' && memory.category !== selectedCategory;
          const isHovered = hoveredMemory?.id === memory.id;

          return (
            <div
              key={memory.id}
              style={{
                left: `${memory.starCoords.x}%`,
                top: `${memory.starCoords.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {/* Star Button */}
              <button
                onClick={() => openMemoryModal(memory.id)}
                onMouseEnter={() => {
                  playSound('heartPop');
                  setHoveredMemory(memory);
                }}
                onMouseLeave={() => setHoveredMemory(null)}
                className={`relative group focus:outline-none transition-all duration-500 ${
                  isDimmed ? 'opacity-20 pointer-events-none' : 'opacity-100 hover:scale-125'
                }`}
              >
                {/* Pulsing Outer Glow */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500/30 to-rose-500/30 blur-md group-hover:blur-lg transition-all animate-pulse" />

                {/* Star Core */}
                <div className="relative w-5 h-5 rounded-full flex items-center justify-center bg-white shadow-[0_0_15px_#fbcfe8]">
                  <Sparkles className="w-3 h-3 text-purple-900" />
                </div>

                {/* Subtitle label underneath */}
                <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-serif text-slate-300 opacity-70 group-hover:opacity-100 group-hover:text-rose-200 transition-opacity">
                  {memory.title}
                </span>
              </button>

              {/* Hover Preview Tooltip Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-56 p-2 rounded-xl glass-card border border-rose-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                  >
                    <div className="relative w-full h-28 rounded-lg overflow-hidden mb-2">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-1 text-left">
                      <p className="text-[10px] font-mono text-rose-300">{memory.date}</p>
                      <h4 className="text-xs font-serif font-semibold text-white truncate">{memory.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{memory.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Helper bottom hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-xs text-slate-500 font-light tracking-widest uppercase">
            ✦ Click any star to open cinematic view ✦
          </p>
        </div>
      </div>

      {/* Cinematic Modal Photo Viewer */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={closeModal}
          >
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(147,51,234,0.3)] bg-[#0d0d1e]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-500/20 transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Photo Container */}
                <div className="relative md:w-3/5 h-80 sm:h-96 md:h-[480px] bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src={activeMemory.image}
                    alt={activeMemory.title}
                    className={`w-full h-full object-cover transition-transform duration-500 cursor-pointer ${
                      isZoomed ? 'scale-150 object-contain' : 'scale-100'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                  {/* Zoom indicator button */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md glass-panel text-[11px] text-slate-300 flex items-center gap-1 hover:text-white"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
                  </button>
                </div>

                {/* Details Container */}
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {activeMemory.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {activeMemory.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif text-white mb-4">
                      {activeMemory.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                      {activeMemory.description}
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={prevMemory}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-300 hover:text-white hover:border-purple-400/30 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="text-xs text-slate-500 font-mono">
                      {activeModalIndex + 1} / {memories.length}
                    </span>

                    <button
                      onClick={nextMemory}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-300 hover:text-white hover:border-purple-400/30 transition-all"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
