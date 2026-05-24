import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, Clock, User, Award, ShieldAlert, X } from 'lucide-react';

interface JourneyProps {
  countryCloudsImage: string;
  jeepTourImage: string;
}

export default function Journey({ countryCloudsImage, jeepTourImage }: JourneyProps) {
  const [reminderActive, setReminderActive] = React.useState(false);
  const [notification, setNotification] = React.useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = React.useState(false);

  const triggerReminder = () => {
    setReminderActive(!reminderActive);
    if (!reminderActive) {
      setNotification("⏰ Reminder set! We will notify you of upcoming travel schedules and early-bird Bromo discounts.");
    } else {
      setNotification("Reminder cancelled.");
    }
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80"
  ];

  return (
    <section id="services" className="relative bg-stone-950 py-24 px-6 md:px-12 select-none border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block with responsive split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16" id="journey-header">
          <div className="lg:col-span-6">
            <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              The Journey Of <br />
              Bromo Mountain
            </h2>
          </div>
          
          <div className="lg:col-span-6 lg:pl-8 flex flex-col justify-between h-full space-y-6">
            <p className="font-sans text-stone-400 text-sm md:text-base leading-relaxed">
              This journey offers an unforgettable experience that blends adventure, culture, and natural beauty. Located in the Bromo Tengger Semeru National Park, this mountain invites travelers into ethereal surroundings.
            </p>
            
            {/* Quick buttons */}
            <div className="flex flex-wrap gap-4" id="journey-buttons">
              <button
                onClick={triggerReminder}
                className={`px-6 py-3 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                  reminderActive
                    ? 'bg-amber-400 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-stone-900 text-white hover:bg-stone-800 border border-white/10'
                }`}
                id="btn-reminder"
              >
                {reminderActive ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                <span>{reminderActive ? 'Reminder Set' : 'Reminder me'}</span>
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-white/40 font-sans text-xs font-semibold tracking-wider text-white hover:bg-white/5 transition duration-300 focus:outline-none cursor-pointer"
                id="btn-learn-more"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-8 p-4 bg-stone-900 border border-amber-400/30 rounded-xl text-amber-200 text-xs md:text-sm font-sans flex items-center space-x-3 shadow-xl max-w-xl"
              id="journey-notification"
            >
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Cards Grid (Two Large Side-by-Side Images from Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="journey-cards-grid">
          
          {/* Card 1: Country Above the Clouds */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-7 relative group rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[450px] shadow-2xl border border-white/10"
            id="journey-card-clouds"
          >
            {/* Image */}
            <img
              src={countryCloudsImage}
              alt="Bromo sea of mist with volcanic silhouette"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/10 to-transparent" />
            
            {/* Top Badge Tag */}
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 text-[9px] uppercase tracking-widest font-semibold bg-amber-400/20 backdrop-blur-md text-amber-300 border border-amber-400/40 rounded-full">
                Most Interesting
              </span>
            </div>

            {/* Bottom Content Info */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-amber-300/95 mb-2">
                  The Beauty Of Bromo
                </p>
                <h3 className="font-sans font-bold text-2xl lg:text-3xl text-white tracking-tight">
                  Country above the clouds
                </h3>
              </div>
              
              {/* Avatars Stack (Right Side in Reference) */}
              <div className="flex items-center -space-x-2">
                {avatars.map((av, index) => (
                  <img
                    key={index}
                    src={av}
                    alt="Traveler avatar thumbnail"
                    className="w-8 h-8 rounded-full border border-stone-950 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-amber-400 font-sans text-[10px] font-bold text-stone-950 flex items-center justify-center border border-stone-950">
                  +2k
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Lava Jeep Tour */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-5 relative group rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-[450px] shadow-2xl border border-white/10"
            id="journey-card-jeep"
          >
            {/* Image */}
            <img
              src={jeepTourImage}
              alt="4x4 Retro Toyota Land Cruiser on Bromo ash field"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/10 to-transparent" />
            
            {/* Play Button Icon on Upper Right */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white hover:bg-white hover:text-stone-950 group-hover:scale-110 transition duration-300 shadow-xl focus:outline-none cursor-pointer"
              title="Watch Tour Highlights Video"
              id="btn-play-jeep-tour"
            >
              <Play className="h-5 w-5 fill-current" />
            </button>

            {/* Bottom Content Info */}
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[10px] uppercase tracking-widest font-bold text-sky-300/95 mb-2">
                Jeeps Go Around Bromo
              </p>
              <h3 className="font-sans font-bold text-2xl text-white tracking-tight">
                Lava Jeep Tour
              </h3>
            </div>
          </motion.div>

        </div>

        {/* Brand highlights bento grid underneath */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-stone-900/40 p-8 rounded-3xl border border-white/5" id="journey-bento-highlights">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-2xl">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white text-sm mb-1">Local Sherpa Guides</h4>
              <p className="text-stone-400 text-xs leading-relaxed">Our tours are guided by indigenous Tenggerese scouts with generations of Bromo wisdom.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
            <div className="p-3 bg-teal-400/10 text-teal-400 rounded-2xl">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white text-sm mb-1">Certified Safety Track</h4>
              <p className="text-stone-400 text-xs leading-relaxed">Fully inspected 4x4 vehicles, satellite communications, and active volcanic safety gear provided.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
            <div className="p-3 bg-rose-400/10 text-rose-400 rounded-2xl">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white text-sm mb-1">Flexible Rescheduling</h4>
              <p className="text-stone-400 text-xs leading-relaxed">Dynamic weather refunds and effortless 1-click rebooking if eruption warnings crop up.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Simulated Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md" id="video-modal">
          <div className="relative bg-stone-900 w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-stone-950/80 hover:bg-stone-950 text-white rounded-full transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[16/9] w-full bg-stone-950 relative flex items-center justify-center">
              {/* Fallback mock image inside video */}
              <img 
                src={jeepTourImage} 
                alt="Jeep Adventure mockup video thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/40 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="p-4 bg-amber-400 text-stone-950 rounded-full animate-bounce mb-4">
                  <Play className="h-6 w-6 fill-current" />
                </div>
                <h4 className="font-sans font-bold text-white text-xl mb-1">Bromo Lava Jeep Tour Highlight</h4>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md">Simulating full cinematic drone 4K reels! Connect with our agent to view complete private tour recordings.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
