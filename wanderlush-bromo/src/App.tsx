import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Villas from './components/Villas';
import TopographyMap from './components/TopographyMap';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import AdminDashboard from './components/AdminDashboard';
import { Landmark, Compass, ShieldAlert, Sparkles, Youtube, Facebook, Instagram, Phone, Mail } from 'lucide-react';

const BROMO_HERO_IMG = "/src/assets/images/bromo_hero_1779613900670.png";
const BROMO_JEEP_IMG = "/src/assets/images/bromo_jeep_1779613921975.png";
const BROMO_VILLA_IMG = "/src/assets/images/bromo_villa_1779613940289.png";
const BROMO_CABIN_IMG = "/src/assets/images/bromo_cabin_1779613957319.png";
const BROMO_HOTEL_IMG = "/src/assets/images/bromo_hotel_1779613976064.png";

export default function App() {
  const [isAdminMode, setIsAdminMode] = React.useState(false);
  const [messagesVersion, setMessagesVersion] = React.useState(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySuccess = () => {
    setMessagesVersion(prev => prev + 1);
  };

  if (isAdminMode) {
    return (
      <AdminDashboard
        onBackToLanding={() => setIsAdminMode(false)}
        messagesVersion={messagesVersion}
        triggerStatsRefresh={() => setMessagesVersion(prev => prev + 1)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 font-sans selection:bg-amber-400 selection:text-stone-950 flex flex-col relative">
      
      {/* Absolute Admin Overlay badge floating in upper corner to make testing obvious */}
      <div className="fixed bottom-6 right-6 z-40 select-none animate-bounce" id="admin-floating-portal">
        <button
          onClick={() => setIsAdminMode(true)}
          className="flex items-center space-x-2.5 px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-sans font-bold text-xs tracking-wider rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.4)] focus:outline-none transition group cursor-pointer"
        >
          <ShieldAlert className="h-4 w-4 text-stone-950 group-hover:rotate-12 transition-transform duration-300" />
          <span>OPEN ADMIN CONSOLE</span>
        </button>
      </div>

      {/* Global Navigation Header with custom transparent navbar */}
      <Navbar 
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
        scrollToSection={scrollToSection} 
      />

      {/* Core sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Cover */}
        <Hero 
          onExploreClick={() => scrollToSection('services')} 
          backgroundUrl={BROMO_HERO_IMG}
        />

        {/* Short aesthetic paragraph block as in reference */}
        <div className="bg-stone-955 text-center px-6 md:px-12 py-16 border-t border-white/5 border-b border-white/5 select-none" id="aesthetic-quote-block">
          <div className="max-w-3xl mx-auto">
            <span className="block text-amber-300 font-display font-medium text-lg md:text-xl tracking-tight leading-relaxed mb-4">
              “The beauty of Bromo Mountain lies in its stunning landscapes, ranging from vast volcanic craters to picturesque savannahs and lush forests.”
            </span>
            <p className="font-sans text-stone-400 text-xs sm:text-sm leading-relaxed">
              The mountain is surrounded by a sea of sand, which gives it a surreal, otherworldly quality that is truly breathtaking. Every crevice, contour, and draft of mist tells an ancient geological legend of tectonic perfection.
            </p>
          </div>
        </div>

        {/* Section 2: Journey Of Bromo (Cards) */}
        <Journey 
          countryCloudsImage={BROMO_HERO_IMG}
          jeepTourImage={BROMO_JEEP_IMG}
        />

        {/* Section 3: Villa Listings Grid */}
        <Villas 
          villaImage={BROMO_VILLA_IMG}
          hotelImage={BROMO_HOTEL_IMG}
          cabinImage={BROMO_CABIN_IMG}
        />

        {/* Section 4: Experience Map contour contours */}
        <TopographyMap />

        {/* Section 5: Articles and travel logs */}
        <Blog />

        {/* Section 6: Smtp transmission contact form */}
        <ContactForm onSuccess={handleInquirySuccess} />
      </main>

      {/* Premium Footer */}
      <footer className="bg-stone-950 border-t border-white/5 py-16 px-6 md:px-12 text-stone-400 text-xs font-sans select-none" id="main-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2" id="footer-logo">
              <Landmark className="h-5 w-5 text-amber-300" />
              <span className="font-sans font-semibold tracking-widest text-white text-base">WANDERLUSH</span>
            </div>
            <p className="leading-relaxed hover:text-stone-300 transition duration-300">
              Curation of bespoke expedition itineraries, elite mountain residences, and heritage safaris across East Java's volcanic national corridors.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wider">Scouting Sectors</h5>
            <div className="flex flex-col space-y-2">
              <button onClick={() => scrollToSection('home')} className="text-left text-stone-500 hover:text-amber-300 transition cursor-pointer">Hero Panorama</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-stone-500 hover:text-amber-300 transition cursor-pointer">The Active Journey</button>
              <button onClick={() => scrollToSection('tour')} className="text-left text-stone-500 hover:text-amber-300 transition cursor-pointer">Luxury Villa Select</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-stone-500 hover:text-amber-300 transition cursor-pointer">Terrain Map Model</button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wider">Contact Hotlines</h5>
            <div className="flex flex-col space-y-2 text-stone-400">
              <span className="flex items-center space-x-2">
                <Phone className="h-3 w-3 text-stone-500" />
                <span>+62 341 556-990 (Tosari Office)</span>
              </span>
              <span className="flex items-center space-x-2">
                <Mail className="h-3 w-3 text-stone-500" />
                <span>rionxee@gmail.com (Email target)</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wider">Connect Channels</h5>
            <div className="flex space-x-3 items-center">
              <a href="https://youtube.com" className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition duration-300">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-stone-400 hover:text-blue-400 border border-white/5 hover:border-blue-500/30 transition duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" className="p-2 rounded-lg bg-white/5 hover:bg-pink-500/20 text-stone-400 hover:text-pink-400 border border-white/5 hover:border-pink-500/30 transition duration-300">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-4">
          <p>© 2026 WANDERLUSH BROMO EXPEDITIONS. TO LIVE IN ETERNAL COLD.</p>
          <div className="flex space-x-6">
            <span className="flex items-center space-x-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Fullstack SMTP Integration Activated</span>
            </span>
            <span>Target: rionxee@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
