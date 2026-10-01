import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc3, Sparkles, Music2, Heart } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { audioManager, playSound } from '../utils/audioManager';

export default function MusicSection() {
  const { songs } = relationshipData;
  const [audioState, setAudioState] = useState(audioManager.getState());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handlePlayCard = (index) => {
    playSound('buttonClick');
    if (audioState.currentSongIndex === index && audioState.isPlaying) {
      audioManager.pauseSong();
    } else {
      audioManager.playSong(index);
    }
  };

  return (
    <section id="music" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs uppercase tracking-widest text-indigo-300 border border-indigo-500/20 mb-4"
        >
          <Music2 className="w-3.5 h-3.5" />
          <span>Chapter IV • Cosmic Resonance</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4"
        >
          Our Songs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light"
        >
          Melodies that became time capsules for the feelings words could never fully hold.
        </motion.p>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {songs.map((song, index) => {
          const isCurrentSong = audioState.currentSongIndex === index;
          const isPlayingThis = isCurrentSong && audioState.isPlaying;

          return (
            <motion.div
              key={song.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className={`group glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${
                isPlayingThis ? 'border-purple-400/50 shadow-[0_0_35px_rgba(168,85,247,0.35)]' : ''
              }`}
            >
              {/* Vinyl & Cover Presentation */}
              <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden bg-space-950 flex items-center justify-center">
                {/* Vinyl Record behind/sliding */}
                <div
                  className={`absolute w-44 h-44 rounded-full bg-[#111116] border-4 border-[#22222b] shadow-2xl flex items-center justify-center transition-all duration-700 pointer-events-none ${
                    isPlayingThis
                      ? 'translate-x-10 rotate-[360deg] animate-spin'
                      : 'group-hover:translate-x-4 opacity-50'
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-purple-950">
                    <Disc3 className="w-6 h-6 text-purple-300" />
                  </div>
                </div>

                {/* Album Cover */}
                <div className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/10">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Play/Pause Button Overlay */}
                  <button
                    onClick={() => handlePlayCard(index)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all bg-purple-900/60 hover:bg-rose-600/70"
                  >
                    {isPlayingThis ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-1" />
                    )}
                  </button>

                  {/* Duration pill */}
                  {song.duration && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded glass-panel text-[10px] font-mono text-slate-300">
                      {song.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Song Meta */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif text-white font-medium group-hover:text-rose-200 transition-colors truncate">
                    {song.title}
                  </h3>
                  {isPlayingThis && (
                    <span className="flex items-center gap-1 text-[11px] text-purple-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      Playing
                    </span>
                  )}
                </div>

                <p className="text-xs text-purple-300/80 font-mono tracking-wider">
                  {song.artist}
                </p>

                {/* Memory note associated with the song */}
                {song.memory && (
                  <div className="pt-3 mt-3 border-t border-white/5">
                    <p className="text-xs text-slate-400 font-light leading-relaxed italic">
                      “{song.memory}”
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
