import { useState, useEffect } from 'react';

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

      // Update active section based on scroll position
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

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Certification', href: '#certification', id: 'certification' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'My Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
          isHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${isScrolled
          ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 border-b border-indigo-500/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-20 items-center">
        {/* Left Column identically mirroring Home text column */}
        <div className="text-left w-full flex items-center px-8 sm:px-12 lg:px-16">
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300"
            >
              HUMAN ERROR
            </a>
          </div>
        </div>

        {/* Right Column identically mirroring Home 3D model column */}
        <div className="w-full flex items-center justify-end">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 xl:px-4 xl:py-2 text-sm xl:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap ${activeSection === link.id
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden pr-4 sm:pr-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl border-t border-indigo-500/20">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${activeSection === link.id
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
