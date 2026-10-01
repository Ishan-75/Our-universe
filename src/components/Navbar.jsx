import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Volume2, VolumeX, Menu, X, Music } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { audioManager, playSound } from '../utils/audioManager';

export default function Navbar({ isEntered }) {
  const { couple } = relationshipData;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioState, setAudioState] = useState(audioManager.getState());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(setAudioState);
    return unsubscribe;
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Memory Galaxy', href: '#galaxy' },
    { name: 'Messages', href: '#messages' },
    { name: 'Our Songs', href: '#music' },
    { name: 'If We Were...', href: '#scenarios' },
    { name: 'The Letter', href: '#letter' },
    { name: 'Future Us', href: '#future' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playSound('buttonClick');
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isEntered) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#05050e]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Couple Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full glass-panel border border-rose-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-rose-300" />
          </div>
          <span className="font-serif text-base tracking-wider text-slate-100 group-hover:text-rose-200 transition-colors">
            {couple.person2} & {couple.person1}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-white transition-colors relative py-1 hover:text-glow"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const res = audioManager.toggleSound();
              if (res) playSound('buttonClick');
            }}
            className={`p-2 rounded-full glass-panel border border-white/10 transition-colors ${
              audioState.soundEnabled
                ? 'text-rose-300 hover:bg-rose-500/10'
                : 'text-slate-500 hover:bg-slate-700/20'
            }`}
            title={audioState.soundEnabled ? 'Sound ON' : 'Sound OFF'}
          >
            {audioState.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-panel border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-white/10 overflow-hidden bg-[#070714]/95 backdrop-blur-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-sm uppercase tracking-widest text-slate-300 hover:text-rose-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
