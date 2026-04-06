import { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isAdFinished, setIsAdFinished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger exact single-time autoplay when in view, AND only if the Ad hasn't already finished
        if (entry.isIntersecting && !hasPlayed && !isAdFinished) {
          if (mainVideoRef.current) {
            mainVideoRef.current.play().then(() => {
              // Successfully started playback! Emit event to hide the Navbar
              window.dispatchEvent(
                new CustomEvent('videoPlaybackToggle', { detail: { isPlaying: true } })
              );
              setHasPlayed(true);
            }).catch(err => {
              console.error("Autoplay thwarted by browser policy:", err);
            });
          }
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayed, isAdFinished]);

  const handleMainVideoEnd = () => {
    // 1. Release the Navbar restrictions
    window.dispatchEvent(
      new CustomEvent('videoPlaybackToggle', { detail: { isPlaying: false } })
    );
    // 2. Trigger UI dynamic state shift!
    setIsAdFinished(true);
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className={`w-full relative min-h-screen flex items-center justify-center snap-start overflow-hidden transition-colors duration-1000 ${
        isAdFinished ? 'bg-[#0f0f23]' : 'bg-black'
      }`}
    >
      
      {/* =========================================
          PHASE 1: Full Screen Ad 
          Fades out precisely when the video completes
          ========================================= */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isAdFinished ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <video 
          ref={mainVideoRef}
          src="/advertise.mp4" 
          className="w-full h-full object-cover"
          playsInline
          preload="none"
          onEnded={handleMainVideoEnd} 
        />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none"></div>
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#0f0f23] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0f0f23] to-transparent pointer-events-none z-10"></div>
      </div>


      {/* =========================================
          PHASE 2: Content Layout
          Fades in and slides up exactly as Phase 1 completes
          ========================================= */}
      <div 
        className={`relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 transform ${
          isAdFinished ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        
        <div className="text-center mb-12 sm:mb-16">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
             Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Experience</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Skill Matrix Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(249,115,22,0.1)] hover:bg-white/10 transition-all duration-500 w-full" style={{ padding: '40px' }}>
             
             {/* Inner scrollable wrapper keeping the scrollbar safely inside the padded bounds */}
             <div className="flex flex-col gap-10 max-h-[50vh] overflow-y-auto overflow-x-hidden" style={{ paddingRight: '16px', paddingBottom: '24px', paddingTop: '8px' }}>
               <div className="border-l-[4px] border-orange-500 py-2 hover:translate-x-2 transition-all duration-300" style={{ paddingLeft: '28px' }}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-widest uppercase">
                    End-to-End <span className="text-orange-400">System Development</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Architected and deployed over 12 custom web applications using <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Laravel (PHP)</strong> and <strong className="text-blue-400">MySQL</strong>. Transformed complex client requirements into functional, high-performance systems with a strict focus on scalable database design leveraging <strong className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">SQLYog</strong>.
                  </p>
               </div>

               <div className="border-l-[4px] border-pink-500 py-2 hover:translate-x-2 transition-all duration-300" style={{ paddingLeft: '28px' }}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-widest uppercase">
                    Modern <span className="text-pink-400">Frontend & UI/UX</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Developed highly responsive, mobile-first user interfaces by leveraging <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tailwind CSS</strong> and modern <strong className="text-yellow-400">JavaScript</strong>. Ensured seamless user experiences across multiple device ecosystems while maintaining clean, maintainable code structures.
                  </p>
               </div>

               <div className="border-l-[4px] border-[#22d3ee] py-2 hover:translate-x-2 transition-all duration-300" style={{ paddingLeft: '28px' }}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-widest uppercase">
                    DevOps & <span className="text-[#22d3ee]">Deployment</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Streamlined the deployment lifecycle using <strong className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Git</strong> and <strong className="text-purple-400">Bitvise SSH</strong>. Reduced manual deployment times by 50% while successfully maintaining a 99.9% system uptime across multiple <strong className="text-green-400">LiteSpeed</strong> server environments.
                  </p>
               </div>
             </div>
          </div>

          {/* Right Column: User Controllable Interactive Video */}
          <div className="w-full relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.2)] bg-black border-2 border-orange-500/20 group">
             
             {/* Note: This is an entirely distinct video ref specifically for manual user control */}
             <video 
               src="/advertise.mp4" 
               className="w-full h-auto max-h-[60vh] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
               controls
               preload="metadata"
             />

             {/* Cybernetic overlay styling borders */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-400 pointer-events-none rounded-tl-xl m-2"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#22d3ee] pointer-events-none rounded-tr-xl m-2"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#22d3ee] pointer-events-none rounded-bl-xl m-2"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-400 pointer-events-none rounded-br-xl m-2"></div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Experience;
