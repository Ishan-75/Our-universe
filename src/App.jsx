import React, { useState } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import MemoryGalaxy from './components/MemoryGalaxy';
import MessageCards from './components/MessageCards';
import MusicSection from './components/MusicSection';
import MusicPlayer from './components/MusicPlayer';
import ScenarioSection from './components/ScenarioSection';
import LoveLetter from './components/LoveLetter';
import FutureTimeline from './components/FutureTimeline';
import FinalSection from './components/FinalSection';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);

  const handleEnterUniverse = () => {
    setIsEntered(true);
    // Smooth scroll down to main content after entrance animation
    setTimeout(() => {
      const storyEl = document.getElementById('story');
      if (storyEl) {
        storyEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-slate-100 selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden font-sans">
      {/* Background Living Starfield Canvas */}
      <StarfieldCanvas speed={0.25} starCount={160} />

      {/* Subtle Ambient Cosmic Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Floating Top Navigation */}
      <Navbar isEntered={isEntered} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 01: Hero / Cinematic Entry */}
        <Hero
          onEnterUniverse={handleEnterUniverse}
          isEntered={isEntered}
        />

        {/* Subsequent Sections (Always mounted or smoothly revealed upon entering) */}
        {isEntered && (
          <div className="transition-opacity duration-1000 ease-in">
            {/* Section 02: Our Story (Relationship Timeline) */}
            <Timeline />

            {/* Section 03: Memory Galaxy (Interactive Night Sky) */}
            <MemoryGalaxy />

            {/* Section 04: Things I Never Say Enough (Interactive Messages) */}
            <MessageCards />

            {/* Section 05: Our Songs (Cinematic Music Cards) */}
            <MusicSection />

            {/* Section 06: If We Were... (Playful Scenarios) */}
            {/* <ScenarioSection /> */}

            {/* Section 07: The Letter (Glowing Envelope & Unfolding Heartpiece) */}
            <LoveLetter />

            {/* Section 08: Future Us (Horizons Ahead & Locked Milestones) */}
            {/* <FutureTimeline /> */}

            {/* Final Section: The Ending */}
            <FinalSection onScrollToTop={handleScrollToTop} />
          </div>
        )}
      </main>

      {/* Global Music Player Bar */}
      {isEntered && <MusicPlayer />}
    </div>
  );
}
