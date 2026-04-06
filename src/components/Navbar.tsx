import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleVideoToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      setIsHidden(customEvent.detail.isPlaying);
    };
    window.addEventListener('videoPlaybackToggle', handleVideoToggle);
    return () => window.removeEventListener('videoPlaybackToggle', handleVideoToggle);
  }, []);

  useEffect(() => {
    const scroller = document.getElementById('main-scroller');

    const handleScroll = () => {
      const currentScrollY = scroller ? scroller.scrollTop : window.scrollY;
      setIsScrolled(currentScrollY > 50);

      const sections = ['home', 'about', 'education', 'certification', 'experience', 'projects', 'skills', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
      return () => scroller.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: '🏠' },
    { name: 'About Me', href: '#about', id: 'about', icon: '👤' },
    { name: 'Education', href: '#education', id: 'education', icon: '🎓' },
    { name: 'Certification', href: '#certification', id: 'certification', icon: '🏅' },
    { name: 'Experience', href: '#experience', id: 'experience', icon: '💼' },
    { name: 'My Projects', href: '#projects', id: 'projects', icon: '🚀' },
    { name: 'Skills', href: '#skills', id: 'skills', icon: '⚡' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: '📬' },
  ];

  const Sidebar = () => createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[300px] z-[160] md:hidden bg-gray-900/98 backdrop-blur-2xl border-l border-indigo-500/20 shadow-[-20px_0_60px_rgba(99,102,241,0.15)] transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-lg font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Navigation
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-pink-600/30 hover:text-pink-400 text-gray-400 hover:rotate-90 transition-all duration-300 border border-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col gap-1 px-4 py-6 overflow-y-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-base transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-white bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/8 border border-transparent'
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-lg w-7 text-center">{link.icon}</span>
              <span>{link.name}</span>
              {activeSection === link.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.9)]" />
              )}
            </a>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-gray-600 text-xs text-center font-medium tracking-wider">HUMAN ERROR © 2025</p>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
          isHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${isScrolled
          ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 border-b border-indigo-500/20'
          : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl w-full h-20 flex items-center justify-between">

          {/* Logo — left corner */}
          <div className="flex items-center" style={{ paddingLeft: 'clamp(16px, 4vw, 64px)' }}>
            <a
              href="#home"
              className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300"
            >
              HUMAN ERROR
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 pr-4 lg:pr-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 xl:px-4 xl:py-2 text-sm xl:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap ${
                    activeSection === link.id
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger — pushed to far right corner */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 mr-2 gap-[5px] group"
              aria-label="Open menu"
            >
              <span className={`block h-[2.5px] bg-gray-300 group-hover:bg-white transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'w-5' : 'w-6'}`} />
              <span className={`block h-[2.5px] bg-gray-300 group-hover:bg-white transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'w-3' : 'w-5'}`} />
              <span className={`block h-[2.5px] bg-gray-300 group-hover:bg-white transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'w-5' : 'w-4'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar rendered via portal — escapes nav's transform stacking context */}
      <Sidebar />
    </>
  );
};

export default Navbar;
