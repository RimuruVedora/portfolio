import { useState, useEffect, useRef } from 'react';
import Model3D_Playground from './Model3D_Playground';

const base = import.meta.env.BASE_URL;

// Functional specialized Intersection Observer Card Component mimicking Home layout
const ProjectScrollCard = ({ proj, total, onClick }: { proj: any, total: number, onClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`min-h-[100dvh] w-full flex flex-col justify-center snap-center relative z-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      {/* Project Card */}
      <div 
        onClick={onClick}
        className="group relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] hover:-translate-y-2 hover:border-orange-500/50 transition-all duration-500 bg-gray-900 mx-auto"
        style={{ maxWidth: '95%' }}
      >
        <img src={proj.img} alt={proj.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
        
        {/* Shadow gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
        
        {/* Project Counter Badge */}
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-[#22d3ee]/30 text-[#22d3ee] px-4 py-2 rounded-full font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)] z-20 pointer-events-none">
           Project {proj.id} / {total}
        </div>

        {/* Always-visible "Click to view" badge — top right */}
        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-orange-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_16px_rgba(249,115,22,0.6)] animate-pulse">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
            Click to view
          </div>
        </div>
        
        {/* Bottom info */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none pr-8">
           <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 transition-all drop-shadow-2xl mb-3">{proj.title}</h3>
           <span className="text-xs sm:text-sm font-bold text-[#22d3ee] bg-black/80 px-4 py-2 rounded-lg backdrop-blur-md shadow-inner shadow-black inline-block uppercase tracking-widest">{proj.stack}</span>
           {proj.tags && (
             <div className="flex gap-2 mt-3">
               {proj.tags.map((tag: any) => (
                 <div key={tag.label} className="w-8 h-8 rounded-full bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg" title={tag.label}>
                   <img src={tag.icon} alt={tag.label} className="w-5 h-5 object-contain" />
                 </div>
               ))}
             </div>
           )}
           {/* Feature Badges — AI / Map */}
           {proj.features && (
             <div className="flex flex-wrap gap-2 mt-3">
               {proj.features.map((feat: any) => (
                 <div
                   key={feat.label}
                   className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border animate-pulse"
                   style={{
                     background: feat.color === 'purple' ? 'rgba(168,85,247,0.25)' : 'rgba(34,197,94,0.2)',
                     borderColor: feat.color === 'purple' ? 'rgba(168,85,247,0.6)' : 'rgba(34,197,94,0.5)',
                     color: feat.color === 'purple' ? '#d8b4fe' : '#86efac',
                     boxShadow: feat.color === 'purple' ? '0 0 12px rgba(168,85,247,0.4)' : '0 0 12px rgba(34,197,94,0.3)',
                   }}
                 >
                   <span>{feat.icon}</span>
                   {feat.count && <span>{feat.count}×</span>}
                   <span>{feat.label}</span>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Scroll hint — only on first card, pinned to bottom of the viewport section */}
      {proj.id === 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none select-none">
          <div className="flex items-center gap-3 bg-black/70 border border-orange-500/40 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]" style={{ padding: '12px 24px' }}>
            <span className="text-xl animate-bounce">👇</span>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wide">Scroll down for more projects</span>
              <span className="text-orange-400 text-xs font-medium tracking-wider">I have {total} projects in total</span>
            </div>
            {/* Dot indicators */}
            <div className="flex gap-1.5 ml-2">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full ${i === 0 ? 'w-2.5 h-2.5 bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.9)]' : 'w-1.5 h-1.5 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-px h-5 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
};


const Projects = () => {
  // Store the entire project object state rather than just the string to access deep case-study properties
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Show tutorial only when the projects section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTutorial(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-dismiss after 5s once shown
  useEffect(() => {
    if (!showTutorial) return;
    const timer = setTimeout(() => setShowTutorial(false), 5000);
    return () => clearTimeout(timer);
  }, [showTutorial]);

  // Dismiss on scroll — but only 1.5s after tutorial appears (so nav scroll doesn't kill it)
  useEffect(() => {
    if (!showTutorial) return;
    const el = document.getElementById('main-scroller');
    const dismiss = () => setShowTutorial(false);
    const attachTimer = setTimeout(() => {
      el?.addEventListener('scroll', dismiss, { once: true });
    }, 1500);
    return () => {
      clearTimeout(attachTimer);
      el?.removeEventListener('scroll', dismiss);
    };
  }, [showTutorial]);

  // Robust structured schema matching the exact user layout request
  const projects = [
    { 
      id: 1, 
      title: 'Hotel & Restaurant Financial Management System', 
      img: `${base}project_1_login.png`, 
      stack: 'Full Stack Architecture',
      link: 'https://financials.soliera-hotel-restaurant.com/login',
      features: [
        { label: 'AI Integrated', icon: '✦', count: 3, color: 'purple' },
        { label: 'Google Maps', icon: '📍', count: null, color: 'green' },
      ],
      tags: [
        { label: 'Laravel / PHP', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
        { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { label: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      ],
      caseStudy: [
        {
          title: 'Dashboard Overview',
          desc: 'A dynamic dashboard that provides real-time insights into financial health. Key metrics include Net Income, EBITDA, Total Receivables, Total Payables, and Total Employees. Features interactive financial ratio charts and a real-time transaction feed.',
          images: [`${base}finance/dashboard_Card.png`]
        },
        {
          title: 'Security & Administration',
          desc: 'Comprehensive user administration interface allowing admins to view and manage all system users. Advanced security features to locate, verify, or unverify user devices to prevent unauthorized access.',
          images: [`${base}finance/users.png`, `${base}finance/google_map.png`]
        },
        {
          title: 'AI Financial Prediction',
          desc: 'Advanced AI algorithms calculate and predict total budget and income based on historical transaction data.',
          images: [`${base}finance/budget risk page_1.png`, `${base}finance/ai_risk_budget_page_2.png`, `${base}finance/Ai_budget_risk page 1.png`]
        },
        {
          title: 'Business Intelligence & Growth',
          desc: 'Continuous prediction of income and company growth. The system identifies potential financial mistakes and provides actionable insights via the Business Intelligence module.',
          images: [`${base}finance/prediction_trend_analysis_Ai.png`]
        },
        {
          title: 'Smart Payable Management',
          desc: 'AI-driven decision support for managing payable transactions. The system suggests optimal payment methods and dates for all disbursements to maximize cash flow efficiency.',
          images: [`${base}finance/Smart_Payable_Management.png`]
        }
      ]
    },
    {
      id: 2,
      title: 'Hotel & Restaurant Human Resource',
      tags: [
        { label: 'Laravel / PHP', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
        { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { label: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      ],
      img: `${base}HR4/Home_page.png`,
      stack: 'Full Stack Architecture',
      link: 'https://hr4.soliera-hotel-restaurant.com/',
      features: [
        { label: 'AI Integrated', icon: '✦', count: 1, color: 'purple' },
      ],
      caseStudy: [
        {
          title: 'Dashboard',
          desc: 'Executive visibility into your entire HR landscape with real-time KPIs: headcount, monthly payroll, open roles, and HMO enrollment. Storytelling charts that reveal department mix and headcount momentum, turning raw data into decisions. Built-in analytics for payroll vs budget and earnings vs deductions to surface cost signals before they become issues. AI‑ready insights with configurable toggles, so you can unlock automated forecasting and recommendations when you\'re ready.',
          images: [`${base}HR4/Home_page.png`, `${base}HR4/Home_page_part2.png`]
        },
        {
          title: 'Employee Master List',
          desc: 'Your single source of truth for every employee: rich profiles, lifecycle badges, department/level, and government ID completeness. Lightning-fast search and filters to find anyone in seconds, from front desk to finance. Secure, OTP-verified CSV export designed for compliance-ready reporting and external sharing. Seamless drill-down to detailed records for instant context in performance, compensation, and compliance.',
          images: [`${base}HR4/Employee_master_list.png`, `${base}HR4/Employee_Details.png`]
        },
        {
          title: 'Workforce Alerts & Vacant Position',
          desc: 'Live "risk radar" that flags missing IDs, expiring contracts, terminated and on-leave employees—perfect for proactive HR action. Auto-detects available positions from workforce changes, so talent teams can fill roles faster. Tabbed views and focused filters make investigations effortless across departments and cohorts. Clear metrics and visual cues help leadership prioritize the most urgent workforce tasks.',
          images: [`${base}HR4/work_force_1.png`, `${base}HR4/work_force_2.png`]
        },
        {
          title: 'HMO & Benefits Providers',
          desc: 'A curated directory of hospitals, clinics, labs, government/private partners, and benefits—with ratings and ownership types. Provider cards show availability (24/7), specialty, lifecycle, and validity windows for confident vendor management. Powerful search and rich filters to match the right provider to every employee and policy. OTP-protected export and polished add/edit flows support real-world administration with zero friction.',
          images: [`${base}HR4/HMO_Providers.png`, `${base}HR4/HMO_Providers_2.png`]
        },
        {
          title: 'Compensation Planning',
          desc: 'Strategic pay architecture with Salary Structures, Pay Grade ranges, fairness analytics, and budget scenarios you can save and reuse. Automated merit recommendations convert performance ratings into proposed increases—fast, transparent, and consistent. Review cycle management tracks the workflow from HR to Finance, aligning stakeholders around one version of truth. Precision filtering and planning tools ensure equitable outcomes while protecting your budget envelope.',
          images: [`${base}HR4/salary_structure.png`, `${base}HR4/merit_cycle.png`]
        },
        {
          title: 'Payroll Management',
          desc: 'End-to-end payroll operations: map benefits to earning/deduction codes, control statutory flags, and maintain compliance with SSS/PhilHealth/Pag‑IBIG. Adjustments & one‑off payments for retro, bonuses, and corrections—no more spreadsheet chaos. Payroll Run gives you register, history, and per‑employee breakdowns of gross, deductions, and net for transparent audits. Designed for accuracy and accountability so you close payroll with confidence every cycle.',
          images: [`${base}HR4/payroll1.png`, `${base}HR4/payroll2.png`, `${base}HR4/payroll3.png`, `${base}HR4/payroll4.png`]
        },
      ]
    },

    {
      id: 3,
      title: 'TNVS Human Resource',
      img: `${base}HR2/login.png`,
      stack: 'Full Stack Architecture',
      link: 'https://hr2.viahale.com/login',
      features: [
        { label: 'AI Integrated', icon: '✦', count: 1, color: 'purple' },
      ],
      tags: [
        { label: 'Laravel / PHP', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
        { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { label: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      ],
      caseStudy: [
        {
          title: 'Strategic Dashboard',
          desc: 'A centralized command center providing real-time visibility into organizational health. It tracks key KPIs such as Retention Rate, Average Proficiency Percent, and Bench Strength, allowing leadership to make data-driven decisions.',
          images: [`${base}HR2/Dashboard1.png`, `${base}HR2/dashboard2.png`, `${base}HR2/dashboard3.png`]
        },
        {
          title: 'Intelligent Competency Framework',
          desc: 'Enterprise Skill Architecture: Defines the organization\'s "DNA" by mapping core competencies and proficiency levels to specific job roles. This ensures every employee knows exactly what is required to excel in their current position. Competency Analytics & Gap Discovery: High-level visual intelligence that identifies skill gaps across departments. It features AI-powered individual analysis to recommend personalized growth plans, ensuring the workforce is future-ready.',
          images: [`${base}HR2/compentency.png`, `${base}HR2/competency_analytics.png`]
        },
        {
          title: 'End-to-End Learning Management System (LMS)',
          desc: 'Course & Content Factory: A comprehensive engine for creating and managing training courses. It supports rich media, including automated PDF text extraction for quick content previewing. Assessment & Examination Engine: A sophisticated testing module that supports grouped exams, time-limited assessments, and automated grading. It tracks progress through weekly learning milestones. Overall Performance Tracking: Consolidates scores from both online assessments and physical training sessions into a single "Overall Score" dashboard, providing a 360-degree view of employee learning progress.',
          images: [`${base}HR2/lms_courses.png`, `${base}HR2/lms_learning_material.png`]
        },
        {
          title: 'Strategic Talent & Succession Planning',
          desc: 'Training Lifecycle Management: Coordinates the entire training schedule, from pre-training enrollment to post-evaluation. It includes participant tracking and capacity management to optimize training resources. Talent Assessment & High-Potential (HiPo) Identification: Automatically identifies top performers based on skill proficiency, exam results, and training completion. Succession Pipeline: A forward-looking tool that maps potential candidates to critical leadership roles. It tracks "Readiness Windows" (e.g., Ready Now vs. 1-2 Years) to ensure business continuity and reduce leadership risk.',
          images: [`${base}HR2/Succession_planning1.png`, `${base}HR2/succession_planning2.png`, `${base}HR2/TRAINING.png`]
        },
      ]
    },
    {
      id: 4,
      title: 'SaaS Administrative Management System',
      img: `${base}administrative/login.png`,
      stack: 'SaaS Platform',
      features: [
        { label: 'AI Integrated', icon: '✦', count: 1, color: 'purple' },
      ],
      tags: [
        { label: 'Laravel / PHP', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
        { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { label: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      ],
      caseStudy: [
        {
          title: 'Dashboard',
          desc: 'A high-level command center providing real-time analytics and visualized KPIs. It tracks system-wide metrics like user activity, document status distributions, and recent audit logs, giving administrators instant oversight of operations.',
          images: [`${base}administrative/dashboard.png`]
        },
        {
          title: 'User Management',
          desc: 'A complete RBAC (Role-Based Access Control) provisioning panel. It manages employee accounts, roles (Admin/User), and permissions with advanced filtering by department and account status, ensuring secure and organized system access.',
          images: [`${base}administrative/usm1.png`, `${base}administrative/usm2.png`]
        },
        {
          title: 'Document Management',
          desc: 'An intelligent tracking system for the document lifecycle. It features AI-assisted validation, automated logging, and a secure "Bin" for archiving expired records, ensuring that every document is routed, reviewed, and stored correctly.',
          images: [`${base}administrative/document_management1.png`, `${base}administrative/document_management2.png`, `${base}administrative/document_management3.png`]
        },
        {
          title: 'Legal',
          desc: 'A specialized portal for high-stakes documentation like contracts and job orders. It integrates AI-powered summaries and an interactive AI Chat Assistant to help reviewers analyze risks, check compliance, and make faster, data-driven decisions.',
          images: [`${base}administrative/legal1.png`, `${base}administrative/legal2.png`]
        },
        {
          title: 'Visitor Management',
          desc: 'A streamlined digital logbook for onsite security. It handles the end-to-end visitor experience—from initial request and date-range filtering to approval workflows and onsite status tracking (Pending/Approved/Denied/Complete).',
          images: [`${base}administrative/visitor1.png`, `${base}administrative/visitor2.png`]
        },
        {
          title: 'Facility Management',
          desc: 'A centralized hub for resource allocation. It manages facility inventory, tracks maintenance/usage requests, and provides a clear Facility Log for scheduling and operational oversight.',
          images: [`${base}administrative/facility1.png`, `${base}administrative/facility2.png`]
        },
        {
          title: 'Audit Trail',
          desc: 'The system\'s "Black Box"—a comprehensive, tamper-evident log of every action taken within the platform. It tracks "who did what and when" across all modules, providing the ultimate layer of accountability and transparency for stakeholders.',
          images: [`${base}administrative/audit_Trail.png`]
        },
      ]
    },

    {
      id: 5,
      title: 'School Management System Curriculum Builder',
      img: `${base}School_Management_System/login.png`,
      stack: 'EdTech Architecture',
      features: [
        { label: 'AI Integrated', icon: '✦', count: 1, color: 'purple' },
      ],
      tags: [
        { label: 'PHP', icon: 'https://cdn.simpleicons.org/php/777BB4' },
        { label: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { label: 'CSS', icon: 'https://cdn.simpleicons.org/css/663399' },
        { label: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      ],
      caseStudy: [
        {
          title: 'Intelligent Command Center (Dashboard)',
          desc: 'Visual Analytics: Real-time visualization of curriculum health, elective popularity, and compliance status. Actionable Insights: Instant notification of pending prerequisite approvals or accreditation gaps. Unified Navigation: Centralized access to all sub-modules through a sleek, modern UI.',
          images: [`${base}School_Management_System/Dashboard.png`]
        },
        {
          title: 'Curriculum & Subject Architecture',
          desc: 'Curriculum Builder: Dynamic creation of degree programs and K-12 strands. Includes sub-modules for Strand Building and Subject Building. Course Mapping: Advanced logic for mapping subjects across different programs and strands to ensure seamless student transitions.',
          images: [`${base}School_Management_System/curriculum_builder1.png`, `${base}School_Management_System/curriculum_builder2.png`, `${base}School_Management_System/curriculum_builder3.png`, `${base}School_Management_System/course_mapping1.png`, `${base}School_Management_System/course_mapping2.png`]
        },
        {
          title: 'Smart Rule Engine (Prerequisites & Electives)',
          desc: 'Prerequisite Configurator: Set complex logic (hard vs. soft prerequisites) for both Degree and Strand courses. Prevents enrollment errors before they happen. Elective Manager: Manage elective groups, track course popularity, and automate group assignments to optimize class sizes.',
          images: [`${base}School_Management_System/pre-requisite1.png`, `${base}School_Management_System/pre-requisite2.png`, `${base}School_Management_System/elective.png`]
        },
        {
          title: 'Historical Intelligence & Equivalency',
          desc: 'Course Offering History: Comprehensive audit of past offerings, including sub-modules for Exporting History for CHED/DepEd reporting. Subject Equivalency Tool: Smart matching algorithm for transfer students or curriculum updates — matches old course codes to new ones with high precision.',
          images: [`${base}School_Management_System/course_offering1.png`, `${base}School_Management_System/course_offering2.png`, `${base}School_Management_System/subject_equivalency1.png`, `${base}School_Management_System/subject_equivalency2.png`]
        },
        {
          title: 'Performance & Compliance Mastery',
          desc: 'Grade Weighting Setup: Customized weighting schemas for different subjects and strands, ensuring accurate GPA and honor calculations. Compliance Validator: A specialized engine that checks curricula against CHED/DepEd standards in real-time, highlighting missing credits or required subjects.',
          images: [`${base}School_Management_System/grade_weigthening_set_up1.png`, `${base}School_Management_System/grade_weigthening_set_up2.png`, `${base}School_Management_System/ched_compiance_validator.png`]
        },
        {
          title: 'Security, Resilience & Transparency',
          desc: 'Archive System: "Safety-net" feature for accidental deletions. Restore subjects, curricula, or configurations with a single click. Audit Trail: Full accountability — every create, update, delete, or restore action is logged with user IDs, timestamps, and IP addresses.',
          images: [`${base}School_Management_System/archive.png`, `${base}School_Management_System/audit_trail.png`]
        },
      ]
    },
  ];

  return (
    <>
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
      

      {/* ── Tutorial Hint Overlay ── */}
      {showTutorial && (
        <div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
          onClick={() => setShowTutorial(false)}
          style={{ cursor: 'pointer' }}
        >
          {/* Main pill */}
          <div
            className="flex items-center gap-4 bg-black/85 backdrop-blur-xl border border-orange-500/50 rounded-2xl shadow-[0_0_40px_rgba(249,115,22,0.3)]"
            style={{ padding: '16px 28px' }}
          >
            {/* Animated hand */}
            <span className="text-3xl animate-bounce select-none">👇</span>
            <div className="flex flex-col">
              <span className="text-white font-black text-base tracking-wide">Scroll down to see more projects!</span>
              <span className="text-orange-400 text-xs font-semibold mt-0.5 tracking-wider">I have {projects.length} projects in total · tap to dismiss</span>
            </div>
            {/* Project dots */}
            <div className="flex gap-1.5 ml-2">
              {projects.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === 0 ? 'w-3 h-3 bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'w-2 h-2 bg-white/20'}`} />
              ))}
            </div>
          </div>
          {/* Auto-dismiss progress bar */}
          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-[shrink_5s_linear_forwards]" />
          </div>
        </div>
      )}

      <section ref={sectionRef} id="projects" className="w-full relative flex items-start justify-center px-4 sm:px-6 lg:px-8 z-10 bg-[#0f0f23]">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 relative min-h-[100dvh]">
          
          {/* Left Side: Project Cards */}
          <div className="w-full text-left flex flex-col z-10 order-2 md:order-1 pt-28 pb-40" style={{ paddingLeft: 'clamp(20px, 6vw, 96px)', paddingRight: '8px' }}>
            {/* Loop rendering 6 Project ScrollCards in isolated snap-chambers */}
            {projects.map((proj) => (
              <ProjectScrollCard key={proj.id} proj={proj} total={projects.length} onClick={() => setSelectedProject(proj)} />
            ))}
          </div>

          {/* Right Side: 3D Model Sticky Scaffold directly utilizing Model3D_Playground.tsx */}
          <div className="w-full h-[280px] sm:h-[340px] md:h-[100dvh] md:sticky md:top-0 flex items-center justify-center order-1 md:order-2 z-0 pb-6 md:pb-0 pointer-events-none">
            {/* Massive blue halo aura setting visual distinction from the pink About robot background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#22d3ee]/20 to-blue-500/20 rounded-full blur-3xl opacity-50"></div>
            
            <div className="w-full h-full relative pointer-events-auto flex items-center justify-center max-h-[800px]">
               <Model3D_Playground />
               
               {/* Absolute structural UI interaction prompt */}
               <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-[#22d3ee]/30 px-5 py-2.5 rounded-full text-white/90 text-sm font-bold tracking-wide whitespace-nowrap shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                 <svg className="w-5 h-5 text-[#22d3ee] animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
                 Explore Codebase Architecture
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Full-Screen Case Study Scrollable Form Factor */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl transition-opacity animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          {/* Chassis constraint with absolute positioning to perfectly center */}
          <div 
             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] lg:w-[85vw] max-w-[1400px] h-[95vh] lg:h-[90vh] flex flex-col hide-scroll overflow-x-hidden overflow-y-auto animate-in zoom-in-95 duration-500 bg-[#0a0a16] border border-white/20 rounded-[2.5rem] shadow-[0_0_120px_rgba(34,211,238,0.15)]" 
             onClick={(e) => e.stopPropagation()}
          >
             {/* Sticky Sub-Header Nav */}
             <div className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-3xl border-b border-white/10 rounded-t-[2.5rem] flex flex-col gap-4 box-border" style={{ padding: '24px 40px' }}>
               {/* Top row: title + actions */}
               <div className="flex items-start justify-between gap-8">
                  <div className="flex flex-col flex-1 min-w-0 pr-4">
                    <span className="text-xs sm:text-sm font-black text-orange-500 tracking-widest uppercase mb-2 drop-shadow-md">Architecture Breakdown</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug break-words whitespace-normal">{selectedProject.title}</h2>
                  </div>

                  <div className="flex gap-4 sm:gap-6 items-center shrink-0">
                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#22d3ee] to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-all"
                    >
                      <span>View Site</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}

                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-3 rounded-full bg-white/5 text-white hover:bg-pink-600 hover:rotate-90 hover:scale-110 transition-all duration-300 border border-white/10"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
               </div>
               {/* Feature badges row */}
               {selectedProject.features && (
                 <div className="flex flex-wrap gap-2">
                   {selectedProject.features.map((feat: any) => (
                     <div
                       key={feat.label}
                       className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border"
                       style={{
                         background: feat.color === 'purple' ? 'rgba(168,85,247,0.2)' : 'rgba(34,197,94,0.15)',
                         borderColor: feat.color === 'purple' ? 'rgba(168,85,247,0.7)' : 'rgba(34,197,94,0.6)',
                         color: feat.color === 'purple' ? '#e9d5ff' : '#bbf7d0',
                         boxShadow: feat.color === 'purple' ? '0 0 16px rgba(168,85,247,0.45), inset 0 0 8px rgba(168,85,247,0.1)' : '0 0 16px rgba(34,197,94,0.35)',
                       }}
                     >
                       <span className="text-sm">{feat.icon}</span>
                       {feat.count && (
                         <span className="text-base font-black" style={{ color: feat.color === 'purple' ? '#c084fc' : '#4ade80' }}>{feat.count}×</span>
                       )}
                       <span>{feat.label}</span>
                     </div>
                   ))}
                 </div>
               )}
             </div>

             {/* Case Study Content Rendering Engine */}
             <div className="flex flex-col flex-1 gap-24 box-border min-w-0" style={{ padding: '60px 40px' }}>
               
               {selectedProject.caseStudy ? (
                  // Deep formatted rendering block for populated studies like Project 1
                  selectedProject.caseStudy.map((block: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-10 pb-10 border-b border-white/5 last:border-b-0 min-w-0">
                      
                      {/* Formatted Header Matrix */}
                      <div className="flex flex-col gap-6 w-full max-w-5xl min-w-0">
                        <div className="flex items-center gap-5 min-w-0">
                          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 font-black border border-orange-500/30 text-lg shadow-inner shadow-orange-500/20 shrink-0">0{idx + 1}</span>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 break-words whitespace-normal">{block.title}</h3>
                        </div>
                        <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-medium break-words whitespace-normal">
                          {block.desc}
                        </p>
                      </div>

                      {/* Display Picture Stack */}
                      <div className={`grid grid-cols-1 ${block.images.length > 1 ? 'lg:grid-cols-2' : ''} gap-8 sm:gap-12 w-full min-w-0`}>
                        {block.images.map((imgSrc: string, iIndex: number) => (
                           <div key={iIndex} className="w-full relative group rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                             <img src={imgSrc} alt={`${block.title} feature`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                             {/* Faded overlay map */}
                             <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                           </div>
                        ))}
                      </div>

                    </div>
                  ))
               ) : (
                  // Fallback for un-generated Project files (2 through 6)
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <img src={selectedProject.img} alt="Hero View" className="w-full max-w-4xl h-auto rounded-3xl shadow-2xl border border-white/10 mb-10" />
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Full System Diagnostics Pending</h3>
                    <p className="text-gray-400 max-w-2xl text-lg relative z-20">The advanced documentation, architecture blueprints, and visual layout captures for this project are currently still being aggregated into the case-study framework.</p>
                  </div>
               )}

             </div>
             
             {/* Bottom Mobile Action (Cloned for mobile users) */}
             {selectedProject.link && (
                <div className="border-t border-white/10 sm:hidden flex justify-center mt-12 w-full box-border" style={{ padding: '24px 40px 48px 40px' }}>
                   <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#22d3ee] to-blue-500 text-white px-6 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    >
                      <span>View Site</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
             )}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
