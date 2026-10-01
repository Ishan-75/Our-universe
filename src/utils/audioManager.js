/**
 * GLOBAL AUDIO & SOUND EFFECT SYSTEM
 * Handles background music playback, ducking, playlist management,
 * and high-fidelity sound effects with Web Audio API fallback.
 */

import { soundEffects } from '../data/audioData';
import { relationshipData } from '../data/relationshipData';

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.musicAudio = null;
    this.soundEnabled = true;
    this.isMuted = false;
    this.musicVolume = 0.55;
    this.sfxVolume = 0.75;
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.playlist = relationshipData.songs || [];
    this.listeners = new Set();
    this.duckTimeout = null;

    // Load persisted preferences if available
    try {
      const savedSound = localStorage.getItem('universe_sound_enabled');
      if (savedSound !== null) {
        this.soundEnabled = JSON.parse(savedSound);
      }
    } catch {
      // Ignore localStorage error
    }

    this.initMusicElement();
  }

  getAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  initMusicElement() {
    if (typeof window === 'undefined') return;

    this.musicAudio = new Audio();
    this.musicAudio.preload = 'metadata';
    this.musicAudio.volume = this.musicVolume;

    this.musicAudio.addEventListener('timeupdate', () => {
      this.currentTime = this.musicAudio.currentTime || 0;
      this.notifyListeners();
    });

    this.musicAudio.addEventListener('loadedmetadata', () => {
      this.duration = this.musicAudio.duration || 0;
      this.notifyListeners();
    });

    this.musicAudio.addEventListener('ended', () => {
      this.nextSong(true);
    });

    this.musicAudio.addEventListener('error', () => {
      console.warn('Audio track could not be loaded, using fallback.');
      this.isPlaying = false;
      this.notifyListeners();
    });

    if (this.playlist.length > 0) {
      this.loadSong(0);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Trigger initial state
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error notifying audio listener:', err);
      }
    });
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentSong: this.playlist[this.currentSongIndex] || null,
      currentSongIndex: this.currentSongIndex,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.musicVolume,
      isMuted: this.isMuted,
      soundEnabled: this.soundEnabled,
      playlist: this.playlist,
    };
  }

  loadSong(index) {
    if (!this.playlist[index] || !this.musicAudio) return;
    this.currentSongIndex = index;
    const song = this.playlist[index];
    this.musicAudio.src = song.audio;
    this.currentTime = 0;
    this.duration = 0;
    this.notifyListeners();
  }

  async playSong(index = null) {
    if (index !== null && index !== this.currentSongIndex) {
      this.loadSong(index);
    }
    if (!this.musicAudio) return;

    try {
      this.getAudioContext();
      await this.musicAudio.play();
      this.isPlaying = true;
      this.notifyListeners();
    } catch (err) {
      console.warn('Audio play prevented or file missing:', err);
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  pauseSong() {
    if (!this.musicAudio) return;
    this.musicAudio.pause();
    this.isPlaying = false;
    this.notifyListeners();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  nextSong(autoPlay = true) {
    let nextIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.loadSong(nextIndex);
    if (autoPlay || this.isPlaying) {
      this.playSong();
    }
  }

  prevSong() {
    let prevIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadSong(prevIndex);
    if (this.isPlaying) {
      this.playSong();
    }
  }

  seek(seconds) {
    if (!this.musicAudio) return;
    this.musicAudio.currentTime = Math.min(Math.max(0, seconds), this.duration || 100);
    this.currentTime = this.musicAudio.currentTime;
    this.notifyListeners();
  }

  setVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.musicAudio) {
      this.musicAudio.volume = this.isMuted ? 0 : this.musicVolume;
    }
    this.notifyListeners();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.musicAudio) {
      this.musicAudio.volume = this.isMuted ? 0 : this.musicVolume;
    }
    this.notifyListeners();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    try {
      localStorage.setItem('universe_sound_enabled', JSON.stringify(this.soundEnabled));
    } catch {
      // Ignore
    }
    if (!this.soundEnabled && this.isPlaying) {
      this.pauseSong();
    }
    this.notifyListeners();
    return this.soundEnabled;
  }

  /**
   * Smoothly duck music volume (e.g. while reading letter)
   */
  duckMusic(factor = 0.2, durationMs = 8000) {
    if (!this.musicAudio || this.isMuted) return;
    const targetVolume = this.musicVolume * factor;
    this.musicAudio.volume = targetVolume;

    if (this.duckTimeout) clearTimeout(this.duckTimeout);
    this.duckTimeout = setTimeout(() => {
      this.restoreMusicVolume();
    }, durationMs);
  }

  restoreMusicVolume() {
    if (!this.musicAudio || this.isMuted) return;
    // Gradual volume fade up
    const original = this.musicVolume;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const current = this.musicAudio.volume;
      const next = current + (original - current) * 0.2;
      this.musicAudio.volume = Math.min(original, next);
      if (step >= 10 || Math.abs(original - this.musicAudio.volume) < 0.02) {
        this.musicAudio.volume = original;
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Sound effect player: plays the designated sound effect path.
   * If audio file fails or cannot play, smoothly synthesizes tone with Web Audio.
   */
  playSound(soundName) {
    if (!this.soundEnabled) return;

    const sfxPath = soundEffects[soundName];
    if (sfxPath) {
      const audio = new Audio(sfxPath);
      audio.volume = this.sfxVolume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If media file fails, trigger celestial Web Audio synthesis
          this.synthesizeSound(soundName);
        });
        return;
      }
    }

    this.synthesizeSound(soundName);
  }

  synthesizeSound(soundName) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      if (soundName === 'buttonClick') {
        // High crystal chime
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.12);

        gain.gain.setValueAtTime(0.15 * this.sfxVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (soundName === 'heartPop') {
        // Warm bubbled note
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.18);

        gain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (soundName === 'pageOpen' || soundName === 'letterOpen') {
        // Delicate harmonic chime chord
        const notes = soundName === 'letterOpen' ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          noteGain.gain.setValueAtTime(0.12 * this.sfxVolume, now + idx * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8);

          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.85);
        });
      } else if (soundName === 'transition') {
        // Celestial swoosh
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.15 * this.sfxVolume, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Ignore web audio exceptions
    }
  }
}

export const audioManager = new AudioManager();
export const playSound = (name) => audioManager.playSound(name);
