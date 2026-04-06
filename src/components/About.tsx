import { useState, useEffect, useRef } from 'react';
import Model3D_Playground from './Model3D_Playground';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEducationVisible, setIsEducationVisible] = useState(false);
  const [isCertVisible, setIsCertVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const eduObserver = new IntersectionObserver(
      ([entry]) => {
        setIsEducationVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const certObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCertVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    if (eduRef.current) eduObserver.observe(eduRef.current);
    if (certRef.current) certObserver.observe(certRef.current);

    return () => {
      observer.disconnect();
      eduObserver.disconnect();
      certObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section className="w-full relative z-10 flex items-start justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative h-full min-h-[100dvh]">

          {/* Left Side - Content Container */}
          <div className="w-full text-left flex flex-col z-10 order-2 lg:order-1 px-8 sm:px-12 lg:px-16">

            {/* ABOUT ME CARD */}
            <div id="about" ref={ref} className={`min-h-[100dvh] flex flex-col justify-center pt-32 pb-20 snap-center relative z-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group hover:bg-white/10 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left w-[95%] mx-auto"
                style={{ padding: '3rem', marginTop: '120px', marginBottom: '60px' }}
              >

                <h2
                  className="text-3xl sm:text-4xl font-bold text-white"
                  style={{ marginBottom: '20px' }}
                >
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Me</span>
                </h2>

                {/* Profile Header (Image + Name) */}
                <div
                  className="flex items-center w-full"
                  style={{ marginBottom: '24px', gap: '32px' }}
                >
                  {/* Outer wrapper — no overflow-hidden so badge can show below */}
                  <div className="relative shrink-0 pb-5">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 relative group/avatar cursor-pointer"
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      <img src={`${import.meta.env.BASE_URL}about.jpg`} alt="Celherson" className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Enlarge</span>
                      </div>
                    </div>

                    {/* Always-visible badge — outside overflow-hidden circle */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                      <span className="flex items-center gap-1 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.7)] animate-pulse whitespace-nowrap">
                        👆 Tap to enlarge
                      </span>
                    </div>
                  </div>


                  <div className="flex flex-col text-left">
                    <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                      Celherson A. Guzman
                    </h3>
                    <p className="text-orange-400/80 font-bold tracking-wide uppercase text-xs sm:text-sm mt-2">
                      IT Student & Full Stack Dev
                    </p>
                  </div>
                </div>



                {/* Scrollable Text Content */}
                <div className="text-gray-300 font-medium leading-relaxed text-[15px] sm:text-[17px] flex flex-col gap-4 overflow-y-auto pr-4 max-h-[160px] sm:max-h-[200px]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(249,115,22,0.5) transparent' }}>
                  <p>
                    I am a graduating student at Bestlink College of the Philippines. Over the past 2 years of dedicated freelance development, I have specialized in building highly scalable, end-to-end applications from the ground up.
                  </p>
                  <p>
                    For the web, I architect robust backends using <span className="text-orange-400 font-bold">PHP/Laravel</span> alongside dynamic frontends crafted with <span className="text-pink-400 font-bold">HTML, CSS, JS, and Tailwind</span>. In the mobile space, I develop native applications using <span className="text-orange-400 font-bold">Java</span>. Beyond writing code, I am highly knowledgeable in deployment and infrastructure, with extensive hands-on experience managing <span className="text-pink-400 font-bold">MySQL databases, configuring LiteSpeed Servers, and handling secure connections via Bitvise</span>.
                  </p>
                </div>

              </div>
            </div>


            {/* EDUCATIONAL BACKGROUND CARD */}
            <div id="education" ref={eduRef} className={`min-h-[100dvh] flex flex-col justify-center pt-32 pb-20 snap-center relative z-20 transition-all duration-1000 transform ${isEducationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group hover:bg-white/10 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left w-[95%] mx-auto"
                style={{ padding: '3rem', marginTop: '40px', marginBottom: '60px' }}
              >

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Background</span>
                </h2>
                <p className="text-gray-400 font-medium mb-10 text-sm tracking-wide">My academic foundation in technology.</p>
                <br />
                {/* Timeline Container */}
                <div className="w-full flex flex-col mt-6">

                  {/* College */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isEducationVisible ? 'opacity-100 translate-x-0 delay-100' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    {/* Left Column: Icon and Line purely isolated */}
                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      {/* Connecting Line to next item */}
                      <div className="absolute top-[48px] h-full w-[2px] bg-orange-500/40 z-0"></div>

                      {/* Glowing Dot */}
                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Content block: The text area */}
                    <div className="flex-1 flex flex-col pb-12 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">College • 2021 - 2026</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Bestlink College Of The Philippines
                      </h3>
                      <p className="text-gray-200 mt-2 font-medium leading-relaxed">Bachelor of Science in Information Technology</p>
                    </div>
                  </div>

                  {/* Senior High */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isEducationVisible ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      {/* Connecting Line to next item */}
                      <div className="absolute top-[48px] h-full w-[2px] bg-orange-500/40 z-0"></div>

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-12 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">Senior High School • 2019 - 2021</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Caybiga Highschool
                      </h3>
                      <p className="text-gray-200 mt-2 font-medium leading-relaxed">Strand "GAS" (General Academic Strand)</p>
                    </div>
                  </div>

                  {/* Junior High */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isEducationVisible ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      {/* No line segment on the final connecting item! */}

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-10 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">Junior High School • 2014 - 2018</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Caybiga Highschool
                      </h3>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* CERTIFICATION BACKGROUND CARD */}
            <div id="certification" ref={certRef} className={`min-h-[100dvh] flex flex-col justify-center pt-32 pb-20 snap-center relative z-20 transition-all duration-1000 transform ${isCertVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:-translate-y-2 transition-all duration-500 group hover:bg-white/10 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left w-[95%] mx-auto"
                style={{ padding: '3rem', marginTop: '40px', marginBottom: '60px' }}
              >

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Seminars</span>
                </h2>
                <p className="text-gray-400 font-medium mb-10 text-sm tracking-wide">Continuous learning and professional development.</p>
                <br />
                {/* Timeline Container */}
                <div className="w-full flex flex-col mt-6">

                  {/* Certification 1 */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isCertVisible ? 'opacity-100 translate-x-0 delay-100' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      <div className="absolute top-[48px] h-full w-[2px] bg-orange-500/40 z-0"></div>

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-12 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">December 2024</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Introduction to IOT
                      </h3>
                    </div>
                  </div>

                  {/* Certification 2 */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isCertVisible ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      <div className="absolute top-[48px] h-full w-[2px] bg-orange-500/40 z-0"></div>

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-12 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">November 2025</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Familiarizing with AI
                      </h3>
                    </div>
                  </div>

                  {/* Certification 3 */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isCertVisible ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      <div className="absolute top-[48px] h-full w-[2px] bg-orange-500/40 z-0"></div>

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-12 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">November 2025</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        Introduction to AI
                      </h3>
                    </div>
                  </div>

                  {/* Certification 4 */}
                  <div className={`relative flex w-full transition-all duration-700 ease-out transform ${isCertVisible ? 'opacity-100 translate-x-0 delay-700' : 'opacity-0 -translate-x-12 delay-0'}`}>

                    <div className="w-16 sm:w-20 shrink-0 relative flex justify-center">
                      {/* No line segment on the final connecting item! */}

                      <div className="relative w-8 h-8 shrink-0 bg-[#0f0f23] border-[2px] border-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,1)] hover:bg-orange-500/20 hover:scale-110 cursor-pointer group z-10 box-border top-[22px]">
                        <svg className="w-[14px] h-[14px] text-orange-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col pb-10 mt-1 pl-2 sm:pl-4">
                      <p className="text-orange-400/80 font-bold mb-1 text-xs tracking-wider uppercase">December 2024</p>
                      <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 leading-tight">
                        NCIII TWSP Programming Java
                      </h3>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right Side - 3D Playground Model Sticky Container */}
          <div className="w-full h-[400px] lg:h-[100dvh] lg:sticky lg:top-0 flex items-center justify-center order-1 lg:order-2 z-0 pb-10 lg:pb-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl opacity-60"></div>
            <div className="w-full h-full relative pointer-events-auto flex items-center justify-center max-h-[800px]">
              <Model3D_Playground />

              {/* 3D Interactive Badge */}
              <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-white/90 text-sm font-medium whitespace-nowrap animate-[bounce_3s_infinite] shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-black/70 hover:scale-105 transition-all">
                <svg className="w-5 h-5 text-orange-400 animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Interactive Playground &bull; Drag to rotate
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Image Overlay Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-orange-400 transition-colors bg-white/10 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageModalOpen(false);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Enlarged Image */}
          <img
            src={`${import.meta.env.BASE_URL}about.jpg`}
            alt="Celherson Enlarged"
            className="relative max-w-[90vw] max-h-[85vh] object-contain rounded-3xl border-4 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.5)] animate-[pulse_3s_infinite]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'none' }}
          />
        </div>
      )}
    </>
  );
};

export default About;
