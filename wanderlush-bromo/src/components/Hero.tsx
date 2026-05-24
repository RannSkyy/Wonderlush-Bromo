import { motion } from 'motion/react';
import { Compass, Sparkles, MapPin, AppWindow, Youtube, Facebook, Instagram } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  backgroundUrl: string;
}

export default function Hero({ onExploreClick, backgroundUrl }: HeroProps) {
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image Layer with Vignette & Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundUrl}
          alt="Mount Bromo Caldera Landscape at Golden Sunrise"
          className="w-full h-full object-cover scale-105 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlays to ensure high-contrast reading */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-900/60" />
        <div className="absolute inset-0 bg-stone-950/20" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-44 flex flex-col items-center text-center">
        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-8"
          id="hero-badge"
        >
          <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
          <span>A Place Where Nature and Adventure Unite</span>
        </motion.div>

        {/* Huge Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight max-w-5xl mb-8"
          id="hero-title"
        >
          Experience the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-amber-200">
            Magic of Bromo
          </span>
        </motion.h1>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          id="hero-cta-container"
        >
          <button
            onClick={onExploreClick}
            className="group px-8 py-4 rounded-full bg-white text-stone-950 font-sans text-xs sm:text-sm font-semibold tracking-widest shadow-xl hover:bg-stone-200 hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            id="btn-hero-explore"
          >
            <span>Explore Now</span>
            <Compass className="h-4.5 w-4.5 text-stone-950 group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Floating Bottom Overlays (From Reference Image) & Social Bar */}
      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto pointer-events-none">
        
        {/* Left Floating Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pointer-events-auto flex items-start space-x-4 p-5 rounded-2xl bg-stone-900/60 backdrop-blur-xl border border-white/10 max-w-md shadow-2xl hover:border-white/20 transition-all duration-300"
          id="hero-floating-left-card"
        >
          <div className="p-3 bg-white/10 rounded-xl text-amber-300">
            <MapPin className="h-5 w-5" />
          </div>
          <p className="font-sans text-xs md:text-sm leading-relaxed text-stone-300">
            Provides a visual representation of destinations, attractions, and breathtaking volcanic activities.
          </p>
        </motion.div>

        {/* Right Floating Info Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="pointer-events-auto flex items-start space-x-4 p-5 rounded-2xl bg-stone-900/60 backdrop-blur-xl border border-white/10 max-w-md shadow-2xl hover:border-white/20 transition-all duration-300"
          id="hero-floating-right-card"
        >
          <div className="p-3 bg-white/10 rounded-xl text-sky-300">
            <AppWindow className="h-5 w-5" />
          </div>
          <p className="font-sans text-xs md:text-sm leading-relaxed text-stone-300">
            Provides travelers with more accurate and reliable perspective of the national resort's terrain.
          </p>
        </motion.div>

        {/* Vertical Social Channels Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pointer-events-auto hidden lg:flex flex-col space-y-4 items-center bg-stone-950/40 backdrop-blur-md p-3 rounded-full border border-white/5 shadow-lg absolute right-[-10px] bottom-36"
          id="hero-socials-bar"
        >
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-red-500 transition-colors duration-300" id="hero-social-yt">
            <Youtube className="h-4.5 w-4.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-blue-500 transition-colors duration-300" id="hero-social-fb">
            <Facebook className="h-4.5 w-4.5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-pink-500 transition-colors duration-300" id="hero-social-ig">
            <Instagram className="h-4.5 w-4.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
