import React from 'react';
import { Shield, Menu, X, Landmark } from 'lucide-react';

interface NavbarProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ isAdminMode, setIsAdminMode, scrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'SERVICES', id: 'services' },
    { label: 'TOUR', id: 'tour' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setIsAdminMode(false);
            scrollToSection('home');
          }} 
          className="flex items-center space-x-2 cursor-pointer group"
          id="nav-logo"
        >
          <Landmark className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="font-sans font-medium tracking-widest text-lg md:text-xl text-white">
            WANDERLUSH
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8" id="nav-desktop-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setIsAdminMode(false);
                setTimeout(() => scrollToSection(item.id), 50);
              }}
              className="font-sans text-xs font-semibold tracking-wider text-white/80 hover:text-white transition duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right CTA / Admin Action */}
        <div className="hidden md:flex items-center space-x-4" id="nav-actions">
          {/* Admin Toggle */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 cursor-pointer ${
              isAdminMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/40'
            }`}
            id="btn-toggle-admin"
          >
            <Shield className={`h-3.5 w-3.5 ${isAdminMode ? 'animate-pulse text-amber-400' : ''}`} />
            <span>{isAdminMode ? 'LANDING PAGE' : 'ADMIN PORTAL'}</span>
          </button>

          {/* Schedule Button */}
          <button
            onClick={() => {
              setIsAdminMode(false);
              setTimeout(() => scrollToSection('contact'), 50);
            }}
            className="px-6 py-2.5 rounded-full border border-white/40 font-sans text-xs font-semibold tracking-widest text-white hover:bg-white hover:text-stone-900 transition-all duration-300 focus:outline-none cursor-pointer"
            id="btn-schedule"
          >
            Schedule Now
          </button>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`p-2 rounded-full border ${
              isAdminMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-white/10 text-white border-white/20'
            }`}
            title="Admin Dashboard"
            id="btn-toggle-admin-mobile"
          >
            <Shield className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            id="btn-mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          className="md:hidden absolute top-24 left-6 right-6 p-6 rounded-2xl bg-stone-950/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 flex flex-col space-y-4"
          id="mobile-drawer"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setIsOpen(false);
                setIsAdminMode(false);
                setTimeout(() => scrollToSection(item.id), 50);
              }}
              className="font-sans text-left text-sm font-semibold tracking-wider text-white/95 hover:text-amber-300 transition py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAdminMode(!isAdminMode);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-full text-xs font-semibold tracking-wider border bg-amber-500/20 text-amber-300 border-amber-500/40"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>{isAdminMode ? 'SWITCH TO LANDING PAGE' : 'OPEN ADMIN PORTAL'}</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAdminMode(false);
                setTimeout(() => scrollToSection('contact'), 50);
              }}
              className="w-full py-3 rounded-full bg-white text-stone-900 font-sans text-xs font-semibold tracking-widest text-center hover:bg-amber-300 transition-all duration-300"
            >
              Schedule Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
