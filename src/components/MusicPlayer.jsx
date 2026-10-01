import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  Disc, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  Bell,
  BellOff
} from 'lucide-react';
import { audioManager, playSound } from '../utils/audioManager';

export default function MusicPlayer() {
  const [audioState, setAudioState] = useState(audioManager.getState());
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioManager.seek(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    audioManager.setVolume(newVol);
  };

  const currentSong = audioState.currentSong;

  return (
    <>
      {/* Floating Bottom Music Bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-40 select-none"
      >
        <div className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Song Info & Thumbnail */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-space-950 border border-white/10">
                {currentSong?.cover ? (
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className={`w-full h-full object-cover ${
                      audioState.isPlaying ? 'animate-pulse' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-950">
                    <Disc className="w-5 h-5 text-purple-300" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-serif font-medium text-white truncate">
                  {currentSong ? currentSong.title : 'No Track Selected'}
                </h4>
                <p className="text-[11px] text-purple-300/80 font-mono truncate">
                  {currentSong ? currentSong.artist : 'Our Little Universe'}
                </p>
              </div>
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  playSound('buttonClick');
                  audioManager.prevSong();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playSound('buttonClick');
                  audioManager.togglePlay();
                }}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                title={audioState.isPlaying ? 'Pause' : 'Play'}
              >
                {audioState.isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => {
                  playSound('buttonClick');
                  audioManager.nextSong();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Next track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Playlist Drawer Toggle */}
              <button
                onClick={() => {
                  playSound('buttonClick');
                  setShowPlaylist(!showPlaylist);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  showPlaylist ? 'bg-purple-600/40 text-purple-200' : 'text-slate-400 hover:text-white'
                }`}
                title="Playlist"
              >
                <ListMusic className="w-4 h-4" />
              </button>

              {/* Global Sound On/Off Toggle */}
              <button
                onClick={() => {
                  const newState = audioManager.toggleSound();
                  if (newState) playSound('buttonClick');
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  audioState.soundEnabled
                    ? 'text-rose-300 hover:bg-rose-500/10'
                    : 'text-slate-500 hover:bg-slate-700/20'
                }`}
                title={audioState.soundEnabled ? 'Sound Effects & Music: ON' : 'Sound Effects & Music: OFF'}
              >
                {audioState.soundEnabled ? (
                  <Bell className="w-4 h-4" />
                ) : (
                  <BellOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar & Timing */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
              {formatTime(audioState.currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={audioState.duration || 100}
              step="0.1"
              value={audioState.currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />

            <span className="text-[10px] font-mono text-slate-400 w-8">
              {formatTime(audioState.duration)}
            </span>

            {/* Inline Volume control */}
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <button
                onClick={() => audioManager.toggleMute()}
                className="text-slate-400 hover:text-white"
              >
                {audioState.isMuted || audioState.volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.isMuted ? 0 : audioState.volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Expandable Playlist Drawer */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className="mb-2 p-3 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-xs font-serif tracking-wider text-slate-300">Playlist</span>
                <span className="text-[10px] font-mono text-purple-300">
                  {audioState.playlist.length} Tracks
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {audioState.playlist.map((song, idx) => {
                  const isPlaying = audioState.currentSongIndex === idx;
                  return (
                    <button
                      key={song.id || idx}
                      onClick={() => {
                        playSound('buttonClick');
                        audioManager.playSong(idx);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                        isPlaying
                          ? 'bg-purple-600/30 text-white border border-purple-400/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-slate-500 w-4">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <p className="font-medium truncate">{song.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">{song.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isPlaying && audioState.isPlaying && (
                          <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        )}
                        <span className="font-mono text-[10px] text-slate-400">
                          {song.duration || '3:00'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
