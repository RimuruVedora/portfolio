import { useState, useEffect, useRef } from 'react';
import Typewriter from './Typewriter';

const ScrollCard = ({ icon, title, text, cardShadowClass, iconBadgeClass, textHoverClass }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggles visibility on both scroll down and scroll up
        setIsVisible(entry.isIntersecting);
      },
      // Trigger earlier as soon as 25% of the block is in view from Block 1
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`min-h-[100dvh] w-full flex flex-col justify-center pt-32 pb-20 snap-center relative z-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
      <div 
        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group hover:bg-white/10 ${cardShadowClass} w-full mx-auto`}
        style={{ padding: '2.5rem', maxWidth: '95%' }} 
      >
        <div 
          className={`w-16 h-16 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-500 ${iconBadgeClass}`}
          style={{ marginBottom: '2.5rem' }} // Forcing 40px margin directly
        >
          {icon}
        </div>
        <h3 
          className="text-2xl sm:text-3xl font-bold text-white leading-tight"
          style={{ marginBottom: '2rem' }} // Forcing 32px margin directly
        >
          {title}
        </h3>
        <div className={`text-gray-400 font-medium leading-relaxed text-[16px] sm:text-lg ${textHoverClass} transition-colors`}>
          {text}
        </div>
      </div>
    </div>
  );
};
import Model3D from './Model3D';

