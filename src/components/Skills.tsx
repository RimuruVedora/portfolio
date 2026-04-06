import { useEffect, useRef, useState } from 'react';

// Centralized Skill Data using direct remote SVGs to bypass CDN caching issues
const skillCategories = [
    {
        id: 'stacks',
        title: "CORE STACKS",
        description: "Primary Web Technologies",
        color: "from-blue-400 to-cyan-500",
        shadow: "shadow-cyan-500/20",
        skills: [
            { name: "HTML", src: "https://cdn.simpleicons.org/html5/E34F26", hex: "E34F26" },
            { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", hex: "1572B6" },
            { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E", hex: "F7DF1E" },
            { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", hex: "06B6D4" },
            { name: "PHP", src: "https://cdn.simpleicons.org/php/777BB4", hex: "777BB4" },
            { name: "Laravel", src: "https://cdn.simpleicons.org/laravel/FF2D20", hex: "FF2D20" },
            { name: "Bootstrap", src: "https://cdn.simpleicons.org/bootstrap/7952B3", hex: "7952B3" },
            { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", hex: "007396" }
        ]
    },
    {
        id: 'tools',
        title: "ESSENTIAL TOOLS",
        description: "Development Environments & Workflows",
        color: "from-purple-400 to-pink-500",
        shadow: "shadow-purple-500/20",
        skills: [
            { name: "Bitvise", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", hex: "ffffff" }, // Valid Devicon bash icon for SSH
            { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", hex: "007ACC" },
            { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", hex: "FF6C37" },
            { name: "MySQL YOG", src: "https://cdn.simpleicons.org/mysql/4479A1", hex: "4479A1" },
            { name: "Canva", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", hex: "00C4CC" },
            { name: "Git", src: "https://cdn.simpleicons.org/git/F05032", hex: "F05032" },
            { name: "GitHub", src: "https://cdn.simpleicons.org/github/ffffff", hex: "ffffff" }
        ]
    },
    {
        id: 'learning',
        title: "ACTIVELY LEARNING",
        description: "Exploring Modern Frameworks",
        color: "from-orange-400 to-red-500",
        shadow: "shadow-orange-500/20",
        skills: [
            { name: "React JS", src: "https://cdn.simpleicons.org/react/61DAFB", hex: "61DAFB" },
            { name: "Angular", src: "https://cdn.simpleicons.org/angular/DD0031", hex: "DD0031" }
        ]
    }
];

const Skills = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState('stacks');

    // Re-trigger entrance animation when tab changes
    const [fadeKey, setFadeKey] = useState(0);
    useEffect(() => {
        setFadeKey(prev => prev + 1);
    }, [activeTab]);

    const activeCategory = skillCategories.find(c => c.id === activeTab) || skillCategories[0];

    return (
        <section id="skills" className="relative w-full min-h-[100dvh] pb-24 px-4 sm:px-8 lg:px-16 bg-[#0a0a16] flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto snap-start">
            
            {/* Absolute Navbar Buffer Spacer to physically guarantee clearing the fixed header */}
            <div className="w-full h-[120px] sm:h-[150px] shrink-0"></div>

            {/* Custom Inline Keyframes for organic floating wave offset */}
            <style>{`
                @keyframes cardWave {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.02); }
                }
                .wave-card {
                    animation: cardWave 4s ease-in-out infinite;
                }
            `}</style>

            {/* Deep Ambient Background Orbs */}
            <div className="absolute top-[20%] left-[-10%] w-[30rem] h-[30rem] lg:w-[50rem] lg:h-[50rem] bg-cyan-900/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[30rem] h-[30rem] lg:w-[50rem] lg:h-[50rem] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div ref={sectionRef} className="max-w-7xl w-full z-10 flex flex-col gap-12">

                {/* Tab Navigation System */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
                    {skillCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`relative px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-black text-sm sm:text-lg tracking-widest transition-all duration-300 overflow-hidden ${activeTab === cat.id
                                ? 'text-white bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105'
                                : 'text-gray-500 bg-black/40 border border-transparent hover:border-white/10 hover:text-gray-300 hover:scale-105'
                                }`}
                        >
                            {/* Glow indicator behind active tab */}
                            {activeTab === cat.id && (
                                <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-20`}></div>
                            )}
                            <span className="relative z-10">{cat.title}</span>
                        </button>
                    ))}
                </div>

                {/* Dynamic Category Description */}
                <div className="text-center mt-4">
                    <p className={`text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${activeCategory.color} animate-in fade-in zoom-in duration-500`} key={`desc-${fadeKey}`}>
                        {activeCategory.description}
                    </p>
                </div>

                {/* Active Grid Array with Staggered Cascading Wave */}
                <div
                    key={fadeKey}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full relative z-20 mt-8 mb-24 animate-in fade-in slide-in-from-bottom-12 duration-700"
                >
                    {activeCategory.skills.map((skill, idx) => (
                        <div
                            key={skill.name}
                            className={`wave-card group relative flex flex-col items-center justify-center gap-6 bg-[#0d0d1f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 transition-transform duration-500 hover:z-30 hover:!scale-110 shadow-2xl hover:${activeCategory.shadow}`}
                            style={{ animationDelay: `${idx * 0.15}s` }}
                        >
                            {/* Hover Glass Illumination Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]"></div>

                            {/* Skill Icon Engine using SimpleIcons */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                                {/* Backing glow for icon */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
                                    style={{ backgroundColor: `#${skill.hex}` }}
                                ></div>
                                <img
                                    src={skill.src}
                                    alt={skill.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300"
                                    loading="lazy"
                                />
                            </div>

                            {/* Designation */}
                            <span className="text-lg sm:text-xl font-black text-gray-300 group-hover:text-white text-center tracking-wide transition-colors z-10">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