const Home = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scroller = document.getElementById('main-scroller');
    if (!scroller) return;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 300); // Hide after 300ms of not scrolling
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    // Create an invisible link to download the PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadModalOpen(false);
    
    // Add a slight delay for the transition effect
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 400);
  };

  return (
    <>
      {/* Universal Backdrop */}
      <div 
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isDownloadModalOpen || isSuccessModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsDownloadModalOpen(false);
          setIsSuccessModalOpen(false);
        }}
      />

      {/* Scroll & Modal Decorations (Massive Gears) */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-all duration-700 ${
          isDownloadModalOpen || isSuccessModalOpen ? 'z-[90]' : 'z-[5]'
        }`}
      >
        {/* Upper Left Massive Gear (Visible on Modal OR Scrolling) */}
        <img 
          src="/double_gear.gif" 
          alt="Top Left Gear" 
          className={`absolute -top-12 -left-16 sm:-top-20 sm:-left-20 md:-top-24 md:-left-24 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain mix-blend-screen transition-opacity duration-700 ${
            isDownloadModalOpen || isSuccessModalOpen || isScrolling ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Lower Right Massive Gear (Visible ONLY on Modal) */}
        <img 
          src="/gear.gif" 
          alt="Bottom Right Gear" 
          className={`absolute bottom-0 right-0 translate-x-[35%] translate-y-[35%] w-80 h-80 sm:w-96 sm:h-96 md:w-[32rem] md:h-[32rem] object-contain mix-blend-screen transition-opacity duration-700 ${
            isDownloadModalOpen || isSuccessModalOpen ? 'opacity-90' : 'opacity-0'
          }`}
        />
      </div>

      {/* Download Modal */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-all duration-500 ${
          isDownloadModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Modal Content */}
        <div 
          className={`relative pointer-events-auto bg-gray-900/90 backdrop-blur-2xl border border-orange-500/30 rounded-3xl max-w-md w-full mx-4 shadow-[0_0_50px_rgba(249,115,22,0.15)] transform transition-all duration-500 flex flex-col items-center text-center ${
            isDownloadModalOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
          }`}
          style={{ padding: '50px 40px 60px 40px' }}
        >
          {/* Animated GIF Icon */}
          <div className="w-24 h-24 mb-6 rounded-2xl bg-orange-500/10 flex items-center justify-center p-2 shadow-inner border border-orange-500/20">
            <img src="/download_cloud.gif" alt="Download Illustration" className="w-full h-full object-contain mix-blend-screen" />
          </div>

          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-3">
            Download Resume
          </h3>
          
          <p className="text-gray-300 mb-8 text-sm leading-relaxed">
            You're about to download my resume. Would you like to proceed and save a copy of <span className="text-white font-bold">resume.pdf</span>?
          </p>

          <div className="flex gap-4 w-full" style={{ marginTop: '35px' }}>
            <button 
              onClick={() => setIsDownloadModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              Cancel
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-all duration-500 ${
          isSuccessModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Modal Content */}
        <div 
          className={`relative pointer-events-auto bg-gray-900/90 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl max-w-md w-full mx-4 shadow-[0_0_50px_rgba(16,185,129,0.15)] transform transition-all duration-500 flex flex-col items-center text-center ${
            isSuccessModalOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
          }`}
          style={{ padding: '50px 40px 60px 40px' }}
        >
          {/* Animated GIF Icon */}
          <div className="w-24 h-24 mb-6 rounded-2xl bg-emerald-500/10 flex items-center justify-center p-2 shadow-inner border border-emerald-500/20">
            <img src="/success.gif" alt="Success Illustration" className="w-full h-full object-contain mix-blend-screen" />
          </div>

          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-3">
            Download Complete
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            Your download has successfully started. Thank you for your interest!
          </p>

          <div className="flex justify-center w-full" style={{ marginTop: '35px' }}>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Awesome!
            </button>
          </div>
        </div>
      </div>

      <section id="home" className="w-full relative flex items-start justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
        
        {/* Left Side - Text Content & Scrolling Cards */}
        <div className="w-full text-left flex flex-col z-10 order-2 lg:order-1 px-8 sm:px-12 lg:px-16">
          
          {/* Block 1: Hero */}
          <div className="min-h-[100dvh] flex flex-col justify-center py-20 snap-center relative z-20">
            <div className="space-y-6 sm:space-y-8 w-full">
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to my portfolio
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 tracking-widest uppercase mt-4">
                  Hi My Name Is
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] leading-tight tracking-tight animate-pulse mt-2 text-left">
                  Celherson A.{' '}
                  <span className="inline-flex items-center align-middle whitespace-nowrap">
                    Guzman
                    <img 
                      src="/hi.gif" 
                      alt="hi" 
                      className="w-14 sm:w-16 md:w-20 lg:w-24 h-auto object-contain ml-3 sm:ml-5"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </span>
                </h1>
              </div>

              <div className="min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] h-auto flex items-center justify-start">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                  <span className="text-gray-300">I'm a </span>
                  <Typewriter
                    texts={['Freelance Web/Mobile Developer', 'Full Stack Developer']}
                    speed={80}
                    deleteSpeed={40}
                    pauseDuration={2500}
                    className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  />
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-start pt-8 sm:pt-12 mt-8 z-20 relative">
                <button
                  onClick={() => {
                    const contact = document.getElementById('contact');
                    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-3 px-10 py-4 lg:py-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-full hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,1)] hover:scale-105 active:scale-95 text-center text-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get In Touch
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDownloadModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-3 px-10 py-4 lg:py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:shadow-[0_0_35px_rgba(249,115,22,1)] hover:scale-105 active:scale-95 text-center text-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </button>
              </div>
            </div>

            {/* Scroll Indicator (Only inside Hero block) */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
              <a href="#about" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Block 2: Card 1 */}
          <ScrollCard 
            title="End-to-End System Development"
            text="Architect and deployed over 17 custom web applications using Laravel (PHP) and MySQL, transforming complex client requirements into functional, high-performance systems with a focus on scalable database design using SQLYog."
            cardShadowClass="hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]"
            iconBadgeClass="bg-indigo-500/20 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            textHoverClass="group-hover:text-gray-300"
            icon={
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
          />

          {/* Block 3: Card 2 */}
          <ScrollCard 
            title="Modern Frontend & UI/UX"
            text="Developed highly responsive, mobile-first user interfaces by leveraging Tailwind CSS and JavaScript, ensuring a seamless user experience across multiple devices while maintaining clean, maintainable code."
            cardShadowClass="hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
            iconBadgeClass="bg-orange-500/20 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            textHoverClass="group-hover:text-gray-300"
            icon={
              <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            }
          />

          {/* Block 4: Card 3 */}
          <ScrollCard 
            title="DevOps & Deployment Efficiency"
            text="Streamlined the deployment lifecycle using Git and Bitvise SSH, reducing manual deployment time by 50% while maintaining 99.9% system uptime across multiple LiteSpeed server environments."
            cardShadowClass="hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
            iconBadgeClass="bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            textHoverClass="group-hover:text-gray-300"
            icon={
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
          />
        </div>

        {/* Right Side - 3D Model Sticky Container */}
        <div className="w-full h-[400px] lg:h-[100dvh] lg:sticky lg:top-0 flex items-center justify-center order-1 lg:order-2 z-0 pb-10 lg:pb-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-60"></div>
          <div className="w-full h-full relative pointer-events-auto flex items-center justify-center max-h-[800px]">
             <Model3D />
             
             {/* 3D Interactive Badge */}
             <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-white/90 text-sm font-medium whitespace-nowrap animate-[bounce_3s_infinite] shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-black/70 hover:scale-105 transition-all">
               <svg className="w-5 h-5 text-indigo-400 animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               Interactive 3D Model &bull; Drag to rotate
             </div>
          </div>
        </div>

      </div>
      </section>
    </>
  );
};

export default Home;
